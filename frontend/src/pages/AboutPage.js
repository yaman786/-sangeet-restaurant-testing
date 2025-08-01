import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo.png';

const AboutPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      title: "Elegant Dining Hall",
      description: "Our main dining area with warm lighting and traditional South Asian decor"
    },
    {
      url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
      title: "Private Dining Room",
      description: "Intimate private dining spaces perfect for special occasions"
    },
    {
      url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
      title: "Chef's Kitchen",
      description: "Where authentic flavors come to life with traditional cooking methods"
    },
    {
      url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
      title: "Bar & Lounge",
      description: "Relax with premium spirits and handcrafted cocktails"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      title: "Outdoor Terrace",
      description: "Al fresco dining with views of Wanchai's vibrant atmosphere"
    },
    {
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      title: "Cultural Performances",
      description: "Live music and dance performances that bring South Asian culture to life"
    }
  ];

  const experienceImages = [
    {
      url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
      title: "Lunch Buffet",
      description: "50+ authentic dishes from across South Asia"
    },
    {
      url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
      title: "Fine Dining",
      description: "Curated evening menu with wine pairings"
    },
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      title: "Afternoon Tea",
      description: "Premium teas from the Himalayas and India"
    }
  ];

  return (
    <div className="min-h-screen bg-sangeet-neutral-950">
      {/* Enhanced Hero Section with Video */}
      <section className="relative h-screen overflow-hidden">
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
            {/* Fallback image if video doesn't load */}
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop" 
              alt="Restaurant ambiance"
              className="w-full h-full object-cover"
            />
          </video>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sangeet-neutral-900/80 via-sangeet-neutral-800/70 to-sangeet-neutral-900/80 z-10"></div>
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 flex items-center justify-center h-full text-center text-white px-4"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-sangeet-400/20 to-sangeet-red-500/20 rounded-full blur-2xl animate-pulse"></div>
                <img 
                  src={logo} 
                  alt="Sangeet Restaurant" 
                  className="relative h-24 md:h-32 w-auto logo-image-hero"
                />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="text-white">Experience</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sangeet-400 to-sangeet-red-500">
                Authentic Flavors
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed"
            >
              Where the soul of South Asia comes alive in the heart of Wanchai. 
              <span className="text-sangeet-400 font-semibold"> An immersive celebration of culture, community, and connection.</span>
            </motion.p>

            {/* Mobile-Optimized Action Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {/* Book Now Button - Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 px-8 py-4 rounded-2xl font-bold text-lg hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-2xl hover:shadow-sangeet-400/30 touch-manipulation min-h-[56px]"
              >
                <span className="text-2xl">📅</span>
                <span>Book Now</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>

              {/* WhatsApp Button - Secondary CTA */}
              <motion.a
                href="https://wa.me/85223456789?text=Hi! I'd like to make a reservation at Sangeet Restaurant."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-2xl hover:shadow-green-500/30 touch-manipulation min-h-[56px]"
              >
                <span className="text-2xl">💬</span>
                <span>WhatsApp</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center space-y-2 text-sangeet-neutral-400">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-sangeet-neutral-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-sangeet-neutral-400 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Restaurant Gallery Section */}
      <section className="py-20 bg-sangeet-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-sangeet-400 mb-4">Our Spaces</h2>
            <p className="text-sangeet-neutral-400 text-lg max-w-3xl mx-auto">
              Discover the carefully crafted environments that make every visit to Sangeet a memorable experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/80 via-transparent to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-sangeet-400 transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-sangeet-neutral-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-sangeet-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section with Enhanced Visuals */}
      <section className="py-20 bg-sangeet-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-8">
                <img 
                  src={logo} 
                  alt="Sangeet Restaurant" 
                  className="h-16 w-auto mr-4 opacity-75"
                />
                <h2 className="text-4xl md:text-5xl font-bold text-sangeet-400">Our Story</h2>
              </div>
              
              <div className="space-y-8 text-sangeet-neutral-400 text-lg">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-sangeet-400 mb-4">A Feast for the Senses</h3>
                  <p className="leading-relaxed text-lg">
                    Step into our 5,300 sq. ft oasis, where the aromas of authentic South Asian cuisine mingle with the rhythm of live cultural performances. From the lush valleys of Nepal to the bustling spice markets of India, our chefs craft a culinary journey that honours regional diversity.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-sangeet-400 mb-4">Your Space for Every Occasion</h3>
                  <p className="leading-relaxed text-lg">
                    With 150 seats and three elegant private dining rooms, Sangeet is designed to host life's milestones. Whether it's a weaning ceremony steeped in tradition, a joyful birthday gathering, a dream wedding, or a corporate event, our team provides bespoke experiences infused with warmth and authenticity.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-sangeet-400 mb-4">Where Heritage Meets Modernity</h3>
                  <p className="leading-relaxed text-lg">
                    Nestled in Wanchai's bustling centre, Sangeet bridges the timeless and the contemporary. We invite you to dine, celebrate, and lose yourself in the rhythm of South Asia—one unforgettable moment at a time.
                  </p>
                </div>
                
                <div className="text-center pt-8">
                  <p className="text-3xl font-bold text-sangeet-400 italic">
                    Come. Savor. Celebrate.
                  </p>
                  <p className="text-lg text-sangeet-neutral-400 mt-3">
                    At Sangeet, every day is a festival.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="overflow-hidden rounded-2xl"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
                      alt="Chef preparing authentic dishes"
                      className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="overflow-hidden rounded-2xl"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop"
                      alt="Elegant dining atmosphere"
                      className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                </div>
                <div className="space-y-4 pt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="overflow-hidden rounded-2xl"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
                      alt="Restaurant interior"
                      className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="overflow-hidden rounded-2xl"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop"
                      alt="Cultural performance"
                      className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dining Experiences Section */}
      <section className="py-20 bg-gradient-to-br from-sangeet-neutral-900 via-sangeet-neutral-800 to-sangeet-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-sangeet-400 mb-4">Dining Experiences</h2>
            <p className="text-sangeet-neutral-400 text-lg max-w-3xl mx-auto">
              From lavish buffets to intimate fine dining, discover the perfect experience for every occasion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experienceImages.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-sangeet-400/20 transition-all duration-500 border border-sangeet-neutral-700 hover:border-sangeet-400"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={experience.url}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-sangeet-400 mb-4 group-hover:text-sangeet-300 transition-colors">
                    {experience.title}
                  </h3>
                  <p className="text-sangeet-neutral-400 mb-6 leading-relaxed">
                    {experience.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 py-3 rounded-xl font-semibold hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-lg hover:shadow-sangeet-400/25"
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-sangeet-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-sangeet-400 mb-4">Our Values</h2>
            <p className="text-sangeet-neutral-400 text-lg max-w-3xl mx-auto">The principles that guide everything we do and make Sangeet truly special</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌿",
                title: "Authenticity",
                description: "We stay true to traditional recipes and cooking methods, ensuring every dish carries the authentic flavors of India and Nepal.",
                image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
              },
              {
                icon: "❤️",
                title: "Passion",
                description: "Our love for food drives us to create exceptional dining experiences that leave lasting memories.",
                image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop"
              },
              {
                icon: "🤝",
                title: "Hospitality",
                description: "We treat every guest like family, providing warm, attentive service that makes you feel at home.",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-sangeet-400/20 transition-all duration-500 border border-sangeet-neutral-700 hover:border-sangeet-400"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sangeet-neutral-900/60 to-transparent"></div>
                </div>
                <div className="p-8 text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-sangeet-400 mb-4 group-hover:text-sangeet-300 transition-colors">{value.title}</h3>
                  <p className="text-sangeet-neutral-400 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-sangeet-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-sangeet-400 mb-4">Meet Our Team</h2>
            <p className="text-sangeet-neutral-400 text-lg max-w-3xl mx-auto">The passionate individuals who bring the authentic flavors of South Asia to life</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Chef Rajesh Sharma",
                role: "Head Chef & Founder",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
                description: "With over 20 years of culinary experience, Chef Rajesh brings authentic flavors from his native India.",
                specialty: "Traditional Indian Cuisine"
              },
              {
                name: "Priya Patel",
                role: "Sous Chef",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
                description: "Specializing in Nepali cuisine, Priya ensures every dish meets our high standards of excellence.",
                specialty: "Nepali Specialties"
              },
              {
                name: "Amit Kumar",
                role: "Restaurant Manager",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
                description: "Amit ensures every guest receives exceptional service and a memorable dining experience.",
                specialty: "Guest Experience"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-2xl p-8 shadow-2xl hover:shadow-sangeet-400/20 transition-all duration-500 border border-sangeet-neutral-700 hover:border-sangeet-400"
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-40 h-40 rounded-full mx-auto overflow-hidden border-4 border-sangeet-400/20 group-hover:border-sangeet-400/40 transition-all duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-sangeet-400 text-sangeet-neutral-950 px-4 py-1 rounded-full text-sm font-semibold">
                      {member.specialty}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-sangeet-400 mb-2 group-hover:text-sangeet-300 transition-colors">{member.name}</h3>
                  <p className="text-sangeet-neutral-400 font-medium mb-4">{member.role}</p>
                  <p className="text-sangeet-neutral-400 leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-gradient-to-br from-sangeet-neutral-950 via-sangeet-neutral-900 to-sangeet-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-sangeet-400 mb-4">Recognition & Awards</h2>
            <p className="text-sangeet-neutral-400 text-lg max-w-3xl mx-auto">Celebrating our achievements and commitment to culinary excellence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                year: "2024", 
                award: "Best Indian Restaurant", 
                source: "Hong Kong Food Awards",
                icon: "🏆",
                description: "Recognized for authentic flavors and exceptional dining experience"
              },
              { 
                year: "2023", 
                award: "Excellence in Service", 
                source: "Restaurant Association",
                icon: "⭐",
                description: "Awarded for outstanding hospitality and guest satisfaction"
              },
              { 
                year: "2022", 
                award: "Chef of the Year", 
                source: "Culinary Institute",
                icon: "👨‍🍳",
                description: "Chef Rajesh honored for culinary innovation and tradition"
              },
              { 
                year: "2021", 
                award: "Customer Choice", 
                source: "OpenTable",
                icon: "❤️",
                description: "Voted favorite by thousands of satisfied diners"
              }
            ].map((award, index) => (
              <motion.div
                key={award.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-gradient-to-br from-sangeet-neutral-900 to-sangeet-neutral-800 rounded-2xl p-8 shadow-2xl hover:shadow-sangeet-400/20 transition-all duration-500 border border-sangeet-neutral-700 hover:border-sangeet-400 text-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {award.icon}
                </div>
                <div className="text-3xl font-bold text-sangeet-400 mb-3 group-hover:text-sangeet-300 transition-colors">
                  {award.year}
                </div>
                <h3 className="text-xl font-bold text-sangeet-400 mb-3 group-hover:text-sangeet-300 transition-colors">
                  {award.award}
                </h3>
                <p className="text-sangeet-neutral-400 font-medium mb-4">
                  {award.source}
                </p>
                <p className="text-sangeet-neutral-500 text-sm leading-relaxed">
                  {award.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-sangeet-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-sangeet-400 mb-6">
              Experience Sangeet Today
            </h2>
            <p className="text-sangeet-neutral-400 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Join us for an unforgettable journey through the authentic flavors and warm hospitality of South Asia
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Primary CTA - Book Table */}
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-sangeet-400 to-sangeet-500 text-sangeet-neutral-950 px-10 py-4 rounded-2xl font-bold text-xl hover:from-sangeet-300 hover:to-sangeet-400 transition-all duration-300 shadow-2xl hover:shadow-sangeet-400/30"
              >
                <span className="text-2xl">📅</span>
                <span>Book Your Table</span>
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
              
              {/* Secondary CTA - View Menu */}
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 border-2 border-sangeet-red-500 text-sangeet-red-400 px-10 py-4 rounded-2xl font-bold text-xl hover:bg-sangeet-red-500 hover:text-white transition-all duration-300 shadow-2xl hover:shadow-sangeet-red-500/30"
              >
                <span className="text-2xl">🍽️</span>
                <span>View Menu</span>
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 