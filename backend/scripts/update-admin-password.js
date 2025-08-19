const bcrypt = require('bcryptjs');
const pool = require('../src/config/database');

async function updateAdminPassword() {
  console.log('🔧 Updating admin password...');
  
  try {
    // Use the verified hash for admin123
    const newHash = '$2b$10$D8ZCKgUORlQS6i9UkgqULuT2ep27rJRFo30tIgR.3rv1Akb8aUXfS';
    console.log('✅ Using verified hash for admin123');
    
    // Update the admin user
    const result = await pool.query(
      'UPDATE users SET password_hash = $1 WHERE username = $2',
      [newHash, 'admin']
    );
    
    console.log('✅ Admin password updated:', result.rowCount, 'rows affected');
    
    // Verify the update
    const userResult = await pool.query(
      'SELECT username, password_hash FROM users WHERE username = $1',
      ['admin']
    );
    
    if (userResult.rows.length > 0) {
      const isValid = await bcrypt.compare('admin123', userResult.rows[0].password_hash);
      console.log('✅ Password verification test:', isValid ? 'PASSED' : 'FAILED');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

updateAdminPassword();
