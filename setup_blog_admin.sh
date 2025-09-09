#!/bin/bash

# Script to create blog admin user with proper password hashing
# This script will:
# 1. Run the SQL to create the admin user
# 2. Hash the password using the API endpoint
# 3. Provide login instructions

echo "🚀 Setting up Blog Admin User for Francis Nganga..."

# Step 1: Run the SQL script to create the user
echo "📝 Creating admin user in database..."
psql -d boostke -f create_blog_admin.sql

# Step 2: Hash the password using the API (make sure backend is running)
echo "🔐 Hashing password..."
echo "To hash the password, run this curl command (make sure your backend is running on port 5000):"
echo ""
echo "curl -X POST http://localhost:5000/api/admin/update-password \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"mobile\": \"+254793710713\"}'"
echo ""

# Step 3: Provide login instructions
echo "✅ Admin user setup initiated!"
echo ""
echo "📋 ADMIN CREDENTIALS:"
echo "Email: ngangafrancis6949@gmail.com"
echo "Password: Francis6949"
echo "Mobile: +254793710713"
echo ""
echo "🌐 ACCESS INSTRUCTIONS:"
echo "1. Make sure your backend server is running (npm start in boostke_backend/)"
echo "2. Make sure your frontend server is running (npm run dev in boostke_frontend/)"
echo "3. Run the password hashing curl command above"
echo "4. Visit: http://localhost:5173/login"
echo "5. Login with the email and password above"
echo "6. After login, visit: http://localhost:5173/blog-admin"
echo ""
echo "🎯 BLOG ADMIN FEATURES:"
echo "- Create new blog posts"
echo "- Edit existing posts"
echo "- Publish/unpublish posts"
echo "- Mark posts as featured"
echo "- Manage categories and content"
echo ""
echo "🔧 TROUBLESHOOTING:"
echo "- If login fails, ensure password was properly hashed using the curl command"
echo "- Check that both frontend and backend servers are running"
echo "- Verify database connection and that tables exist"
echo ""
