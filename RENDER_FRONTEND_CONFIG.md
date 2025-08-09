# Frontend Configuration for Render Backend

## 🔧 Environment Variables Setup

After your Render backend is deployed, you need to configure the frontend to point to it.

### Your Render Backend URL
Your backend service URL will be something like:
```
https://sangeet-restaurant-backend.onrender.com
```

### Option 1: Create .env file (for local testing)

Create `frontend/.env` with:
```bash
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
```

### Option 2: Update API configuration directly

Update `frontend/src/services/api.js` line 5:
```javascript
// Change this:
BASE_URL: process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : '/api'),

// To this:
BASE_URL: process.env.REACT_APP_API_URL || 'https://your-backend-name.onrender.com/api',
```

### Option 3: Deploy Frontend to Render too

1. Create another Web Service in Render
2. Connect same GitHub repository
3. Configure as:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Environment Variable**: `REACT_APP_API_URL=https://your-backend-name.onrender.com/api`

## 🔄 Update Backend CORS

Also update your backend's CLIENT_URL environment variable in Render:
- Go to your backend service → Environment
- Update `CLIENT_URL` to your frontend URL (if deploying to Render) or `*` for testing

## 🧪 Testing

1. **Test backend**: Visit `https://your-backend-name.onrender.com/api/health`
2. **Test frontend**: Should connect to backend automatically
3. **Check console**: Look for any CORS or connection errors

## 📝 Notes

- Replace `your-backend-name` with your actual Render service name
- The backend URL is shown in your Render dashboard
- First requests might be slow (cold start) but subsequent ones will be fast
