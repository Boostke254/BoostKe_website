#!/bin/bash

# Complete BoostKe Website Deployment Script
# This will deploy both frontend and backend to make the website live

echo "🚀 BoostKe Complete Deployment Starting..."
echo "Server: 82.25.118.138"
echo "Domain: boostke.co.ke"

# Configuration
SERVER_IP="82.25.118.138"
SERVER_USER="root"

# Step 1: Deploy Backend
echo "📱 Step 1: Deploying Backend..."
chmod +x deploy-backend.sh
./deploy-backend.sh

# Step 2: Update Production Environment on Server
echo "🔧 Step 2: Setting up production environment..."
scp boostke_backend/.env.production ${SERVER_USER}@${SERVER_IP}:/root/boostke_backend/.env

# Step 3: Update Database Connection
echo "💾 Step 3: Updating database connection..."
ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
  cd /root/boostke_backend
  
  # Update .env with correct database URL
  sed -i 's|DATABASE_URL=postgres://username:password@hostname:5432/database_name|DATABASE_URL=postgres://postgres:your_password@localhost:5432/boostke|g' .env
  
  # Start backend with PM2
  pm2 stop boostke-backend 2>/dev/null || true
  pm2 start server.js --name "boostke-backend" --env production
  pm2 startup
  pm2 save
  
  echo "✅ Backend is now running!"
EOF

# Step 4: Deploy Frontend
echo "🌐 Step 4: Deploying Frontend..."
chmod +x deploy-frontend.sh
./deploy-frontend.sh

# Step 5: Configure Web Server
echo "⚙️ Step 5: Configuring web server..."
ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
  # Install nginx if not present
  if ! command -v nginx &> /dev/null; then
    apt update
    apt install -y nginx
  fi
  
  # Create nginx config
  cat > /etc/nginx/sites-available/boostke << 'NGINX_EOF'
server {
    listen 80;
    server_name boostke.co.ke www.boostke.co.ke;
    
    # Frontend
    location / {
        root /var/www/html;
        index index.html index.htm;
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
    
    # Static files (uploads)
    location /uploads/ {
        alias /root/boostke_backend/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_EOF
  
  # Enable site
  ln -sf /etc/nginx/sites-available/boostke /etc/nginx/sites-enabled/
  rm -f /etc/nginx/sites-enabled/default
  
  # Test and restart nginx
  nginx -t && systemctl restart nginx
  systemctl enable nginx
  
  echo "✅ Web server configured!"
EOF

echo ""
echo "🎉 DEPLOYMENT COMPLETED!"
echo ""
echo "Your website should now be live at:"
echo "🌐 http://boostke.co.ke"
echo ""
echo "Next steps:"
echo "1. Point your domain DNS to: 82.25.118.138"
echo "2. Install SSL certificate for HTTPS"
echo "3. Test all functionality"
echo ""
echo "To check status:"
echo "Backend: ssh root@82.25.118.138 'pm2 status'"
echo "Nginx: ssh root@82.25.118.138 'systemctl status nginx'"
