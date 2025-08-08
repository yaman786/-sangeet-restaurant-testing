# QR Code URL Configuration Guide

## 🔗 How QR Code URLs Work

### **Development (Local)**
- **Base URL**: `http://localhost:3000`
- **Table QR Codes**: `http://localhost:3000/qr/table-1`
- **Custom QR Codes**: Any URL you specify

### **Production (Live Website)**
- **Base URL**: `https://your-restaurant.com`
- **Table QR Codes**: `https://your-restaurant.com/qr/table-1`
- **Custom QR Codes**: Any URL you specify

## 📝 Configuration Steps

### 1. **For Development (Current)**
No changes needed! The system automatically uses `localhost:3000`

### 2. **For Production**
When you deploy your website:

1. **Update Environment Variable**:
   ```bash
   # In your production environment
   REACT_APP_CLIENT_URL=https://your-restaurant.com
   ```

2. **Update QR Code Base URL**:
   - Go to QR Management
   - In "Bulk Generate" modal, set Base URL to your domain
   - For individual QR codes, leave "Custom URL" empty to use default

## 🎯 URL Examples

### **Table QR Codes**
- **Development**: `http://localhost:3000/qr/table-1`
- **Production**: `https://sangeet-restaurant.com/qr/table-1`

### **Custom QR Codes**
- **Marketing**: `https://sangeet-restaurant.com/menu`
- **Social Media**: `https://instagram.com/sangeet_restaurant`
- **Reservations**: `https://sangeet-restaurant.com/reservations`

## 🔄 How It Works

1. **Generate QR Code** → Creates QR image with your URL
2. **Customer Scans** → Phone opens the URL
3. **URL Loads** → Shows your restaurant's menu/website

## 💡 Best Practices

- **Use HTTPS** in production for security
- **Keep URLs short** for better QR readability
- **Test QR codes** before printing
- **Update URLs** if you change your domain

## 🚀 Deployment Checklist

- [ ] Set `REACT_APP_CLIENT_URL` to your domain
- [ ] Update all existing QR codes with new URLs
- [ ] Test QR codes on different devices
- [ ] Print and test physical QR codes 