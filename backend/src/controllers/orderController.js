const pool = require('../config/database');
const { generateQRCode, generateAllQRCodes } = require('../utils/qrGenerator');
const { emitNewOrder, emitOrderStatusUpdate, emitOrderCompleted, emitOrderCancelled } = require('../socket');

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD${timestamp}${random}`;
};

// Get all tables
const getAllTables = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tables WHERE is_active = true ORDER BY table_number'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
};

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

// Create new order
const createOrder = async (req, res) => {
  try {
    const { table_id, customer_name, items, special_instructions } = req.body;

    // Validate required fields
    if (!table_id || !customer_name || !items) {
      return res.status(400).json({ 
        error: 'Missing required fields: table_id, customer_name, and items are required' 
      });
    }

    // Validate items is an array and not empty
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: 'Items must be a non-empty array' 
      });
    }

    // Validate table exists
    const tableResult = await pool.query(
      'SELECT * FROM tables WHERE id = $1 AND is_active = true',
      [table_id]
    );

    if (tableResult.rows.length === 0) {
      return res.status(404).json({ error: 'Table not found' });
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      // Validate each item has required fields
      if (!item.menu_item_id || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({ 
          error: 'Each item must have menu_item_id and quantity > 0' 
        });
      }

      const menuItemResult = await pool.query(
        'SELECT price FROM menu_items WHERE id = $1',
        [item.menu_item_id]
      );
      
      if (menuItemResult.rows.length === 0) {
        return res.status(404).json({ error: `Menu item ${item.menu_item_id} not found` });
      }
      
      const unitPrice = parseFloat(menuItemResult.rows[0].price);
      totalAmount += unitPrice * item.quantity;
    }

    // Create order
    const orderNumber = generateOrderNumber();
    const orderResult = await pool.query(
      `INSERT INTO orders 
       (table_id, customer_name, order_number, total_amount, special_instructions)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [table_id, customer_name, orderNumber, totalAmount, special_instructions]
    );

    const order = orderResult.rows[0];

    // Create order items
    for (const item of items) {
      const menuItemResult = await pool.query(
        'SELECT price FROM menu_items WHERE id = $1',
        [item.menu_item_id]
      );
      
      const unitPrice = parseFloat(menuItemResult.rows[0].price);
      const totalPrice = unitPrice * item.quantity;

      await pool.query(
        `INSERT INTO order_items 
         (order_id, menu_item_id, quantity, unit_price, total_price, special_requests)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, item.menu_item_id, item.quantity, unitPrice, totalPrice, item.special_requests]
      );
    }

    // Get complete order with items
    const completeOrder = await getOrderWithItems(order.id);

    // Emit real-time notification for new order
    emitNewOrder({
      id: completeOrder.id,
      orderNumber: completeOrder.order_number,
      tableNumber: completeOrder.table_number,
      customerName: completeOrder.customer_name,
      totalAmount: completeOrder.total_amount,
      items: completeOrder.items,
      status: completeOrder.status,
      createdAt: completeOrder.created_at
    });

    res.status(201).json({
      message: 'Order created successfully',
      order: completeOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Get order with items
const getOrderWithItems = async (orderId) => {
  const orderResult = await pool.query(
    `SELECT o.*, t.table_number 
     FROM orders o 
     JOIN tables t ON o.table_id = t.id 
     WHERE o.id = $1`,
    [orderId]
  );

  const itemsResult = await pool.query(
    `SELECT oi.*, mi.name, mi.description, mi.image_url
     FROM order_items oi 
     JOIN menu_items mi ON oi.menu_item_id = mi.id 
     WHERE oi.order_id = $1`,
    [orderId]
  );

  return {
    ...orderResult.rows[0],
    items: itemsResult.rows
  };
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderWithItems(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Get orders by table
const getOrdersByTable = async (req, res) => {
  try {
    const { tableId } = req.params;
    const result = await pool.query(
      `SELECT o.*, t.table_number 
       FROM orders o 
       JOIN tables t ON o.table_id = t.id 
       WHERE o.table_id = $1 
       ORDER BY o.created_at DESC`,
      [tableId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders by table:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status. Must be one of: pending, confirmed, preparing, ready, completed, cancelled' 
      });
    }

    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const updatedOrder = await getOrderWithItems(id);

    // Emit real-time status update notification
    emitOrderStatusUpdate(id, status);

    // Emit specific notifications based on status
    if (status === 'completed') {
      emitOrderCompleted(id);
    } else if (status === 'cancelled') {
      emitOrderCancelled(id, 'Order cancelled by staff');
    }

    res.json({
      message: 'Order status updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

// Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const { status, table_id } = req.query;
    
    let query = `
      SELECT o.*, t.table_number 
      FROM orders o 
      JOIN tables t ON o.table_id = t.id 
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      query += ` AND o.status = $${paramCount}`;
      params.push(status);
    }

    if (table_id) {
      paramCount++;
      query += ` AND o.table_id = $${paramCount}`;
      params.push(table_id);
    }

    query += ' ORDER BY o.created_at DESC';

    const result = await pool.query(query, params);
    
    // Get items for each order
    const ordersWithItems = await Promise.all(
      result.rows.map(async (order) => {
        const itemsResult = await pool.query(
          `SELECT oi.*, mi.name as menu_item_name, mi.description, mi.image_url
           FROM order_items oi 
           JOIN menu_items mi ON oi.menu_item_id = mi.id 
           WHERE oi.order_id = $1`,
          [order.id]
        );
        
        return {
          ...order,
          items: itemsResult.rows
        };
      })
    );
    
    res.json(ordersWithItems);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get order statistics
const getOrderStats = async (req, res) => {
  try {
    const statsResult = await pool.query(
      `SELECT 
        COUNT(*) as total_orders,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders,
        COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_orders,
        COUNT(CASE WHEN status = 'preparing' THEN 1 END) as preparing_orders,
        COUNT(CASE WHEN status = 'ready' THEN 1 END) as ready_orders,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_orders,
        SUM(total_amount) as total_revenue,
        AVG(total_amount) as average_order_value
       FROM orders`
    );

    res.json(statsResult.rows[0]);
  } catch (error) {
    console.error('Error fetching order statistics:', error);
    res.status(500).json({ error: 'Failed to fetch order statistics' });
  }
};

// Generate QR code for a specific table
const generateTableQRCode = async (req, res) => {
  try {
    const { tableNumber } = req.params;
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    
    const qrCode = await generateQRCode(tableNumber, baseUrl);
    res.json(qrCode);
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

// Generate QR codes for all tables
const generateAllTableQRCodes = async (req, res) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const qrCodes = await generateAllQRCodes(baseUrl);
    res.json(qrCodes);
  } catch (error) {
    console.error('Error generating QR codes:', error);
    res.status(500).json({ error: 'Failed to generate QR codes' });
  }
};

// Delete order (Admin)
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // First delete order items
    await pool.query('DELETE FROM order_items WHERE order_id = $1', [id]);
    
    // Then delete the order
    const result = await pool.query(
      'DELETE FROM orders WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      message: 'Order deleted successfully',
      order: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

// Bulk update order status (Admin)
const bulkUpdateOrderStatus = async (req, res) => {
  try {
    const { orderIds, status } = req.body;

    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return res.status(400).json({ error: 'Order IDs array is required' });
    }

    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status. Must be one of: pending, confirmed, preparing, ready, completed, cancelled' 
      });
    }

    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = ANY($2) RETURNING *',
      [status, orderIds]
    );

    res.json({
      message: `${result.rows.length} orders updated successfully`,
      updatedOrders: result.rows
    });
  } catch (error) {
    console.error('Error bulk updating order status:', error);
    res.status(500).json({ error: 'Failed to bulk update order status' });
  }
};

