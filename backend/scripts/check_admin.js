const pool = require('../src/config/database.js');
const bcrypt = require('bcryptjs');

async function checkAndCreateAdmin() {
  try {
    console.log('🔍 Checking for admin user...');
    
    // Check if admin user exists
    const adminCheck = await pool.query(`
      SELECT id, email, username, role 
      FROM users 
      WHERE email = 'admin@sangeet.com' OR role = 'admin'
    `);
    
    if (adminCheck.rows.length > 0) {
      console.log('✅ Admin user found:');
      adminCheck.rows.forEach(user => {
        console.log(`   - ${user.email} (${user.role})`);
      });
    } else {
      console.log('❌ No admin user found. Creating one...');
      
      // Hash the password
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      // Create admin user
      const createAdmin = await pool.query(`
        INSERT INTO users (username, email, password, role, is_active, created_at)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
        RETURNING id, email, username, role
      `, ['admin', 'admin@sangeet.com', hashedPassword, 'admin', true]);
      
      console.log('✅ Admin user created successfully:');
      console.log(`   - Email: ${createAdmin.rows[0].email}`);
      console.log(`   - Username: ${createAdmin.rows[0].username}`);
      console.log(`   - Role: ${createAdmin.rows[0].role}`);
      console.log('   - Password: admin123');
    }
    
    // Show all users
    const allUsers = await pool.query(`
      SELECT id, username, email, role, is_active, created_at
      FROM users
      ORDER BY created_at DESC
    `);
    
    console.log('\n📋 All users in database:');
    allUsers.rows.forEach(user => {
      console.log(`   - ${user.email} (${user.role}) - ${user.is_active ? 'Active' : 'Inactive'}`);
    });
    
  } catch (error) {
    console.error('❌ Error checking/creating admin:', error);
  } finally {
    await pool.end();
  }
}

checkAndCreateAdmin();
