import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import OrderQueue from '../components/OrderQueue';
import { logout } from '../utils/auth';

const KitchenDisplayPage = () => {
  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    preparing: 0,
    ready: 0,
    completed: 0
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [kitchenUser, setKitchenUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'admin' or 'kitchen'
  const navigate = useNavigate();

  useEffect(() => {
    // Check if kitchen user or admin is logged in
    const kitchenToken = localStorage.getItem('kitchenToken');
    const adminToken = localStorage.getItem('adminToken');
    const kitchenUser = localStorage.getItem('kitchenUser');
    const adminUser = localStorage.getItem('adminUser');
    
    if (kitchenToken && kitchenUser) {
      try {
        setKitchenUser(JSON.parse(kitchenUser));
        setUserType('kitchen');
      } catch (error) {
        console.error('Error parsing kitchen user data:', error);
        navigate('/login');
      }
    } else if (adminToken && adminUser) {
      try {
        setKitchenUser(JSON.parse(adminUser));
        setUserType('admin');
      } catch (error) {
        console.error('Error parsing admin user data:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleStatsUpdate = (stats) => {
    setOrderStats(stats);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast.success(soundEnabled ? 'Sound disabled' : 'Sound enabled');
  };

  const handleLogoutOrBack = () => {
    if (userType === 'admin') {
      // Admin: Just go back to dashboard, do NOT clear session
      navigate('/admin/dashboard');
    } else {
      // Kitchen staff: Logout completely using universal logout
      logout(navigate);
    }
  };

  if (!kitchenUser) {
    return (
      <div className="min-h-screen bg-sangeet-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sangeet-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sangeet-neutral-950">
      {/* Kitchen Header */}
      <header className="bg-sangeet-neutral-900 border-b border-sangeet-neutral-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sangeet-400/20 rounded-lg flex items-center justify-center">
                <span className="text-lg">🍳</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-sangeet-neutral-100">
                  {userType === 'admin' ? 'Kitchen Display (Admin View)' : 'Kitchen Display (Staff)'}
                </h1>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-sangeet-neutral-400">
                    {kitchenUser.username}
                  </p>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                    userType === 'admin' 
                      ? 'bg-sangeet-400 text-sangeet-neutral-950' 
                      : 'bg-orange-400 text-white'
                  }`}>
                    {userType === 'admin' ? 'Admin' : 'Staff'}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {/* Connection Status */}
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="text-xs text-sangeet-neutral-400">
                  {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  soundEnabled 
                    ? 'bg-sangeet-400 text-sangeet-neutral-950' 
                    : 'bg-sangeet-neutral-700 text-sangeet-neutral-300'
                }`}
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>

              {/* Navigation based on user type */}
              {userType === 'admin' ? (
                <button
                  onClick={handleLogoutOrBack}
                  className="px-3 py-1.5 bg-sangeet-400 text-sangeet-neutral-950 rounded-md text-sm font-medium hover:bg-sangeet-300 transition-colors"
                >
                  ← Back to Dashboard
                </button>
              ) : (
                <button
                  onClick={handleLogoutOrBack}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Compact Stats Row - Kitchen Focused */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sangeet-neutral-900 rounded-lg p-3 border border-sangeet-neutral-700"
          >
            <h3 className="text-xs font-medium text-sangeet-neutral-400">Total</h3>
            <p className="text-xl font-bold text-sangeet-neutral-100">{orderStats.total}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-yellow-900/20 border-yellow-500/30 rounded-lg p-3 border"
          >
            <h3 className="text-xs font-medium text-yellow-400">Pending</h3>
            <p className="text-xl font-bold text-yellow-400">{orderStats.pending}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-900/20 border-blue-500/30 rounded-lg p-3 border"
          >
            <h3 className="text-xs font-medium text-blue-400">Confirmed</h3>
            <p className="text-xl font-bold text-blue-400">{orderStats.confirmed}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-orange-900/20 border-orange-500/30 rounded-lg p-3 border"
          >
            <h3 className="text-xs font-medium text-orange-400">Preparing</h3>
            <p className="text-xl font-bold text-orange-400">{orderStats.preparing}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-green-900/20 border-green-500/30 rounded-lg p-3 border"
          >
            <h3 className="text-xs font-medium text-green-400">Ready</h3>
            <p className="text-xl font-bold text-green-400">{orderStats.ready}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-900/20 border-gray-500/30 rounded-lg p-3 border"
          >
            <h3 className="text-xs font-medium text-gray-400">Completed</h3>
            <p className="text-xl font-bold text-gray-400">{orderStats.completed}</p>
          </motion.div>
        </div>

        {/* Order Queue - Kitchen Optimized */}
        <div className="bg-sangeet-neutral-900 rounded-lg border border-sangeet-neutral-700">
          <OrderQueue 
            onStatsUpdate={handleStatsUpdate}
            soundEnabled={soundEnabled}
            kitchenMode={true}
          />
        </div>
      </div>
    </div>
  );
};

export default KitchenDisplayPage; 