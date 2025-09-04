# 🚀 BoostKe Production Deployment Guide

## 📋 Pre-Deployment Checklist

Your BoostKe application is now ready for production deployment! Here's everything you need to know:

### ✅ What's Ready:
- ✅ Backend server with all APIs
- ✅ Frontend built for production 
- ✅ Database schema with all tables
- ✅ Test data populated
- ✅ Environment configurations
- ✅ Image uploads system
- ✅ M-Pesa integration setup
- ✅ Search functionality
- ✅ Cart and transactions system

## 🎯 Deployment Steps

### 1. 📁 Upload Files to Hostinger

**Backend (API Server):**
```bash
# Upload contents of ./deployment/backend/ to your server
scp -r deployment/backend/* root@your-server-ip:/root/boostke_backend/
```

**Frontend (Website):**
```bash
# Upload contents of ./deployment/frontend/ to your domain folder
scp -r deployment/frontend/* root@your-server-ip:/var/www/html/
```

**Database:**
```bash
# Upload database files
scp -r deployment/boostke_db/* root@your-server-ip:/root/database/
```

### 2. 🗄️ Set Up Production Database

SSH into your server and run:
```bash
# Create database
sudo -u postgres createdb boostke

# Import main schema
sudo -u postgres psql -d boostke -f /root/database/boostke.sql

# Import additional tables
sudo -u postgres psql -d boostke -f /root/database/search_tables.sql
sudo -u postgres psql -d boostke -f /root/database/cart_tables.sql
sudo -u postgres psql -d boostke -f /root/database/transactions_tables.sql

# Import test data (optional)
sudo -u postgres psql -d boostke -f /root/database/test_data.sql
```

### 3. ⚙️ Configure Environment

Update your production environment file:
```bash
# Edit the production environment
nano /root/boostke_backend/.env
```

Make sure these settings match your production setup:
```env
DATABASE_URL=postgresql://your_db_user:your_password@localhost:5432/boostke
PORT=5000
SESSION_SECRET=your_secure_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_USER=info@boostke.co.ke
EMAIL_PASS=your_email_password
```

### 4. 🌐 Configure Web Server (Nginx)

Create nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/boostke
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name boostke.co.ke www.boostke.co.ke;
    
    # Frontend - serve React app
    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Static files (uploaded images)
    location /uploads/ {
        alias /root/boostke_backend/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/boostke /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 5. 🔄 Start Backend with PM2

Install and configure PM2:
```bash
npm install -g pm2
cd /root/boostke_backend
pm2 start server.js --name "boostke-backend"
pm2 startup
pm2 save
```

### 6. 🔒 Set Up SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d boostke.co.ke -d www.boostke.co.ke
```

## 🌟 Features Available After Deployment

### 🛍️ Marketplace Features:
- ✅ Product listings with images
- ✅ Category browsing
- ✅ Search functionality  
- ✅ User registration/login
- ✅ Seller dashboards
- ✅ Shopping cart
- ✅ Location-based filtering

### 🏢 Business Features:
- ✅ Franchise management
- ✅ Landlord property listings
- ✅ Retailer shop management
- ✅ Analytics and reporting
- ✅ Admin panel

### 💳 Payment Integration:
- ✅ M-Pesa STK Push
- ✅ Transaction tracking
- ✅ Payment confirmations

### 📱 User Experience:
- ✅ Responsive design
- ✅ Fast loading
- ✅ SEO optimized
- ✅ Mobile-friendly

## 🔧 Post-Deployment Configuration

### 1. Update M-Pesa Settings
- Configure callback URLs in your M-Pesa developer portal
- Update consumer key and secret in production environment

### 2. Configure Email Settings
- Verify email credentials
- Test contact form functionality

### 3. Set Up Monitoring
```bash
# Monitor backend
pm2 monit

# Check logs
pm2 logs boostke-backend

# Monitor nginx
sudo tail -f /var/log/nginx/access.log
```

## 🚨 Troubleshooting

### Backend Not Starting:
```bash
pm2 logs boostke-backend
# Check for database connection errors
```

### Database Connection Issues:
```bash
sudo -u postgres psql -d boostke -c "SELECT 1;"
# Verify database is accessible
```

### Images Not Loading:
```bash
# Check permissions
sudo chown -R www-data:www-data /root/boostke_backend/uploads/
sudo chmod -R 755 /root/boostke_backend/uploads/
```

## 📞 Support

Your BoostKe website is now ready for production! 

### 🎉 What Users Can Do:
1. **Browse Products** - View all available items
2. **Register & Login** - Create accounts and manage profiles  
3. **List Items** - Sell products through the platform
4. **Search & Filter** - Find exactly what they need
5. **Make Purchases** - Buy items with M-Pesa integration
6. **Manage Shops** - Retailers can create and manage shops
7. **Property Listings** - Landlords can list properties
8. **Franchise Opportunities** - Explore business opportunities

### 🔗 Key URLs After Deployment:
- **Main Website**: https://boostke.co.ke
- **Admin Panel**: https://boostke.co.ke/admin
- **API Endpoint**: https://boostke.co.ke/api
- **Image Uploads**: https://boostke.co.ke/uploads/

---

**🎊 Congratulations! Your BoostKe marketplace is now live and ready to serve customers!**
