const pool = require('../src/config/database.js');
const fs = require('fs');
const path = require('path');

async function runSampleData() {
  try {
    console.log('🔄 Adding sample reservation data...');
    
    // Read the sample data SQL file
    const sampleDataPath = path.join(__dirname, 'sample_reservations.sql');
    const sampleData = fs.readFileSync(sampleDataPath, 'utf8');
    
    // Execute the sample data
    await pool.query(sampleData);
    
    console.log('✅ Sample reservation data added successfully!');
    
    // Verify the data was added
    const result = await pool.query('SELECT COUNT(*) as total_reservations FROM reservations');
    console.log(`📊 Total reservations in database: ${result.rows[0].total_reservations}`);
    
    // Show breakdown by status
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
    
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  } finally {
    await pool.end();
  }
}

runSampleData();
