const bcrypt = require('bcryptjs');
const pool = require('../src/config/database');
const fs = require('fs').promises;
const path = require('path');

async function completeDatabaseReset() {
  console.log('🔄 Starting complete database reset...');
  
  try {
    // Step 1: Drop all existing tables
    console.log('🗑️  Dropping all existing tables...');
    await pool.query('DROP TABLE IF EXISTS customer_reviews CASCADE');
    await pool.query('DROP TABLE IF EXISTS reservations CASCADE');
    await pool.query('DROP TABLE IF EXISTS events CASCADE');
    await pool.query('DROP TABLE IF EXISTS menu_items CASCADE');
    await pool.query('DROP TABLE IF EXISTS categories CASCADE');
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
    console.log('✅ All tables dropped');

    // Step 2: Create users table first
    console.log('👥 Creating users table...');
    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        phone VARCHAR(20),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Step 3: Create categories table
    console.log('📂 Creating categories table...');
    await pool.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        display_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Categories table created');

    // Step 4: Create menu_items table
    console.log('🍽️  Creating menu_items table...');
    await pool.query(`
      CREATE TABLE menu_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(8,2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        category_id INTEGER REFERENCES categories(id),
        image_url TEXT,
        is_vegetarian BOOLEAN DEFAULT false,
        is_spicy BOOLEAN DEFAULT false,
        is_popular BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        allergens TEXT[],
        preparation_time INTEGER DEFAULT 15,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Menu items table created');

    // Step 5: Create other tables
    console.log('📝 Creating other tables...');
    await pool.query(`
      CREATE TABLE customer_reviews (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        review_text TEXT NOT NULL,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        image_url TEXT,
        order_id INTEGER,
        table_number VARCHAR(10),
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE reservations (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        date DATE NOT NULL,
        time TIME NOT NULL,
        guests INTEGER NOT NULL,
        special_requests TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE NOT NULL,
        image_url TEXT,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ All tables created');

    // Step 6: Create indexes
    console.log('🔍 Creating indexes...');
    await pool.query('CREATE INDEX idx_users_username ON users(username)');
    await pool.query('CREATE INDEX idx_users_email ON users(email)');
    await pool.query('CREATE INDEX idx_users_role ON users(role)');
    await pool.query('CREATE INDEX idx_menu_items_category ON menu_items(category)');
    await pool.query('CREATE INDEX idx_menu_items_popular ON menu_items(is_popular)');
    await pool.query('CREATE INDEX idx_menu_items_category_id ON menu_items(category_id)');
    await pool.query('CREATE INDEX idx_menu_items_is_active ON menu_items(is_active)');
    await pool.query('CREATE INDEX idx_categories_is_active ON categories(is_active)');
    await pool.query('CREATE INDEX idx_reservations_date ON reservations(date)');
    await pool.query('CREATE INDEX idx_events_date ON events(date)');
    await pool.query('CREATE INDEX idx_events_featured ON events(is_featured)');
    console.log('✅ Indexes created');

    // Step 7: Insert default categories
    console.log('📂 Inserting default categories...');
    await pool.query(`
      INSERT INTO categories (name, description, display_order) VALUES
      ('Appetizers', 'Start your meal with our delicious appetizers', 1),
      ('Main Course', 'Our signature main dishes', 2),
      ('Biryani', 'Authentic Indian biryani varieties', 3),
      ('Breads', 'Freshly baked Indian breads', 4),
      ('Rice & Noodles', 'Aromatic rice and noodle dishes', 5),
      ('Desserts', 'Sweet endings to your meal', 6),
      ('Beverages', 'Refreshing drinks and beverages', 7),
      ('Sides', 'Perfect accompaniments', 8)
    `);
    console.log('✅ Categories inserted');

    // Step 8: Insert sample menu items
    console.log('🍽️  Inserting sample menu items...');
    await pool.query(`
      INSERT INTO menu_items (name, description, price, category, image_url, is_vegetarian, is_spicy, is_popular) VALUES
      ('Samosa', 'Crispy pastry filled with spiced potatoes and peas', 8.50, 'Appetizers', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', true, false, true),
      ('Pakora', 'Mixed vegetable fritters with chickpea flour', 7.50, 'Appetizers', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', true, false, false),
      ('Chicken Tikka', 'Tender chicken marinated in yogurt and spices', 12.00, 'Appetizers', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop', false, true, true),
      ('Butter Chicken', 'Creamy tomato-based curry with tender chicken', 28.00, 'Main Course', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop', false, false, true),
      ('Palak Paneer', 'Spinach curry with fresh cheese cubes', 22.00, 'Main Course', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', true, false, false),
      ('Lamb Biryani', 'Fragrant rice dish with tender lamb', 32.00, 'Biryani', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', false, true, true),
      ('Naan', 'Soft leavened bread baked in tandoor', 4.50, 'Breads', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', true, false, true),
      ('Gulab Jamun', 'Sweet milk dumplings in rose syrup', 8.00, 'Desserts', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', true, false, true),
      ('Masala Chai', 'Spiced Indian tea with milk', 4.00, 'Beverages', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', true, false, true)
    `);
    console.log('✅ Menu items inserted');

    // Step 9: Insert sample reviews
    console.log('⭐ Inserting sample reviews...');
    await pool.query(`
      INSERT INTO customer_reviews (customer_name, review_text, rating, image_url, is_verified) VALUES
      ('Anika Sharma', 'Sangeet offers an unparalleled dining experience. The Butter Chicken is a must-try! ★★★★★', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', true),
      ('Rohan Kapoor', 'The ambiance is lovely, and the food is generally good. I especially enjoyed the momos. ★★★★', 4, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', true),
      ('Priya Patel', 'Authentic flavors that remind me of home. The service is excellent and the atmosphere is perfect for family dinners. ★★★★★', 5, 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', true)
    `);
    console.log('✅ Reviews inserted');

    // Step 10: Insert sample events
    console.log('🎉 Inserting sample events...');
    await pool.query(`
      INSERT INTO events (title, description, date, image_url, is_featured) VALUES
      ('Diwali Celebration', 'A night of music, dance, and special dishes to celebrate the Festival of Lights', '2024-11-12', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', true),
      ('Holi Festival', 'Join us for a colorful celebration with traditional sweets and special menu', '2025-03-08', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', true)
    `);
    console.log('✅ Events inserted');

    // Step 11: Create admin user with proper password
    console.log('👤 Creating admin user...');
    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    await pool.query(`
      INSERT INTO users (username, email, password_hash, role, first_name, last_name) VALUES 
      ('admin', 'admin@sangeet.com', $1, 'admin', 'Admin', 'User')
    `, [adminPasswordHash]);
    console.log('✅ Admin user created');

    // Step 12: Create kitchen staff user
    console.log('👨‍🍳 Creating kitchen staff user...');
    const kitchenPasswordHash = await bcrypt.hash('kitchen123', 10);
    await pool.query(`
      INSERT INTO users (username, email, password_hash, role, first_name, last_name) VALUES 
      ('kitchen', 'kitchen@sangeet.com', $1, 'staff', 'Kitchen', 'Staff')
    `, [kitchenPasswordHash]);
    console.log('✅ Kitchen staff user created');

    // Step 13: Verify everything
    console.log('🔍 Verifying database setup...');
    
    const userCount = await pool.query('SELECT COUNT(*) FROM users');
    const menuCount = await pool.query('SELECT COUNT(*) FROM menu_items');
    const categoryCount = await pool.query('SELECT COUNT(*) FROM categories');
    const reviewCount = await pool.query('SELECT COUNT(*) FROM customer_reviews');
    const eventCount = await pool.query('SELECT COUNT(*) FROM events');
    
    console.log('📊 Database Summary:');
    console.log(`   Users: ${userCount.rows[0].count}`);
    console.log(`   Menu Items: ${menuCount.rows[0].count}`);
    console.log(`   Categories: ${categoryCount.rows[0].count}`);
    console.log(`   Reviews: ${reviewCount.rows[0].count}`);
    console.log(`   Events: ${eventCount.rows[0].count}`);

    // Step 14: Test admin login
    console.log('🔐 Testing admin login...');
    const adminUser = await pool.query('SELECT password_hash FROM users WHERE username = $1', ['admin']);
    if (adminUser.rows.length > 0) {
      const isValid = await bcrypt.compare('admin123', adminUser.rows[0].password_hash);
      console.log('✅ Admin password verification:', isValid ? 'PASSED' : 'FAILED');
    }

    console.log('\n🎉 Database reset completed successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('👤 Admin: admin / admin123');
    console.log('👨‍🍳 Kitchen: kitchen / kitchen123');
    console.log('📧 Admin Email: admin@sangeet.com');
    console.log('📧 Kitchen Email: kitchen@sangeet.com');

  } catch (error) {
    console.error('❌ Database reset failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

completeDatabaseReset();
