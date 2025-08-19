const bcrypt = require('bcryptjs');
const pool = require('../src/config/database');

async function createNewAdmin() {
  console.log('🔧 Creating new admin user...');
  
  try {
    // Generate hash for admin123
    const passwordHash = await bcrypt.hash('admin123', 10);
    console.log('✅ Generated password hash');
    
    // Create new admin user
    const result = await pool.query(`
      INSERT INTO users (username, email, password_hash, role, first_name, last_name, is_active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      ON CONFLICT (username) DO UPDATE SET
        email = EXCLUDED.email,
        password_hash = EXCLUDED.password_hash,
        role = EXCLUDED.role,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        is_active = EXCLUDED.is_active,
        updated_at = NOW()
      RETURNING id, username, email, role
    `, ['admin2', 'admin2@sangeet.com', passwordHash, 'admin', 'Admin', 'User', true]);
    
    console.log('✅ New admin user created:', result.rows[0]);
    
    // Verify the password
    const verifyResult = await pool.query(
      'SELECT password_hash FROM users WHERE username = $1',
      ['admin2']
    );
    
    if (verifyResult.rows.length > 0) {
      const isValid = await bcrypt.compare('admin123', verifyResult.rows[0].password_hash);
      console.log('✅ Password verification test:', isValid ? 'PASSED' : 'FAILED');
    }
    
    console.log('\n📋 Login Credentials:');
    console.log('Username: admin2');
    console.log('Password: admin123');
    console.log('Email: admin2@sangeet.com');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

createNewAdmin();
