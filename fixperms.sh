#!/bin/bash

TARGET_DIR=${1:-.}

echo "Fixing ownership and permissions in: $TARGET_DIR"

# Change ownership to www-data
sudo chown -R www-data:www-data "$TARGET_DIR"

# Set directory perms to 755
sudo find "$TARGET_DIR" -type d -print0 | xargs -0 chmod 755

# Set file perms to 644
sudo find "$TARGET_DIR" -type f -print0 | xargs -0 chmod 644

echo "Done."
