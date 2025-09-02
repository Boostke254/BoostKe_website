#!/bin/bash

# BoostKe Production Deployment Script for Hostinger
# Make sure to run this script from your project root directory

echo "🚀 Starting BoostKe Deployment Process..."

# Set production environment
export NODE_ENV=production

echo "📦 Installing backend dependencies..."
cd boostke_backend
npm install --production

echo "🏗️ Building frontend..."
cd ../boostke_frontend
npm install
npm run build

echo "📁 Preparing deployment files..."
cd ..

# Create deployment directory structure
mkdir -p deployment
mkdir -p deployment/backend
mkdir -p deployment/frontend

# Copy backend files
echo "📋 Copying backend files..."
cp -r boostke_backend/* deployment/backend/
cp boostke_backend/.env.production deployment/backend/.env

# Copy frontend build
echo "📋 Copying frontend build..."
cp -r boostke_frontend/dist/* deployment/frontend/

# Copy database files
echo "📋 Copying database files..."
cp -r boostke_db deployment/

# Create production start script
cat > deployment/backend/start.sh << 'EOF'
#!/bin/bash
echo "Starting BoostKe Backend in Production Mode..."
export NODE_ENV=production
node server.js
EOF

chmod +x deployment/backend/start.sh

echo "✅ Deployment files prepared in ./deployment directory"
echo ""
echo "📝 Next Steps:"
echo "1. Update .env.production with your actual database and domain details"
echo "2. Upload ./deployment/backend to your Hostinger server"
echo "3. Upload ./deployment/frontend to your domain's public_html folder"
echo "4. Set up your database using files in ./deployment/boostke_db"
echo "5. Configure your domain to point to the frontend files"
echo "6. Set up your backend API endpoint (subdomain or separate server)"
echo ""
echo "🔧 Don't forget to:"
echo "- Update CORS origins with your actual domain"
echo "- Update M-Pesa callback URLs when ready"
echo "- Configure SSL certificates"
