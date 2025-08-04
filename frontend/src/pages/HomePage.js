import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import logo from '../assets/images/logo.png';

/**
 * HomePage Component
 * Main landing page for Sangeet Restaurant
 * Features: Hero section, dining areas, social proof, events, and journey story
 * 
 * @param {Object} props - Component props
 * @param {Array} props.menuItems - Array of menu items
 * @param {Array} props.reviews - Array of customer reviews
 * @param {Array} props.events - Array of upcoming events
 */
const HomePage = ({ menuItems, reviews, events }) => {
  const navigate = useNavigate();
  
  // Navigation functions for quick actions
  const handleBookTable = () => {
    navigate('/reservations');
  };
  
  const handleViewMenu = () => {
    navigate('/menu');
  };
  
  const handleCallNow = () => {
    window.location.href = 'tel:+85223456789';
  };
  
  const handleDirections = () => {
    // Open Google Maps with restaurant location
    const address = encodeURIComponent('Wanchai, Hong Kong');
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(url, '_blank');
  };
  
  // State management for carousel functionality
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileCurrentSlide, setMobileCurrentSlide] = useState(0);
  const [currentEventsSlide, setCurrentEventsSlide] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMobileSpecials, setShowMobileSpecials] = useState(false);
  const [showMobileContent, setShowMobileContent] = useState(false);

  // Scroll animations for hero section
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Restaurant operating hours and status
  const isOpen = currentTime.getHours() >= 18 && currentTime.getHours() < 23;

  // Constants for reusable data
  const DINING_AREAS = [
    {
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
      title: "Main Dining Hall",
      subtitle: "Elegant & Spacious",
      description: "Our grand dining hall accommodates 150+ guests with sophisticated decor and warm lighting, perfect for family gatherings and celebrations",
      capacity: "150+ Seats",
      bestFor: "Family Gatherings, Celebrations",
      features: ["Sophisticated Decor", "Warm Lighting", "Group Seating"]
    },
    {
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop",
      title: "Bar & Lounge",
      subtitle: "Modern & Casual",
      description: "Contemporary bar area with craft cocktails and casual dining, perfect for pre-dinner drinks or light meals",
      capacity: "Cozy",
      bestFor: "Drinks & Appetizers, Casual Dining",
      features: ["Craft Cocktails", "Casual Seating", "Bar Service"]
    },
    {
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=800&fit=crop",
      title: "Private Dining Room",
      subtitle: "Exclusive & Intimate",
      description: "Exclusive private dining space for intimate gatherings, business meetings, and special occasions",
      capacity: "Intimate",
      bestFor: "Business Meetings, Special Occasions",
      features: ["Private Service", "Customized Menu", "Intimate Setting"]
    }
  ];

  const HERO_STATS = [
    { value: "5,300", label: "Sq Ft" },
    { value: "150+", label: "Seats" },
    { value: "100+", label: "Family Recipes" }
  ];

  const QUICK_STATS = [
    { label: "Wait Time", value: "15 min", color: "text-green-400" },
    { label: "Capacity", value: "85%", color: "text-yellow-400" },
    { label: "Today's Special", value: "Butter Chicken", color: "text-sangeet-400" },
    { label: "Perfect For", value: "Indoor Dining", color: "text-blue-400" }
  ];

  const JOURNEY_STATS = [
    { number: "5,300", label: "Sq Ft", icon: "🏠" },
    { number: "100+", label: "Family Recipes", icon: "📜" },
    { number: "150+", label: "Seat Capacity", icon: "🪑" },
    { number: "3", label: "Dining Areas", icon: "🍽️" }
  ];

  const JOURNEY_STORY = [
    {
      icon: "👨‍🍳",
      title: "Chef's Passion",
      description: "Our head chef brings authentic South Asian cooking expertise, trained in traditional techniques and passionate about preserving authentic flavors.",
      highlight: "Authentic Techniques"
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Family Heritage",
      description: "Every recipe comes from generations of family tradition, passed down through the years to create authentic South Asian dining experiences.",
      highlight: "Generations of Recipes"
    },
    {
      icon: "🌟",
      title: "Our Dream",
      description: "We dreamed of bringing the authentic taste of South Asia to Hong Kong - where every dish tells a story and every meal creates memories.",
      highlight: "Authentic South Asian Flavors"
    },
    {
      icon: "🏠",
      title: "Perfect Location",
      description: "Chose Wanchai for its vibrant community and food culture - the perfect place to share our passion for authentic South Asian cuisine.",
      highlight: "Vibrant Wanchai Community"
    }
  ];

  const AWARDS = [
    { icon: "🏆", title: "Best New Restaurant", subtitle: "Hong Kong Food Awards 2024" },
    { icon: "👨‍👩‍👧‍👦", title: "Family Favorite", subtitle: "Local Community Choice" },
    { icon: "🎖️", title: "Chef's Choice Award", subtitle: "Culinary Excellence" }
  ];

  // Sample upcoming events data
  const UPCOMING_EVENTS = [
    {
      id: 1,
      title: "Diwali Festival Celebration",
      description: "Join us for a spectacular Diwali celebration with traditional South Asian cuisine, live music, and cultural performances. Special menu featuring festival favorites.",
      date: "2024-11-12",
      time: "6:00 PM - 11:00 PM",
      image_url: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800&h=600&fit=crop",
      category: "Cultural Festival",
      price: "From $45",
      badge: "Limited Seats"
    },
    {
      id: 2,
      title: "Chef's Table Experience",
      description: "An exclusive dining experience with Chef Rajesh Kumar. Enjoy a 7-course tasting menu with wine pairings in our private dining room.",
      date: "2024-11-18",
      time: "7:00 PM - 10:00 PM",
      image_url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
      category: "Fine Dining",
      price: "$120 per person",
      badge: "Exclusive"
    },
    {
      id: 3,
      title: "Bollywood Night",
      description: "Dance the night away with live Bollywood music, traditional dance performances, and a special menu inspired by Indian cinema culture.",
      date: "2024-11-25",
      time: "8:00 PM - 1:00 AM",
      image_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      category: "Entertainment",
      price: "From $35",
      badge: "Popular"
    },
    {
      id: 4,
      title: "Corporate Lunch Special",
      description: "Perfect for business meetings and corporate events. Special group menus and private dining options available.",
      date: "2024-12-02",
      time: "12:00 PM - 3:00 PM",
      image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      category: "Business",
      price: "From $25",
      badge: "Group Discount"
    },
    {
      id: 5,
      title: "Holiday Season Gala",
      description: "Celebrate the holiday season with our grand gala dinner featuring traditional South Asian holiday dishes and festive decorations.",
      date: "2024-12-15",
      time: "6:30 PM - 11:30 PM",
      image_url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
      category: "Holiday",
      price: "From $65",
      badge: "Seasonal"
    }
  ];

  const TRUST_INDICATORS = [
    { icon: "🎖️", text: "Award Winning", subtext: "Best Indian Restaurant 2024" },
    { icon: "⭐", text: "Customer Favorite", subtext: "500+ Happy Guests" },
    { icon: "🕒", text: "Open Daily", subtext: "6 PM - 11 PM" }
  ];

  // Carousel navigation functions
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

  // Events carousel navigation
  const navigateEventsCarousel = (direction) => {
    const totalEvents = UPCOMING_EVENTS.length;
    setCurrentEventsSlide(prev => {
      if (direction === 1) {
        return prev === totalEvents - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? totalEvents - 1 : prev - 1;
      }
    });
  };

  const goToEventsSlide = (index) => {
    setCurrentEventsSlide(index);
  };

  // Auto-play carousel effect with performance optimization
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
      setMobileCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    
    // Cleanup on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Show mobile content progressively for premium experience
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowMobileSpecials(true);
        setShowMobileContent(true);
      }
    };

    const timer = setTimeout(() => {
      setShowMobileSpecials(true);
      setShowMobileContent(true);
    }, 5000); // Reduced to 5 seconds for better UX

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  // Reusable components
  const QuickActionButton = ({ icon, text, isPrimary = false, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center space-x-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg ${
        isPrimary 
          ? 'bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 hover:from-sangeet-300 hover:to-sangeet-400 ring-2 ring-sangeet-400/20' 
          : 'bg-sangeet-neutral-800/80 text-sangeet-400 hover:bg-sangeet-neutral-700/90 border border-sangeet-neutral-600/50 hover:border-sangeet-neutral-500'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="tracking-wide">{text}</span>
    </motion.button>
  );

  const StatCard = ({ value, label }) => (
    <div className="text-center group hover:scale-105 transition-transform duration-300">
      <div className="text-sm sm:text-base md:text-xl font-bold text-sangeet-400 mb-1 group-hover:text-sangeet-300 transition-colors">{value}</div>
      <div className="text-xs text-sangeet-neutral-400 group-hover:text-sangeet-neutral-300 transition-colors">{label}</div>
    </div>
  );

  const QuickStatCard = ({ label, value, color }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.4 }}
      className="text-center group hover:scale-105 transition-transform duration-300"
    >
      <div className={`text-lg font-bold ${color} mb-1`}>
        {value}
      </div>
      <div className="text-sangeet-neutral-400 text-xs">
        {label}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      {/* Quick Actions Bar - Desktop */}
      <div className="hidden md:block fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center space-x-4 bg-gradient-to-r from-sangeet-neutral-950/98 to-sangeet-neutral-900/98 backdrop-blur-2xl rounded-full px-8 py-4 border border-sangeet-neutral-600/50 shadow-2xl shadow-black/50"
        >
          <QuickActionButton icon="📅" text="Book Table" isPrimary={true} onClick={handleBookTable} />
          <QuickActionButton icon="📋" text="View Menu" onClick={handleViewMenu} />
          <QuickActionButton icon="📞" text="Call Now" onClick={handleCallNow} />
          <QuickActionButton icon="📍" text="Directions" onClick={handleDirections} />
        </motion.div>
      </div>

      {/* Quick Actions Bar - Mobile */}
      <div className="md:hidden fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-between items-center bg-gradient-to-r from-sangeet-neutral-950/98 to-sangeet-neutral-900/98 backdrop-blur-2xl rounded-2xl px-6 py-4 border border-sangeet-neutral-600/50 shadow-2xl shadow-black/50"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookTable}
            className="flex flex-col items-center space-y-1 bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 px-3 py-2 rounded-xl font-semibold hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-lg touch-manipulation"
          >
            <span className="text-lg">📅</span>
            <span className="text-xs">Book</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewMenu}
            className="flex flex-col items-center space-y-1 bg-sangeet-neutral-800 text-sangeet-400 px-3 py-2 rounded-xl font-semibold hover:bg-sangeet-neutral-700 transition-all duration-300 border border-sangeet-neutral-600 touch-manipulation"
          >
            <span className="text-lg">📋</span>
            <span className="text-xs">Menu</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCallNow}
            className="flex flex-col items-center space-y-1 bg-sangeet-neutral-800 text-sangeet-400 px-3 py-2 rounded-xl font-semibold hover:bg-sangeet-neutral-700 transition-all duration-300 border border-sangeet-neutral-600 touch-manipulation"
          >
            <span className="text-lg">📞</span>
            <span className="text-xs">Call</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDirections}
            className="flex flex-col items-center space-y-1 bg-sangeet-neutral-800 text-sangeet-400 px-3 py-2 rounded-xl font-semibold hover:bg-sangeet-neutral-700 transition-all duration-300 border border-sangeet-neutral-600 touch-manipulation"
          >
            <span className="text-lg">📍</span>
            <span className="text-xs">Map</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-[75vh] md:h-screen flex items-center justify-center overflow-hidden py-6 md:py-0">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop"
          >
            <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop" 
              alt="Restaurant ambiance"
              className="w-full h-full object-cover"
            />
          </video>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sangeet-neutral-900/80 via-sangeet-neutral-800/70 to-sangeet-neutral-900/80 z-10"></div>
        
        {/* Mobile Scroll Indicator - Bottom Right */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 right-6 z-20 md:hidden"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-white/80 rounded-full mt-2"
              />
            </div>
            <span className="text-xs text-white/70 font-medium">Scroll</span>
          </div>
        </motion.div>
        
                {/* Main Content */}
        <motion.div
          style={{ y, opacity }}
          className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto pt-16 md:pt-48"
        >
          {/* Status Bar - Mobile Only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:hidden mb-5"
          >
            <div className="flex items-center justify-center space-x-4 bg-sangeet-neutral-900/90 backdrop-blur-md rounded-full px-4 py-3 border border-sangeet-neutral-700 max-w-sm mx-auto">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                <span className={`text-xs font-semibold ${isOpen ? 'text-green-400' : 'text-red-400'}`}>
                  {isOpen ? 'OPEN NOW' : 'CLOSED'}
                </span>
              </div>
              <div className="text-xs text-sangeet-neutral-400">
                {isOpen ? 'Closes at 11:00 PM' : 'Opens at 6:00 PM'}
              </div>
              <div className="text-xs text-sangeet-neutral-400">
                📍 Wanchai
              </div>
            </div>
          </motion.div>

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-sangeet-400/80 to-sangeet-red-500/80 rounded-full blur-3xl animate-pulse"></div>
              <img 
                src={logo} 
                alt="Sangeet Restaurant" 
                className="relative h-12 sm:h-14 md:h-20 lg:h-24 w-auto logo-navbar-dark drop-shadow-2xl brightness-150 contrast-150"
              />
            </div>
          </motion.div>
        

        
          {/* Mobile-First Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-4 md:mb-6 px-4"
          >
            <span className="text-white">Experience</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sangeet-300 via-sangeet-400 to-sangeet-red-400 drop-shadow-lg">
              South Asian Elegance
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-sangeet-neutral-300 mb-5 md:mb-8 max-w-2xl mx-auto px-4"
          >
            Authentic South Asian cuisine in the heart of Hong Kong. Where tradition meets modern dining excellence.
          </motion.p>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center space-x-3 md:space-x-8 mb-4 md:mb-8 text-sangeet-neutral-300 px-4"
          >
            {HERO_STATS.map((stat, index) => (
              <StatCard key={index} value={stat.value} label={stat.label} />
            ))}
          </motion.div>

          {/* Quick Stats Bar - Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="hidden md:block max-w-3xl mx-auto mb-6"
          >
            <div className="bg-sangeet-neutral-900/50 backdrop-blur-md rounded-2xl p-4 border border-sangeet-neutral-700">
              <div className="grid grid-cols-4 gap-6">
                {QUICK_STATS.map((stat, index) => (
                  <QuickStatCard key={index} {...stat} />
                ))}
              </div>
            </div>
          </motion.div>


        </motion.div>

        {/* Scroll Indicator - Hidden on Mobile */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-20 right-6 z-20 hidden md:block"
        >
          <div className="flex flex-col items-center space-y-2 text-sangeet-neutral-300 bg-sangeet-neutral-900/40 backdrop-blur-md rounded-full px-4 py-3 border border-sangeet-neutral-600/30 shadow-lg">
            <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
            <div className="w-5 h-8 border border-sangeet-neutral-400/70 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-3 bg-sangeet-neutral-400/80 rounded-full mt-1"
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
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sangeet-red-500/20 to-sangeet-400/20 backdrop-blur-md border border-sangeet-red-500/30 rounded-full px-6 py-2">
                <span className="text-2xl">🔥</span>
                <span className="text-sangeet-400 font-semibold">Today's Specials</span>
                <span className="text-sangeet-neutral-400 text-sm">Limited Time</span>
              </div>
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
                image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
                badge: "Most Popular",
                timeLeft: "2h left"
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
                className="group bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-sangeet-400/20 transition-all duration-500 border border-sangeet-neutral-700 hover:border-sangeet-400 flex flex-col h-[400px]"
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
                
                <div className="p-6 flex flex-col h-[240px]">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-sangeet-400 mb-2 group-hover:text-sangeet-300 transition-colors line-clamp-1">
                      {special.name}
                    </h3>
                    <p className="text-sangeet-neutral-400 mb-4 line-clamp-2">{special.description}</p>
                  </div>
                  <div className="mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 py-3 rounded-xl font-semibold hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-lg hover:shadow-sangeet-400/25 text-center"
                    >
                      Order Now - Save ${parseInt(special.originalPrice.slice(1)) - parseInt(special.price.slice(1))}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Specials Section - Mobile */}
      {showMobileSpecials && (
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:hidden py-12 bg-gradient-to-br from-sangeet-neutral-950 via-sangeet-neutral-900 to-sangeet-neutral-950"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sangeet-red-500/20 to-sangeet-400/20 backdrop-blur-md border border-sangeet-red-500/30 rounded-full px-4 py-2">
                <span className="text-xl">🔥</span>
                <span className="text-sangeet-400 font-semibold text-sm">Today's Specials</span>
              </div>
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
                image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
                badge: "Most Popular",
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
                className="flex-shrink-0 w-80 group bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-sangeet-400/20 transition-all duration-500 border border-sangeet-neutral-700 hover:border-sangeet-400 flex flex-col h-[320px]"
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
                
                <div className="p-4 flex flex-col h-[200px]">
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-sangeet-400 mb-2 group-hover:text-sangeet-300 transition-colors line-clamp-1">
                      {special.name}
                    </h3>
                    <p className="text-sm text-sangeet-neutral-400 mb-4 line-clamp-2">{special.description}</p>
                  </div>
                  <div className="mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 py-3 rounded-xl font-semibold hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-lg hover:shadow-sangeet-400/25 touch-manipulation text-center"
                    >
                      Order Now - Save ${parseInt(special.originalPrice.slice(1)) - parseInt(special.price.slice(1))}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </motion.section>
      )}

      {/* Strategic Loading Section - Shows during delay to fill space */}
      {!showMobileSpecials && (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:hidden py-16 bg-gradient-to-br from-sangeet-neutral-950 via-sangeet-neutral-900 to-sangeet-neutral-950"
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl mb-6"
            >
              🍽️
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl font-bold text-sangeet-400 mb-4"
            >
              Discovering Today's Specials...
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sangeet-neutral-400 text-base mb-6"
            >
              Our chef is preparing today's authentic South Asian delights
            </motion.p>
            
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center space-x-2"
            >
              <div className="w-3 h-3 bg-sangeet-400 rounded-full"></div>
              <div className="w-3 h-3 bg-sangeet-400 rounded-full"></div>
              <div className="w-3 h-3 bg-sangeet-400 rounded-full"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-8"
            >
              <div className="inline-flex items-center space-x-2 bg-sangeet-neutral-800/50 backdrop-blur-md border border-sangeet-neutral-700 rounded-full px-4 py-2">
                <span className="text-sangeet-400 text-sm">💡</span>
                <span className="text-sangeet-neutral-300 text-sm">Scroll down to explore more</span>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Simplified Ambience Section - Conditionally Shown on Mobile */}
      <section className={`${showMobileContent ? 'block' : 'hidden md:block'} py-20 bg-gradient-to-br from-sangeet-neutral-950 via-sangeet-neutral-900 to-sangeet-neutral-950`}>
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
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sangeet-300 via-sangeet-400 to-sangeet-red-400 drop-shadow-lg mb-4">Where Tradition Meets Elegance</h2>
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
                  {DINING_AREAS.map((area, index) => (
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
                  {DINING_AREAS.map((area, index) => (
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
        </div>
      </section>



      {/* Unified Social Proof Section */}
      <section className={`${showMobileContent ? 'block' : 'hidden md:block'} py-20 bg-gradient-to-br from-sangeet-neutral-900 via-sangeet-neutral-800 to-sangeet-neutral-900`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sangeet-400 mb-4">What Our Customers Love</h2>
            <p className="text-sangeet-neutral-400 text-base md:text-lg max-w-3xl mx-auto">
              Join thousands of satisfied customers who have experienced authentic South Asian cuisine
            </p>
          </motion.div>

          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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

          {/* Mobile Layout */}
          <div className={`${showMobileContent ? 'md:hidden' : 'hidden'} flex overflow-x-auto gap-4 pb-4 scrollbar-hide mb-8`}>
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

          {/* Awards & Recognition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AWARDS.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-sangeet-neutral-900/50 backdrop-blur-md rounded-xl p-6 border border-sangeet-neutral-700"
                >
                  <div className="text-3xl mb-3">{award.icon}</div>
                  <h3 className="text-sangeet-400 font-bold text-lg mb-1">{award.title}</h3>
                  <p className="text-sangeet-neutral-400 text-sm">{award.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>



      {/* Enhanced Events Section with Carousel */}
      <section className={`${showMobileContent ? 'block' : 'hidden md:block'} py-16 bg-sangeet-neutral-950`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sangeet-red-500/20 to-sangeet-400/20 backdrop-blur-md border border-sangeet-red-500/30 rounded-full px-4 py-1.5 mb-3">
              <span className="text-lg">🎉</span>
              <span className="text-sangeet-400 font-semibold text-sm">Upcoming Events</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-sangeet-400 mb-3">Join Our Celebrations</h2>
            <p className="text-sangeet-neutral-400 text-base max-w-2xl mx-auto">
              Experience South Asian culture through special events, festivals, and exclusive dining experiences
            </p>
          </motion.div>

          {/* Desktop Events Carousel - Optimized */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${currentEventsSlide * 100}%)` }}
                >
                  {UPCOMING_EVENTS.map((event, index) => (
                    <div key={event.id} className="w-full flex-shrink-0">
                      <div className="relative h-[450px] group">
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/90 via-sangeet-neutral-900/30 to-transparent"></div>
                        
                        {/* Content Overlay - Compact */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-sangeet-neutral-900/95 backdrop-blur-md rounded-xl p-6 border border-sangeet-neutral-700">
                            {/* Header Row */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="bg-gradient-to-r from-sangeet-red-500 to-sangeet-400 text-white px-3 py-1 rounded-full font-bold text-xs">
                                {event.badge}
                              </div>
                              <div className="text-sangeet-400 font-semibold text-base">
                                {event.price}
                              </div>
                            </div>
                            
                            {/* Event Title */}
                            <h3 className="text-xl font-bold text-sangeet-400 mb-2 line-clamp-1">{event.title}</h3>
                            
                            {/* Event Description - Truncated */}
                            <p className="text-sangeet-neutral-300 text-sm mb-3 leading-relaxed line-clamp-2">{event.description}</p>
                            
                            {/* Date, Time & Category - Compact */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <span className="text-sangeet-400 text-sm">📅</span>
                                  <span className="text-sangeet-neutral-300 text-xs">
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="text-sangeet-400 text-sm">⏰</span>
                                  <span className="text-sangeet-neutral-300 text-xs">{event.time.split(' ')[0]}</span>
                                </div>
                              </div>
                              <div className="bg-sangeet-400/20 text-sangeet-400 px-2 py-1 rounded-full text-xs font-semibold">
                                {event.category}
                              </div>
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
                onClick={() => navigateEventsCarousel(-1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-sangeet-neutral-900/80 backdrop-blur-md text-sangeet-400 p-3 rounded-full hover:bg-sangeet-neutral-800 transition-all duration-300 z-10"
                aria-label="Previous event"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => navigateEventsCarousel(1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-sangeet-neutral-900/80 backdrop-blur-md text-sangeet-400 p-3 rounded-full hover:bg-sangeet-neutral-800 transition-all duration-300 z-10"
                aria-label="Next event"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {UPCOMING_EVENTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToEventsSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentEventsSlide ? 'bg-sangeet-400' : 'bg-sangeet-neutral-600 hover:bg-sangeet-neutral-500'
                    }`}
                    aria-label={`Go to event ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Events Carousel - Optimized */}
          <div className={`${showMobileContent ? 'md:hidden' : 'hidden'} block`}>
            <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
              {UPCOMING_EVENTS.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex-shrink-0 w-72 bg-sangeet-neutral-900 rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/70 to-transparent"></div>
                    
                    {/* Badge & Price - Compact */}
                    <div className="absolute top-2 left-2 right-2 flex justify-between">
                      <div className="bg-gradient-to-r from-sangeet-red-500 to-sangeet-400 text-white px-2 py-1 rounded-full font-bold text-xs">
                        {event.badge}
                      </div>
                      <div className="bg-sangeet-neutral-900/90 backdrop-blur-sm text-sangeet-400 px-2 py-1 rounded-full font-semibold text-xs">
                        {event.price}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="text-base font-bold text-sangeet-400 mb-1 line-clamp-1">{event.title}</h3>
                    <p className="text-sangeet-neutral-400 text-xs mb-2 line-clamp-2 leading-relaxed">{event.description}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <span className="text-sangeet-400 text-xs">📅</span>
                        <span className="text-sangeet-neutral-300 text-xs">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="bg-sangeet-400/20 text-sangeet-400 px-2 py-0.5 rounded-full font-semibold text-xs">
                        {event.category}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Follow Our Journey Section */}
      <section className={`${showMobileContent ? 'block' : 'hidden md:block'} py-20 bg-gradient-to-br from-sangeet-neutral-900 via-sangeet-neutral-800 to-sangeet-neutral-900`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sangeet-400/20 to-sangeet-red-500/20 backdrop-blur-md border border-sangeet-400/30 rounded-full px-6 py-2 mb-4">
              <span className="text-2xl">🌟</span>
              <span className="text-sangeet-400 font-semibold">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-sangeet-400 mb-4">Follow Our Journey</h2>
            <p className="text-sangeet-neutral-400 text-lg max-w-3xl mx-auto">
              From humble beginnings to becoming Hong Kong's favorite South Asian restaurant. Discover the passion, tradition, and innovation behind every dish.
            </p>
          </motion.div>

          {/* Journey Story - Desktop */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div className="space-y-8">
              {JOURNEY_STORY.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-6 bg-sangeet-neutral-900/50 backdrop-blur-md rounded-2xl border border-sangeet-neutral-700 hover:border-sangeet-400/50 transition-all duration-300 group"
                >
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-sangeet-400 font-bold text-lg">{item.title}</h3>
                      <div className="bg-sangeet-red-500/20 text-sangeet-red-400 px-2 py-1 rounded-full text-xs font-semibold">
                        {item.highlight}
                      </div>
                    </div>
                    <p className="text-sangeet-neutral-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Visual Story */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden rounded-3xl group"
              >
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop"
                  alt="Chef preparing authentic South Asian dishes"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-sangeet-neutral-900/80 backdrop-blur-md rounded-2xl p-6 border border-sangeet-neutral-700">
                    <h4 className="text-sangeet-400 font-bold text-xl mb-2">Authentic South Asian Cuisine</h4>
                    <p className="text-sangeet-neutral-300 text-sm">
                      Every dish is crafted with passion, tradition, and the finest ingredients to bring you the true taste of South Asia
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {JOURNEY_STATS.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-sangeet-neutral-900/50 backdrop-blur-md rounded-xl p-4 border border-sangeet-neutral-700 text-center"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-sangeet-400 font-bold text-xl">{stat.number}</div>
                    <div className="text-sangeet-neutral-400 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Journey Story - Mobile */}
          <div className={`${showMobileContent ? 'md:hidden' : 'hidden'} space-y-6`}>
            {/* Main Story Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-2xl group"
            >
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop"
                alt="Chef preparing authentic South Asian dishes"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-sangeet-neutral-900/80 backdrop-blur-md rounded-xl p-4 border border-sangeet-neutral-700">
                  <h4 className="text-sangeet-400 font-bold text-lg mb-1">Authentic South Asian Cuisine</h4>
                  <p className="text-sangeet-neutral-300 text-xs">
                    Every dish is crafted with passion, tradition, and the finest ingredients
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Story Cards */}
            {JOURNEY_STORY.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 bg-sangeet-neutral-900/50 backdrop-blur-md rounded-xl border border-sangeet-neutral-700"
              >
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-sangeet-400 font-bold text-base">{item.title}</h3>
                    <div className="bg-sangeet-red-500/20 text-sangeet-red-400 px-2 py-1 rounded-full text-xs font-semibold">
                      {item.highlight}
                    </div>
                  </div>
                  <p className="text-sangeet-neutral-300 text-xs leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Mobile Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {JOURNEY_STATS.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-sangeet-neutral-900/50 backdrop-blur-md rounded-xl p-3 border border-sangeet-neutral-700 text-center"
                >
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-sangeet-400 font-bold text-lg">{stat.number}</div>
                  <div className="text-sangeet-neutral-400 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA for Journey */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <Link
              to="/about"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 px-8 py-4 rounded-2xl font-bold text-lg hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-2xl hover:shadow-sangeet-400/30"
            >
              <span>📖</span>
              <span>Read Our Full Story</span>
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

      {/* Enhanced CTA Section - Final Call to Action */}
      <section className={`${showMobileContent ? 'block' : 'hidden md:block'} relative py-24 bg-gradient-to-br from-sangeet-neutral-900 via-sangeet-neutral-800 to-sangeet-neutral-900 overflow-hidden`}>
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

            {/* Mobile-Optimized Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
              {TRUST_INDICATORS.map((item, index) => (
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