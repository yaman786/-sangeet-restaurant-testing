import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  fetchOrderStats, 
  updateOrderStatus, 
  deleteOrder, 
  bulkUpdateOrderStatus,
  searchOrders,
  fetchTables
} from '../services/api';
import toast from 'react-hot-toast';
import AdminHeader from '../components/AdminHeader';

const AdminOrdersPage = () => {
  // const navigate = useNavigate(); // TODO: Implement navigation
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    table_id: '',
    date_from: '',
    date_to: '',
    query: ''
  });
  const [tables, setTables] = useState([]);
  const [viewMode, setViewMode] = useState('all'); // all, pending, preparing, ready

  useEffect(() => {
    loadDashboardData();
  }, [filters, viewMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load orders based on filters and view mode
      let searchParams = { ...filters };
      if (viewMode !== 'all') {
        searchParams.status = viewMode;
      }
      
      const [ordersData, statsData, tablesData] = await Promise.all([
        searchOrders(searchParams),
        fetchOrderStats(),
        fetchTables()
      ]);
      
      setOrders(ordersData);
      setStats(statsData);
      setTables(tablesData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success('Order status updated successfully');
      loadDashboardData(); // Reload data
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      await deleteOrder(orderId);
      toast.success('Order deleted successfully');
      loadDashboardData(); // Reload data
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  const handleBulkStatusUpdate = async (status) => {
    if (selectedOrders.length === 0) {
      toast.error('Please select orders to update');
      return;
    }

    try {
      await bulkUpdateOrderStatus(selectedOrders, status);
      toast.success(`${selectedOrders.length} orders updated successfully`);
      setSelectedOrders([]);
      loadDashboardData(); // Reload data
    } catch (error) {
      toast.error('Failed to bulk update orders');
    }
  };

  const handleOrderSelection = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(order => order.id));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-blue-500',
      preparing: 'bg-orange-500',
      ready: 'bg-green-500',
      completed: 'bg-gray-500',
      cancelled: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sangeet-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-sangeet-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sangeet-neutral-950">
      <AdminHeader />

      <div className="max-w-7xl mx-auto p-6">
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-xl p-6 border border-sangeet-neutral-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sangeet-neutral-400 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-sangeet-400">{stats.total_orders || 0}</p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-xl p-6 border border-sangeet-neutral-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sangeet-neutral-400 text-sm">Pending Orders</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.pending_orders || 0}</p>
                </div>
                <div className="text-3xl">⏳</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-xl p-6 border border-sangeet-neutral-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sangeet-neutral-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-400">${(parseFloat(stats.total_revenue) || 0).toFixed(2)}</p>
                </div>
                <div className="text-3xl">💰</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-xl p-6 border border-sangeet-neutral-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sangeet-neutral-400 text-sm">Avg Order Value</p>
                  <p className="text-2xl font-bold text-sangeet-400">${(parseFloat(stats.average_order_value) || 0).toFixed(2)}</p>
                </div>
                <div className="text-3xl">📈</div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Filters and Controls */}
        <div className="bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-xl p-6 mb-6 border border-sangeet-neutral-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* View Mode Tabs */}
            <div className="lg:col-span-3">
              <div className="flex space-x-2">
                {['all', 'pending', 'preparing', 'ready'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === mode
                        ? 'bg-sangeet-400 text-sangeet-neutral-950'
                        : 'bg-sangeet-neutral-800 text-sangeet-neutral-400 hover:bg-sangeet-neutral-700'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="Search by customer name or order number..."
                value={filters.query}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                className="w-full px-4 py-2 bg-sangeet-neutral-800 border border-sangeet-neutral-700 rounded-lg text-sangeet-neutral-300 focus:outline-none focus:border-sangeet-400"
              />
            </div>

            {/* Table Filter */}
            <div>
              <select
                value={filters.table_id}
                onChange={(e) => setFilters(prev => ({ ...prev, table_id: e.target.value }))}
                className="w-full px-4 py-2 bg-sangeet-neutral-800 border border-sangeet-neutral-700 rounded-lg text-sangeet-neutral-300 focus:outline-none focus:border-sangeet-400"
              >
                <option value="">All Tables</option>
                {tables.map(table => (
                  <option key={table.id} value={table.id}>Table {table.table_number}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sangeet-neutral-400 text-sm mb-2">From Date</label>
              <input
                type="date"
                value={filters.date_from}
                onChange={(e) => setFilters(prev => ({ ...prev, date_from: e.target.value }))}
                className="w-full px-4 py-2 bg-sangeet-neutral-800 border border-sangeet-neutral-700 rounded-lg text-sangeet-neutral-300 focus:outline-none focus:border-sangeet-400"
              />
            </div>
            <div>
              <label className="block text-sangeet-neutral-400 text-sm mb-2">To Date</label>
              <input
                type="date"
                value={filters.date_to}
                onChange={(e) => setFilters(prev => ({ ...prev, date_to: e.target.value }))}
                className="w-full px-4 py-2 bg-sangeet-neutral-800 border border-sangeet-neutral-700 rounded-lg text-sangeet-neutral-300 focus:outline-none focus:border-sangeet-400"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({ status: '', table_id: '', date_from: '', date_to: '', query: '' })}
                className="w-full px-4 py-2 bg-sangeet-neutral-700 text-sangeet-neutral-300 rounded-lg hover:bg-sangeet-neutral-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-xl p-4 mb-6 border border-sangeet-neutral-700">
            <div className="flex items-center justify-between">
              <p className="text-sangeet-neutral-400">
                {selectedOrders.length} order(s) selected
              </p>
              <div className="flex space-x-2">
                {['confirmed', 'preparing', 'ready', 'completed', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleBulkStatusUpdate(status)}
                    className="px-3 py-1 bg-sangeet-400 text-sangeet-neutral-950 rounded text-sm font-medium hover:bg-sangeet-300 transition-colors"
                  >
                    Mark {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-xl border border-sangeet-neutral-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sangeet-neutral-800">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === orders.length && orders.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-sangeet-neutral-600 bg-sangeet-neutral-800 text-sangeet-400 focus:ring-sangeet-400"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sangeet-neutral-400 font-medium">Order #</th>
                  <th className="px-6 py-4 text-left text-sangeet-neutral-400 font-medium">Customer</th>
                  <th className="px-6 py-4 text-left text-sangeet-neutral-400 font-medium">Table</th>
                  <th className="px-6 py-4 text-left text-sangeet-neutral-400 font-medium">Amount</th>
                  <th className="px-6 py-4 text-left text-sangeet-neutral-400 font-medium">Status</th>
                  <th className="px-6 py-4 text-left text-sangeet-neutral-400 font-medium">Date</th>
                  <th className="px-6 py-4 text-left text-sangeet-neutral-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sangeet-neutral-700">
                {orders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-sangeet-neutral-800 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleOrderSelection(order.id)}
                        className="rounded border-sangeet-neutral-600 bg-sangeet-neutral-800 text-sangeet-400 focus:ring-sangeet-400"
                      />
                    </td>
                    <td className="px-6 py-4 text-sangeet-400 font-medium">{order.order_number}</td>
                    <td className="px-6 py-4 text-sangeet-neutral-300">{order.customer_name}</td>
                    <td className="px-6 py-4 text-sangeet-neutral-300">Table {order.table_number}</td>
                    <td className="px-6 py-4 text-sangeet-400 font-medium">${order.total_amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sangeet-neutral-400 text-sm">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className="px-2 py-1 bg-sangeet-neutral-800 border border-sangeet-neutral-700 rounded text-xs text-sangeet-neutral-300 focus:outline-none focus:border-sangeet-400"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sangeet-neutral-400">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage; 