// Search orders (Admin)
const searchOrders = async (req, res) => {
  try {
    const { query, status, table_id, date_from, date_to } = req.query;
    
    let sqlQuery = `
      SELECT o.*, t.table_number 
      FROM orders o 
      JOIN tables t ON o.table_id = t.id 
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (query) {
      paramCount++;
      sqlQuery += ` AND (o.customer_name ILIKE $${paramCount} OR o.order_number ILIKE $${paramCount})`;
      params.push(`%${query}%`);
    }

    if (status) {
      paramCount++;
      sqlQuery += ` AND o.status = $${paramCount}`;
      params.push(status);
    }

    if (table_id) {
      paramCount++;
      sqlQuery += ` AND o.table_id = $${paramCount}`;
      params.push(table_id);
    }

    if (date_from) {
      paramCount++;
      sqlQuery += ` AND DATE(o.created_at) >= $${paramCount}`;
      params.push(date_from);
    }

    if (date_to) {
      paramCount++;
      sqlQuery += ` AND DATE(o.created_at) <= $${paramCount}`;
      params.push(date_to);
    }

    sqlQuery += ' ORDER BY o.created_at DESC';

    const result = await pool.query(sqlQuery, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error searching orders:', error);
    res.status(500).json({ error: 'Failed to search orders' });
  }
};

module.exports = {
  getAllTables,
  getTableByQRCode,
  createOrder,
  getOrderById,
  getOrdersByTable,
  updateOrderStatus,
  getAllOrders,
  getOrderStats,
  generateTableQRCode,
  generateAllTableQRCodes,
  deleteOrder,
  bulkUpdateOrderStatus,
  searchOrders
}; 