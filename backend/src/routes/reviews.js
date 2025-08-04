const express = require('express');
const router = express.Router();

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    customer_name: 'Anika Sharma',
    review_text: 'Sangeet offers an unparalleled dining experience. The Butter Chicken is a must-try! ★★★★★',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    is_verified: true,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    customer_name: 'Rohan Kapoor',
    review_text: 'The ambiance is lovely, and the food is generally good. I especially enjoyed the momos. ★★★★',
    rating: 4,
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    is_verified: true,
    created_at: '2024-01-10T14:20:00Z'
  },
  {
    id: 3,
    customer_name: 'Priya Patel',
    review_text: 'Authentic flavors that remind me of home. The service is excellent and the atmosphere is perfect for family dinners. ★★★★★',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    is_verified: true,
    created_at: '2024-01-08T19:15:00Z'
  },
  {
    id: 4,
    customer_name: 'David Chen',
    review_text: 'Great fusion of Indian and Nepali cuisine. The biryani was exceptional! ★★★★',
    rating: 4,
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    is_verified: true,
    created_at: '2024-01-05T12:45:00Z'
  },
  {
    id: 5,
    customer_name: 'Sarah Johnson',
    review_text: 'Lovely vegetarian options. The palak paneer was delicious and the naan was perfect. ★★★★★',
    rating: 5,
    image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    is_verified: true,
    created_at: '2024-01-03T18:30:00Z'
  }
];

// Get all reviews
router.get('/', async (req, res) => {
  try {
    res.json(mockReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get verified reviews
router.get('/verified', async (req, res) => {
  try {
    const verifiedReviews = mockReviews.filter(review => review.is_verified);
    res.json(verifiedReviews);
  } catch (error) {
    console.error('Error fetching verified reviews:', error);
    res.status(500).json({ error: 'Failed to fetch verified reviews' });
  }
});

// Submit a new review
router.post('/', async (req, res) => {
  try {
    const { customer_name, review_text, rating, image_url } = req.body;
    
    const newReview = {
      id: mockReviews.length + 1,
      customer_name,
      review_text,
      rating,
      image_url: image_url || null,
      is_verified: false,
      created_at: new Date().toISOString()
    };
    
    mockReviews.push(newReview);
    
    res.status(201).json({
      message: 'Review submitted successfully',
      review: newReview
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// Get single review
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = mockReviews.find(review => review.id === parseInt(id));
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
});

module.exports = router; 