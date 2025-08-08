const pool = require('../src/config/database');

async function cleanupSpecials() {
  try {
    console.log('🔄 Cleaning up chef\'s special items from database...');
    
    // Remove any menu items that contain "Chef's Special" or "Special" in the name
    const result = await pool.query(`
      DELETE FROM menu_items 
      WHERE name ILIKE '%chef%special%' 
         OR name ILIKE '%special%' 
         OR name ILIKE '%weekend%special%'
         OR name ILIKE '%happy%hour%'
    `);
    
    console.log(`✅ Removed ${result.rowCount} special items from database`);
    
    // Check remaining menu items
    const remainingItems = await pool.query('SELECT name, category FROM menu_items ORDER BY category, name');
    console.log('\n📋 Remaining menu items:');
    remainingItems.rows.forEach(item => {
      console.log(`  - ${item.name} (${item.category})`);
    });
    
    console.log('\n✅ Database cleanup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await pool.end();
  }
}

cleanupSpecials();
