const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create a canvas
const width = 512;
const height = 512;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Utility functions
function drawGradientText(ctx, text, x, y, size, color1, color2, outline = false, outlineColor = '#000') {
    ctx.font = `bold ${size}px "Arial Black", Gadget, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Create gradient
    const gradient = ctx.createLinearGradient(x - 100, y - 50, x + 100, y + 50);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    
    // Draw outline if needed
    if (outline) {
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = size / 10;
        ctx.strokeText(text, x, y);
    }
    
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText(text, x, y);
}

function drawNeonGlow(ctx, text, x, y, size, color, glowColor, glowSize = 20) {
    // Draw multiple layers with decreasing alpha for glow effect
    for (let i = glowSize; i > 0; i -= 2) {
        ctx.font = `bold ${size}px "Arial Black", Gadget, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = glowColor;
        ctx.globalAlpha = i / glowSize * 0.3;
        ctx.fillText(text, x, y);
    }
    
    // Reset alpha and draw the main text
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}

function drawGrid(ctx, spacing, color, alpha) {
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 1;
    
    // Horizontal lines
    for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Vertical lines
    for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
}

function drawVaporwaveSun(ctx, x, y, radius, innerColor, outerColor) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, innerColor);
    gradient.addColorStop(1, outerColor);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawLightning(ctx, startX, startY, length, angle, branches, lineWidth) {
    if (branches <= 0) return;
    
    const endX = startX + Math.cos(angle) * length;
    const endY = startY + Math.sin(angle) * length;
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    
    // Create zigzag path
    const segments = Math.floor(Math.random() * 3) + 3; // 3-5 segments
    let currentX = startX;
    let currentY = startY;
    
    for (let i = 0; i < segments; i++) {
        const segLength = length / segments;
        const offsetAngle = angle + (Math.random() * 0.5 - 0.25);
        const nextX = currentX + Math.cos(offsetAngle) * segLength;
        const nextY = currentY + Math.sin(offsetAngle) * segLength;
        
        ctx.lineTo(nextX, nextY);
        currentX = nextX;
        currentY = nextY;
    }
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    
    // Add glow
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    // Create branches
    if (branches > 1) {
        const branchAngle1 = angle + Math.random() * 0.8 - 0.4;
        const branchAngle2 = angle + Math.random() * 0.8 - 0.4;
        
        drawLightning(
            ctx,
            currentX, 
            currentY, 
            length * 0.6, 
            branchAngle1, 
            branches - 1,
            lineWidth * 0.7
        );
        
        drawLightning(
            ctx,
            currentX, 
            currentY, 
            length * 0.6, 
            branchAngle2, 
            branches - 1,
            lineWidth * 0.7
        );
    }
}

// Generate the logo
function generateLogo() {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#120458');
    bgGradient.addColorStop(1, '#4d0f8e');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    drawGrid(ctx, 20, '#ff00ff', 0.3);
    
    // Draw sun
    drawVaporwaveSun(ctx, width / 2, height * 0.3, 80, '#ff9500', '#ff00ff');
    
    // Draw lightning bolts
    ctx.save();
    for (let i = 0; i < 3; i++) {
        const startX = width * (0.3 + i * 0.2);
        const startY = height * 0.2;
        const angle = Math.PI / 2 + (Math.random() * 0.4 - 0.2);
        
        drawLightning(ctx, startX, startY, 150, angle, 2, 4);
    }
    ctx.restore();
    
    // Draw text
    drawNeonGlow(ctx, "RIZZ", width / 2, height * 0.5, 80, '#ffffff', '#00ffff', 30);
    drawGradientText(ctx, "POWER-UP", width / 2, height * 0.65, 40, '#ff00ff', '#00ffff', true, '#000000');
    drawGradientText(ctx, "SIMULATOR", width / 2, height * 0.75, 30, '#00ffff', '#ff00ff', true, '#000000');
    
    // Draw emoji
    ctx.font = '40px Arial';
    ctx.fillText('⚡', width / 2 - 100, height * 0.5);
    ctx.fillText('⚡', width / 2 + 100, height * 0.5);
    
    // Save the logo
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, 'logo.png'), buffer);
    console.log('Logo generated and saved to logo.png');
}

// Generate the logo
generateLogo();