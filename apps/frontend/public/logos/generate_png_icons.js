const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Define icon sizes for different platforms
const iconSizes = [
  16, 32, 48, 72, 96, 120, 128, 144, 152, 180, 192, 384, 512
];

// Function to generate PNG icons from SVG
async function generatePngIcons() {
  try {
    // Create icons directory if it doesn't exist
    const iconsDir = path.join(__dirname, 'icons');
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir);
    }

    // Load the SVG logo
    const svgPath = path.join(__dirname, 'logo.svg');
    
    // For each size, create a PNG icon
    for (const size of iconSizes) {
      // Create canvas with the desired size
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Draw background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, size);
      bgGradient.addColorStop(0, '#120458');
      bgGradient.addColorStop(1, '#4d0f8e');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, size, size);
      
      // Load and draw the SVG
      try {
        // Since we can't directly load SVG with the canvas library in Node.js,
        // we'll create a simplified version of the logo directly
        
        // Draw a grid background
        ctx.strokeStyle = '#ff00ff';
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = size / 256;
        
        // Draw grid lines
        const gridSpacing = size / 25;
        for (let y = 0; y < size; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(size, y);
          ctx.stroke();
        }
        
        for (let x = 0; x < size; x += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, size);
          ctx.stroke();
        }
        
        ctx.globalAlpha = 1;
        
        // Draw sun
        const sunGradient = ctx.createRadialGradient(
          size / 2, size * 0.3, 0,
          size / 2, size * 0.3, size * 0.15
        );
        sunGradient.addColorStop(0, '#ff9500');
        sunGradient.addColorStop(1, '#ff00ff');
        
        ctx.fillStyle = sunGradient;
        ctx.beginPath();
        ctx.arc(size / 2, size * 0.3, size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw lightning bolts
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = size / 128;
        ctx.lineCap = 'round';
        
        // Left lightning
        ctx.beginPath();
        ctx.moveTo(size * 0.3, size * 0.2);
        ctx.lineTo(size * 0.33, size * 0.3);
        ctx.lineTo(size * 0.31, size * 0.35);
        ctx.lineTo(size * 0.37, size * 0.45);
        ctx.stroke();
        
        // Middle lightning
        ctx.beginPath();
        ctx.moveTo(size * 0.5, size * 0.2);
        ctx.lineTo(size * 0.53, size * 0.3);
        ctx.lineTo(size * 0.51, size * 0.35);
        ctx.lineTo(size * 0.57, size * 0.45);
        ctx.stroke();
        
        // Right lightning
        ctx.beginPath();
        ctx.moveTo(size * 0.7, size * 0.2);
        ctx.lineTo(size * 0.73, size * 0.3);
        ctx.lineTo(size * 0.71, size * 0.35);
        ctx.lineTo(size * 0.77, size * 0.45);
        ctx.stroke();
        
        // Add glow to lightning
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = size / 25;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Draw "RIZZ" text
        ctx.font = `bold ${size * 0.15}px "Arial Black", Gadget, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = size / 25;
        ctx.fillText("RIZZ", size / 2, size * 0.5);
        ctx.shadowBlur = 0;
        
        // Draw "POWER-UP" text
        const powerUpGradient = ctx.createLinearGradient(
          size * 0.3, size * 0.65,
          size * 0.7, size * 0.65
        );
        powerUpGradient.addColorStop(0, '#ff00ff');
        powerUpGradient.addColorStop(1, '#00ffff');
        
        ctx.font = `bold ${size * 0.08}px "Arial Black", Gadget, sans-serif`;
        ctx.fillStyle = powerUpGradient;
        ctx.fillText("POWER-UP", size / 2, size * 0.65);
        
        // Draw "SIMULATOR" text
        const simGradient = ctx.createLinearGradient(
          size * 0.3, size * 0.75,
          size * 0.7, size * 0.75
        );
        simGradient.addColorStop(0, '#00ffff');
        simGradient.addColorStop(1, '#ff00ff');
        
        ctx.font = `bold ${size * 0.06}px "Arial Black", Gadget, sans-serif`;
        ctx.fillStyle = simGradient;
        ctx.fillText("SIMULATOR", size / 2, size * 0.75);
        
        // Save the PNG
        const buffer = canvas.toBuffer('image/png');
        const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
        fs.writeFileSync(outputPath, buffer);
        console.log(`Generated ${outputPath}`);
      } catch (err) {
        console.error(`Error processing size ${size}:`, err);
      }
    }
    
    console.log('All PNG icons generated successfully!');
    
    // Update manifest.json to include the new icons
    updateManifest(iconSizes);
    
  } catch (err) {
    console.error('Error generating PNG icons:', err);
  }
}

// Function to update manifest.json with the new icons
function updateManifest(sizes) {
  try {
    const manifestPath = path.join(__dirname, '..', 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Keep the SVG icon
    const svgIcon = manifest.icons.find(icon => icon.type === 'image/svg+xml');
    
    // Add PNG icons
    manifest.icons = [svgIcon];
    
    for (const size of sizes) {
      manifest.icons.push({
        src: `logos/icons/icon-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: 'image/png',
        purpose: 'any'
      });
    }
    
    // Write updated manifest
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Updated manifest.json with new icons');
    
  } catch (err) {
    console.error('Error updating manifest.json:', err);
  }
}

// Run the icon generation
generatePngIcons();