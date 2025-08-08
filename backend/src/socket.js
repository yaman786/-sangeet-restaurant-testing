const { Server } = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    // Join admin room for order notifications
    socket.on('join-admin', () => {
      socket.join('admin-room');
      console.log('👨‍💼 Admin joined notification room');
    });

    // Join kitchen room for order notifications
    socket.on('join-kitchen', () => {
      socket.join('kitchen-room');
      console.log('👨‍🍳 Kitchen staff joined notification room');
    });

    // Join customer room for order tracking
    socket.on('join-customer', (orderId) => {
      socket.join(`customer-${orderId}`);
      console.log(`👤 Customer joined order tracking: ${orderId}`);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Client disconnected:', socket.id);
    });
  });

  return io;
};

// Emit new order notification
const emitNewOrder = (orderData) => {
  if (io) {
    io.to('admin-room').to('kitchen-room').emit('new-order', {
      type: 'new-order',
      order: orderData,
      timestamp: new Date().toISOString(),
      sound: 'notification.mp3'
    });
    console.log('📢 New order notification sent');
  }
};

// Emit order status update
const emitOrderStatusUpdate = (orderId, status, estimatedTime = null) => {
  if (io) {
    const updateData = {
      type: 'status-update',
      orderId,
      status,
      estimatedTime,
      timestamp: new Date().toISOString()
    };

    // Send to admin and kitchen
    io.to('admin-room').to('kitchen-room').emit('order-status-update', updateData);
    
    // Send to customer
    io.to(`customer-${orderId}`).emit('order-status-update', updateData);
    
    console.log(`📢 Order status update sent: ${orderId} -> ${status}`);
  }
};

// Emit order completion
const emitOrderCompleted = (orderId) => {
  if (io) {
    io.to('admin-room').to('kitchen-room').emit('order-completed', {
      type: 'order-completed',
      orderId,
      timestamp: new Date().toISOString(),
      sound: 'completion.mp3'
    });
    console.log(`📢 Order completed notification: ${orderId}`);
  }
};

// Emit order cancellation
const emitOrderCancelled = (orderId, reason) => {
  if (io) {
    io.to('admin-room').to('kitchen-room').emit('order-cancelled', {
      type: 'order-cancelled',
      orderId,
      reason,
      timestamp: new Date().toISOString()
    });
    console.log(`📢 Order cancelled notification: ${orderId}`);
  }
};

module.exports = {
  initializeSocket,
  emitNewOrder,
  emitOrderStatusUpdate,
  emitOrderCompleted,
  emitOrderCancelled
}; 