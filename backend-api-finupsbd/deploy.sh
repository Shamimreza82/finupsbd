#!/bin/bash

# ===============================
# Production Deployment Script
# ===============================

APP_NAME="finups-server"
BRANCH="main"

echo "🚀 Starting deployment for $APP_NAME ..."

# Step 1: Navigate to project directory
cd /media/algorify/Server/projects/finupsbd-backend || { echo "❌ Project path not found!"; exit 1; }

# Step 2: Pull the latest code from main
echo "📥 Pulling latest code from $BRANCH..."
# git fetch origin $BRANCH
# git reset --hard origin/$BRANCH

git pull
loclochatc
# Step 3: Install dependencies (production only)
echo "📦 Installing dependencies..."
npm install  || { echo "❌ npm install failed!"; exit 1; }

# Step 4: Build the project
echo "🏗️ Building the project..."
npm run build || { echo "❌ Build failed!"; exit 1; }

# Step 5: Restart the app with PM2
echo "🔄 Restarting $APP_NAME..."
pm2 restart $APP_NAME || pm2 start npm --name "$APP_NAME" -- run start

# Step 6: Save PM2 process list
echo "💾 Saving PM2 process list..."
pm2 save

echo "✅ Deployment completed successfully!"








	
