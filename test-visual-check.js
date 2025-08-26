const { chromium } = require('playwright');
const path = require('path');

async function visualCheck() {
  console.log('🎨 Starting visual verification with Playwright...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500 // Slow down for visual inspection
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  const pagesToCheck = [
    { name: 'Home', file: 'index.html' },
    { name: 'Pets Catalog', file: 'pets/catalog.html' },
    { name: 'Pet Details', file: 'pets/details.html' },
    { name: 'Shop Catalog', file: 'shop/catalog.html' },
    { name: 'Shop Product', file: 'shop/product.html' },
    { name: 'News', file: 'news.html' }
  ];
  
  console.log('Opening pages for visual inspection...\n');
  console.log('Please check each page for:');
  console.log('  ✓ Correct colors and styling');
  console.log('  ✓ Proper layout and spacing');
  console.log('  ✓ Card components display');
  console.log('  ✓ Buttons and interactive elements\n');
  
  for (const pageInfo of pagesToCheck) {
    console.log(`\n📄 Opening ${pageInfo.name}...`);
    
    const filePath = 'file:///' + path.resolve(__dirname, pageInfo.file).replace(/\\/g, '/');
    await page.goto(filePath, { waitUntil: 'networkidle' });
    
    // Scroll to show different sections
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    
    // Check specific elements based on page
    if (pageInfo.name === 'Pets Catalog' || pageInfo.name === 'Shop Catalog') {
      // Scroll to show cards
      await page.evaluate(() => {
        const cards = document.querySelector('.pets-grid, .products-grid');
        if (cards) cards.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      await page.waitForTimeout(1000);
      
      // Hover over a card
      const card = await page.$('.pet-card, .product-card');
      if (card) {
        await card.hover();
        console.log('  - Hovering over card to check hover effects');
        await page.waitForTimeout(500);
      }
    }
    
    if (pageInfo.name === 'Home') {
      // Check hero section
      await page.evaluate(() => {
        const hero = document.querySelector('.hero-section');
        if (hero) hero.scrollIntoView({ behavior: 'smooth' });
      });
      await page.waitForTimeout(1000);
    }
    
    // Take screenshot
    await page.screenshot({ 
      path: `screenshots/visual-${pageInfo.file.replace(/[\/\\]/g, '-')}`,
      fullPage: false
    });
    
    console.log(`  ✓ Screenshot saved`);
    await page.waitForTimeout(2000); // Pause for manual inspection
  }
  
  // Test responsive design
  console.log('\n📱 Testing responsive design...\n');
  
  const breakpoints = [
    { name: 'Mobile', width: 375, height: 812 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];
  
  for (const bp of breakpoints) {
    console.log(`Testing ${bp.name} view (${bp.width}x${bp.height})...`);
    await page.setViewportSize({ width: bp.width, height: bp.height });
    
    // Test homepage responsive
    const filePath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
    await page.goto(filePath, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    
    await page.screenshot({ 
      path: `screenshots/responsive-${bp.name.toLowerCase()}.png`,
      fullPage: false
    });
    console.log(`  ✓ ${bp.name} screenshot saved`);
  }
  
  // Test interactions
  console.log('\n🖱️ Testing interactions...\n');
  
  // Go to pets catalog
  const petsPath = 'file:///' + path.resolve(__dirname, 'pets/catalog.html').replace(/\\/g, '/');
  await page.goto(petsPath, { waitUntil: 'networkidle' });
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Test filter sidebar
  const filterCheckbox = await page.$('input[type="checkbox"]');
  if (filterCheckbox) {
    await filterCheckbox.click();
    console.log('  ✓ Filter checkbox clicked');
    await page.waitForTimeout(500);
  }
  
  // Test favorite button
  const favoriteBtn = await page.$('.favorite-btn');
  if (favoriteBtn) {
    await favoriteBtn.click();
    console.log('  ✓ Favorite button clicked');
    await page.waitForTimeout(500);
  }
  
  // Go to shop catalog
  const shopPath = 'file:///' + path.resolve(__dirname, 'shop/catalog.html').replace(/\\/g, '/');
  await page.goto(shopPath, { waitUntil: 'networkidle' });
  
  // Test add to cart
  const addToCartBtn = await page.$('.add-to-cart-btn');
  if (addToCartBtn) {
    await addToCartBtn.click();
    console.log('  ✓ Add to cart button clicked');
    await page.waitForTimeout(1000);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Visual verification complete!');
  console.log('Please review the pages visually for any issues.');
  console.log('Screenshots saved in /screenshots folder.');
  console.log('='.repeat(60));
  
  await page.waitForTimeout(3000);
  await browser.close();
}

// Run the visual check
visualCheck().catch(console.error);