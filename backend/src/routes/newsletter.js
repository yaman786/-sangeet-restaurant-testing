const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/sangeet_restaurant',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Basic email validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Check if already subscribed
    const existingSubscriber = await pool.query(
      'SELECT * FROM newsletter_subscribers WHERE email = $1',
      [email]
    );

    if (existingSubscriber.rows.length > 0) {
      if (existingSubscriber.rows[0].is_active) {
        return res.status(400).json({ error: 'Email is already subscribed' });
      } else {
        // Reactivate subscription
        await pool.query(
          'UPDATE newsletter_subscribers SET is_active = true WHERE email = $1',
          [email]
        );
        return res.json({ message: 'Subscription reactivated successfully' });
      }
    }

    // Add new subscriber
    const result = await pool.query(
      'INSERT INTO newsletter_subscribers (email) VALUES ($1) RETURNING *',
      [email]
    );

    res.status(201).json({
      message: 'Successfully subscribed to newsletter',
      subscriber: result.rows[0]
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ error: 'Failed to subscribe to newsletter' });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const result = await pool.query(
      'UPDATE newsletter_subscribers SET is_active = false WHERE email = $1 RETURNING *',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Email not found in subscribers list' });
    }

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    res.status(500).json({ error: 'Failed to unsubscribe from newsletter' });
  }
});

// Get all subscribers (admin only)
router.get('/subscribers', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

// Get active subscribers count
router.get('/stats/count', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT COUNT(*) as active_subscribers FROM newsletter_subscribers WHERE is_active = true'
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching subscriber count:', error);
    res.status(500).json({ error: 'Failed to fetch subscriber count' });
  }
});

module.exports = router; 