import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMenuItems, fetchMenuCategories, getTableByQRCode } from '../services/api';
import toast from 'react-hot-toast';

const QRMenuPage = () => {
  const { qrCode } = useParams();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [tableInfo, setTableInfo] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartInitialized, setCartInitialized] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Get table information from QR code
        const tableData = await getTableByQRCode(qrCode);
        if (!tableData) {
          toast.error('Invalid QR code');
          navigate('/');
          return;
        }
        setTableInfo(tableData);

        // Fetch menu items
        const menuData = await fetchMenuItems();
        console.log('Menu items data:', menuData);
        setMenuItems(menuData);

        // Fetch categories
        const categoriesData = await fetchMenuCategories();
        console.log('Categories data:', categoriesData);
        setCategories(categoriesData);

      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load menu. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [qrCode, navigate]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    console.log('=== CART LOAD DEBUG ===');
    console.log('Loading cart for QR code:', qrCode);
    console.log('localStorage key:', `cart_${qrCode}`);

    const savedCart = localStorage.getItem(`cart_${qrCode}`);
    console.log('Saved cart data from localStorage:', savedCart);

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('✅ Parsed cart data:', parsedCart);
        
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCart(parsedCart);
          console.log('✅ Cart loaded successfully');
        } else {
          console.log('⚠️ Cart data is empty or invalid structure');
          setCart([]);
        }
      } catch (error) {
        console.error('❌ Error parsing cart data:', error);
        console.log('Raw saved cart data:', savedCart);
        setCart([]);
      }
    } else {
      console.log('❌ No saved cart found in localStorage');
      setCart([]);
      
      // Check all localStorage keys for debugging
      console.log('All localStorage keys:');
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`Key: ${key}, Value: ${localStorage.getItem(key)}`);
      }
    }
    
    // Mark cart as initialized
    setCartInitialized(true);
  }, [qrCode]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // Only run after cart has been initialized
    if (!cartInitialized) {
      console.log('⏳ Cart not yet initialized, skipping save');
      return;
    }

    console.log('=== CART SAVE DEBUG ===');
    console.log('Cart changed, saving to localStorage:', cart);
    console.log('QR Code for localStorage key:', qrCode);
    console.log('localStorage key will be:', `cart_${qrCode}`);

    if (cart.length > 0) {
      try {
        const cartData = JSON.stringify(cart);
        localStorage.setItem(`cart_${qrCode}`, cartData);
        console.log('✅ Saved cart to localStorage:', cartData);

        // Verify the save worked
        const savedData = localStorage.getItem(`cart_${qrCode}`);
        console.log('✅ Verification - Retrieved from localStorage:', savedData);
      } catch (error) {
        console.error('❌ Error saving cart to localStorage:', error);
      }
    } else {
      // Only remove if there was previously saved cart data
      const existingCart = localStorage.getItem(`cart_${qrCode}`);
      if (existingCart) {
        try {
          localStorage.removeItem(`cart_${qrCode}`);
          console.log('🗑️ Removed cart from localStorage');
        } catch (error) {
          console.error('❌ Error removing cart from localStorage:', error);
        }
      } else {
        console.log('ℹ️ No existing cart to remove');
      }
    }
  }, [cart, qrCode, cartInitialized]);

  const addToCart = (item) => {
    console.log('=== ADD TO CART DEBUG ===');
    console.log('Adding item to cart:', item);
    console.log('Current cart before adding:', cart);
    console.log('QR Code:', qrCode);
    console.log('localStorage key:', `cart_${qrCode}`);
    
    // Check current localStorage state
    const currentSavedCart = localStorage.getItem(`cart_${qrCode}`);
    console.log('Current saved cart in localStorage:', currentSavedCart);
    
    setCart(prevCart => {
      console.log('Previous cart state:', prevCart);
      const existingItem = prevCart.find(cartItem => cartItem.menu_item_id === item.id);
      console.log('Existing item found:', existingItem);
      
      let newCart;
      if (existingItem) {
        newCart = prevCart.map(cartItem =>
          cartItem.menu_item_id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        console.log('Updated cart (existing item):', newCart);
      } else {
        newCart = [...prevCart, { 
          menu_item_id: item.id, 
          quantity: 1, 
          name: item.name,
          price: item.price,
          special_requests: ''
        }];
        console.log('Updated cart (new item):', newCart);
      }
      
      // Immediately save to localStorage for debugging
      try {
        const cartData = JSON.stringify(newCart);
        localStorage.setItem(`cart_${qrCode}`, cartData);
        console.log('✅ Immediately saved to localStorage:', cartData);
        
        // Verify the save worked
        const savedData = localStorage.getItem(`cart_${qrCode}`);
        console.log('✅ Verification - Retrieved from localStorage:', savedData);
      } catch (error) {
        console.error('❌ Error saving cart immediately:', error);
      }
      
      return newCart;
    });
    toast.success(`${item.name} added to cart!`);
  };

  const handleViewCart = () => {
    navigate(`/qr/${qrCode}/cart`);
  };

  const filteredMenuItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => {
        // Handle both string categories and category objects
        const itemCategory = item.category_name || item.category;
        const selectedCat = typeof selectedCategory === 'object' ? selectedCategory.name : selectedCategory;
        return itemCategory === selectedCat;
      });

  if (loading) {
    return (
      <div className="min-h-screen bg-sangeet-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-sangeet-400">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sangeet-neutral-950">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-sangeet-neutral-900 to-sangeet-neutral-800 border-b border-sangeet-neutral-700 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sangeet-400 rounded-full flex items-center justify-center">
                <span className="text-sangeet-neutral-950 font-bold text-lg">🍽️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-sangeet-400">Sangeet Restaurant</h1>
                <p className="text-sangeet-neutral-400 text-sm">
                  Table {tableInfo?.table_number} • Digital Menu
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sangeet-400 font-bold text-lg">
                  ${cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}
                </div>
                <div className="text-sangeet-neutral-400 text-sm">
                  {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
                </div>
              </div>
              <button
                onClick={handleViewCart}
                disabled={cart.length === 0}
                className="bg-sangeet-400 text-sangeet-neutral-950 px-4 py-2 rounded-lg font-semibold hover:bg-sangeet-300 transition-colors disabled:opacity-50 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>🛒</span>
                <span>View Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Category Filter - Enhanced */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-sangeet-400 mb-3 flex items-center">
            <span className="mr-2">📋</span>
            Menu Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-sangeet-400 text-sangeet-neutral-950 shadow-lg'
                  : 'bg-sangeet-neutral-800 text-sangeet-neutral-400 hover:bg-sangeet-neutral-700'
              }`}
            >
              All Items
            </button>
            {categories.map((category) => (
              <button
                key={category.id || category.name}
                onClick={() => setSelectedCategory(category.name || category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === (category.name || category)
                    ? 'bg-sangeet-400 text-sangeet-neutral-950 shadow-lg'
                    : 'bg-sangeet-neutral-800 text-sangeet-neutral-400 hover:bg-sangeet-neutral-700'
                }`}
              >
                {category.name || category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items - Enhanced Grid with Consistent Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          {filteredMenuItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-xl overflow-hidden border border-sangeet-neutral-700 hover:border-sangeet-neutral-600 transition-all flex flex-col h-full"
            >
              {/* Image Section - Fixed Height */}
              <div className="h-48 md:h-52 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content Section - Flex Column with Space Between */}
              <div className="p-4 md:p-5 flex flex-col flex-grow">
                {/* Header with Name and Price */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base md:text-lg font-semibold text-sangeet-400 flex-1 mr-2">{item.name}</h3>
                  <span className="text-sangeet-400 font-bold text-lg whitespace-nowrap">${item.price}</span>
                </div>
                
                {/* Description - Fixed Height */}
                <p className="text-sm text-sangeet-neutral-400 mb-3 line-clamp-2 min-h-[2.5rem]">{item.description}</p>
                
                {/* Tags Section - Fixed Height */}
                <div className="flex flex-wrap gap-1 mb-4 min-h-[1.5rem]">
                  {item.is_vegetarian && (
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">🌱 Veg</span>
                  )}
                  {item.is_spicy && (
                    <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">🔥 Spicy</span>
                  )}
                  {item.is_popular && (
                    <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded-full">⭐ Popular</span>
                  )}
                </div>
                
                {/* Button Section - Always at Bottom */}
                <div className="mt-auto">
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-sangeet-400 text-sangeet-neutral-950 py-2 md:py-3 rounded-lg font-semibold hover:bg-sangeet-300 transition-colors shadow-lg hover:shadow-xl text-sm md:text-base"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QRMenuPage; 