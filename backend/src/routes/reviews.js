const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/sangeet_restaurant',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM customer_reviews ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get verified reviews only
router.get('/verified', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM customer_reviews WHERE is_verified = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching verified reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get reviews by rating
router.get('/rating/:rating', async (req, res) => {
  try {
    const { rating } = req.params;
    const ratingNum = parseInt(rating);
    
    if (ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const result = await pool.query(
      'SELECT * FROM customer_reviews WHERE rating = $1 ORDER BY created_at DESC',
      [ratingNum]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews by rating:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Create a new review
router.post('/', async (req, res) => {
  try {
    const {
      customer_name,
      review_text,
      rating,
      image_url
    } = req.body;

    // Basic validation
    if (!customer_name || !review_text || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const result = await pool.query(
      `INSERT INTO customer_reviews 
       (customer_name, review_text, rating, image_url) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [customer_name, review_text, rating, image_url]
    );

    res.status(201).json({
      message: 'Review submitted successfully',
      review: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// Get average rating
router.get('/stats/average', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT AVG(rating) as average_rating, COUNT(*) as total_reviews FROM customer_reviews WHERE is_verified = true'
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching average rating:', error);
    res.status(500).json({ error: 'Failed to fetch rating stats' });
  }
});

// Get rating distribution
router.get('/stats/distribution', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT rating, COUNT(*) as count 
       FROM customer_reviews 
       WHERE is_verified = true 
       GROUP BY rating 
       ORDER BY rating DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching rating distribution:', error);
    res.status(500).json({ error: 'Failed to fetch rating distribution' });
  }
});

module.exports = router; 