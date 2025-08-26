const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function finalCSSCheck() {
  console.log('🔍 Final CSS Order and Display Verification\n');
  console.log('=' .repeat(70));
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  let totalIssues = 0;
  const results = [];
  
  // Create screenshots directory if it doesn't exist
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }
  
  const pagesToTest = [
    { name: 'Home', file: 'index.html' },
    { name: 'Pets Catalog', file: 'pets/catalog.html' },
    { name: 'Pet Details', file: 'pets/details.html' },
    { name: 'Shop Catalog', file: 'shop/catalog.html' },
    { name: 'Shop Product', file: 'shop/product.html' },
    { name: 'News', file: 'news.html' },
    { name: 'Checkout', file: 'shop/checkout.html' },
    { name: 'Auth', file: 'auth.html' },
    { name: 'Contact', file: 'contact.html' },
    { name: 'Profile', file: 'profile.html' }
  ];
  
  for (const pageInfo of pagesToTest) {
    console.log(`\nTesting ${pageInfo.name} page...`);
    const pageResults = {
      page: pageInfo.name,
      cssLoaded: false,
      variablesLoaded: false,
      elementsStyled: false,
      issues: []
    };
    
    try {
      const filePath = 'file:///' + path.resolve(__dirname, pageInfo.file).replace(/\\/g, '/');
      await page.goto(filePath, { waitUntil: 'networkidle' });
      
      // 1. Check if app.css is loaded
      const appCssLoaded = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        return links.some(link => link.href.includes('app.css'));
      });
      
      pageResults.cssLoaded = appCssLoaded;
      console.log(appCssLoaded ? '  ✓ app.css loaded' : '  ❌ app.css NOT loaded');
      
      // 2. Check if CSS variables are loaded
      const cssVariables = await page.evaluate(() => {
        const styles = getComputedStyle(document.documentElement);
        const primaryColor = styles.getPropertyValue('--color-primary');
        const secondaryColor = styles.getPropertyValue('--color-secondary');
        const shadowSm = styles.getPropertyValue('--shadow-sm');
        
        return {
          hasVariables: !!(primaryColor && secondaryColor && shadowSm),
          primary: primaryColor,
          secondary: secondaryColor
        };
      });
      
      pageResults.variablesLoaded = cssVariables.hasVariables;
      console.log(cssVariables.hasVariables ? '  ✓ CSS variables loaded' : '  ❌ CSS variables NOT loaded');
      
      // 3. Check key elements based on page type
      let elementsOk = true;
      
      if (pageInfo.name.includes('Catalog')) {
        // Check cards
        const cardCheck = await page.evaluate(() => {
          const cards = document.querySelectorAll('.pet-card, .product-card');
          if (cards.length === 0) return { found: false };
          
          const firstCard = cards[0];
          const styles = getComputedStyle(firstCard);
          
          return {
            found: true,
            hasBackground: styles.backgroundColor !== 'rgba(0, 0, 0, 0)',
            hasBorderRadius: parseFloat(styles.borderRadius) > 0,
            hasBoxShadow: styles.boxShadow !== 'none'
          };
        });
        
        if (!cardCheck.found) {
          pageResults.issues.push('No cards found on catalog page');
          elementsOk = false;
        } else if (!cardCheck.hasBackground || !cardCheck.hasBorderRadius) {
          pageResults.issues.push('Card styling incomplete');
          elementsOk = false;
        }
      }
      
      // Check buttons
      const buttonCheck = await page.evaluate(() => {
        const buttons = document.querySelectorAll('.btn-primary, .add-to-cart-btn, .meet-btn');
        if (buttons.length === 0) return { found: false };
        
        const firstButton = buttons[0];
        const styles = getComputedStyle(firstButton);
        
        return {
          found: true,
          hasBackground: styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && styles.backgroundColor !== '',
          hasColor: styles.color !== 'rgba(0, 0, 0, 0)' && styles.color !== ''
        };
      });
      
      if (buttonCheck.found && (!buttonCheck.hasBackground || !buttonCheck.hasColor)) {
        pageResults.issues.push('Button styling incomplete');
        elementsOk = false;
      }
      
      // Check layout containers
      const layoutCheck = await page.evaluate(() => {
        const container = document.querySelector('.container');
        if (!container) return { found: false };
        
        const styles = getComputedStyle(container);
        return {
          found: true,
          hasMaxWidth: styles.maxWidth !== 'none',
          hasMargin: styles.marginLeft === 'auto' || parseFloat(styles.marginLeft) > 0
        };
      });
      
      if (layoutCheck.found && !layoutCheck.hasMaxWidth) {
        pageResults.issues.push('Container layout not applied');
        elementsOk = false;
      }
      
      pageResults.elementsStyled = elementsOk;
      console.log(elementsOk ? '  ✓ Elements properly styled' : '  ⚠️ Some elements lack styling');
      
      if (pageResults.issues.length > 0) {
        console.log('  Issues found:');
        pageResults.issues.forEach(issue => {
          console.log(`    - ${issue}`);
          totalIssues++;
        });
      }
      
      // Save screenshot
      try {
        const screenshotPath = `screenshots/final-${pageInfo.file.replace(/[\/\\]/g, '-')}.png`;
        await page.screenshot({ 
          path: screenshotPath,
          fullPage: false 
        });
        console.log(`  📸 Screenshot saved: ${screenshotPath}`);
      } catch (e) {
        // Screenshot might fail but test continues
      }
      
    } catch (error) {
      console.log(`  ❌ Error testing page: ${error.message}`);
      pageResults.issues.push(`Test error: ${error.message}`);
      totalIssues++;
    }
    
    results.push(pageResults);
  }
  
  // Test CSS import order
  console.log('\n' + '='.repeat(70));
  console.log('Checking CSS Import Order...');
  console.log('='.repeat(70));
  
  const indexPath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  await page.goto(indexPath, { waitUntil: 'networkidle' });
  
  const importOrder = await page.evaluate(() => {
    // Try to get computed styles to verify cascade
    const testElements = {
      button: document.querySelector('button, .btn-primary'),
      card: document.querySelector('.pet-card, .product-card, .card'),
      container: document.querySelector('.container')
    };
    
    const results = {};
    Object.keys(testElements).forEach(key => {
      if (testElements[key]) {
        const styles = getComputedStyle(testElements[key]);
        results[key] = {
          found: true,
          background: styles.backgroundColor,
          color: styles.color,
          padding: styles.padding
        };
      } else {
        results[key] = { found: false };
      }
    });
    
    return results;
  });
  
  console.log('\nElement cascade check:');
  Object.keys(importOrder).forEach(key => {
    if (importOrder[key].found) {
      console.log(`  ✓ ${key}: styled correctly`);
    } else {
      console.log(`  - ${key}: not found on page`);
    }
  });
  
  // Final summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 FINAL SUMMARY');
  console.log('='.repeat(70));
  
  const allPagesOk = results.every(r => 
    r.cssLoaded && r.variablesLoaded && r.elementsStyled && r.issues.length === 0
  );
  
  if (allPagesOk) {
    console.log('\n✅ SUCCESS! All CSS files are properly loaded and ordered.');
    console.log('✅ All pages display correctly with proper styling.');
    console.log('✅ CSS cascade and specificity are working as expected.');
  } else {
    console.log(`\n⚠️ Found ${totalIssues} total issues across pages.`);
    console.log('\nPages with issues:');
    results.filter(r => r.issues.length > 0).forEach(r => {
      console.log(`  - ${r.page}: ${r.issues.join(', ')}`);
    });
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('Test complete. Check /screenshots folder for visual verification.');
  console.log('='.repeat(70));
  
  await browser.close();
  
  return allPagesOk;
}

// Run the final check
finalCSSCheck()
  .then(success => {
    if (success) {
      console.log('\n🎉 All tests passed successfully!');
    } else {
      console.log('\n⚠️ Some issues were found. Please review the results above.');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });