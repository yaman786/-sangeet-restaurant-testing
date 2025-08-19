const { Pool } = require('pg');

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function fixAdmin() {
  console.log('🔧 Fixing admin user credentials...');
  
  try {
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');

    // Create correct admin user
    console.log('👤 Creating correct admin user...');
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Delete the old admin user if exists
    await pool.query(`DELETE FROM users WHERE email = 'admin@sangeetrestaurant.com'`);
    
    // Create the correct admin user
    await pool.query(`
      INSERT INTO users (username, email, password_hash, role, is_active)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (username) DO UPDATE SET
        email = EXCLUDED.email,
        password_hash = EXCLUDED.password_hash,
        role = EXCLUDED.role,
        is_active = EXCLUDED.is_active
    `, ['admin', 'admin@sangeet.com', hashedPassword, 'admin', true]);
    
    console.log('✅ Admin user fixed');
    console.log('📧 Username: admin');
    console.log('🔑 Password: admin123');
    console.log('📧 Email: admin@sangeet.com');

    console.log('\n🎉 Admin credentials now match local setup!');

  } catch (error) {
    console.error('❌ Fix failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
    console.log('\n🔚 Database connection closed');
    process.exit(0);
  }
}

fixAdmin();
