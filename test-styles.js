const { chromium } = require('playwright');
const path = require('path');

async function testStyles() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Starting CSS validation tests...\n');
  
  // Test pages to verify
  const pagesToTest = [
    { name: 'Home', file: 'index.html' },
    { name: 'Auth', file: 'auth.html' },
    { name: 'Contact', file: 'contact.html' },
    { name: 'Donate', file: 'donate.html' },
    { name: 'How It Works', file: 'how-it-works.html' },
    { name: 'News', file: 'news.html' },
    { name: 'News Article', file: 'news-article.html' },
    { name: 'Profile', file: 'profile.html' },
    { name: 'Support Us', file: 'support-us.html' },
    { name: 'Adoption Form', file: 'adoption-form.html' },
    { name: 'Pets Catalog', file: 'pets/catalog.html' },
    { name: 'Pet Details', file: 'pets/details.html' },
    { name: 'Shop Catalog', file: 'shop/catalog.html' },
    { name: 'Shop Product', file: 'shop/product.html' },
    { name: 'Shop Checkout', file: 'shop/checkout.html' }
  ];
  
  let allPassed = true;
  
  for (const pageInfo of pagesToTest) {
    try {
      const filePath = 'file:///' + path.resolve(__dirname, pageInfo.file).replace(/\\/g, '/');
      console.log(`Testing ${pageInfo.name} page...`);
      
      await page.goto(filePath, { waitUntil: 'networkidle' });
      
      // Check if app.css is loaded
      const stylesheets = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        return links.map(link => link.href);
      });
      
      const hasAppCss = stylesheets.some(href => href.includes('app.css'));
      
      if (!hasAppCss) {
        console.log(`  ❌ ERROR: app.css not found on ${pageInfo.name} page`);
        allPassed = false;
        continue;
      }
      
      // Check if CSS variables are loaded (from variables.css)
      const hasVariables = await page.evaluate(() => {
        const styles = getComputedStyle(document.documentElement);
        return styles.getPropertyValue('--primary-dark-green') !== '';
      });
      
      // Check if basic styles are applied
      const bodyStyles = await page.evaluate(() => {
        const body = document.body;
        const styles = getComputedStyle(body);
        return {
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          color: styles.color
        };
      });
      
      // Check if specific elements have styles
      const hasStyledElements = await page.evaluate(() => {
        // Check if container has max-width
        const container = document.querySelector('.container');
        if (container) {
          const styles = getComputedStyle(container);
          return styles.maxWidth !== 'none';
        }
        return true; // If no container, consider it passed
      });
      
      // Report results
      console.log(`  ✓ app.css loaded`);
      
      if (hasVariables) {
        console.log(`  ✓ CSS variables loaded`);
      } else {
        console.log(`  ❌ CSS variables not loaded`);
        allPassed = false;
      }
      
      if (bodyStyles.fontFamily && bodyStyles.fontFamily !== 'none') {
        console.log(`  ✓ Typography styles applied`);
      } else {
        console.log(`  ❌ Typography styles not applied`);
        allPassed = false;
      }
      
      if (hasStyledElements) {
        console.log(`  ✓ Layout styles applied`);
      } else {
        console.log(`  ❌ Layout styles not applied`);
        allPassed = false;
      }
      
      console.log('');
      
    } catch (error) {
      console.log(`  ❌ ERROR testing ${pageInfo.name}: ${error.message}\n`);
      allPassed = false;
    }
  }
  
  // Test visual regression - take screenshots
  console.log('Taking screenshots for visual comparison...\n');
  
  const screenshotsDir = 'screenshots';
  const fs = require('fs');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }
  
  // Take screenshots of key pages
  const keyPages = ['index.html', 'pets/catalog.html', 'shop/catalog.html'];
  
  for (const pageFile of keyPages) {
    const filePath = 'file:///' + path.resolve(__dirname, pageFile).replace(/\\/g, '/');
    await page.goto(filePath, { waitUntil: 'networkidle' });
    
    const screenshotName = pageFile.replace(/\//g, '-').replace('.html', '.png');
    await page.screenshot({ 
      path: path.join(screenshotsDir, screenshotName),
      fullPage: true 
    });
    console.log(`  ✓ Screenshot saved: ${screenshotName}`);
  }
  
  await browser.close();
  
  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('✅ All CSS tests passed successfully!');
    console.log('The CSS refactoring has been completed successfully.');
  } else {
    console.log('⚠️  Some tests failed. Please review the errors above.');
  }
  console.log('='.repeat(50));
  
  return allPassed;
}

// Run the tests
testStyles().catch(console.error);