# Rizz Power-Up Logo Generator

This directory contains tools for generating the logo for the Rizz Power-Up Simulator app.

## Option 1: Interactive HTML Generator

The `logo_generator.html` file provides an interactive way to generate and preview different logo styles in your browser.

### How to use:

1. Open `logo_generator.html` in a web browser
2. Click on one of the "Generate Logo Style" buttons to preview different logo designs
3. When you find a design you like, click "Download as PNG" to save it
4. Rename the downloaded file to `logo.png` and place it in this directory to use it in the app

## Option 2: Node.js Script Generator

The `generate_logo.js` script uses Node.js with the Canvas library to programmatically generate the logo.

### Requirements:
- Node.js installed
- Canvas library dependencies (may require additional system libraries)

### How to use:

1. Navigate to this directory in your terminal
2. Install dependencies:
   ```
   npm install
   ```
3. Run the generator script:
   ```
   npm run generate
   ```
4. The script will create `logo.png` in this directory

## Logo Design

The logo features a vaporwave aesthetic with:
- Purple grid background
- Pink/orange sun
- Lightning bolt effects
- "RIZZ" in large white text with neon glow
- "POWER-UP" in gradient pink/cyan text
- "SIMULATOR" in gradient cyan/pink text

This design aligns with the app's description in the PRD:
> **Rizz Power-Up Simulator** is a vaporwave-style mobile web app that allows users to tap a button to increase their "Rizz" (charisma) level.

## Option 3: PNG Icon Generator

The `generate_png_icons.js` script creates PNG versions of the logo in various sizes for different platforms and devices.

### Requirements:
- Node.js installed
- Canvas library dependencies (may require additional system libraries)

### How to use:

1. Navigate to this directory in your terminal
2. Install dependencies:
   ```
   npm install
   ```
3. Run the icon generator script:
   ```
   node generate_png_icons.js
   ```
4. The script will create PNG icons in the `icons` subdirectory and update the manifest.json file

### Generated Icon Sizes:
- 16x16, 32x32, 48x48 (favicons)
- 72x72, 96x96, 120x120, 128x128, 144x144, 152x152, 180x180, 192x192 (app icons)
- 384x384, 512x512 (large app icons)