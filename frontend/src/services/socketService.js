import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
  }

  connect() {
    if (this.socket && this.isConnected) {
      return;
    }

    this.socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5001', {
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('🔌 Connected to WebSocket server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('🔌 Disconnected from WebSocket server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔌 WebSocket connection error:', error);
      this.isConnected = false;
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Join admin room for order notifications
  joinAdmin() {
    if (this.socket) {
      this.socket.emit('join-admin');
    }
  }

  // Join kitchen room for order notifications
  joinKitchen() {
    if (this.socket) {
      this.socket.emit('join-kitchen');
    }
  }

  // Join customer room for order tracking
  joinCustomer(orderId) {
    if (this.socket) {
      this.socket.emit('join-customer', orderId);
    }
  }

  // Listen for new orders
  onNewOrder(callback) {
    if (this.socket) {
      this.socket.on('new-order', callback);
      this.listeners.set('new-order', callback);
    }
  }

  // Listen for order status updates
  onOrderStatusUpdate(callback) {
    if (this.socket) {
      this.socket.on('order-status-update', callback);
      this.listeners.set('order-status-update', callback);
    }
  }

  // Listen for order completion
  onOrderCompleted(callback) {
    if (this.socket) {
      this.socket.on('order-completed', callback);
      this.listeners.set('order-completed', callback);
    }
  }

  // Listen for order cancellation
  onOrderCancelled(callback) {
    if (this.socket) {
      this.socket.on('order-cancelled', callback);
      this.listeners.set('order-cancelled', callback);
    }
  }

  // Remove specific listener
  removeListener(event) {
    if (this.socket && this.listeners.has(event)) {
      this.socket.off(event, this.listeners.get(event));
      this.listeners.delete(event);
    }
  }

  // Remove all listeners
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.listeners.clear();
    }
  }

  // Play notification sound using browser's built-in audio
  playNotificationSound(type = 'notification') {
    try {
      // Create or resume audio context for browser-based sound generation
      let audioContext = this.audioContext;
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audioContext = audioContext;
      }
      
      // Resume audio context if suspended (required by modern browsers)
      if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
          console.log('Audio context resumed successfully');
        }).catch(error => {
          console.log('Failed to resume audio context:', error);
        });
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different sounds for different notification types
      if (type === 'notification') {
        // High-pitched beep for new orders
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
      } else if (type === 'completion') {
        // Success sound for completed orders
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.2);
      }
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      
      console.log(`🔊 Played ${type} sound successfully`);
      
    } catch (error) {
      console.log('Could not play notification sound:', error);
      // Fallback: try to play a simple beep using the Web Audio API
      try {
        const audio = new Audio();
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
        audio.volume = 0.3;
        audio.play().catch(() => {
          console.log('Audio playback not supported');
        });
      } catch (fallbackError) {
        console.log('No audio support available');
      }
    }
  }

  // Show browser notification
  showBrowserNotification(title, body, icon = '/logo192.png') {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon,
        badge: '/logo192.png'
      });
    }
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService; 