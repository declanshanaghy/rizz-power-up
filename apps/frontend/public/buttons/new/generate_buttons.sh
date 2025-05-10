#!/bin/bash

# Create directory for the new button images
OUTPUT_DIR="../"
mkdir -p "$OUTPUT_DIR"

# Set dimensions
WIDTH=700
HEIGHT=240

# Generate Active Button (Blue neon glow)
convert -size ${WIDTH}x${HEIGHT} xc:transparent \
  -fill "rgba(0,0,0,0)" -stroke "#00F5D4" -strokewidth 3 \
  -draw "roundrectangle 100,60 600,180 60,60" \
  -blur 0x8 \
  -fill "#00F5D4" -stroke none \
  -font Arial -pointsize 70 -gravity center -annotate 0 "RIZZ UP" \
  -blur 0x3 \
  "$OUTPUT_DIR/rizz_button_active_new.png"

echo "Created active button: $OUTPUT_DIR/rizz_button_active_new.png"

# Generate Hover Button (Pink neon glow)
convert -size ${WIDTH}x${HEIGHT} xc:transparent \
  -fill "rgba(0,0,0,0)" -stroke "#F15BB5" -strokewidth 4 \
  -draw "roundrectangle 100,60 600,180 60,60" \
  -blur 0x10 \
  -fill "#00F5D4" -stroke none \
  -font Arial -pointsize 70 -gravity center -annotate 0 "RIZZ UP" \
  -blur 0x3 \
  "$OUTPUT_DIR/rizz_button_hover_new.png"

echo "Created hover button: $OUTPUT_DIR/rizz_button_hover_new.png"

# Generate Disabled Button (Dimmed blue glow)
convert -size ${WIDTH}x${HEIGHT} xc:transparent \
  -fill "rgba(0,0,0,0)" -stroke "rgba(0,245,212,0.5)" -strokewidth 2 \
  -draw "roundrectangle 100,60 600,180 60,60" \
  -blur 0x5 \
  -fill "rgba(0,245,212,0.5)" -stroke none \
  -font Arial -pointsize 70 -gravity center -annotate 0 "RIZZ UP" \
  -blur 0x2 \
  "$OUTPUT_DIR/rizz_button_disabled_new.png"

echo "Created disabled button: $OUTPUT_DIR/rizz_button_disabled_new.png"

echo "All button images have been created successfully!"