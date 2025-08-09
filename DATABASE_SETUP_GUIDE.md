# Free Database Setup Guide for Sangeet Restaurant

## 🏆 Option 1: Neon Database (RECOMMENDED)

### Why Neon?
- ✅ Excellent performance and reliability
- ✅ Perfect for Vercel deployment
- ✅ Serverless PostgreSQL with auto-scaling
- ✅ 0.5 GB storage (enough for restaurant data)
- ✅ Instant database branching for testing

### Setup Steps:

1. **Create Neon Account**
   - Go to [neon.tech](https://neon.tech)
   - Sign up with GitHub (recommended)
   - Create a new project

2. **Get Database Connection**
   - Copy the connection string from dashboard
   - Format: `postgresql://username:password@hostname/database?sslmode=require`

3. **Set Environment Variables in Vercel**
   ```
   DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require
   ```

4. **Run Database Schema**
   - Use Neon's SQL Editor or connect with psql
   - Run all scripts from `/backend/scripts/` folder

---

## 🔥 Option 2: Supabase (FULL-STACK SOLUTION)

### Why Supabase?
- ✅ PostgreSQL + Authentication + Storage
- ✅ Built-in user management
- ✅ Real-time subscriptions
- ✅ 500 MB database storage
- ✅ Can replace your entire auth system

### Setup Steps:

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up and create new project
   - Choose region closest to your users

2. **Get Connection Details**
   - Go to Settings → Database
   - Copy connection string and API keys

3. **Environment Variables**
   ```
   DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
   SUPABASE_URL=https://[PROJECT_ID].supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Optional: Use Supabase Auth**
   - Can replace your JWT auth system
   - Built-in user management UI
   - Social login support

---

## 💰 Option 3: Railway (DATABASE + BACKEND)

### Why Railway?
- ✅ $5/month free credits
- ✅ Can host both database AND backend
- ✅ PostgreSQL + Redis available
- ✅ Great for full application hosting

### Setup Steps:

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Create new project

2. **Add PostgreSQL Database**
   - Click "Add Service" → "Database" → "PostgreSQL"
   - Railway will provision automatically

3. **Deploy Backend (Optional)**
   - Connect your GitHub repo
   - Railway can host your Node.js backend too
   - Alternative to Vercel serverless

4. **Get Connection String**
   - Go to PostgreSQL service → Variables
   - Copy DATABASE_URL

---

## 🛠️ Database Schema Setup

After choosing your database provider, run these scripts in order:

1. **Connect to your database** using psql, pgAdmin, or web interface
2. **Run scripts in this order:**
   ```sql
   -- 1. Main schema
   \i backend/scripts/schema.sql
   
   -- 2. Authentication
   \i backend/scripts/auth_schema.sql
   
   -- 3. Website content
   \i backend/scripts/website_schema.sql
   
   -- 4. Menu system
   \i backend/scripts/comprehensive_menu.sql
   
   -- 5. Reservations
   \i backend/scripts/reservation_schema.sql
   
   -- 6. Orders
   \i backend/scripts/orders_schema.sql
   
   -- 7. QR codes
   \i backend/scripts/qr_schema.sql
   
   -- 8. Sample data (optional)
   \i backend/scripts/sample_reservations.sql
   ```

---

## 🔧 Vercel Environment Setup

After setting up your database, add these to Vercel:

### Required Variables:
```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
```

### Optional Variables:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://your-app.vercel.app
```

---

## 📊 Comparison Table

| Feature | Neon | Supabase | Railway |
|---------|------|----------|---------|
| **Storage** | 0.5 GB | 500 MB | ~2 GB ($5 credit) |
| **Connections** | 100 | 100 | 100 |
| **Auth System** | ❌ | ✅ Built-in | ❌ |
| **Real-time** | ❌ | ✅ | ❌ |
| **File Storage** | ❌ | ✅ | ❌ |
| **Backend Hosting** | ❌ | ❌ | ✅ |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Ease of Setup** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🎯 My Recommendation

**For your restaurant project, I recommend Neon because:**

1. **Perfect for Vercel** - Optimized for serverless deployments
2. **Reliable Performance** - Best-in-class PostgreSQL hosting
3. **Simple Setup** - Just need one connection string
4. **Room to Grow** - Easy upgrade path when you need more

**Next Steps:**
1. Sign up for Neon
2. Create database and get connection string
3. Add DATABASE_URL to Vercel environment variables
4. Run database schema scripts
5. Deploy and test!

Need help with any of these steps? Just let me know! 🚀
