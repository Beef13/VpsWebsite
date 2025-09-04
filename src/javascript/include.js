// Loading Header and Footer
// Updated: 2025-01-04 - Optimized for performance
document.addEventListener('DOMContentLoaded', () => {
    // Load components
    loadComponent('header', './src/components/header.html');
    loadComponent('footer', './src/components/footer.html');
    
    // Setup functionality
    setupInfiniteScroll();
    setupQuickBrowseNavigation();
    setupDragToScroll();
});

// Component loader with error handling
function loadComponent(elementId, url) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
        })
        .catch(error => {
            console.error(`${elementId} loading error:`, error);
        });
}

// Infinite scroll setup
function setupInfiniteScroll() {
    const scrollTrack = document.querySelector('.scroll-track');
    if (!scrollTrack) return;
    
    const originalItems = Array.from(scrollTrack.children);
    scrollTrack.innerHTML = '';
    
    // Add three sets for seamless loop
    for (let i = 0; i < 3; i++) {
        originalItems.forEach(item => {
            scrollTrack.appendChild(item.cloneNode(true));
        });
    }
}

// Quick browse navigation setup
function setupQuickBrowseNavigation() {
    const leftArrow = document.querySelector('.quick-browse-bottom .arrow-left');
    const rightArrow = document.querySelector('.quick-browse-bottom .arrow-right');
    const productsWrapper = document.querySelector('.quick-browse-products-wrapper');
    
    if (!leftArrow || !rightArrow || !productsWrapper) return;
    
    const firstItem = productsWrapper.querySelector('.qbp-container');
    const itemWidth = firstItem ? firstItem.offsetWidth + 20 : 349;
    
    // Navigation event handlers
    leftArrow.addEventListener('click', () => {
        const currentScrollLeft = productsWrapper.scrollLeft;
        const newScrollLeft = Math.max(0, currentScrollLeft - itemWidth);
        productsWrapper.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    });
    
    rightArrow.addEventListener('click', () => {
        const currentScrollLeft = productsWrapper.scrollLeft;
        const maxScrollLeft = productsWrapper.scrollWidth - productsWrapper.clientWidth;
        const newScrollLeft = Math.min(maxScrollLeft, currentScrollLeft + itemWidth);
        productsWrapper.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    });
    
    // Set cursor styles
    leftArrow.style.cursor = 'pointer';
    rightArrow.style.cursor = 'pointer';
}

// Drag to scroll functionality
function setupDragToScroll() {
    const productsWrapper = document.querySelector('.quick-browse-products-wrapper');
    if (!productsWrapper) return;
    
    let isDragging = false;
    let startX, startScrollLeft;
    
    // Mouse events for desktop
    productsWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - productsWrapper.offsetLeft;
        startScrollLeft = productsWrapper.scrollLeft;
        productsWrapper.style.cursor = 'grabbing';
        productsWrapper.style.userSelect = 'none';
    });
    
    productsWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - productsWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        productsWrapper.scrollLeft = startScrollLeft - walk;
    });
    
    productsWrapper.addEventListener('mouseup', () => {
        isDragging = false;
        productsWrapper.style.cursor = 'grab';
        productsWrapper.style.userSelect = 'auto';
    });
    
    productsWrapper.addEventListener('mouseleave', () => {
        isDragging = false;
        productsWrapper.style.cursor = 'grab';
        productsWrapper.style.userSelect = 'auto';
    });
    
    // Touch events for mobile
    productsWrapper.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - productsWrapper.offsetLeft;
        startScrollLeft = productsWrapper.scrollLeft;
    });
    
    productsWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - productsWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        productsWrapper.scrollLeft = startScrollLeft - walk;
    });
    
    productsWrapper.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Set initial cursor style
    productsWrapper.style.cursor = 'grab';
}

