const express = require('express');
const router = express.Router();

// Mock data for menu items
const mockMenuItems = [
  {
    id: 1,
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    price: 8.50,
    category: 'Starters',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    is_vegetarian: true,
    is_spicy: false,
    is_popular: true
  },
  {
    id: 2,
    name: 'Butter Chicken',
    description: 'Creamy tomato-based curry with tender chicken',
    price: 28.00,
    category: 'Main Courses',
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    is_vegetarian: false,
    is_spicy: false,
    is_popular: true
  },
  {
    id: 3,
    name: 'Lamb Biryani',
    description: 'Fragrant rice dish with tender lamb',
    price: 32.00,
    category: 'Main Courses',
    image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    is_vegetarian: false,
    is_spicy: true,
    is_popular: true
  },
  {
    id: 4,
    name: 'Momo Dumplings',
    description: 'Steamed dumplings filled with minced meat',
    price: 18.00,
    category: 'Nepali Specialties',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    is_vegetarian: false,
    is_spicy: false,
    is_popular: true
  },
  {
    id: 5,
    name: 'Naan',
    description: 'Soft leavened bread baked in tandoor',
    price: 4.50,
    category: 'Breads',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    is_vegetarian: true,
    is_spicy: false,
    is_popular: true
  }
];

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const { category, vegetarian, spicy, popular } = req.query;
    let filteredItems = [...mockMenuItems];

    if (category) {
      filteredItems = filteredItems.filter(item => item.category === category);
    }

    if (vegetarian === 'true') {
      filteredItems = filteredItems.filter(item => item.is_vegetarian);
    }

    if (spicy === 'true') {
      filteredItems = filteredItems.filter(item => item.is_spicy);
    }

    if (popular === 'true') {
      filteredItems = filteredItems.filter(item => item.is_popular);
    }

    res.json(filteredItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Get menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const filteredItems = mockMenuItems.filter(item => item.category === category);
    res.json(filteredItems);
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Get popular menu items
router.get('/popular', async (req, res) => {
  try {
    const popularItems = mockMenuItems.filter(item => item.is_popular);
    res.json(popularItems);
  } catch (error) {
    console.error('Error fetching popular menu items:', error);
    res.status(500).json({ error: 'Failed to fetch popular menu items' });
  }
});

// Get menu categories
router.get('/categories', async (req, res) => {
  try {
    const categories = [...new Set(mockMenuItems.map(item => item.category))];
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = mockMenuItems.find(item => item.id === parseInt(id));
    
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
});

module.exports = router; 