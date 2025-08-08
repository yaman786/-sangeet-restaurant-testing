import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Pages - Lazy loaded for better performance
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import QRMenuPage from './pages/QRMenuPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import QRCodeDisplayPage from './pages/QRCodeDisplayPage';
import ReservationsPage from './pages/ReservationsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import QRCartPage from './pages/QRCartPage';
import AdminDashboard from './pages/AdminDashboard';
import MenuManagementPage from './pages/MenuManagementPage';
import QRManagementPage from './pages/QRManagementPage';
import KitchenDisplayPage from './pages/KitchenDisplayPage';
import ReservationManagementPage from './pages/ReservationManagementPage';
import StaffManagementPage from './pages/StaffManagementPage';
import RestaurantWebsiteManagementPage from './pages/RestaurantWebsiteManagementPage';
import AnalyticsReportsPage from './pages/AnalyticsReportsPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// Services
import { fetchMenuItems, fetchReviews, fetchEvents } from './services/api';

// Constants
const ANIMATION_CONFIG = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

const CONTAINER_CLASSES = 'min-h-screen bg-sangeet-neutral-950 w-full overflow-x-hidden';

/**
 * ScrollToTop component - Scrolls to top on route change
 * @returns {null} - No visual output
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * LoadingSpinner component - Reusable loading state
 * @param {string} message - Loading message to display
 * @returns {JSX.Element} Loading spinner component
 */
function LoadingSpinner({ message = 'Loading Authentic Flavors...' }) {
  return (
    <div className="min-h-screen bg-sangeet-neutral-950 flex items-center justify-center">
      <div className="text-center">
        <div className="spinner mx-auto mb-4" />
        <p className="text-sangeet-400">{message}</p>
      </div>
    </div>
  );
}

/**
 * AnimatedRoute wrapper - Provides consistent page transitions
 * @param {React.ReactNode} children - Child components to animate
 * @returns {JSX.Element} Animated route wrapper
 */
function AnimatedRoute({ children }) {
  return (
    <motion.div {...ANIMATION_CONFIG}>
      {children}
    </motion.div>
  );
}

/**
 * Main App component - Handles routing and data loading
 * @returns {JSX.Element} Main application component
 */
function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();

  // Memoized route checks for performance
  const routeConfig = useMemo(() => ({
    isQRRoute: location.pathname.startsWith('/qr/'),
    isAdminRoute: location.pathname.startsWith('/admin/'),
    isKitchenRoute: location.pathname.startsWith('/kitchen/'),
    isLoginRoute: location.pathname === '/login'
  }), [location.pathname]);

  // Memoized data loading function
  const loadData = useCallback(async () => {
    try {
      setError(null);
      const [menuData, reviewsData, eventsData] = await Promise.all([
        fetchMenuItems(),
        fetchReviews(),
        fetchEvents()
      ]);
      
      setMenuItems(menuData);
      setReviews(reviewsData);
      setEvents(eventsData);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Show loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-sangeet-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={loadData}
            className="bg-sangeet-400 text-sangeet-neutral-950 px-4 py-2 rounded-lg hover:bg-sangeet-300 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // QR Ordering Experience (Standalone)
  if (routeConfig.isQRRoute) {
    return (
      <div className={CONTAINER_CLASSES}>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/qr/:qrCode"
              element={
                <AnimatedRoute>
                  <QRMenuPage />
                </AnimatedRoute>
              }
            />
            <Route
              path="/qr/:qrCode/cart"
              element={
                <AnimatedRoute>
                  <QRCartPage />
                </AnimatedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    );
  }

  // Kitchen Experience (Standalone)
  if (routeConfig.isKitchenRoute) {
    return (
      <div className={CONTAINER_CLASSES}>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/kitchen/login"
              element={
                <AnimatedRoute>
                  <LoginPage />
                </AnimatedRoute>
              }
            />
            <Route
              path="/kitchen/display"
              element={
                <ErrorBoundary>
                  <AnimatedRoute>
                    <KitchenDisplayPage />
                  </AnimatedRoute>
                </ErrorBoundary>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    );
  }

  // Login Experience (Standalone)
  if (routeConfig.isLoginRoute) {
    return (
      <div className={CONTAINER_CLASSES}>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/login"
              element={
                <AnimatedRoute>
                  <LoginPage />
                </AnimatedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    );
  }

  // Admin Dashboard Experience (Standalone)
  if (routeConfig.isAdminRoute) {
    return (
      <div className={CONTAINER_CLASSES}>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/admin/login"
              element={
                <AnimatedRoute>
                  <LoginPage />
                </AnimatedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <AnimatedRoute>
                  <AdminDashboard />
                </AnimatedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AnimatedRoute>
                  <AdminOrdersPage />
                </AnimatedRoute>
              }
            />
            <Route
              path="/admin/menu-management"
              element={
                <AnimatedRoute>
                  <MenuManagementPage />
                </AnimatedRoute>
              }
            />
            <Route
              path="/admin/qr-management"
              element={
                <AnimatedRoute>
                  <QRManagementPage />
                </AnimatedRoute>
              }
            />
            <Route
              path="/admin/reservations"
              element={
                <ErrorBoundary>
                  <AnimatedRoute>
                    <ReservationManagementPage />
                  </AnimatedRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/admin/staff-management"
              element={
                <ErrorBoundary>
                  <AnimatedRoute>
                    <StaffManagementPage />
                  </AnimatedRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/admin/website-management"
              element={
                <ErrorBoundary>
                  <AnimatedRoute>
                    <RestaurantWebsiteManagementPage />
                  </AnimatedRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ErrorBoundary>
                  <AnimatedRoute>
                    <AnalyticsReportsPage />
                  </AnimatedRoute>
                </ErrorBoundary>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    );
  }

  // Regular Website Experience (With Header/Footer)
  return (
    <div className={CONTAINER_CLASSES}>
      <ScrollToTop />
      <Header />
      
      <AnimatePresence mode="wait">
        <Routes>
          <Route 
            path="/" 
            element={
              <AnimatedRoute>
                <HomePage 
                  menuItems={menuItems}
                  reviews={reviews}
                  events={events}
                />
              </AnimatedRoute>
            } 
          />
          <Route 
            path="/menu" 
            element={
              <AnimatedRoute>
                <MenuPage />
              </AnimatedRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <AnimatedRoute>
                <AdminOrdersPage />
              </AnimatedRoute>
            } 
          />
          <Route 
            path="/qr-codes" 
            element={
              <AnimatedRoute>
                <QRCodeDisplayPage />
              </AnimatedRoute>
            } 
          />
          <Route 
            path="/reservations" 
            element={
              <AnimatedRoute>
                <ReservationsPage />
              </AnimatedRoute>
            } 
          />
          <Route 
            path="/about" 
            element={
              <AnimatedRoute>
                <AboutPage />
              </AnimatedRoute>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <AnimatedRoute>
                <ContactPage />
              </AnimatedRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <AnimatedRoute>
                <LoginPage />
              </AnimatedRoute>
            } 
          />
          <Route 
            path="*" 
            element={
              <AnimatedRoute>
                <NotFoundPage />
              </AnimatedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}

export default App; 