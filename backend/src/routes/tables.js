const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/auth');
const { validateTableData } = require('../middleware/validation');
const pool = require('../config/database');

/**
 * GET /api/tables
 * Get all tables
 */
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM tables WHERE is_active = true ORDER BY table_number'
    );
    
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/tables/qr/:qrCode
 * Get table by QR code
 */
router.get('/qr/:qrCode', async (req, res, next) => {
  try {
    const { qrCode } = req.params;
    
    const [rows] = await pool.execute(
      'SELECT * FROM tables WHERE qr_code = ? AND is_active = true',
      [qrCode]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Table not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/tables
 * Create a new table (Admin only)
 */
router.post('/', authenticateToken, requireRole('admin'), validateTableData, async (req, res, next) => {
  try {
    const { table_number, capacity, qr_code, location } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO tables (table_number, capacity, qr_code, location) VALUES (?, ?, ?, ?)',
      [table_number, capacity, qr_code, location]
    );
    
    const [newTable] = await pool.execute(
      'SELECT * FROM tables WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newTable[0]);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/tables/:id
 * Update a table (Admin only)
 */
router.put('/:id', authenticateToken, requireRole('admin'), validateTableData, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { table_number, capacity, qr_code, location } = req.body;
    
    const [result] = await pool.execute(
      'UPDATE tables SET table_number = ?, capacity = ?, qr_code = ?, location = ? WHERE id = ?',
      [table_number, capacity, qr_code, location, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Table not found' });
    }
    
    const [updatedTable] = await pool.execute(
      'SELECT * FROM tables WHERE id = ?',
      [id]
    );
    
    res.json(updatedTable[0]);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/tables/:id
 * Soft delete a table (Admin only)
 */
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.execute(
      'UPDATE tables SET is_active = false WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Table not found' });
    }
    
    res.json({ message: 'Table deleted successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/tables/stats
 * Get table statistics (Admin only)
 */
router.get('/stats', authenticateToken, requireRole('admin'), async (req, res, next) => {
  try {
    const [totalTables] = await pool.execute(
      'SELECT COUNT(*) as total FROM tables WHERE is_active = true'
    );
    
    const [capacityStats] = await pool.execute(
      'SELECT MIN(capacity) as min_capacity, MAX(capacity) as max_capacity, AVG(capacity) as avg_capacity FROM tables WHERE is_active = true'
    );
    
    const [locationStats] = await pool.execute(
      'SELECT location, COUNT(*) as count FROM tables WHERE is_active = true GROUP BY location'
    );
    
    res.json({
      total_tables: totalTables[0].total,
      capacity_stats: capacityStats[0],
      location_stats: locationStats
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
