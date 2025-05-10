const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateButtonImages() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to ensure all elements are visible
  await page.setViewport({ width: 900, height: 900 });
  
  // Get the absolute path to the HTML file
  const htmlPath = path.resolve(__dirname, 'button_generator.html');
  const fileUrl = `file://${htmlPath}`;
  
  console.log(`Loading ${fileUrl}...`);
  await page.goto(fileUrl);
  
  // Wait for the page to fully render
  await page.waitForSelector('#activeCanvas');
  await page.waitForSelector('#hoverCanvas');
  await page.waitForSelector('#disabledCanvas');
  
  console.log('Page loaded, generating images...');
  
  // Create output directory if it doesn't exist
  const outputDir = path.resolve(__dirname, '..');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Function to save canvas as PNG
  async function saveCanvas(canvasId, filename) {
    const outputPath = path.join(outputDir, filename);
    
    // Get the canvas data URL
    const dataUrl = await page.evaluate((id) => {
      const canvas = document.getElementById(id);
      return canvas.toDataURL('image/png');
    }, canvasId);
    
    // Convert data URL to buffer
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Write to file
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved ${outputPath}`);
  }
  
  // Save all three button images
  await saveCanvas('activeCanvas', 'rizz_button_active_new.png');
  await saveCanvas('hoverCanvas', 'rizz_button_hover_new.png');
  await saveCanvas('disabledCanvas', 'rizz_button_disabled_new.png');
  
  console.log('All images generated successfully!');
  await browser.close();
}

generateButtonImages().catch(console.error);