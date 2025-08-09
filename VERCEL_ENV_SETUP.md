# Vercel Environment Variables Setup

## Required Environment Variables

When deploying to Vercel, you need to set the following environment variables in your Vercel dashboard:

### Database Configuration
- `DATABASE_URL`: PostgreSQL connection string (e.g., from Neon, Supabase, or other cloud providers)

### JWT Configuration
- `JWT_SECRET`: Strong secret key for JWT tokens
- `JWT_EXPIRES_IN`: Token expiration time (default: 7d)

### Email Configuration (Optional)
- `EMAIL_HOST`: SMTP host (e.g., smtp.gmail.com)
- `EMAIL_PORT`: SMTP port (e.g., 587)
- `EMAIL_USER`: Email address for sending notifications
- `EMAIL_PASS`: Email password or app password

### General Configuration
- `NODE_ENV`: Set to "production"
- `PORT`: Set to 5001 (or leave empty for Vercel default)
- `FRONTEND_URL`: Your Vercel app URL (e.g., https://your-app.vercel.app)

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable with its value
5. Make sure to select the appropriate environments (Production, Preview, Development)

## Database Setup

For production, you'll need a cloud PostgreSQL database. Recommended providers:
- Neon (neon.tech) - Free tier available
- Supabase (supabase.com) - Free tier available
- Railway (railway.app) - PostgreSQL hosting
- PlanetScale - MySQL alternative

## Important Notes

- Never commit actual environment variables to Git
- Use different values for development and production
- Ensure your database allows connections from Vercel's IP ranges
- Test the deployment with a staging environment first
