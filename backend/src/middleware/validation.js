const Joi = require('joi');

// Validation schemas
const reservationSchema = Joi.object({
  customer_name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional(),
  date: Joi.date().min('now').required(),
  time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  guests: Joi.number().integer().min(1).max(20).required(),
  special_requests: Joi.string().max(500).optional()
});

const reviewSchema = Joi.object({
  customer_name: Joi.string().min(2).max(100).required(),
  review_text: Joi.string().min(10).max(1000).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  image_url: Joi.string().uri().optional()
});

const newsletterSchema = Joi.object({
  email: Joi.string().email().required()
});

// Validation middleware
const validateReservation = (req, res, next) => {
  const { error } = reservationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: error.details[0].message 
    });
  }
  next();
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: error.details[0].message 
    });
  }
  next();
};

const validateNewsletter = (req, res, next) => {
  const { error } = newsletterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: error.details[0].message 
    });
  }
  next();
};

module.exports = {
  validateReservation,
  validateReview,
  validateNewsletter
}; 