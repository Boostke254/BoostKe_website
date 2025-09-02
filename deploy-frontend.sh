#!/bin/bash

# BoostKe Frontend Deployment Script for Hostinger
# Run this script to deploy your frontend to the server

echo "🚀 Starting BoostKe Frontend Deployment..."

# Configuration
SERVER_IP="82.25.118.138"
SERVER_USER="root"
WEB_ROOT="/var/www/html"
LOCAL_FRONTEND_DIR="./boostke_frontend"

echo "🏗️ Building frontend for production..."

# Build frontend
cd ${LOCAL_FRONTEND_DIR}
npm run build

echo "📦 Preparing frontend files..."

# Create deployment package
cd dist
tar -czf ../frontend-deploy.tar.gz *
cd ..

echo "📤 Uploading frontend to server..."

# Upload to server
scp frontend-deploy.tar.gz ${SERVER_USER}@${SERVER_IP}:/tmp/

echo "🔧 Setting up frontend on server..."

# Execute deployment commands on server
ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
  # Backup existing files if any
  if [ -d "/var/www/html" ]; then
    mkdir -p /var/www/html.backup.$(date +%Y%m%d_%H%M%S)
    cp -r /var/www/html/* /var/www/html.backup.$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
  fi
  
  # Create web directory
  mkdir -p /var/www/html
  
  # Extract frontend files
  cd /var/www/html
  tar -xzf /tmp/frontend-deploy.tar.gz
  
  # Set proper permissions
  chown -R www-data:www-data /var/www/html
  chmod -R 755 /var/www/html
  
  echo "✅ Frontend deployment completed!"
EOF

# Clean up
rm frontend-deploy.tar.gz

echo "🎉 Frontend deployment script completed!"
echo "Website should now be accessible at your domain!"
