import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, Package, Timer } from 'lucide-react';
import socketService from '../services/socketService';
import { fetchAllOrders, updateOrderStatus } from '../services/api';
import toast from 'react-hot-toast';

const OrderQueue = ({ onStatsUpdate, soundEnabled = true, kitchenMode = false }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, preparing, ready, completed
  const [completedOrders, setCompletedOrders] = useState([]);

  const getStatusPriority = (status) => {
    const priorities = {
      'pending': 1,
      'confirmed': 2,
      'preparing': 3,
      'ready': 4,
      'completed': 5
    };
    return priorities[status] || 0;
  };

  const sortOrders = useCallback((ordersList) => {
    return ordersList.sort((a, b) => {
      // First sort by status priority
      const statusDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
      if (statusDiff !== 0) return statusDiff;
      
      // Then sort by creation time (newest first within same status)
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }, []);

  const loadOrders = useCallback(async () => {
    try {
      const response = await fetchAllOrders();
      
      // Separate completed orders from active orders
      const activeOrders = response.filter(order => order.status !== 'completed');
      const completedOrders = response.filter(order => order.status === 'completed');
      
      setOrders(sortOrders(activeOrders));
      setCompletedOrders(sortOrders(completedOrders));
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [sortOrders]);

  const setupSocketListeners = useCallback(() => {
    socketService.connect();
    socketService.joinKitchen();

    // Listen for new orders
    socketService.onNewOrder((data) => {
      setOrders(prev => {
        const newOrders = [data.order, ...prev];
        return sortOrders(newOrders);
      });
      if (soundEnabled) {
        socketService.playNotificationSound('notification');
      }
      toast.success(`New order from Table ${data.order.tableNumber}!`);
    });

    // Listen for status updates
    socketService.onOrderStatusUpdate((data) => {
      if (data.status === 'completed') {
        // Move to completed orders
        setOrders(prev => {
          const completedOrder = prev.find(order => order.id === data.orderId);
          if (completedOrder) {
            const updatedOrder = { ...completedOrder, status: data.status };
            setCompletedOrders(completedPrev => sortOrders([updatedOrder, ...completedPrev]));
            
            // Remove from active orders after 5 seconds
            setTimeout(() => {
              setOrders(currentPrev => currentPrev.filter(order => order.id !== data.orderId));
            }, 5000);
            
            toast.success(`Order #${data.orderId} completed! Will be removed in 5 seconds.`);
          }
          return sortOrders(prev);
        });
      } else {
        // Update status normally
        setOrders(prev => {
          const updatedOrders = prev.map(order => 
            order.id === data.orderId 
              ? { ...order, status: data.status }
              : order
          );
          return sortOrders(updatedOrders);
        });
        
        if (data.status === 'ready' && soundEnabled) {
          socketService.playNotificationSound('completion');
          toast.success(`Order #${data.orderId} is ready!`);
        }
      }
    });
  }, [soundEnabled, sortOrders]);

  useEffect(() => {
    loadOrders();
    setupSocketListeners();

    return () => {
      socketService.removeListener('new-order');
      socketService.removeListener('order-status-update');
    };
  }, [loadOrders, setupSocketListeners]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      
      if (newStatus === 'completed') {
        // Move to completed orders and remove from active queue after delay
        const completedOrder = orders.find(order => order.id === orderId);
        if (completedOrder) {
          // Update the order status first
          const updatedOrder = { ...completedOrder, status: newStatus };
          setCompletedOrders(prev => sortOrders([updatedOrder, ...prev]));
          
          // Remove from active orders after 5 seconds
          setTimeout(() => {
            setOrders(prev => prev.filter(order => order.id !== orderId));
          }, 5000);
          
          toast.success(`Order #${orderId} completed! Will be removed in 5 seconds.`);
        }
      } else {
        // Update status normally
        setOrders(prev => {
          const updatedOrders = prev.map(order => 
            order.id === orderId 
              ? { ...order, status: newStatus }
              : order
          );
          return sortOrders(updatedOrders);
        });
        toast.success(`Order #${orderId} status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'confirmed':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'preparing':
        return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'ready':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'completed':
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5" />;
      case 'confirmed':
        return <Package className="h-5 w-5" />;
      case 'preparing':
        return <Timer className="h-5 w-5" />;
      case 'ready':
        return <CheckCircle className="h-5 w-5" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const filteredOrders = filter === 'all' 
    ? sortOrders([...orders]) 
    : filter === 'completed' 
      ? sortOrders([...completedOrders])
      : sortOrders(orders.filter(order => order.status === filter));

  const clearCompletedOrders = () => {
    setCompletedOrders([]);
    toast.success('Completed orders cleared');
  };

  const calculateStats = useCallback(() => {
    const stats = {
      total: orders.length,
      pending: orders.filter(order => order.status === 'pending').length,
      confirmed: orders.filter(order => order.status === 'confirmed').length,
      preparing: orders.filter(order => order.status === 'preparing').length,
      ready: orders.filter(order => order.status === 'ready').length,
      completed: completedOrders.length
    };
    
    if (onStatsUpdate) {
      onStatsUpdate(stats);
    }
  }, [orders, completedOrders, onStatsUpdate]);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sangeet-400"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Compact Filter Tabs */}
      <div className="flex flex-wrap gap-1 mb-4">
        {['all', 'pending', 'preparing', 'ready', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === tab
                ? 'bg-sangeet-400 text-sangeet-neutral-950'
                : 'bg-sangeet-neutral-800 text-sangeet-neutral-300 hover:bg-sangeet-neutral-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'completed' && completedOrders.length > 0 && (
              <span className="ml-1 bg-sangeet-neutral-700 text-sangeet-neutral-300 px-1.5 py-0.5 rounded-full text-xs">
                {completedOrders.length}
              </span>
            )}
          </button>
        ))}
        
        {filter === 'completed' && completedOrders.length > 0 && (
          <button
            onClick={clearCompletedOrders}
            className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Orders Grid - Optimized for Kitchen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`bg-sangeet-neutral-800 rounded-lg p-4 border ${
                order.status === 'ready' 
                  ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20' 
                  : 'border-sangeet-neutral-700'
              } ${order.status === 'completed' ? 'opacity-60' : ''} flex flex-col h-full min-h-[320px]`}
            >
              {/* Order Header - Compact */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-base font-bold text-sangeet-neutral-100">
                    {order.status === 'ready' && <span className="text-green-400 mr-1">🍽️</span>}
                    #{order.order_number}
                  </h3>
                  <p className="text-xs text-sangeet-neutral-400">
                    Table {order.table_number} • {new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="font-medium">{order.status}</span>
                </div>
              </div>

              {/* Customer Info - Compact */}
              <div className="mb-3">
                <p className="text-sm text-sangeet-neutral-100 font-medium">{order.customer_name}</p>
                {order.special_instructions && (
                  <div className="mt-1 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs">
                    <p className="text-yellow-400">
                      <strong>Note:</strong> {order.special_instructions}
                    </p>
                  </div>
                )}
              </div>

              {/* Order Items - Compact */}
              <div className="mb-3 flex-grow">
                <h4 className="text-xs font-medium text-sangeet-neutral-400 mb-1">Items:</h4>
                <div className="space-y-1">
                  {order.items && order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs py-0.5">
                      <span className="text-sangeet-neutral-300">
                        {item.quantity}x {item.menu_item_name || item.name}
                      </span>
                      {item.special_instructions && (
                        <span className="text-orange-400">
                          ({item.special_instructions})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update Buttons - Compact */}
              {order.status !== 'completed' && (
                <div className="flex flex-wrap gap-1 mt-auto pt-3">
                  {kitchenMode ? (
                    // Kitchen Mode: Compact touch-friendly buttons
                    <>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors text-sm"
                        >
                          Accept Order
                        </button>
                      )}
                      {order.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'preparing')}
                          className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors text-sm"
                        >
                          Start Cooking
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'ready')}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors text-sm shadow-lg"
                        >
                          🍽️ Ready to Serve
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'completed')}
                          className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition-colors text-sm"
                        >
                          Mark Served
                        </button>
                      )}
                    </>
                  ) : (
                    // Admin Mode: Compact dropdown
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className="w-full px-2 py-1 bg-sangeet-neutral-700 border border-sangeet-neutral-600 rounded-md text-sangeet-neutral-100 focus:outline-none focus:ring-2 focus:ring-sangeet-400 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="completed">Completed</option>
                    </select>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sangeet-neutral-500 text-lg">
            {filter === 'completed' ? 'No completed orders' : 'No orders found'}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderQueue; 