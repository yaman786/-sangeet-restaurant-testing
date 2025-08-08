/**
 * Environment variable validation utility
 * Validates that all required environment variables are set
 */
const validateEnvironment = () => {
  const requiredEnvVars = [
    'DB_HOST',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'JWT_SECRET'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\nPlease check your .env file and ensure all required variables are set.');
    process.exit(1);
  }

  // Validate JWT secret length
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.warn('⚠️  Warning: JWT_SECRET should be at least 32 characters long for security.');
  }

  // Validate database connection
  if (process.env.DB_HOST && process.env.DB_HOST.includes('localhost')) {
    console.log('ℹ️  Using local database connection');
  }

  console.log('✅ Environment validation passed');
};

module.exports = { validateEnvironment };
