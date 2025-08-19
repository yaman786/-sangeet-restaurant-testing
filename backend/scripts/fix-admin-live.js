const bcrypt = require('bcryptjs');
const pool = require('../src/config/database');

async function fixAdminLive() {
  console.log('🔧 Fixing admin user credentials on live database...');
  
  try {
    // Test connection
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful:', result.rows[0]);

    // Create correct admin user
    console.log('👤 Creating correct admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Delete any old admin users with wrong email
    await pool.query(`DELETE FROM users WHERE email = 'admin@sangeetrestaurant.com'`);
    
    // Create the correct admin user
    const insertResult = await pool.query(`
      INSERT INTO users (username, email, password_hash, role, is_active, first_name, last_name)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (username) DO UPDATE SET
        email = EXCLUDED.email,
        password_hash = EXCLUDED.password_hash,
        role = EXCLUDED.role,
        is_active = EXCLUDED.is_active,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, username, email, role
    `, ['admin', 'admin@sangeet.com', hashedPassword, 'admin', true, 'Admin', 'User']);
    
    console.log('✅ Admin user fixed:', insertResult.rows[0]);
    console.log('📧 Username: admin');
    console.log('🔑 Password: admin123');
    console.log('📧 Email: admin@sangeet.com');

    // Also create kitchen staff user
    const kitchenResult = await pool.query(`
      INSERT INTO users (username, email, password_hash, role, is_active, first_name, last_name)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (username) DO UPDATE SET
        email = EXCLUDED.email,
        password_hash = EXCLUDED.password_hash,
        role = EXCLUDED.role,
        is_active = EXCLUDED.is_active,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, username, email, role
    `, ['kitchen', 'kitchen@sangeet.com', await bcrypt.hash('kitchen123', 10), 'staff', true, 'Kitchen', 'Staff']);
    
    console.log('✅ Kitchen staff user fixed:', kitchenResult.rows[0]);
    console.log('📧 Username: kitchen');
    console.log('🔑 Password: kitchen123');

    console.log('\n🎉 All credentials now match!');

  } catch (error) {
    console.error('❌ Fix failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
    console.log('\n🔚 Database connection closed');
    process.exit(0);
  }
}

fixAdminLive();
