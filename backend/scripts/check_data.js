const pool = require('../src/config/database.js');

async function checkData() {
  try {
    console.log('🔍 Checking current database data...');
    
    // Check total reservations
    const totalResult = await pool.query('SELECT COUNT(*) as total FROM reservations');
    console.log(`📊 Total reservations: ${totalResult.rows[0].total}`);
    
    // Check by status
    const statusResult = await pool.query(`
      SELECT status, COUNT(*) as count 
      FROM reservations 
      GROUP BY status 
      ORDER BY status
    `);
    
    console.log('📈 Reservations by status:');
    statusResult.rows.forEach(row => {
      console.log(`   ${row.status}: ${row.count}`);
    });
    
    // Show some sample reservations
    const sampleResult = await pool.query(`
      SELECT customer_name, email, date, time, guests, status 
      FROM reservations 
      ORDER BY created_at DESC 
      LIMIT 5
    `);
    
    console.log('\n📋 Sample reservations:');
    sampleResult.rows.forEach((row, index) => {
      console.log(`   ${index + 1}. ${row.customer_name} - ${row.date} ${row.time} - ${row.guests} guests - ${row.status}`);
    });
    
  } catch (error) {
    console.error('❌ Error checking data:', error);
  } finally {
    await pool.end();
  }
}

checkData();
