import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { createReservation, getAvailableTimeSlots } from '../services/api';

const ReservationsPage = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    special_requests: ''
  });
  
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  // Date constraints
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // Define functions first
  const loadAvailableTimeSlots = useCallback(async () => {
    try {
      setCheckingAvailability(true);
      console.log('Loading time slots for date:', formData.date, 'guests:', formData.guests);
      
      const timeSlots = await getAvailableTimeSlots(formData.date, formData.guests);
      console.log('Time slots received:', timeSlots);
      
      if (Array.isArray(timeSlots)) {
        setAvailableTimeSlots(timeSlots);
        console.log('Time slots set successfully:', timeSlots.length, 'slots');
      } else {
        console.error('Time slots response is not an array:', timeSlots);
        setAvailableTimeSlots([]);
        toast.error('Invalid time slots response from server');
      }
    } catch (error) {
      console.error('Error loading time slots:', error);
      toast.error('Failed to load available time slots: ' + (error.message || 'Unknown error'));
      setAvailableTimeSlots([]);
    } finally {
      setCheckingAvailability(false);
    }
  }, [formData.date, formData.guests]);



  // Load available time slots when date changes
  useEffect(() => {
    console.log('useEffect triggered - date:', formData.date, 'guests:', formData.guests);
    if (formData.date) {
      console.log('Loading time slots for date:', formData.date);
      loadAvailableTimeSlots();
    } else {
      console.log('No date selected, clearing time slots');
      setAvailableTimeSlots([]);
    }
  }, [formData.date, formData.guests, loadAvailableTimeSlots]);

  // Reset time when date changes
  useEffect(() => {
    if (formData.date) {
      setFormData(prev => ({ ...prev, time: '' }));
    }
  }, [formData.date]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input change - name:', name, 'value:', value);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeDropdownClick = () => {
    // If no date is selected, use today's date as default
    if (!formData.date) {
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: today }));
      console.log('Auto-selected today as default date:', today);
    }
    
    // Load time slots if not already loading
    if (!checkingAvailability && availableTimeSlots.length === 0) {
      const dateToUse = formData.date || new Date().toISOString().split('T')[0];
      console.log('Loading time slots for date:', dateToUse);
      getAvailableTimeSlots(dateToUse, formData.guests)
        .then(timeSlots => {
          if (Array.isArray(timeSlots)) {
            setAvailableTimeSlots(timeSlots);
            console.log('Time slots loaded on dropdown click:', timeSlots.length);
          }
        })
        .catch(error => {
          console.error('Error loading time slots on dropdown click:', error);
        });
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customer_name || !formData.email || !formData.date || !formData.time || !formData.guests) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const reservationData = {
        ...formData,
        status: 'pending' // Admin will assign table later
      };

      const result = await createReservation(reservationData);
      
      setConfirmationCode(result.confirmation_code);
      toast.success('Reservation request submitted successfully! We\'ll send you a confirmation email within 24 hours.');
      
      setFormData({
        customer_name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        special_requests: ''
      });
      setAvailableTimeSlots([]);
      
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error(error.response?.data?.error || 'Failed to submit reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen bg-sangeet-neutral-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-sangeet-neutral-900 via-sangeet-neutral-800 to-sangeet-neutral-900 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sangeet-400 mb-6">
              Make a Reservation
            </h1>
            <p className="text-xl text-sangeet-neutral-300 max-w-3xl mx-auto">
              Book your table at Sangeet Restaurant and experience authentic Nepali cuisine in a warm, welcoming atmosphere
            </p>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      {confirmationCode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-sangeet-neutral-900 rounded-2xl p-8 max-w-md w-full border border-sangeet-neutral-700"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-sangeet-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-sangeet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-sangeet-400 mb-4">Reservation Confirmed!</h3>
              <p className="text-sangeet-neutral-300 mb-6">
                Your reservation request has been submitted. We'll review your details and send you a confirmation email within 24 hours.
              </p>

              <button
                onClick={() => setConfirmationCode('')}
                className="w-full bg-sangeet-400 text-sangeet-neutral-950 font-bold py-3 px-6 rounded-xl hover:bg-sangeet-300 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-sangeet-neutral-900 rounded-2xl border border-sangeet-neutral-700 p-8"
            >
              <h2 className="text-3xl font-bold text-sangeet-400 mb-8">Reservation Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-sangeet-neutral-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-sangeet-neutral-800 border border-sangeet-neutral-600 rounded-xl text-sangeet-neutral-100 placeholder-sangeet-neutral-500 focus:outline-none focus:ring-2 focus:ring-sangeet-400 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-sangeet-neutral-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-sangeet-neutral-800 border border-sangeet-neutral-600 rounded-xl text-sangeet-neutral-100 placeholder-sangeet-neutral-500 focus:outline-none focus:ring-2 focus:ring-sangeet-400 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-sangeet-neutral-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-sangeet-neutral-800 border border-sangeet-neutral-600 rounded-xl text-sangeet-neutral-100 placeholder-sangeet-neutral-500 focus:outline-none focus:ring-2 focus:ring-sangeet-400 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-sangeet-neutral-300 mb-2">
                      Number of Guests *
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-sangeet-neutral-800 border border-sangeet-neutral-600 rounded-xl text-sangeet-neutral-100 focus:outline-none focus:ring-2 focus:ring-sangeet-400 focus:border-transparent"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-sangeet-neutral-300 mb-2">
                      Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={today}
                        max={maxDateStr}
                        className="w-full px-4 py-3 bg-sangeet-neutral-800 border border-sangeet-neutral-600 rounded-xl text-sangeet-neutral-100 focus:outline-none focus:ring-2 focus:ring-sangeet-400 focus:border-transparent [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-sangeet-neutral-300 mb-2">
                      Time *
                    </label>
                    <div className="relative">
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        onClick={handleTimeDropdownClick}
                        className="w-full px-4 py-3 bg-sangeet-neutral-800 border border-sangeet-neutral-600 rounded-xl text-sangeet-neutral-100 focus:outline-none focus:ring-2 focus:ring-sangeet-400 focus:border-transparent appearance-none cursor-pointer"
                        required
                        disabled={checkingAvailability}
                      >
                        <option value="">⏰ Select a time</option>
                        {checkingAvailability && (
                          <option value="" disabled>🔄 Loading time slots...</option>
                        )}
                        {!checkingAvailability && availableTimeSlots.length === 0 && formData.date && (
                          <option value="" disabled>⚠️ No time slots available</option>
                        )}
                        {availableTimeSlots.map(slot => (
                          <option key={slot.time_slot} value={slot.time_slot}>
                            {new Date(`2000-01-01T${slot.time_slot}`).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </option>
                        ))}
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-sangeet-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Status messages */}
                    {checkingAvailability && (
                      <div className="flex items-center mt-2 text-sm text-sangeet-neutral-400">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sangeet-400 mr-2"></div>
                        🔄 Loading time slots...
                      </div>
                    )}
                    
                    {!checkingAvailability && availableTimeSlots.length === 0 && formData.date && (
                      <div className="mt-2 text-sm text-sangeet-neutral-500">
                        <span className="text-yellow-400">⚠️</span> No times available for this date
                      </div>
                    )}
                    

                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-sangeet-neutral-300 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    name="special_requests"
                    value={formData.special_requests}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-sangeet-neutral-800 border border-sangeet-neutral-600 rounded-xl text-sangeet-neutral-100 placeholder-sangeet-neutral-500 focus:outline-none focus:ring-2 focus:ring-sangeet-400 focus:border-transparent"
                    placeholder="Any special requests or dietary requirements..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-sangeet-400 text-sangeet-neutral-950 font-bold py-4 px-6 rounded-xl hover:bg-sangeet-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-sangeet-neutral-950 mr-2"></div>
                        📝 Submitting Request...
                      </div>
                    ) : (
                      '📋 Submit Reservation Request'
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-sangeet-neutral-900 rounded-2xl border border-sangeet-neutral-700 p-6"
            >
              <h3 className="text-xl font-bold text-sangeet-400 mb-4 flex items-center">
                <span className="mr-2">📋</span> How It Works
              </h3>
                            <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sangeet-400 text-sangeet-neutral-950 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="text-sangeet-neutral-300 text-sm">
                      Fill out your reservation details below
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sangeet-400 text-sangeet-neutral-950 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="text-sangeet-neutral-300 text-sm">
                      Submit your request and receive a success message
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sangeet-400 text-sangeet-neutral-950 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="text-sangeet-neutral-300 text-sm">
                      We'll review your request and send you a confirmation email within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Restaurant Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-sangeet-neutral-900 rounded-2xl border border-sangeet-neutral-700 p-6"
            >
              <h3 className="text-xl font-bold text-sangeet-400 mb-4 flex items-center">
                <span className="mr-2">🏪</span> Restaurant Info
              </h3>
              <div className="space-y-3 text-sm text-sangeet-neutral-300">
                <div className="flex items-center space-x-2">
                  <span className="text-sangeet-400">🕒</span>
                  <span>Open: 11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sangeet-400">📞</span>
                  <span>Call: (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sangeet-400">📧</span>
                  <span>Email: info@sangeet.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sangeet-400">📍</span>
                  <span>123 Main Street, City, State</span>
                </div>
              </div>
            </motion.div>

            {/* Reservation Policy */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-sangeet-neutral-900 rounded-2xl border border-sangeet-neutral-700 p-6"
            >
              <h3 className="text-xl font-bold text-sangeet-400 mb-4 flex items-center">
                <span className="mr-2">ℹ️</span> Reservation Policy
              </h3>
              <div className="space-y-2 text-sm text-sangeet-neutral-300">
                <p>• Reservations are held for 15 minutes</p>
                <p>• Cancellations: 2 hours notice required</p>
                <p>• Large groups: Please call ahead</p>
                <p>• Special requests: Mention in form</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>


     </div>
   );
 };

export default ReservationsPage; 