#!/bin/bash

# BoostKe Backend Deployment Script for Hostinger
# Run this script to deploy your backend to the server

echo "🚀 Starting BoostKe Backend Deployment..."

# Configuration
SERVER_IP="82.25.118.138"
SERVER_USER="root"
PROJECT_DIR="/root/boostke_backend"
LOCAL_BACKEND_DIR="./boostke_backend"

echo "📦 Preparing backend files..."

# Create deployment package
tar -czf backend-deploy.tar.gz \
  --exclude=node_modules \
  --exclude=uploads \
  --exclude=.env \
  -C ${LOCAL_BACKEND_DIR} .

echo "📤 Uploading backend to server..."

# Upload to server
scp backend-deploy.tar.gz ${SERVER_USER}@${SERVER_IP}:/tmp/

echo "🔧 Setting up backend on server..."

# Execute deployment commands on server
ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
  # Create project directory
  mkdir -p /root/boostke_backend
  
  # Extract files
  cd /root/boostke_backend
  tar -xzf /tmp/backend-deploy.tar.gz
  
  # Install Node.js if not present
  if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    apt-get install -y nodejs
  fi
  
  # Install dependencies
  npm install
  
  # Create uploads directory
  mkdir -p uploads
  
  # Install PM2 for process management
  npm install -g pm2
  
  echo "✅ Backend deployment completed!"
EOF

# Clean up
rm backend-deploy.tar.gz

echo "🎉 Backend deployment script completed!"
echo "Next steps:"
echo "1. Update .env.production on the server with correct database details"
echo "2. Start the backend with PM2"
echo "3. Configure nginx/apache to proxy requests"
