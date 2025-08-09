const pool = require('../config/database');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs').promises;

// Get table by QR code URL
const getTableByQRCode = async (req, res) => {
  try {
    const { qrCode } = req.params;
    const result = await pool.query(
      'SELECT * FROM tables WHERE qr_code_url LIKE $1 AND is_active = true',
      [`%${qrCode}%`]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Table not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching table:', error);
    res.status(500).json({ error: 'Failed to fetch table' });
  }
};

// Generate QR code for a table
const generateTableQRCode = async (req, res) => {
  try {
    const { tableNumber, customUrl, design } = req.body;
    
    if (!tableNumber) {
      return res.status(400).json({ error: 'Table number is required' });
    }

    // Check if table already has an active QR code with data
    const existingTable = await pool.query(
      'SELECT * FROM tables WHERE table_number = $1 AND is_active = true AND qr_code_data IS NOT NULL',
      [tableNumber]
    );

    if (existingTable.rows.length > 0) {
      return res.status(400).json({ error: 'Table already has a QR code' });
    }

    // If there's an inactive table with the same number, reactivate it
    const inactiveTable = await pool.query(
      'SELECT * FROM tables WHERE table_number = $1 AND is_active = false',
      [tableNumber]
    );

    if (inactiveTable.rows.length > 0) {
      // Reactivate the existing table with new QR code
      const baseUrl = process.env.CLIENT_URL || 'http://localhost:3000';
      const qrUrl = customUrl || `${baseUrl}/qr/table-${tableNumber}`;
      
      const qrOptions = {
        width: 300,
        margin: 2,
        color: {
          dark: design?.darkColor || '#1d1b16',
          light: design?.lightColor || '#ffffff'
        },
        errorCorrectionLevel: 'H'
      };

      const qrCodeDataURL = await QRCode.toDataURL(qrUrl, qrOptions);
      
      const result = await pool.query(
        `UPDATE tables 
         SET qr_code_url = $1, qr_code_data = $2, design_settings = $3, is_active = true, updated_at = NOW()
         WHERE table_number = $4 RETURNING *`,
        [qrUrl, qrCodeDataURL, JSON.stringify(design || {}), tableNumber]
      );

      res.json({
        success: true,
        table: result.rows[0],
        qrCode: {
          url: qrUrl,
          dataURL: qrCodeDataURL,
          tableNumber
        }
      });
      return;
    }

    // Generate QR URL with automatic live URL detection
    let baseUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    
    // Auto-detect live URL from request headers (for production)
    if (!process.env.CLIENT_URL && req.headers.host) {
      const protocol = req.headers['x-forwarded-proto'] || 'http';
      const host = req.headers.host;
      baseUrl = `${protocol}://${host}`;
      console.log(`🌐 Auto-detected base URL: ${baseUrl}`);
    }
    
    const qrUrl = customUrl || `${baseUrl}/qr/table-${tableNumber}`;
    
    // Log the generated URL for debugging
    console.log(`🔗 Generated QR URL for Table ${tableNumber}: ${qrUrl}`);
    
    // Generate QR code with custom design
    const qrOptions = {
      width: 300,
      margin: 2,
      color: {
        dark: design?.darkColor || '#1d1b16',
        light: design?.lightColor || '#ffffff'
      },
      errorCorrectionLevel: 'H'
    };

    const qrCodeDataURL = await QRCode.toDataURL(qrUrl, qrOptions);
    
    // Check if table exists (with or without QR code)
    const existingTableCheck = await pool.query(
      'SELECT * FROM tables WHERE table_number = $1',
      [tableNumber]
    );

    let result;
    if (existingTableCheck.rows.length > 0) {
      // Update existing table with new QR code
      result = await pool.query(
        `UPDATE tables 
         SET qr_code_url = $1, qr_code_data = $2, design_settings = $3, is_active = true, updated_at = NOW()
         WHERE table_number = $4 RETURNING *`,
        [qrUrl, qrCodeDataURL, JSON.stringify(design || {}), tableNumber]
      );
    } else {
      // Insert new table with QR code
      result = await pool.query(
        `INSERT INTO tables (table_number, qr_code_url, qr_code_data, design_settings)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [tableNumber, qrUrl, qrCodeDataURL, JSON.stringify(design || {})]
      );
    }

    res.json({
      success: true,
      table: result.rows[0],
      qrCode: {
        url: qrUrl,
        dataURL: qrCodeDataURL,
        tableNumber
      }
    });
  } catch (error) {
    console.error('Error generating table QR code:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

// Generate QR code for different purposes
const generateCustomQRCode = async (req, res) => {
  try {
    const { 
      purpose, 
      targetUrl, 
      title, 
      description, 
      design,
      expiresAt 
    } = req.body;

    if (!purpose || !targetUrl) {
      return res.status(400).json({ error: 'Purpose and target URL are required' });
    }

    // Generate QR code
    const qrOptions = {
      width: 300,
      margin: 2,
      color: {
        dark: design?.darkColor || '#1d1b16',
        light: design?.lightColor || '#ffffff'
      },
      errorCorrectionLevel: 'H'
    };

    const qrCodeDataURL = await QRCode.toDataURL(targetUrl, qrOptions);
    
    // Save to custom_qr_codes table
    const result = await pool.query(
      `INSERT INTO custom_qr_codes 
       (purpose, target_url, title, description, qr_code_data, design_settings, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        purpose,
        targetUrl,
        title || '',
        description || '',
        qrCodeDataURL,
        JSON.stringify(design || {}),
        expiresAt || null
      ]
    );

    res.json({
      success: true,
      qrCode: result.rows[0]
    });
  } catch (error) {
    console.error('Error generating custom QR code:', error);
    res.status(500).json({ error: 'Failed to generate custom QR code' });
  }
};

// Get all QR codes with analytics
const getAllQRCodes = async (req, res) => {
  try {
    // Get table QR codes with order analytics
    const tableQRCodes = await pool.query(`
      SELECT 
        t.*,
        COUNT(o.id) as total_orders,
        COUNT(CASE WHEN o.status = 'completed' THEN 1 END) as completed_orders,
        COUNT(CASE WHEN o.status != 'completed' THEN 1 END) as active_orders,
        SUM(o.total_amount) as total_revenue,
        MAX(o.created_at) as last_order_date
      FROM tables t
      LEFT JOIN orders o ON t.id = o.table_id
      WHERE t.is_active = true
      GROUP BY t.id
      ORDER BY t.table_number
    `);

    // Get custom QR codes
    const customQRCodes = await pool.query(`
      SELECT 
        *,
        CASE 
          WHEN expires_at IS NOT NULL AND expires_at < NOW() THEN 'expired'
          ELSE 'active'
        END as status
      FROM custom_qr_codes
      ORDER BY created_at DESC
    `);

    res.json({
      tableQRCodes: tableQRCodes.rows,
      customQRCodes: customQRCodes.rows
    });
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    res.status(500).json({ error: 'Failed to fetch QR codes' });
  }
};

// Get QR code analytics
const getQRCodeAnalytics = async (req, res) => {
  try {
    const { qrCodeId, type } = req.params;
    
    let query;
    let params;

    if (type === 'table') {
      query = `
        SELECT 
          t.table_number,
          COUNT(o.id) as total_orders,
          COUNT(CASE WHEN o.status = 'completed' THEN 1 END) as completed_orders,
          COUNT(CASE WHEN o.status != 'completed' THEN 1 END) as active_orders,
          COUNT(CASE WHEN o.status = 'cancelled' THEN 1 END) as cancelled_orders,
          SUM(o.total_amount) as total_revenue,
          AVG(o.total_amount) as avg_order_value,
          MIN(o.created_at) as first_order,
          MAX(o.created_at) as last_order,
          COUNT(DISTINCT DATE(o.created_at)) as active_days
        FROM tables t
        LEFT JOIN orders o ON t.id = o.table_id
        WHERE t.id = $1
        GROUP BY t.id, t.table_number
      `;
      params = [qrCodeId];
    } else {
      query = `
        SELECT 
          purpose,
          target_url,
          created_at,
          expires_at,
          CASE 
            WHEN expires_at IS NOT NULL AND expires_at < NOW() THEN 'expired'
            ELSE 'active'
          END as status
        FROM custom_qr_codes
        WHERE id = $1
      `;
      params = [qrCodeId];
    }

    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching QR analytics:', error);
    res.status(500).json({ error: 'Failed to fetch QR analytics' });
  }
};

// Update QR code design
const updateQRCodeDesign = async (req, res) => {
  try {
    const { qrCodeId, type } = req.params;
    const { design } = req.body;

    if (!design) {
      return res.status(400).json({ error: 'Design settings are required' });
    }

    let query;
    let params;

    if (type === 'table') {
      query = `
        UPDATE tables 
        SET design_settings = $1, updated_at = NOW()
        WHERE id = $2 RETURNING *
      `;
      params = [JSON.stringify(design), qrCodeId];
    } else {
      query = `
        UPDATE custom_qr_codes 
        SET design_settings = $1, updated_at = NOW()
        WHERE id = $2 RETURNING *
      `;
      params = [JSON.stringify(design), qrCodeId];
    }

    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    res.json({
      success: true,
      qrCode: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating QR design:', error);
    res.status(500).json({ error: 'Failed to update QR design' });
  }
};

// Delete QR code
const deleteQRCode = async (req, res) => {
  try {
    const { qrCodeId, type } = req.params;

    let query;
    let params;

    if (type === 'table') {
      // Check if table has active (non-completed) orders
      const ordersCheck = await pool.query(
        'SELECT COUNT(*) FROM orders WHERE table_id = $1 AND status != $2',
        [qrCodeId, 'completed']
      );

      if (parseInt(ordersCheck.rows[0].count) > 0) {
        return res.status(400).json({ 
          error: 'Cannot delete table QR code with active orders. Please complete all orders first.' 
        });
      }

      query = 'UPDATE tables SET is_active = false, qr_code_data = NULL, qr_code_url = \'deleted-table-\' || table_number, design_settings = \'{}\' WHERE id = $1 RETURNING *';
      params = [qrCodeId];
    } else {
      query = 'DELETE FROM custom_qr_codes WHERE id = $1 RETURNING *';
      params = [qrCodeId];
    }

    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    res.json({
      success: true,
      message: 'QR code deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting QR code:', error);
    res.status(500).json({ error: 'Failed to delete QR code' });
  }
};

// Generate printable QR codes
const generatePrintableQRCode = async (req, res) => {
  try {
    const { qrCodeId, type, format = 'png' } = req.params;
    
    let query;
    let params;

    if (type === 'table') {
      query = 'SELECT * FROM tables WHERE id = $1';
    } else {
      query = 'SELECT * FROM custom_qr_codes WHERE id = $1';
    }
    params = [qrCodeId];

    const result = await pool.query(query, params);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    const qrCode = result.rows[0];
    const qrUrl = type === 'table' ? qrCode.qr_code_url : qrCode.target_url;

    // Generate high-resolution QR code for printing
    const qrOptions = {
      width: 600,
      margin: 4,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    };

    let qrCodeBuffer;
    if (format === 'svg') {
      qrCodeBuffer = await QRCode.toString(qrUrl, qrOptions);
    } else {
      qrCodeBuffer = await QRCode.toBuffer(qrUrl, qrOptions);
    }

    res.setHeader('Content-Type', format === 'svg' ? 'image/svg+xml' : 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="qr-${type}-${qrCodeId}.${format}"`);
    res.send(qrCodeBuffer);
  } catch (error) {
    console.error('Error generating printable QR code:', error);
    res.status(500).json({ error: 'Failed to generate printable QR code' });
  }
};

// Bulk generate QR codes for tables
const bulkGenerateTableQRCodes = async (req, res) => {
  try {
    const { tableNumbers, baseUrl, design } = req.body;
    
    if (!Array.isArray(tableNumbers) || tableNumbers.length === 0) {
      return res.status(400).json({ error: 'Table numbers array is required' });
    }

    const results = [];
    const errors = [];

    for (const tableNumber of tableNumbers) {
      try {
        // Check if table already has an active QR code
        const existingTable = await pool.query(
          'SELECT * FROM tables WHERE table_number = $1 AND is_active = true',
          [tableNumber]
        );

        if (existingTable.rows.length > 0) {
          errors.push(`Table ${tableNumber} already has a QR code`);
          continue;
        }

        // Check if there's an inactive table to reactivate
        const inactiveTable = await pool.query(
          'SELECT * FROM tables WHERE table_number = $1 AND is_active = false',
          [tableNumber]
        );

        if (inactiveTable.rows.length > 0) {
          // Reactivate the existing table with new QR code
          const qrUrl = `${baseUrl || 'http://localhost:3000'}/qr/table-${tableNumber}`;
          const qrOptions = {
            width: 300,
            margin: 2,
            color: {
              dark: design?.darkColor || '#1d1b16',
              light: design?.lightColor || '#ffffff'
            },
            errorCorrectionLevel: 'H'
          };

          const qrCodeDataURL = await QRCode.toDataURL(qrUrl, qrOptions);
          
          const result = await pool.query(
            `UPDATE tables 
             SET qr_code_url = $1, qr_code_data = $2, design_settings = $3, is_active = true, updated_at = NOW()
             WHERE table_number = $4 RETURNING *`,
            [qrUrl, qrCodeDataURL, JSON.stringify(design || {}), tableNumber]
          );

          results.push(result.rows[0]);
          continue;
        }

        // Generate QR code
        const qrUrl = `${baseUrl || 'http://localhost:3000'}/qr/table-${tableNumber}`;
        const qrOptions = {
          width: 300,
          margin: 2,
          color: {
            dark: design?.darkColor || '#1d1b16',
            light: design?.lightColor || '#ffffff'
          },
          errorCorrectionLevel: 'H'
        };

        const qrCodeDataURL = await QRCode.toDataURL(qrUrl, qrOptions);
        
        // Save to database
        const result = await pool.query(
          `INSERT INTO tables (table_number, qr_code_url, qr_code_data, design_settings)
           VALUES ($1, $2, $3, $4) RETURNING *`,
          [tableNumber, qrUrl, qrCodeDataURL, JSON.stringify(design || {})]
        );

        results.push(result.rows[0]);
      } catch (error) {
        errors.push(`Failed to generate QR for table ${tableNumber}: ${error.message}`);
      }
    }

    res.json({
      success: true,
      generated: results,
      errors: errors,
      summary: {
        total: tableNumbers.length,
        successful: results.length,
        failed: errors.length
      }
    });
  } catch (error) {
    console.error('Error bulk generating QR codes:', error);
    res.status(500).json({ error: 'Failed to bulk generate QR codes' });
  }
};

module.exports = {
  getTableByQRCode,
  generateTableQRCode,
  generateCustomQRCode,
  getAllQRCodes,
  getQRCodeAnalytics,
  updateQRCodeDesign,
  deleteQRCode,
  generatePrintableQRCode,
  bulkGenerateTableQRCodes
}; 