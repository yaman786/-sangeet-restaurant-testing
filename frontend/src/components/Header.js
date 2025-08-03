import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  // Check if restaurant is open (6 PM - 11 PM)
  const isOpen = currentTime.getHours() >= 18 && currentTime.getHours() < 23;

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/reservations', label: 'Reservations' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-sangeet-neutral-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-sangeet-neutral-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Hidden on mobile */}
          <Link to="/" className="hidden md:flex items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center"
            >
              <img 
                src={logo} 
                alt="Sangeet Restaurant" 
                className="h-12 w-auto logo-navbar-dark"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-sangeet-400 font-semibold'
                    : 'text-sangeet-neutral-300 hover:text-sangeet-400'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sangeet-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Open/Close Status - Desktop */}
            <div className="flex items-center space-x-2 bg-sangeet-neutral-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-sangeet-neutral-600/30">
              <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'} animate-pulse shadow-sm`}></div>
              <span className={`text-sm font-semibold ${isOpen ? 'text-green-400' : 'text-red-400'}`}>
                {isOpen ? 'OPEN' : 'CLOSED'}
              </span>
              <span className="text-xs text-sangeet-neutral-400">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>
          </nav>

          {/* Mobile menu button - Fork, Knife & Plate Icon - Centered */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden absolute left-1/2 transform -translate-x-1/2 top-2 p-3 rounded-xl text-sangeet-neutral-300 hover:text-sangeet-400 hover:bg-sangeet-neutral-800/50 focus:outline-none transition-all duration-300 touch-manipulation mx-2"
            aria-label="Toggle menu"
          >
            <div className="w-7 h-7 flex items-center justify-center relative">
              {/* Plate */}
              <motion.div
                animate={isMenuOpen ? { scale: 0.8, rotate: 15 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-5 h-5 border-2 border-white rounded-full relative"
              >
                {/* Plate inner circle */}
                <div className="absolute inset-1 border border-white rounded-full opacity-60"></div>
              </motion.div>
              
              {/* Fork */}
              <motion.div
                animate={isMenuOpen ? { x: -8, y: -8, rotate: -45, opacity: 0.7 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute left-0 top-0 w-0.5 h-4 bg-white rounded-full"
              >
                {/* Fork tines */}
                <div className="absolute -top-1 left-0 w-0.5 h-1 bg-white rounded-full"></div>
                <div className="absolute -top-1 left-1 w-0.5 h-1 bg-white rounded-full"></div>
                <div className="absolute -top-1 left-2 w-0.5 h-1 bg-white rounded-full"></div>
                <div className="absolute -top-1 left-3 w-0.5 h-1 bg-white rounded-full"></div>
              </motion.div>
              
              {/* Knife */}
              <motion.div
                animate={isMenuOpen ? { x: 8, y: -8, rotate: 45, opacity: 0.7 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute right-0 top-0 w-0.5 h-4 bg-white rounded-full"
              >
                {/* Knife blade */}
                <div className="absolute -top-1 right-0 w-2.5 h-0.5 bg-white rounded-full transform rotate-45 origin-left"></div>
              </motion.div>
              
              {/* X overlay when open */}
              <motion.div
                animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-5 h-0.5 bg-red-400 rounded-full rotate-45"></div>
                <div className="w-5 h-0.5 bg-red-400 rounded-full -rotate-45 absolute"></div>
              </motion.div>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-sangeet-neutral-800 bg-sangeet-neutral-900/95 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 touch-manipulation ${
                    isActive(item.path)
                      ? 'text-sangeet-400 bg-sangeet-neutral-800/50 font-semibold'
                      : 'text-sangeet-neutral-300 hover:text-sangeet-400 hover:bg-sangeet-neutral-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header; 