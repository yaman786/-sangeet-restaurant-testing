#!/bin/bash

echo "🚀 Deploying to Netlify..."

# Build the frontend
cd frontend
npm run build

# Deploy to Netlify (you'll need to install netlify-cli first)
# npm install -g netlify-cli
# netlify deploy --prod --dir=build

echo "✅ Build completed!"
echo "📝 To deploy to Netlify:"
echo "1. Install netlify-cli: npm install -g netlify-cli"
echo "2. Login: netlify login"
echo "3. Deploy: netlify deploy --prod --dir=frontend/build"
