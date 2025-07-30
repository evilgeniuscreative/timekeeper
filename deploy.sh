#!/bin/bash

# === CONFIG ===
LOCAL_DIR=~/Documents/Web/timekeeping-app/dist/
REMOTE_DIR=/var/www/html/time
REMOTE_HOST=root@linkedout.wtf
FIX_SCRIPT=/tmp/fixperms.sh

# === Deploy via rsync (excluding junk) ===
echo "Uploading site files to $REMOTE_HOST..."
rsync -avz \
  --exclude node_modules \
  --exclude .git \
  --exclude .env \
  --exclude .DS_Store \
  "$LOCAL_DIR" "$REMOTE_HOST:$REMOTE_DIR"

# === Upload permission fix script ===
echo "Sending fixperms.sh to $REMOTE_HOST..."
scp fixperms.sh "$REMOTE_HOST:$FIX_SCRIPT"

# === Run it remotely ===
echo "Fixing remote permissions..."
ssh "$REMOTE_HOST" "bash $FIX_SCRIPT $REMOTE_DIR && rm $FIX_SCRIPT"

echo "✅ Deployment complete."
