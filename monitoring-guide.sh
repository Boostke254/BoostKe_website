#!/bin/bash

echo "=== BoostKe Production Monitoring Guide ==="
echo "Use these commands to monitor your production system:"

echo -e "\n📋 **QUICK STATUS CHECK:**"
echo "ssh root@82.25.118.138 './monitor-production.sh'"

echo -e "\n🔧 **BACKEND LOGS:**"
echo "# PM2 application logs"
echo "ssh root@82.25.118.138 'pm2 logs boostke-backend'"
echo "ssh root@82.25.118.138 'pm2 logs boostke-backend --lines 50'"

echo -e "\n🔧 **NGINX LOGS:**"
echo "# Access logs (successful requests)"
echo "ssh root@82.25.118.138 'tail -f /var/log/nginx/access.log'"
echo "# Error logs (problems)"
echo "ssh root@82.25.118.138 'tail -f /var/log/nginx/error.log'"

echo -e "\n🔧 **DATABASE LOGS:**"
echo "# PostgreSQL logs"
echo "ssh root@82.25.118.138 'tail -f /var/log/postgresql/postgresql-16-main.log'"
echo "ssh root@82.25.118.138 'journalctl -u postgresql -f'"

echo -e "\n🔧 **SYSTEM LOGS:**"
echo "# General system logs"
echo "ssh root@82.25.118.138 'journalctl -f'"
echo "# SSL certificate logs"
echo "ssh root@82.25.118.138 'journalctl -u certbot -f'"

echo -e "\n🔧 **PERFORMANCE MONITORING:**"
echo "# System resources"
echo "ssh root@82.25.118.138 'htop'"
echo "ssh root@82.25.118.138 'df -h'"
echo "ssh root@82.25.118.138 'free -h'"

echo -e "\n🔧 **QUICK TESTS:**"
echo "# Test all endpoints"
echo "curl -I https://boostke.co.ke/"
echo "curl -I https://boostke.co.ke/api/listings/all"
echo "curl -I https://boostke.co.ke/uploads/1736316953998-paul.jpg"

echo -e "\n📱 **MOBILE ACCESS:**"
echo "Your site is now accessible on:"
echo "• Desktop: https://boostke.co.ke"
echo "• Mobile: https://boostke.co.ke"
echo "• API: https://boostke.co.ke/api/"
echo "• Images: https://boostke.co.ke/uploads/"

echo -e "\n✅ **ALL SYSTEMS OPERATIONAL!**"
