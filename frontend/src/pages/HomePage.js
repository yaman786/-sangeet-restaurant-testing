import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import logo from '../assets/images/logo.png';

const HomePage = ({ menuItems, reviews, events }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileCurrentSlide, setMobileCurrentSlide] = useState(0);

  const navigateCarousel = (direction) => {
    setCurrentSlide((prev) => {
      const newSlide = prev + direction;
      if (newSlide < 0) return 2;
      if (newSlide > 2) return 0;
      return newSlide;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const navigateMobileCarousel = (direction) => {
    setMobileCurrentSlide((prev) => {
      const newSlide = prev + direction;
      if (newSlide < 0) return 2;
      if (newSlide > 2) return 0;
      return newSlide;
    });
  };

  const goToMobileSlide = (index) => {
    setMobileCurrentSlide(index);
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
      setMobileCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const popularItems = menuItems.filter(item => item.is_popular).slice(0, 6);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isOpen = currentTime.getHours() >= 18 && currentTime.getHours() < 23;

      return (
      <div className="min-h-screen">
        {/* Quick Actions Bar - Desktop */}
        <div className="hidden md:block fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center space-x-4 bg-sangeet-neutral-900/95 backdrop-blur-md rounded-full px-6 py-3 border border-sangeet-neutral-700 shadow-2xl"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 px-4 py-2 rounded-full font-semibold hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-lg"
            >
              <span>📅</span>
              <span>Book Table</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-sangeet-neutral-800 text-sangeet-400 px-4 py-2 rounded-full font-semibold hover:bg-sangeet-neutral-700 transition-all duration-300 border border-sangeet-neutral-600"
            >
              <span>📋</span>
              <span>View Menu</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-sangeet-neutral-800 text-sangeet-400 px-4 py-2 rounded-full font-semibold hover:bg-sangeet-neutral-700 transition-all duration-300 border border-sangeet-neutral-600"
            >
              <span>📞</span>
              <span>Call Now</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-sangeet-neutral-800 text-sangeet-400 px-4 py-2 rounded-full font-semibold hover:bg-sangeet-neutral-700 transition-all duration-300 border border-sangeet-neutral-600"
            >
              <span>📍</span>
              <span>Directions</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Quick Actions Bar - Mobile */}
        <div className="md:hidden fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-between items-center bg-sangeet-neutral-900/95 backdrop-blur-md rounded-2xl px-4 py-3 border border-sangeet-neutral-700 shadow-2xl"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center space-y-1 bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 px-3 py-2 rounded-xl font-semibold hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-lg touch-manipulation"
            >
              <span className="text-lg">📅</span>
              <span className="text-xs">Book</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center space-y-1 bg-sangeet-neutral-800 text-sangeet-400 px-3 py-2 rounded-xl font-semibold hover:bg-sangeet-neutral-700 transition-all duration-300 border border-sangeet-neutral-600 touch-manipulation"
            >
              <span className="text-lg">📋</span>
              <span className="text-xs">Menu</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center space-y-1 bg-sangeet-neutral-800 text-sangeet-400 px-3 py-2 rounded-xl font-semibold hover:bg-sangeet-neutral-700 transition-all duration-300 border border-sangeet-neutral-600 touch-manipulation"
            >
              <span className="text-lg">📞</span>
              <span className="text-xs">Call</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center space-y-1 bg-sangeet-neutral-800 text-sangeet-400 px-3 py-2 rounded-xl font-semibold hover:bg-sangeet-neutral-700 transition-all duration-300 border border-sangeet-neutral-600 touch-manipulation"
            >
              <span className="text-lg">📍</span>
              <span className="text-xs">Map</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Video Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sangeet-neutral-900/80 via-sangeet-neutral-800/70 to-sangeet-neutral-900/80 z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop"
        >
          <source src="https://player.vimeo.com/external/3282749.sd.mp4?s=190f90cd1c40c9d9f7ba5be859b5c45f4a9b5c5d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop" 
            alt="Restaurant Ambiance" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-sangeet-400/10 rounded-full blur-xl z-5"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-sangeet-red-500/10 rounded-full blur-xl z-5"
        />

        {/* Mobile-Optimized Status Bar */}
        <motion.div
          style={{ opacity }}
          className="absolute top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-30 w-full px-4"
        >
          <div className="flex items-center justify-center space-x-2 md:space-x-4 bg-sangeet-neutral-900/90 backdrop-blur-md rounded-full px-4 md:px-6 py-2 md:py-3 border border-sangeet-neutral-700 max-w-sm mx-auto">
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className={`w-2 md:w-3 h-2 md:h-3 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span className="text-xs md:text-sm text-sangeet-neutral-300">
                {isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
            <div className="text-xs md:text-sm text-sangeet-neutral-400">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </div>
            <div className="text-xs md:text-sm text-sangeet-neutral-400 hidden sm:block">
              📍 Wanchai
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          style={{ y, opacity }}
          className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-sangeet-400/20 to-sangeet-red-500/20 rounded-full blur-2xl animate-pulse"></div>
              <img 
                src={logo} 
                alt="Sangeet Restaurant" 
                className="relative h-28 md:h-36 w-auto logo-image-hero"
              />
            </div>
          </motion.div>

          {/* Mobile-Optimized Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 px-4"
          >
            <span className="text-white">Experience</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sangeet-400 to-sangeet-red-500">
              South Asian Elegance
            </span>
          </motion.h1>

          {/* Mobile-Optimized Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4"
          >
            Immerse yourself in the authentic flavors and warm hospitality of South Asia. 
            <span className="text-sangeet-400 font-semibold"> Every moment is a celebration of tradition and taste.</span>
          </motion.p>

          {/* Mobile-Optimized Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center space-x-4 md:space-x-8 mb-6 md:mb-8 text-sangeet-neutral-300 px-4"
          >
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-sangeet-400">150+</div>
              <div className="text-xs md:text-sm">Seats</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-sangeet-400">5,300</div>
              <div className="text-xs md:text-sm">Sq Ft</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-sangeet-400">4.8★</div>
              <div className="text-xs md:text-sm">Rating</div>
            </div>
          </motion.div>

          {/* Quick Stats Bar - Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="hidden md:block max-w-4xl mx-auto mb-8"
          >
            <div className="bg-sangeet-neutral-900/50 backdrop-blur-md rounded-2xl p-6 border border-sangeet-neutral-700">
              <div className="grid grid-cols-4 gap-6">
                {[
                  { icon: "⏰", label: "Wait Time", value: "15 min", color: "text-green-400" },
                  { icon: "👥", label: "Capacity", value: "85%", color: "text-yellow-400" },
                  { icon: "🔥", label: "Today's Special", value: "Butter Chicken", color: "text-sangeet-400" },
                  { icon: "🌤️", label: "Perfect For", value: "Indoor Dining", color: "text-blue-400" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                    className="text-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className={`text-xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sangeet-neutral-400 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>



          {/* Special Offer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sangeet-red-500/20 to-sangeet-400/20 backdrop-blur-md border border-sangeet-red-500/30 rounded-full px-6 py-3">
              <span className="text-2xl">🎉</span>
              <span className="text-sangeet-400 font-semibold">Lunch Buffet Available Daily</span>
              <span className="text-sangeet-neutral-400 text-sm">12 PM - 3 PM</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center space-y-2 text-sangeet-neutral-400">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-sangeet-neutral-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-sangeet-neutral-400 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Today's Specials Section - Desktop */}
      <section className="hidden md:block py-16 bg-gradient-to-br from-sangeet-neutral-950 via-sangeet-neutral-900 to-sangeet-neutral-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sangeet-red-500/20 to-sangeet-400/20 backdrop-blur-md border border-sangeet-red-500/30 rounded-full px-6 py-2 mb-4">
              <span className="text-2xl">🔥</span>
              <span className="text-sangeet-400 font-semibold">Today's Specials</span>
              <span className="text-sangeet-neutral-400 text-sm">Limited Time</span>
            </div>
            <h2 className="text-4xl font-bold text-sangeet-400 mb-4">Chef's Daily Recommendations</h2>
            <p className="text-sangeet-neutral-400 text-lg max-w-3xl mx-auto">
              Discover today's carefully curated dishes, featuring seasonal ingredients and authentic flavors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Butter Chicken",
                description: "Creamy tomato-based curry with tender chicken",
                price: "$18.99",
                originalPrice: "$24.99",
                image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
                badge: "Chef's Pick",
                timeLeft: "4 hours left"
              },
              {
                name: "Biryani Special",
                description: "Aromatic rice with tender lamb and spices",
                price: "$22.99",
                originalPrice: "$28.99",
                image: "https://images.unsplash.com/photo-1563379091339-03246963d8a9?w=800&h=600&fit=crop",
                badge: "Most Popular",
                timeLeft: "2 hours left"
              },
              {
                name: "Masala Dosa",
                description: "Crispy crepe with spiced potato filling",
                price: "$12.99",
                originalPrice: "$16.99",
                image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=600&fit=crop",
                badge: "Breakfast Special",
                timeLeft: "6 hours left"
              }
            ].map((special, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-sangeet-400/20 transition-all duration-500 border border-sangeet-neutral-700 hover:border-sangeet-400"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={special.image}
                    alt={special.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/50 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-sangeet-red-500 to-sangeet-400 text-white px-3 py-1 rounded-full font-bold text-sm">
                      {special.badge}
                    </div>
                  </div>
                  
                  {/* Time Left */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-sangeet-neutral-900/90 backdrop-blur-sm text-sangeet-400 px-3 py-1 rounded-full font-semibold text-sm">
                      {special.timeLeft}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="absolute bottom-4 right-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-sangeet-400">{special.price}</div>
                      <div className="text-sm text-sangeet-neutral-400 line-through">{special.originalPrice}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-sangeet-400 mb-2 group-hover:text-sangeet-300 transition-colors">
                    {special.name}
                  </h3>
                  <p className="text-sangeet-neutral-400 mb-4">{special.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 py-3 rounded-xl font-semibold hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-lg hover:shadow-sangeet-400/25"
                  >
                    Order Now - Save ${parseInt(special.originalPrice.slice(1)) - parseInt(special.price.slice(1))}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Specials Section - Mobile */}
      <section className="md:hidden py-12 bg-gradient-to-br from-sangeet-neutral-950 via-sangeet-neutral-900 to-sangeet-neutral-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sangeet-red-500/20 to-sangeet-400/20 backdrop-blur-md border border-sangeet-red-500/30 rounded-full px-4 py-2 mb-3">
              <span className="text-xl">🔥</span>
              <span className="text-sangeet-400 font-semibold text-sm">Today's Specials</span>
            </div>
            <h2 className="text-2xl font-bold text-sangeet-400 mb-2">Chef's Daily Picks</h2>
            <p className="text-sangeet-neutral-400 text-base">
              Limited time offers with authentic flavors
            </p>
          </motion.div>

          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {[
              {
                name: "Butter Chicken",
                description: "Creamy tomato-based curry with tender chicken",
                price: "$18.99",
                originalPrice: "$24.99",
                image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
                badge: "Chef's Pick",
                timeLeft: "4h left"
              },
              {
                name: "Biryani Special",
                description: "Aromatic rice with tender lamb and spices",
                price: "$22.99",
                originalPrice: "$28.99",
                image: "https://images.unsplash.com/photo-1563379091339-03246963d8a9?w=800&h=600&fit=crop",
                badge: "Popular",
                timeLeft: "2h left"
              },
              {
                name: "Masala Dosa",
                description: "Crispy crepe with spiced potato filling",
                price: "$12.99",
                originalPrice: "$16.99",
                image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=600&fit=crop",
                badge: "Breakfast",
                timeLeft: "6h left"
              }
            ].map((special, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-80 group bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-sangeet-400/20 transition-all duration-500 border border-sangeet-neutral-700 hover:border-sangeet-400"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={special.image}
                    alt={special.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/50 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-gradient-to-r from-sangeet-red-500 to-sangeet-400 text-white px-2 py-1 rounded-full font-bold text-xs">
                      {special.badge}
                    </div>
                  </div>
                  
                  {/* Time Left */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-sangeet-neutral-900/90 backdrop-blur-sm text-sangeet-400 px-2 py-1 rounded-full font-semibold text-xs">
                      {special.timeLeft}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="absolute bottom-3 right-3">
                    <div className="text-right">
                      <div className="text-xl font-bold text-sangeet-400">{special.price}</div>
                      <div className="text-xs text-sangeet-neutral-400 line-through">{special.originalPrice}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-sangeet-400 mb-2 group-hover:text-sangeet-300 transition-colors">
                    {special.name}
                  </h3>
                  <p className="text-sm text-sangeet-neutral-400 mb-3">{special.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 py-2 rounded-xl font-semibold hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-lg hover:shadow-sangeet-400/25 touch-manipulation"
                  >
                    Order Now - Save ${parseInt(special.originalPrice.slice(1)) - parseInt(special.price.slice(1))}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Simplified Ambience Section */}
      <section className="py-20 bg-gradient-to-br from-sangeet-neutral-950 via-sangeet-neutral-900 to-sangeet-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sangeet-400/20 to-sangeet-red-500/20 backdrop-blur-md border border-sangeet-400/30 rounded-full px-6 py-2 mb-4">
              <span className="text-2xl">✨</span>
              <span className="text-sangeet-400 font-semibold">Our Atmosphere</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-sangeet-400 mb-4">Where Tradition Meets Elegance</h2>
            <p className="text-sangeet-neutral-400 text-lg max-w-3xl mx-auto">
              Experience the perfect blend of authentic South Asian hospitality and modern dining sophistication
            </p>
          </motion.div>

          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Dining Areas Carousel */}
            <div className="relative">
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-3xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {[
                    {
                      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
                      title: "Main Dining Hall",
                      subtitle: "Elegant & Spacious",
                      description: "Our grand dining hall accommodates 150+ guests with sophisticated decor, perfect for family gatherings and celebrations",
                      capacity: "150+ Seats",
                      bestFor: "Family Gatherings, Celebrations",
                      features: ["Sophisticated Decor", "Warm Lighting", "Group Seating"]
                    },
                    {
                      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=800&fit=crop",
                      title: "Bar & Lounge",
                      subtitle: "Modern & Casual",
                      description: "Contemporary bar area with craft cocktails and casual dining, perfect for pre-dinner drinks or light meals",
                      capacity: "40 Seats",
                      bestFor: "Drinks & Appetizers, Casual Dining",
                      features: ["Craft Cocktails", "Casual Seating", "Bar Service"]
                    },
                    {
                      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop",
                      title: "Private Dining Room",
                      subtitle: "Exclusive & Intimate",
                      description: "Exclusive private dining space for intimate gatherings, business meetings, and special occasions",
                      capacity: "20 Seats",
                      bestFor: "Business Meetings, Special Occasions",
                      features: ["Private Service", "Customized Menu", "Intimate Setting"]
                    }
                  ].map((area, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="relative h-[500px] group">
                        <img
                          src={area.image}
                          alt={area.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/70 via-sangeet-neutral-900/20 to-transparent"></div>
                        
                        {/* Content Overlay */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-sangeet-neutral-900/90 backdrop-blur-md rounded-2xl p-6 border border-sangeet-neutral-700">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-sangeet-400 font-bold text-xl mb-1">{area.title}</h4>
                                <p className="text-sangeet-red-400 font-semibold text-sm">{area.subtitle}</p>
                              </div>
                              <div className="text-right">
                                <div className="bg-sangeet-400/20 text-sangeet-400 px-3 py-1 rounded-full text-sm font-semibold">
                                  {area.capacity}
                                </div>
                              </div>
                            </div>
                            <p className="text-sangeet-neutral-300 text-sm mb-3">{area.description}</p>
                            <div className="text-sangeet-neutral-400 text-xs">
                              <span className="font-semibold">Best for:</span> {area.bestFor}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => navigateCarousel(-1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-sangeet-neutral-900/80 backdrop-blur-md text-sangeet-400 p-3 rounded-full hover:bg-sangeet-neutral-800 transition-all duration-300 z-10"
                aria-label="Previous dining area"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => navigateCarousel(1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-sangeet-neutral-900/80 backdrop-blur-md text-sangeet-400 p-3 rounded-full hover:bg-sangeet-neutral-800 transition-all duration-300 z-10"
                aria-label="Next dining area"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-sangeet-400' : 'bg-sangeet-neutral-600 hover:bg-sangeet-neutral-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Key Atmosphere Highlights */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-sangeet-400 mb-6">Atmosphere Highlights</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: "🕯️",
                    title: "Warm & Intimate Lighting",
                    description: "Thoughtfully designed lighting creates the perfect ambiance for romantic dinners and family celebrations"
                  },
                  {
                    icon: "🎼",
                    title: "Curated South Asian Melodies",
                    description: "Authentic music selection that enhances your dining experience with cultural richness"
                  },
                  {
                    icon: "🌿",
                    title: "Authentic Cultural Elements",
                    description: "Traditional decor and natural elements that transport you to the heart of South Asia"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-6 bg-sangeet-neutral-800/50 backdrop-blur-md rounded-2xl border border-sangeet-neutral-700 hover:border-sangeet-400/50 transition-all duration-300 group"
                  >
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                    <div>
                      <h4 className="text-sangeet-400 font-bold text-lg mb-2">{feature.title}</h4>
                      <p className="text-sangeet-neutral-300 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            {/* Mobile Dining Areas Carousel */}
            <div className="relative">
              {/* Mobile Carousel Container */}
              <div className="relative overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${mobileCurrentSlide * 100}%)` }}
                >
                  {[
                    {
                      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
                      title: "Main Dining Hall",
                      subtitle: "Elegant & Spacious",
                      description: "Grand dining hall with 150+ seats, perfect for family gatherings",
                      capacity: "150+ Seats"
                    },
                    {
                      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
                      title: "Bar & Lounge",
                      subtitle: "Modern & Casual",
                      description: "Contemporary bar with craft cocktails and casual dining",
                      capacity: "40 Seats"
                    },
                    {
                      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
                      title: "Private Dining Room",
                      subtitle: "Exclusive & Intimate",
                      description: "Private space for intimate gatherings and special occasions",
                      capacity: "20 Seats"
                    }
                  ].map((area, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="relative h-64 group">
                        <img
                          src={area.image}
                          alt={area.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/70 via-sangeet-neutral-900/20 to-transparent"></div>
                        
                        {/* Mobile Content Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-sangeet-neutral-900/90 backdrop-blur-md rounded-xl p-4 border border-sangeet-neutral-700">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-sangeet-400 font-bold text-lg mb-1">{area.title}</h4>
                                <p className="text-sangeet-red-400 font-semibold text-xs">{area.subtitle}</p>
                              </div>
                              <div className="text-right">
                                <div className="bg-sangeet-400/20 text-sangeet-400 px-2 py-1 rounded-full text-xs font-semibold">
                                  {area.capacity}
                                </div>
                              </div>
                            </div>
                            <p className="text-sangeet-neutral-300 text-xs">{area.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Navigation Arrows */}
              <button
                onClick={() => navigateMobileCarousel(-1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-sangeet-neutral-900/80 backdrop-blur-md text-sangeet-400 p-2 rounded-full hover:bg-sangeet-neutral-800 transition-all duration-300 z-10 touch-manipulation"
                aria-label="Previous dining area"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => navigateMobileCarousel(1)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-sangeet-neutral-900/80 backdrop-blur-md text-sangeet-400 p-2 rounded-full hover:bg-sangeet-neutral-800 transition-all duration-300 z-10 touch-manipulation"
                aria-label="Next dining area"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Mobile Dots Indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => goToMobileSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === mobileCurrentSlide ? 'bg-sangeet-400' : 'bg-sangeet-neutral-600 hover:bg-sangeet-neutral-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Atmosphere Highlights - Mobile */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-sangeet-400 text-center">Atmosphere Highlights</h3>
              {[
                {
                  icon: "🕯️",
                  title: "Warm & Intimate Lighting",
                  description: "Perfect ambiance for romantic dinners and celebrations"
                },
                {
                  icon: "🎼",
                  title: "Curated South Asian Melodies",
                  description: "Authentic music that enhances your dining experience"
                },
                {
                  icon: "🌿",
                  title: "Authentic Cultural Elements",
                  description: "Traditional decor that transports you to South Asia"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-sangeet-neutral-800/50 backdrop-blur-md rounded-xl border border-sangeet-neutral-700"
                >
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h4 className="text-sangeet-400 font-bold text-base mb-1">{feature.title}</h4>
                    <p className="text-sangeet-neutral-300 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Conversion-Focused CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/reservations"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 px-8 py-4 rounded-2xl font-bold text-lg hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-2xl hover:shadow-sangeet-400/30"
            >
              <span>📅</span>
              <span>Book Your Table</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>



      {/* Social Proof Section - Desktop */}
      <section className="hidden md:block py-20 bg-gradient-to-br from-sangeet-neutral-900 via-sangeet-neutral-800 to-sangeet-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-sangeet-400 mb-4">What Our Customers Love</h2>
            <p className="text-sangeet-neutral-400 text-lg max-w-3xl mx-auto">
              Join thousands of satisfied customers who have experienced authentic South Asian cuisine
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {reviews.slice(0, 3).map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-sangeet-neutral-950 to-sangeet-neutral-900 p-8 rounded-2xl border border-sangeet-neutral-700 hover:border-sangeet-400 transition-all duration-300 shadow-2xl"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={review.image_url}
                    alt={review.customer_name}
                    className="w-16 h-16 rounded-full mr-4 border-2 border-sangeet-400"
                  />
                  <div>
                    <h4 className="text-sangeet-400 font-bold text-lg">{review.customer_name}</h4>
                    <div className="flex text-yellow-400 text-lg">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="text-sangeet-neutral-500 text-sm">Verified Customer</p>
                  </div>
                </div>
                <p className="text-sangeet-neutral-300 italic text-lg leading-relaxed">"{review.review_text}"</p>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-sangeet-400 text-sm">📍</span>
                  <span className="text-sangeet-neutral-500 text-sm">Dined 2 days ago</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Live Instagram Feed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-sangeet-400 mb-2">Follow Our Journey</h3>
              <p className="text-sangeet-neutral-400">See real moments from our kitchen and dining room</p>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {[
                "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1563379091339-03246963d8a9?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=400&fit=crop"
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group overflow-hidden rounded-xl"
                >
                  <img
                    src={image}
                    alt="Customer photo"
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 text-white text-sm">📸</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>


        </div>
      </section>

      {/* Social Proof Section - Mobile */}
      <section className="md:hidden py-16 bg-gradient-to-br from-sangeet-neutral-900 via-sangeet-neutral-800 to-sangeet-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-sangeet-400 mb-3">What Our Customers Love</h2>
            <p className="text-sangeet-neutral-400 text-base">
              Join thousands of satisfied customers
            </p>
          </motion.div>

          {/* Mobile Reviews Carousel */}
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide mb-8">
            {reviews.slice(0, 3).map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-80 bg-gradient-to-br from-sangeet-neutral-950 to-sangeet-neutral-900 p-6 rounded-2xl border border-sangeet-neutral-700"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={review.image_url}
                    alt={review.customer_name}
                    className="w-12 h-12 rounded-full mr-3 border-2 border-sangeet-400"
                  />
                  <div>
                    <h4 className="text-sangeet-400 font-bold">{review.customer_name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sangeet-neutral-300 italic text-sm leading-relaxed">"{review.review_text}"</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Instagram Feed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-sangeet-400 mb-1">Follow Our Journey</h3>
              <p className="text-sangeet-neutral-400 text-sm">Real moments from our kitchen</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1563379091339-03246963d8a9?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=400&fit=crop"
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group overflow-hidden rounded-lg"
                >
                  <img
                    src={image}
                    alt="Customer photo"
                    className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-1 left-1 text-white text-xs">📸</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>


        </div>
      </section>



      {/* Events Section */}
      <section className="py-20 bg-sangeet-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-sangeet-400 mb-4">Upcoming Events</h2>
            <p className="text-sangeet-neutral-400 text-lg">Join us for special celebrations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-sangeet-neutral-900 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-sangeet-400 mb-2">{event.title}</h3>
                  <p className="text-sangeet-neutral-400 mb-4">{event.description}</p>
                  <p className="text-sangeet-400 font-semibold">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-sangeet-neutral-900 via-sangeet-neutral-800 to-sangeet-neutral-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-sangeet-400/5 to-sangeet-red-500/5"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f4d95c' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Ready to Experience</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sangeet-400 to-sangeet-red-500">
                  Authentic Flavors?
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-sangeet-neutral-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Book your table today and embark on a culinary journey through India and Nepal. 
                <span className="text-sangeet-400 font-semibold"> Every meal is a celebration of culture and tradition.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto mb-12">
              {/* Primary CTA - Book Table */}
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/reservations"
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 px-6 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-2xl hover:shadow-sangeet-400/30 touch-manipulation min-h-[56px]"
                >
                  <span className="text-xl md:text-2xl">📅</span>
                  <span>Book Your Table</span>
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
              
              {/* Secondary CTA - Call Now */}
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="tel:+85223456789"
                  className="flex items-center justify-center space-x-3 border-2 border-sangeet-red-500 text-sangeet-red-400 px-6 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl hover:bg-sangeet-red-500 hover:text-white transition-all duration-300 shadow-2xl hover:shadow-sangeet-red-500/30 backdrop-blur-sm touch-manipulation min-h-[56px]"
                >
                  <span className="text-xl md:text-2xl">📞</span>
                  <span>Call Now</span>
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Strategic Awards & Reviews - Desktop */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              {/* Awards Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-sangeet-neutral-900/50 backdrop-blur-md rounded-2xl p-6 border border-sangeet-neutral-700"
              >
                <h3 className="text-xl font-bold text-sangeet-400 mb-4 text-center">Awards & Recognition</h3>
                <div className="space-y-4">
                  {[
                    { icon: "🏆", title: "Best Indian Restaurant 2024", subtitle: "Hong Kong Food Awards" },
                    { icon: "🎖️", title: "Chef's Choice Award", subtitle: "Culinary Excellence" },
                    { icon: "⭐", title: "4.8★ Rating", subtitle: "500+ Reviews" }
                  ].map((award, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-2xl">{award.icon}</div>
                      <div>
                        <div className="text-sangeet-400 font-bold text-sm">{award.title}</div>
                        <div className="text-sangeet-neutral-500 text-xs">{award.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Customer Reviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-sangeet-neutral-900/50 backdrop-blur-md rounded-2xl p-6 border border-sangeet-neutral-700"
              >
                <h3 className="text-xl font-bold text-sangeet-400 mb-4 text-center">Customer Reviews</h3>
                <div className="space-y-4">
                  {reviews.slice(0, 2).map((review, index) => (
                    <div key={review.id} className="border-l-2 border-sangeet-400 pl-3">
                      <div className="flex items-center mb-2">
                        <img
                          src={review.image_url}
                          alt={review.customer_name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <div className="text-sangeet-400 font-semibold text-sm">{review.customer_name}</div>
                          <div className="flex text-yellow-400 text-xs">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sangeet-neutral-300 italic text-sm">"{review.review_text.substring(0, 80)}..."</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-sangeet-neutral-900/50 backdrop-blur-md rounded-2xl p-6 border border-sangeet-neutral-700"
              >
                <h3 className="text-xl font-bold text-sangeet-400 mb-4 text-center">Restaurant Info</h3>
                <div className="space-y-4">
                  {[
                    { icon: "🕒", title: "Open Daily", subtitle: "6 PM - 11 PM" },
                    { icon: "📍", title: "Wanchai", subtitle: "Hong Kong" },
                    { icon: "👥", title: "150+ Seats", subtitle: "Private Rooms Available" }
                  ].map((info, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-2xl">{info.icon}</div>
                      <div>
                        <div className="text-sangeet-400 font-bold text-sm">{info.title}</div>
                        <div className="text-sangeet-neutral-500 text-xs">{info.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Strategic Awards & Reviews - Mobile */}
            <div className="md:hidden space-y-6 max-w-4xl mx-auto mb-8">
              {/* Awards Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-sangeet-neutral-900/50 backdrop-blur-md rounded-2xl p-4 border border-sangeet-neutral-700"
              >
                <h3 className="text-lg font-bold text-sangeet-400 mb-3 text-center">Awards & Recognition</h3>
                <div className="space-y-3">
                  {[
                    { icon: "🏆", title: "Best Indian Restaurant 2024", subtitle: "Hong Kong Food Awards" },
                    { icon: "🎖️", title: "Chef's Choice Award", subtitle: "Culinary Excellence" },
                    { icon: "⭐", title: "4.8★ Rating", subtitle: "500+ Reviews" }
                  ].map((award, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-xl">{award.icon}</div>
                      <div>
                        <div className="text-sangeet-400 font-bold text-sm">{award.title}</div>
                        <div className="text-sangeet-neutral-500 text-xs">{award.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Customer Reviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-sangeet-neutral-900/50 backdrop-blur-md rounded-2xl p-4 border border-sangeet-neutral-700"
              >
                <h3 className="text-lg font-bold text-sangeet-400 mb-3 text-center">Customer Reviews</h3>
                <div className="space-y-3">
                  {reviews.slice(0, 2).map((review, index) => (
                    <div key={review.id} className="border-l-2 border-sangeet-400 pl-3">
                      <div className="flex items-center mb-2">
                        <img
                          src={review.image_url}
                          alt={review.customer_name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <div>
                          <div className="text-sangeet-400 font-semibold text-xs">{review.customer_name}</div>
                          <div className="flex text-yellow-400 text-xs">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sangeet-neutral-300 italic text-xs">"{review.review_text.substring(0, 60)}..."</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Mobile-Optimized Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
              {[
                { icon: "⭐", text: "4.8★ Rating", subtext: "500+ Reviews" },
                { icon: "🏆", text: "Award Winning", subtext: "Best Indian Restaurant 2024" },
                { icon: "🕒", text: "Open Daily", subtext: "6 PM - 11 PM" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl mb-1 md:mb-2">{item.icon}</div>
                  <div className="text-sangeet-400 font-bold text-base md:text-lg">{item.text}</div>
                  <div className="text-sangeet-neutral-500 text-xs md:text-sm">{item.subtext}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default HomePage; 