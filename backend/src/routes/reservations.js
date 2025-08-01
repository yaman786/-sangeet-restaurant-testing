const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/sangeet_restaurant',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Create a new reservation
router.post('/', async (req, res) => {
  try {
    const {
      customer_name,
      email,
      phone,
      date,
      time,
      guests,
      special_requests
    } = req.body;

    // Basic validation
    if (!customer_name || !email || !date || !time || !guests) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if date is in the future
    const reservationDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (reservationDate < today) {
      return res.status(400).json({ error: 'Reservation date must be in the future' });
    }

    // Check if guests is a valid number
    if (guests < 1 || guests > 20) {
      return res.status(400).json({ error: 'Number of guests must be between 1 and 20' });
    }

    const result = await pool.query(
      `INSERT INTO reservations 
       (customer_name, email, phone, date, time, guests, special_requests) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [customer_name, email, phone, date, time, guests, special_requests]
    );

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

// Get all reservations (admin only)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM reservations ORDER BY date DESC, time DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

// Get reservations by date
router.get('/date/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const result = await pool.query(
      'SELECT * FROM reservations WHERE date = $1 ORDER BY time',
      [date]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reservations by date:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

// Update reservation status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE reservations SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json({
      message: 'Reservation status updated successfully',
      reservation: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating reservation status:', error);
    res.status(500).json({ error: 'Failed to update reservation status' });
  }
});

// Get reservation by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM reservations WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({ error: 'Failed to fetch reservation' });
  }
});

module.exports = router; 