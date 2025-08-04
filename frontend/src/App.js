import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ReservationsPage from './pages/ReservationsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Services
import { fetchMenuItems, fetchReviews, fetchEvents } from './services/api';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
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
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-sangeet-950 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
                        <p className="text-sangeet-400">Loading Authentic Flavors...</p>
        </div>
      </div>
    );
  }

  return (
            <div className="min-h-screen bg-sangeet-neutral-950">
      <ScrollToTop />
      <Header />
      
      <AnimatePresence mode="wait">
        <Routes>
          <Route 
            path="/" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <HomePage 
                  menuItems={menuItems}
                  reviews={reviews}
                  events={events}
                />
              </motion.div>
            } 
          />
          <Route 
            path="/menu" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MenuPage menuItems={menuItems} />
              </motion.div>
            } 
          />
          <Route 
            path="/reservations" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ReservationsPage />
              </motion.div>
            } 
          />
          <Route 
            path="/about" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AboutPage />
              </motion.div>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ContactPage />
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}

export default App; 