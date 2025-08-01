import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-sangeet-neutral-950 via-sangeet-neutral-900 to-sangeet-neutral-950 border-t border-sangeet-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Restaurant Info */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <div className="relative">
                  {/* Logo with enhanced visibility */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-sangeet-400/20 to-sangeet-red-500/20 rounded-full blur-xl"></div>
                    <img 
                      src={logo} 
                      alt="Sangeet Restaurant" 
                      className="relative h-16 w-auto mr-4 filter brightness-110 contrast-110"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sangeet-neutral-400 text-sm">
                      Authentic South Asian Cuisine
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-sangeet-neutral-300 mb-6 max-w-md leading-relaxed">
                Where the soul of South Asia comes alive in the heart of Wanchai. 
                Experience the rich flavors and warm hospitality that make every meal memorable.
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="bg-gradient-to-r from-sangeet-400/10 to-sangeet-red-500/10 p-3 rounded-full border border-sangeet-400/20 text-sangeet-400 hover:text-sangeet-300 hover:border-sangeet-400/40 transition-all duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="bg-gradient-to-r from-sangeet-400/10 to-sangeet-red-500/10 p-3 rounded-full border border-sangeet-400/20 text-sangeet-400 hover:text-sangeet-300 hover:border-sangeet-400/40 transition-all duration-300"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="bg-gradient-to-r from-sangeet-400/10 to-sangeet-red-500/10 p-3 rounded-full border border-sangeet-400/20 text-sangeet-400 hover:text-sangeet-300 hover:border-sangeet-400/40 transition-all duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-xl font-bold text-sangeet-400 mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/menu" className="text-sangeet-neutral-300 hover:text-sangeet-400 transition-colors duration-300 flex items-center group">
                    <span className="mr-2 text-sangeet-400 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    Our Menu
                  </Link>
                </li>
                <li>
                  <Link to="/reservations" className="text-sangeet-neutral-300 hover:text-sangeet-400 transition-colors duration-300 flex items-center group">
                    <span className="mr-2 text-sangeet-400 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    Make Reservation
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sangeet-neutral-300 hover:text-sangeet-400 transition-colors duration-300 flex items-center group">
                    <span className="mr-2 text-sangeet-400 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sangeet-neutral-300 hover:text-sangeet-400 transition-colors duration-300 flex items-center group">
                    <span className="mr-2 text-sangeet-400 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xl font-bold text-sangeet-400 mb-6">Contact Info</h4>
              <div className="space-y-4 text-sangeet-neutral-300">
                <div className="flex items-start space-x-3">
                  <span className="text-sangeet-400 text-lg">📍</span>
                  <p>Wanchai, Hong Kong</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-sangeet-400 text-lg">📞</span>
                  <p>+852 2345 6789</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-sangeet-400 text-lg">✉️</span>
                  <p>info@sangeethk.com</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-sangeet-400 text-lg">🕒</span>
                  <div>
                    <p>Mon-Sun, 6 PM - 11 PM</p>
                    <p className="text-sm text-sangeet-neutral-500">Lunch Buffet: 12 PM - 3 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-sangeet-neutral-800 mt-12 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sangeet-neutral-400 mb-4 md:mb-0">
              © {currentYear} Sangeet Restaurant. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-sangeet-neutral-500">
              <Link to="/privacy" className="hover:text-sangeet-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-sangeet-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 