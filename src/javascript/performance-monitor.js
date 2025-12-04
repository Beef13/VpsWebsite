// Performance Monitoring Script
// Tracks Core Web Vitals and logs performance metrics
// Use for development/testing only - remove or comment out in production

(function() {
  'use strict';
  
  // Only run in development (check for localhost or specific flag)
  const isDevelopment = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.search.includes('debug=performance');
  
  if (!isDevelopment) {
    return; // Don't run in production
  }

  console.log('📊 Performance Monitoring Active');

  // ============================================
  // CORE WEB VITALS
  // ============================================

  // Largest Contentful Paint (LCP)
  // Target: < 2.5s (Good), < 4.0s (Needs Improvement), > 4.0s (Poor)
  const observeLCP = () => {
    if (!('PerformanceObserver' in window)) return;

    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.renderTime || lastEntry.loadTime;
        
        const status = lcp < 2500 ? '✅ Good' : 
                      lcp < 4000 ? '⚠️  Needs Improvement' : 
                      '❌ Poor';
        
        console.log(`%c📏 LCP: ${(lcp / 1000).toFixed(2)}s ${status}`, 
                    'color: #00aa00; font-weight: bold;');
        
        // Log the element
        if (lastEntry.element) {
          console.log('   Element:', lastEntry.element);
        }
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP observer failed:', e);
    }
  };

  // First Input Delay (FID)
  // Target: < 100ms (Good), < 300ms (Needs Improvement), > 300ms (Poor)
  const observeFID = () => {
    if (!('PerformanceObserver' in window)) return;

    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime;
          
          const status = fid < 100 ? '✅ Good' : 
                        fid < 300 ? '⚠️  Needs Improvement' : 
                        '❌ Poor';
          
          console.log(`%c⚡ FID: ${fid.toFixed(2)}ms ${status}`, 
                      'color: #00aa00; font-weight: bold;');
        });
      });

      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('FID observer failed:', e);
    }
  };

  // Cumulative Layout Shift (CLS)
  // Target: < 0.1 (Good), < 0.25 (Needs Improvement), > 0.25 (Poor)
  const observeCLS = () => {
    if (!('PerformanceObserver' in window)) return;

    let clsScore = 0;

    try {
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
          }
        });
        
        const status = clsScore < 0.1 ? '✅ Good' : 
                      clsScore < 0.25 ? '⚠️  Needs Improvement' : 
                      '❌ Poor';
        
        console.log(`%c📐 CLS: ${clsScore.toFixed(3)} ${status}`, 
                    'color: #00aa00; font-weight: bold;');
      });

      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS observer failed:', e);
    }
  };

  // ============================================
  // NAVIGATION TIMING
  // ============================================
  const logNavigationTiming = () => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        if (!perfData) return;

        console.log('%c⏱️  Navigation Timing:', 'color: #0066cc; font-weight: bold;');
        console.log(`   DNS Lookup: ${(perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2)}ms`);
        console.log(`   TCP Connection: ${(perfData.connectEnd - perfData.connectStart).toFixed(2)}ms`);
        console.log(`   Request Time: ${(perfData.responseStart - perfData.requestStart).toFixed(2)}ms`);
        console.log(`   Response Time: ${(perfData.responseEnd - perfData.responseStart).toFixed(2)}ms`);
        console.log(`   DOM Processing: ${(perfData.domComplete - perfData.domLoading).toFixed(2)}ms`);
        console.log(`   Load Complete: ${(perfData.loadEventEnd - perfData.fetchStart).toFixed(2)}ms`);
      }, 0);
    });
  };

  // ============================================
  // PAINT TIMING
  // ============================================
  const logPaintTiming = () => {
    if (!('PerformanceObserver' in window)) return;

    try {
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const time = entry.startTime;
          const status = time < 1000 ? '✅ Fast' : 
                        time < 2500 ? '⚠️  Moderate' : 
                        '❌ Slow';
          
          console.log(`%c🎨 ${entry.name}: ${time.toFixed(2)}ms ${status}`, 
                      'color: #cc6600; font-weight: bold;');
        });
      });

      paintObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.warn('Paint observer failed:', e);
    }
  };

  // ============================================
  // RESOURCE TIMING
  // ============================================
  const logResourceTiming = () => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const resources = performance.getEntriesByType('resource');
        
        console.log('%c📦 Resource Loading:', 'color: #9900cc; font-weight: bold;');
        
        // Group by type
        const byType = {};
        let totalSize = 0;
        let totalDuration = 0;
        
        resources.forEach((resource) => {
          const type = resource.initiatorType || 'other';
          
          if (!byType[type]) {
            byType[type] = { count: 0, size: 0, duration: 0 };
          }
          
          byType[type].count++;
          byType[type].size += resource.transferSize || 0;
          byType[type].duration += resource.duration;
          
          totalSize += resource.transferSize || 0;
          totalDuration += resource.duration;
        });
        
        // Log summary
        console.table(byType);
        console.log(`   Total Resources: ${resources.length}`);
        console.log(`   Total Transfer Size: ${(totalSize / 1024).toFixed(2)} KB`);
        console.log(`   Total Load Time: ${totalDuration.toFixed(2)}ms`);
        
        // Find slow resources (> 1s)
        const slowResources = resources.filter(r => r.duration > 1000);
        if (slowResources.length > 0) {
          console.warn('   ⚠️  Slow Resources (>1s):', slowResources.map(r => ({
            name: r.name.split('/').pop(),
            duration: `${r.duration.toFixed(2)}ms`,
            size: `${((r.transferSize || 0) / 1024).toFixed(2)} KB`
          })));
        }
      }, 1000);
    });
  };

  // ============================================
  // MEMORY USAGE (Chrome only)
  // ============================================
  const logMemoryUsage = () => {
    if (!performance.memory) {
      console.log('💾 Memory monitoring not available (Chrome only)');
      return;
    }

    window.addEventListener('load', () => {
      setTimeout(() => {
        const memory = performance.memory;
        console.log('%c💾 Memory Usage:', 'color: #cc0066; font-weight: bold;');
        console.log(`   Used: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`);
        console.log(`   Total: ${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`);
        console.log(`   Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`);
      }, 2000);
    });
  };

  // ============================================
  // CONNECTION INFO
  // ============================================
  const logConnectionInfo = () => {
    if (!navigator.connection && !navigator.mozConnection && !navigator.webkitConnection) {
      console.log('📶 Connection info not available');
      return;
    }

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    console.log('%c📶 Connection Info:', 'color: #006699; font-weight: bold;');
    console.log(`   Effective Type: ${connection.effectiveType || 'unknown'}`);
    console.log(`   Downlink: ${connection.downlink || 'unknown'} Mbps`);
    console.log(`   RTT: ${connection.rtt || 'unknown'}ms`);
    console.log(`   Save Data: ${connection.saveData ? 'Yes' : 'No'}`);
  };

  // ============================================
  // RECOMMENDATIONS
  // ============================================
  const provideRecommendations = () => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        console.log('%c🎯 Performance Recommendations:', 'color: #009900; font-weight: bold; font-size: 14px;');
        
        const recommendations = [];
        
        // Check LCP
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        if (lcpEntries.length > 0) {
          const lcp = lcpEntries[lcpEntries.length - 1];
          const lcpTime = lcp.renderTime || lcp.loadTime;
          if (lcpTime > 2500) {
            recommendations.push('⚠️  LCP is slow - optimize largest image/element');
          }
        }
        
        // Check resources
        const resources = performance.getEntriesByType('resource');
        const largeResources = resources.filter(r => (r.transferSize || 0) > 500000); // > 500KB
        if (largeResources.length > 0) {
          recommendations.push(`⚠️  ${largeResources.length} large resources (>500KB) - compress or optimize`);
        }
        
        // Check number of requests
        if (resources.length > 50) {
          recommendations.push(`⚠️  ${resources.length} total requests - consider bundling`);
        }
        
        if (recommendations.length === 0) {
          console.log('   ✅ No major issues detected!');
        } else {
          recommendations.forEach(rec => console.log(`   ${rec}`));
        }
      }, 2000);
    });
  };

  // ============================================
  // INITIALIZE ALL MONITORS
  // ============================================
  observeLCP();
  observeFID();
  observeCLS();
  logNavigationTiming();
  logPaintTiming();
  logResourceTiming();
  logMemoryUsage();
  logConnectionInfo();
  provideRecommendations();

  // Summary after everything loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      console.log('%c🏁 Performance Monitoring Complete', 
                  'color: #009900; font-weight: bold; font-size: 16px;');
      console.log('   Add ?debug=performance to URL to enable on any page');
    }, 3000);
  });
})();

