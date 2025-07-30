#!/bin/bash

DIST_DIR=./dist
ENTRY_FILE="$DIST_DIR/index.html"
OUTPUT_FILE="$DIST_DIR/index.php"

echo "📦 Renaming index.html to index.php..."
cp "$ENTRY_FILE" "$OUTPUT_FILE"

echo "🔍 Rewriting asset hashes in index.php..."
JS_FILE=$(ls $DIST_DIR/assets/index-*.js | xargs -n1 basename)
CSS_FILE=$(ls $DIST_DIR/assets/index-*.css | xargs -n1 basename)

sed -i '' "s|/assets/.*\.js|/assets/$JS_FILE|g" "$OUTPUT_FILE"
sed -i '' "s|/assets/.*\.css|/assets/$CSS_FILE|g" "$OUTPUT_FILE"

echo "✅ postbuild complete: index.php ready with updated asset links"
