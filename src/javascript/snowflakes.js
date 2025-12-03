// Snowflake Animation Generator
// Creates animated snowflakes across the entire website

function createSnowflakes() {
    const container = document.getElementById('snowflakeContainer');
    if (!container) return;
    
    // Reduce count on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    const snowflakeCount = isMobile ? 25 : 35; // Reduced from 50
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

// Adjust snowflake count on window resize (debounced for performance)
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const container = document.getElementById('snowflakeContainer');
        if (!container) return;
        
        const currentCount = container.children.length;
        const isMobile = window.innerWidth <= 768;
        const targetCount = isMobile ? 25 : 35;
        
        // Only recreate if count needs to change significantly
        if (Math.abs(currentCount - targetCount) > 5) {
            container.innerHTML = '';
            createSnowflakes();
        }
    }, 500);
});

