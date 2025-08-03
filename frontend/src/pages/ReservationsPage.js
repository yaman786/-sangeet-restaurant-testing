import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ReservationsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would normally send the data to your API
      console.log('Reservation data:', data);
      
      toast.success('Reservation submitted successfully! We will contact you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to submit reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sangeet-neutral-950 py-20">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop"
          alt="Elegant restaurant dining experience"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sangeet-neutral-950 via-sangeet-neutral-950/95 to-sangeet-neutral-950"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sangeet-400/20 to-sangeet-red-500/20 backdrop-blur-md border border-sangeet-400/30 rounded-full px-6 py-2 mb-4">
            <span className="text-2xl">📅</span>
            <span className="text-sangeet-400 font-semibold">Reservations</span>
          </div>
          <h1 className="text-5xl font-bold text-sangeet-400 mb-4">Make a Reservation</h1>
          <p className="text-sangeet-neutral-400 text-lg">Book your table for an unforgettable dining experience</p>
        </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-sangeet-neutral-900 p-6 md:p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-sangeet-300 mb-6">Reservation Details</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sangeet-neutral-300 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 bg-sangeet-800 border border-sangeet-700 rounded-lg text-sangeet-300 focus:outline-none focus:border-sangeet-300 touch-manipulation"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
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
                    className="w-full px-4 py-3 bg-sangeet-800 border border-sangeet-700 rounded-lg text-sangeet-300 focus:outline-none focus:border-sangeet-300 touch-manipulation"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sangeet-300 font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone is required' })}
                    className="w-full px-4 py-3 bg-sangeet-800 border border-sangeet-700 rounded-lg text-sangeet-300 focus:outline-none focus:border-sangeet-300"
                    placeholder="+852 1234 5678"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sangeet-300 font-medium mb-2">Number of Guests</label>
                  <select
                    {...register('guests', { required: 'Number of guests is required' })}
                    className="w-full px-4 py-3 bg-sangeet-800 border border-sangeet-700 rounded-lg text-sangeet-300 focus:outline-none focus:border-sangeet-300"
                  >
                    <option value="">Select guests</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                  {errors.guests && (
                    <p className="text-red-400 text-sm mt-1">{errors.guests.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sangeet-300 font-medium mb-2">Date</label>
                  <input
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    className="w-full px-4 py-3 bg-sangeet-800 border border-sangeet-700 rounded-lg text-sangeet-300 focus:outline-none focus:border-sangeet-300"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.date && (
                    <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sangeet-300 font-medium mb-2">Time</label>
                  <select
                    {...register('time', { required: 'Time is required' })}
                    className="w-full px-4 py-3 bg-sangeet-800 border border-sangeet-700 rounded-lg text-sangeet-300 focus:outline-none focus:border-sangeet-300"
                  >
                    <option value="">Select time</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="21:30">9:30 PM</option>
                    <option value="22:00">10:00 PM</option>
                  </select>
                  {errors.time && (
                    <p className="text-red-400 text-sm mt-1">{errors.time.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sangeet-300 font-medium mb-2">Special Requests</label>
                <textarea
                  {...register('specialRequests')}
                  rows="4"
                  className="w-full px-4 py-3 bg-sangeet-800 border border-sangeet-700 rounded-lg text-sangeet-300 focus:outline-none focus:border-sangeet-300"
                  placeholder="Any special requests or dietary requirements..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-sangeet-300 text-sangeet-900 py-3 rounded-lg font-semibold hover:bg-sangeet-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Book Reservation'}
              </motion.button>
            </form>
          </motion.div>

          {/* Restaurant Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-sangeet-900 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-sangeet-300 mb-4">Restaurant Hours</h3>
              <div className="space-y-2 text-sangeet-400">
                <p><span className="font-medium">Monday - Sunday:</span> 6:00 PM - 11:00 PM</p>
                <p className="text-sm text-sangeet-500">Last seating at 10:30 PM</p>
              </div>
            </div>

            <div className="bg-sangeet-900 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-sangeet-300 mb-4">Contact Information</h3>
              <div className="space-y-3 text-sangeet-400">
                <p>📍 Wanchai, Hong Kong</p>
                <p>📞 +852 2345 6789</p>
                <p>✉️ info@sangeethk.com</p>
              </div>
            </div>

            <div className="bg-sangeet-900 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-sangeet-300 mb-4">Reservation Policy</h3>
              <ul className="space-y-2 text-sangeet-400 text-sm">
                <li>• Reservations are held for 15 minutes past the booking time</li>
                <li>• Cancellations must be made 24 hours in advance</li>
                <li>• Large groups (8+ people) require 48 hours notice</li>
                <li>• We accommodate dietary restrictions with advance notice</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage; 