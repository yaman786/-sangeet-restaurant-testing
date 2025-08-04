import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
  
      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sangeet-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-sangeet-300 mb-4">Contact Us</h1>
          <p className="text-sangeet-400 text-lg">Get in touch with us for reservations, feedback, or any questions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-sangeet-900 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-sangeet-300 mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h4 className="text-sangeet-300 font-semibold mb-1">Address</h4>
                    <p className="text-sangeet-400">Wanchai<br />Hong Kong</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <h4 className="text-sangeet-300 font-semibold mb-1">Phone</h4>
                    <p className="text-sangeet-400">+852 2345 6789</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <h4 className="text-sangeet-300 font-semibold mb-1">Email</h4>
                    <p className="text-sangeet-400">info@sangeethk.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🕒</div>
                  <div>
                    <h4 className="text-sangeet-300 font-semibold mb-1">Hours</h4>
                    <p className="text-sangeet-400">
                      Monday - Sunday<br />
                      6:00 PM - 11:00 PM<br />
                      <span className="text-sm text-sangeet-500">Last seating at 10:30 PM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-sangeet-900 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-sangeet-300 mb-6">Location</h3>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&h=400&fit=crop"
                  alt="Wanchai, Hong Kong - Sangeet Restaurant Location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-sangeet-neutral-900/90 backdrop-blur-md rounded-lg p-4 border border-sangeet-neutral-700">
                    <h4 className="text-sangeet-400 font-bold text-lg mb-1">📍 Sangeet Restaurant</h4>
                    <p className="text-sangeet-neutral-300 text-sm">Wanchai, Hong Kong</p>
                    <p className="text-sangeet-neutral-400 text-xs mt-1">Easy access via MTR and bus routes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-sangeet-900 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-sangeet-300 mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-sangeet-400 hover:text-sangeet-300 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-sangeet-400 hover:text-sangeet-300 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-sangeet-400 hover:text-sangeet-300 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-sangeet-900 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-sangeet-300 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sangeet-300 font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full px-4 py-3 bg-sangeet-800 border border-sangeet-700 rounded-lg text-sangeet-300 focus:outline-none focus:border-sangeet-300"
                    placeholder="Your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sangeet-300 font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="w-full px-4 py-3 bg-sangeet-800 border border-sangeet-700 rounded-lg text-sangeet-300 focus:outline-none focus:border-sangeet-300"
                    placeholder="Your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sangeet-300 font-medium mb-2">Email</label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-3 bg-sangeet-800 border border-sangeet-700 rounded-lg text-sangeet-300 focus:outline-none focus:border-sangeet-300"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sangeet-300 font-medium mb-2">Subject</label>
                <select
                  {...register('subject', { required: 'Subject is required' })}
                  className="w-full px-4 py-3 bg-sangeet-800 border border-sangeet-700 rounded-lg text-sangeet-300 focus:outline-none focus:border-sangeet-300"
                >
                  <option value="">Select a subject</option>
                  <option value="reservation">Reservation Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="general">General Question</option>
                  <option value="private-event">Private Event</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sangeet-300 font-medium mb-2">Message</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows="6"
                  className="w-full px-4 py-3 bg-sangeet-800 border border-sangeet-700 rounded-lg text-sangeet-300 focus:outline-none focus:border-sangeet-300"
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-sangeet-300 text-sangeet-900 py-3 rounded-lg font-semibold hover:bg-sangeet-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 