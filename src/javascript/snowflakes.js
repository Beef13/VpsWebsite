// Snowflake Animation Generator
// Creates animated snowflakes across the entire website
// Only displays on desktop (>1024px)

function createSnowflakes() {
    const container = document.getElementById('snowflakeContainer');
    if (!container) return;
    
    // Only create snowflakes on desktop (tablet and mobile disabled)
    const isDesktop = window.innerWidth > 1024;
    if (!isDesktop) return; // Exit early for mobile/tablet
    
    const snowflakeCount = 35; // Desktop only
    const snowflakeChars = ['❄', '❅', '❆']; // Different snowflake symbols
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Random snowflake character
        snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        
        // Random size class
        const sizes = ['small', 'medium', 'large'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        snowflake.classList.add(randomSize);
        
        // Random horizontal position
        snowflake.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (slower = more realistic)
        const duration = Math.random() * 10 + 10; // 10-20 seconds
        
        // Random delay - negative to start mid-animation (creates instant spread effect)
        const delay = -(Math.random() * duration); // Start mid-animation
        
        // Random sway amount
        const swayAmount = (Math.random() - 0.5) * 60; // -30px to 30px
        
        // Set animation properties
        snowflake.style.animation = `fallAndSway ${duration}s linear infinite ${delay}s`;
        snowflake.style.setProperty('--sway-amount', swayAmount + 'px');
        
        container.appendChild(snowflake);
    }
}

// Initialize snowflakes when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSnowflakes);
} else {
    createSnowflakes();
}

// Handle window resize (debounced for performance)
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const container = document.getElementById('snowflakeContainer');
        if (!container) return;
        
        const isDesktop = window.innerWidth > 1024;
        const hasSnowflakes = container.children.length > 0;
        
        // If switched from desktop to mobile/tablet, clear snowflakes
        if (!isDesktop && hasSnowflakes) {
            container.innerHTML = '';
        }
        // If switched from mobile/tablet to desktop, create snowflakes
        else if (isDesktop && !hasSnowflakes) {
            createSnowflakes();
        }
    }, 500);
});

