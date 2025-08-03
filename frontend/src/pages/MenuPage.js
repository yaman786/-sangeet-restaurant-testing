import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MenuPage = ({ menuItems }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'Starters', 'Main Courses', 'Nepali Specialties', 'Breads', 'Desserts', 'Drinks'];
  
  const filteredMenuItems = selectedCategory === 'all' 
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-sangeet-neutral-950 py-20">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1920&h=1080&fit=crop"
          alt="Authentic South Asian cuisine"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sangeet-neutral-950 via-sangeet-neutral-950/95 to-sangeet-neutral-950"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sangeet-400/20 to-sangeet-red-500/20 backdrop-blur-md border border-sangeet-400/30 rounded-full px-6 py-2 mb-4">
            <span className="text-2xl">🍽️</span>
            <span className="text-sangeet-400 font-semibold">Our Menu</span>
          </div>
          <h1 className="text-5xl font-bold text-sangeet-400 mb-4">Our Menu</h1>
          <p className="text-sangeet-neutral-400 text-lg">Discover authentic Indian & Nepali flavors</p>
        </motion.div>

                {/* Mobile-Optimized Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 md:px-6 py-2 rounded-full font-medium transition-colors text-sm md:text-base touch-manipulation min-h-[44px] ${
                selectedCategory === category
                  ? 'bg-sangeet-400 text-sangeet-neutral-950'
                  : 'bg-sangeet-neutral-800 text-sangeet-neutral-400 hover:bg-sangeet-neutral-700'
              }`}
            >
              {category === 'all' ? 'All Items' : category}
            </motion.button>
          ))}
        </div>

                {/* Mobile-Optimized Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredMenuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className="bg-sangeet-neutral-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow touch-manipulation"
            >
              <div className="h-40 md:h-48 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg md:text-xl font-semibold text-sangeet-400">{item.name}</h3>
                  <span className="text-sangeet-400 font-bold text-sm md:text-base">${item.price}</span>
                </div>
                <p className="text-sm md:text-base text-sangeet-neutral-400 mb-3 md:mb-4">{item.description}</p>
                <div className="flex gap-1 md:gap-2 flex-wrap">
                  {item.is_vegetarian && (
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Veg</span>
                  )}
                  {item.is_spicy && (
                    <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">Spicy</span>
                  )}
                  {item.is_popular && (
                    <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">Popular</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMenuItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-sangeet-neutral-400 text-lg">No items found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MenuPage; 