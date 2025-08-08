const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/orderController');
const { validateId } = require('../middleware/validation');

// QR Code and Table routes
router.get('/tables', getAllTables);
router.get('/table/qr/:qrCode', getTableByQRCode);

// QR Code Generation routes
router.get('/qr/generate/:tableNumber', generateTableQRCode);
router.get('/qr/generate-all', generateAllTableQRCodes);

// Order routes
router.post('/orders', createOrder);
router.get('/orders/stats', getOrderStats);
router.get('/orders/table/:tableId', getOrdersByTable);

// Admin routes (place specific routes before parameterized routes)
router.get('/orders/search', searchOrders);
router.get('/orders', getAllOrders);
router.patch('/orders/bulk-status', bulkUpdateOrderStatus);

// Individual order routes (place after specific routes)
router.get('/orders/:id', validateId, getOrderById);
router.patch('/orders/:id/status', validateId, updateOrderStatus);
router.delete('/orders/:id', validateId, deleteOrder);

module.exports = router; 