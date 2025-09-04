#!/bin/bash

# BoostKe Production Monitoring Script
echo "🔍 BoostKe Production Status Check"
echo "=================================="

SERVER_IP="82.25.118.138"
SERVER_USER="root"

echo "📊 Checking all services..."

ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
echo "=== PM2 Backend Status ==="
pm2 status

echo ""
echo "=== Backend Health Check ==="
curl -s -o /dev/null -w "Backend API: %{http_code}\n" http://localhost:5000/api

echo ""
echo "=== Image Serving Check ==="
curl -s -o /dev/null -w "Images: %{http_code}\n" http://localhost/uploads/

echo ""
echo "=== Service Status ==="
echo "Nginx: $(systemctl is-active nginx)"
echo "PostgreSQL: $(systemctl is-active postgresql)"

echo ""
echo "=== Recent Backend Logs (Last 10 lines) ==="
pm2 logs boostke-backend --lines 10 --nostream

echo ""
echo "=== Recent Nginx Errors (Last 5 lines) ==="
tail -5 /var/log/nginx/error.log 2>/dev/null || echo "No recent errors"

echo ""
echo "=== System Resources ==="
echo "Memory Usage: $(free -h | awk '/^Mem:/ {print $3 "/" $2}')"
echo "Disk Usage: $(df -h / | awk 'NR==2 {print $3 "/" $2 " (" $5 ")"}')"
echo "Load Average: $(uptime | awk -F'load average:' '{print $2}')"

echo ""
echo "=== Database Connection Test ==="
PGPASSWORD=@Francis6949 psql -h localhost -U francis -d boostke -c "SELECT COUNT(*) as total_listings FROM listings;" 2>/dev/null || echo "Database connection failed"

echo ""
echo "✅ Status check completed!"
EOF
