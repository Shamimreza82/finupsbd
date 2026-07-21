#!/bin/bash

# ===== CONFIG =====
APP_NAME="finups-admin-portal"
APP_DIR="/media/algorify-labs-ltd/Server/projects/finupsbd-admin-portal"
PORT=3001
NODE_ENV="production"

echo "🚀 Starting deployment..."

cd $APP_DIR || exit

echo "🔄 Pulling latest changes from Git..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🏗️ Building Next.js app..."
npm run build

echo "♻️ Restarting app with PM2..."

# যদি আগে run থাকে → delete
pm2 delete $APP_NAME || true

# নতুন করে start
pm2 start npm --name "$APP_NAME" -- start

# auto-start enable (server reboot হলে চালু হবে)
pm2 save

echo "✅ Deployment finished successfully!"