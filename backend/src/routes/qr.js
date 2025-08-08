const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');
const { authenticateToken, requireAuth } = require('../middleware/auth');

// Public routes (for QR code access)
router.get('/table/:qrCode', qrController.getTableByQRCode);

// Admin routes (require authentication)
router.get('/', authenticateToken, requireAuth, qrController.getAllQRCodes);
router.get('/analytics/:type/:qrCodeId', authenticateToken, requireAuth, qrController.getQRCodeAnalytics);

// QR Code Generation routes
router.post('/generate/table', authenticateToken, requireAuth, qrController.generateTableQRCode);
router.post('/generate/custom', authenticateToken, requireAuth, qrController.generateCustomQRCode);
router.post('/generate/bulk', authenticateToken, requireAuth, qrController.bulkGenerateTableQRCodes);

// QR Code Management routes
router.put('/:type/:qrCodeId/design', authenticateToken, requireAuth, qrController.updateQRCodeDesign);
router.delete('/:type/:qrCodeId', authenticateToken, requireAuth, qrController.deleteQRCode);

// QR Code Export/Print routes
router.get('/print/:type/:qrCodeId/:format', authenticateToken, requireAuth, qrController.generatePrintableQRCode);

module.exports = router; 