const express = require('express');
const router = express.Router();

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'Diwali Celebration',
    description: 'A night of music, dance, and special dishes to celebrate the Festival of Lights',
    date: '2024-11-12',
    image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    is_featured: true,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'Holi Festival',
    description: 'Join us for a colorful celebration with traditional sweets and special menu',
    date: '2025-03-08',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    is_featured: true,
    created_at: '2024-01-10T14:20:00Z'
  },
  {
    id: 3,
    title: 'Nepali New Year',
    description: 'Celebrate Nepali New Year with traditional dishes and cultural performances',
    date: '2025-04-14',
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    is_featured: false,
    created_at: '2024-01-08T19:15:00Z'
  },
  {
    id: 4,
    title: 'Chef\'s Table Experience',
    description: 'An exclusive dining experience with Chef Rajesh Kumar. Enjoy a 7-course tasting menu with wine pairings in our private dining room.',
    date: '2024-11-18',
    image_url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop',
    is_featured: true,
    created_at: '2024-01-05T12:45:00Z'
  },
  {
    id: 5,
    title: 'Bollywood Night',
    description: 'Dance the night away with live Bollywood music, traditional dance performances, and a special menu inspired by Indian cinema culture.',
    date: '2024-11-25',
    image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    is_featured: false,
    created_at: '2024-01-03T18:30:00Z'
  }
];

// Get all events
router.get('/', async (req, res) => {
  try {
    res.json(mockEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get featured events
router.get('/featured', async (req, res) => {
  try {
    const featuredEvents = mockEvents.filter(event => event.is_featured);
    res.json(featuredEvents);
  } catch (error) {
    console.error('Error fetching featured events:', error);
    res.status(500).json({ error: 'Failed to fetch featured events' });
  }
});

// Get upcoming events
router.get('/upcoming', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const upcomingEvents = mockEvents.filter(event => event.date >= today);
    res.json(upcomingEvents);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming events' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = mockEvents.find(event => event.id === parseInt(id));
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

module.exports = router; 