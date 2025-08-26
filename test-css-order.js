const { chromium } = require('playwright');
const path = require('path');

async function testCSSOrderAndDisplay() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  console.log('🔍 Starting comprehensive CSS order and display validation...\n');
  console.log('=' .repeat(70));
  
  const results = {
    cssLoadOrder: [],
    elementsCheck: [],
    specificityIssues: [],
    displayProblems: []
  };

  // Test pages with their critical elements to check
  const pagesToTest = [
    { 
      name: 'Home', 
      file: 'index.html',
      criticalElements: [
        { selector: '.hero-section', property: 'background', expectedPattern: /gradient|linear/ },
        { selector: '.pet-card', property: 'border-radius', minValue: 8 },
        { selector: '.btn-primary', property: 'background-color', expectedPattern: /rgb|#/ },
        { selector: '.main-header', property: 'box-shadow', expectedPattern: /rgba?|px/ }
      ]
    },
    { 
      name: 'Pets Catalog', 
      file: 'pets/catalog.html',
      criticalElements: [
        { selector: '.pet-card', property: 'box-shadow', expectedPattern: /rgba?|px/ },
        { selector: '.pet-card .pet-image', property: 'height', expectedValue: '250px' },
        { selector: '.pet-card .meet-btn', property: 'background-color', expectedPattern: /rgb|#/ },
        { selector: '.filters-sidebar', property: 'position', expectedValue: 'sticky' },
        { selector: '.pet-badge', property: 'position', expectedValue: 'absolute' }
      ]
    },
    { 
      name: 'Pet Details', 
      file: 'pets/details.html',
      criticalElements: [
        { selector: '.pet-gallery', property: 'position', expectedValue: 'sticky' },
        { selector: '.main-image img', property: 'height', expectedValue: '500px' },
        { selector: '.adoption-box', property: 'background', expectedPattern: /gradient|linear/ },
        { selector: '.compatibility-card', property: 'border', expectedPattern: /solid|px/ }
      ]
    },
    { 
      name: 'Shop Catalog', 
      file: 'shop/catalog.html',
      criticalElements: [
        { selector: '.product-card', property: 'border-radius', minValue: 8 },
        { selector: '.product-card:hover', property: 'transform', checkHover: true },
        { selector: '.product-image', property: 'height', expectedValue: '250px' },
        { selector: '.add-to-cart-btn', property: 'background-color', expectedPattern: /rgb|#/ },
        { selector: '.product-badge', property: 'position', expectedValue: 'absolute' }
      ]
    },
    { 
      name: 'Shop Product', 
      file: 'shop/product.html',
      criticalElements: [
        { selector: '.product-gallery', property: 'position', expectedValue: 'sticky' },
        { selector: '.main-image img', property: 'height', expectedValue: '600px' },
        { selector: '.product-title', property: 'font-size', minValue: 24 },
        { selector: '.btn-add-to-cart', property: 'background-color', expectedPattern: /rgb|#/ }
      ]
    },
    { 
      name: 'News', 
      file: 'news.html',
      criticalElements: [
        { selector: '.news-card', property: 'box-shadow', expectedPattern: /rgba?|px/ },
        { selector: '.news-card .news-image', property: 'height', expectedValue: '250px' },
        { selector: '.featured-article', property: 'display', expectedValue: 'grid' }
      ]
    }
  ];

  // Function to check CSS load order
  async function checkCSSLoadOrder(pageName) {
    const stylesheets = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      const styles = Array.from(document.styleSheets);
      
      // Get @import rules from app.css
      let imports = [];
      try {
        const appCssSheet = styles.find(s => s.href && s.href.includes('app.css'));
        if (appCssSheet && appCssSheet.cssRules) {
          for (let rule of appCssSheet.cssRules) {
            if (rule.type === CSSRule.IMPORT_RULE) {
              imports.push(rule.href.split('/').pop());
            }
          }
        }
      } catch (e) {
        console.log('Could not read CSS rules:', e.message);
      }
      
      return {
        directLinks: links.map(l => l.href.split('/').pop()),
        imports: imports
      };
    });
    
    results.cssLoadOrder.push({
      page: pageName,
      links: stylesheets.directLinks,
      imports: stylesheets.imports
    });
    
    return stylesheets;
  }

  // Function to check element styles
  async function checkElementStyles(elements, pageName) {
    const issues = [];
    
    for (const element of elements) {
      try {
        // Handle hover states
        if (element.checkHover) {
          const exists = await page.locator(element.selector.replace(':hover', '')).first().isVisible().catch(() => false);
          if (!exists) continue;
          
          await page.hover(element.selector.replace(':hover', ''));
          await page.waitForTimeout(100);
        }
        
        const elementExists = await page.locator(element.selector.replace(':hover', '')).first().isVisible().catch(() => false);
        
        if (!elementExists) {
          issues.push({
            selector: element.selector,
            issue: 'Element not found',
            page: pageName
          });
          continue;
        }
        
        const styles = await page.evaluate((sel) => {
          const el = document.querySelector(sel.replace(':hover', ''));
          if (!el) return null;
          return window.getComputedStyle(el);
        }, element.selector);
        
        if (!styles) continue;
        
        const value = styles[element.property];
        
        // Check expected patterns
        if (element.expectedPattern) {
          if (!element.expectedPattern.test(value)) {
            issues.push({
              selector: element.selector,
              property: element.property,
              expected: element.expectedPattern.toString(),
              actual: value,
              page: pageName
            });
          }
        }
        
        // Check expected exact values
        if (element.expectedValue) {
          if (value !== element.expectedValue) {
            issues.push({
              selector: element.selector,
              property: element.property,
              expected: element.expectedValue,
              actual: value,
              page: pageName
            });
          }
        }
        
        // Check minimum values
        if (element.minValue) {
          const numValue = parseFloat(value);
          if (numValue < element.minValue) {
            issues.push({
              selector: element.selector,
              property: element.property,
              expected: `>= ${element.minValue}`,
              actual: value,
              page: pageName
            });
          }
        }
      } catch (error) {
        issues.push({
          selector: element.selector,
          issue: `Error checking: ${error.message}`,
          page: pageName
        });
      }
    }
    
    return issues;
  }

  // Check CSS variable inheritance
  async function checkCSSVariables() {
    return await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      const criticalVars = [
        '--color-primary',
        '--color-secondary',
        '--color-content-bg',
        '--shadow-sm',
        '--radius-lg',
        '--transition'
      ];
      
      const missing = [];
      const values = {};
      
      criticalVars.forEach(varName => {
        const value = styles.getPropertyValue(varName);
        if (!value || value === '') {
          missing.push(varName);
        } else {
          values[varName] = value;
        }
      });
      
      return { missing, values };
    });
  }

  // Test each page
  for (const pageInfo of pagesToTest) {
    console.log(`\n📄 Testing ${pageInfo.name} page...`);
    console.log('-'.repeat(50));
    
    try {
      const filePath = 'file:///' + path.resolve(__dirname, pageInfo.file).replace(/\\/g, '/');
      await page.goto(filePath, { waitUntil: 'networkidle' });
      
      // Wait for styles to fully load
      await page.waitForTimeout(500);
      
      // 1. Check CSS load order
      console.log('  📋 Checking CSS load order...');
      const cssOrder = await checkCSSLoadOrder(pageInfo.name);
      
      // Verify correct import order
      const expectedOrder = [
        'variables.css',
        'reset.css',
        'base.css',
        'layout.css',
        'components.css',
        'main-style.css'
      ];
      
      let orderCorrect = true;
      for (let i = 0; i < expectedOrder.length - 1; i++) {
        const currentIndex = cssOrder.imports.indexOf(expectedOrder[i]);
        const nextIndex = cssOrder.imports.indexOf(expectedOrder[i + 1]);
        if (currentIndex >= 0 && nextIndex >= 0 && currentIndex > nextIndex) {
          orderCorrect = false;
          results.specificityIssues.push({
            page: pageInfo.name,
            issue: `${expectedOrder[i]} loaded after ${expectedOrder[i + 1]}`
          });
        }
      }
      
      console.log(`    ✓ CSS files loaded: ${cssOrder.imports.length} imports`);
      if (orderCorrect) {
        console.log('    ✓ Import order is correct');
      } else {
        console.log('    ⚠️ Import order issues detected');
      }
      
      // 2. Check CSS variables
      console.log('  🎨 Checking CSS variables...');
      const cssVars = await checkCSSVariables();
      if (cssVars.missing.length > 0) {
        console.log(`    ⚠️ Missing variables: ${cssVars.missing.join(', ')}`);
        results.specificityIssues.push({
          page: pageInfo.name,
          issue: `Missing CSS variables: ${cssVars.missing.join(', ')}`
        });
      } else {
        console.log('    ✓ All critical CSS variables loaded');
      }
      
      // 3. Check critical elements
      console.log('  🔍 Checking critical elements...');
      const elementIssues = await checkElementStyles(pageInfo.criticalElements, pageInfo.name);
      
      if (elementIssues.length === 0) {
        console.log('    ✓ All critical elements styled correctly');
      } else {
        console.log(`    ⚠️ Found ${elementIssues.length} styling issues`);
        elementIssues.forEach(issue => {
          console.log(`      - ${issue.selector}: ${issue.property}`);
          console.log(`        Expected: ${issue.expected || issue.issue}`);
          console.log(`        Actual: ${issue.actual || 'N/A'}`);
        });
        results.displayProblems.push(...elementIssues);
      }
      
      // 4. Check for layout breaks
      console.log('  📐 Checking for layout issues...');
      const layoutIssues = await page.evaluate(() => {
        const issues = [];
        
        // Check for overlapping elements
        const cards = document.querySelectorAll('.pet-card, .product-card, .news-card');
        cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) {
            issues.push(`Card has zero dimensions: ${card.className}`);
          }
        });
        
        // Check for broken images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (img.naturalWidth === 0 && img.src) {
            issues.push(`Broken image: ${img.src}`);
          }
        });
        
        // Check z-index stacking
        const modals = document.querySelectorAll('.modal, .cart-sidebar');
        modals.forEach(modal => {
          const zIndex = window.getComputedStyle(modal).zIndex;
          if (zIndex === 'auto' || parseInt(zIndex) < 1000) {
            issues.push(`Low z-index for overlay: ${modal.className}`);
          }
        });
        
        return issues;
      });
      
      if (layoutIssues.length === 0) {
        console.log('    ✓ No layout issues detected');
      } else {
        console.log(`    ⚠️ Layout issues found:`);
        layoutIssues.forEach(issue => {
          console.log(`      - ${issue}`);
        });
        results.displayProblems.push({
          page: pageInfo.name,
          layoutIssues
        });
      }
      
      // 5. Take screenshot for visual verification
      await page.screenshot({ 
        path: `screenshots/check-${pageInfo.file.replace(/[\/\\]/g, '-')}`,
        fullPage: false 
      });
      
    } catch (error) {
      console.log(`  ❌ ERROR testing ${pageInfo.name}: ${error.message}`);
      results.displayProblems.push({
        page: pageInfo.name,
        issue: `Test failed: ${error.message}`
      });
    }
  }
  
  // Test responsive breakpoints
  console.log('\n📱 Testing responsive design...');
  console.log('-'.repeat(50));
  
  const breakpoints = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];
  
  for (const bp of breakpoints) {
    console.log(`\n  Testing ${bp.name} (${bp.width}x${bp.height})...`);
    await page.setViewportSize({ width: bp.width, height: bp.height });
    
    // Test homepage at this breakpoint
    const filePath = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
    await page.goto(filePath, { waitUntil: 'networkidle' });
    
    const responsiveCheck = await page.evaluate((width) => {
      const issues = [];
      
      // Check if navigation is properly hidden/shown
      const nav = document.querySelector('.main-nav');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      
      if (width <= 768) {
        if (nav && window.getComputedStyle(nav).display !== 'none') {
          issues.push('Desktop nav visible on mobile');
        }
        if (mobileToggle && window.getComputedStyle(mobileToggle).display === 'none') {
          issues.push('Mobile toggle hidden on mobile');
        }
      } else {
        if (nav && window.getComputedStyle(nav).display === 'none') {
          issues.push('Desktop nav hidden on desktop');
        }
        if (mobileToggle && window.getComputedStyle(mobileToggle).display !== 'none') {
          issues.push('Mobile toggle visible on desktop');
        }
      }
      
      // Check grid layouts
      const grids = document.querySelectorAll('.pets-grid, .products-grid');
      grids.forEach(grid => {
        const cols = window.getComputedStyle(grid).gridTemplateColumns;
        if (width <= 768 && !cols.includes('1fr') && cols !== 'none') {
          issues.push(`Grid not single column on mobile: ${grid.className}`);
        }
      });
      
      return issues;
    }, bp.width);
    
    if (responsiveCheck.length === 0) {
      console.log(`    ✓ Responsive layout correct for ${bp.name}`);
    } else {
      console.log(`    ⚠️ Responsive issues for ${bp.name}:`);
      responsiveCheck.forEach(issue => {
        console.log(`      - ${issue}`);
      });
    }
  }
  
  // Generate final report
  console.log('\n' + '='.repeat(70));
  console.log('📊 FINAL REPORT');
  console.log('='.repeat(70));
  
  const totalIssues = results.specificityIssues.length + results.displayProblems.length;
  
  if (totalIssues === 0) {
    console.log('\n✅ All CSS files are loaded in correct order!');
    console.log('✅ All elements are displaying correctly!');
    console.log('✅ No CSS cascade or specificity issues detected!');
    console.log('✅ Responsive design is working properly!');
  } else {
    console.log(`\n⚠️ Found ${totalIssues} total issues:\n`);
    
    if (results.specificityIssues.length > 0) {
      console.log('CSS Order/Specificity Issues:');
      results.specificityIssues.forEach(issue => {
        console.log(`  - [${issue.page}] ${issue.issue}`);
      });
    }
    
    if (results.displayProblems.length > 0) {
      console.log('\nDisplay/Styling Issues:');
      const grouped = {};
      results.displayProblems.forEach(problem => {
        if (problem.page) {
          if (!grouped[problem.page]) grouped[problem.page] = [];
          grouped[problem.page].push(problem);
        }
      });
      
      Object.keys(grouped).forEach(page => {
        console.log(`  ${page}:`);
        grouped[page].forEach(problem => {
          if (problem.selector) {
            console.log(`    - ${problem.selector} (${problem.property})`);
            if (problem.expected) console.log(`      Expected: ${problem.expected}`);
            if (problem.actual) console.log(`      Actual: ${problem.actual}`);
          } else if (problem.layoutIssues) {
            problem.layoutIssues.forEach(issue => {
              console.log(`    - ${issue}`);
            });
          } else if (problem.issue) {
            console.log(`    - ${problem.issue}`);
          }
        });
      });
    }
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('Test completed. Screenshots saved to /screenshots folder.');
  
  await browser.close();
  
  return totalIssues === 0;
}

// Run the test
testCSSOrderAndDisplay()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });