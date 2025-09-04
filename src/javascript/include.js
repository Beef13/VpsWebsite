// Loading Header and Footer
// Updated: 2025-09-05 - All fixes applied
console.log('JavaScript loading...');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting to load components...');
    
    // Header
    console.log('Attempting to load header...');
    fetch('./src/components/header.html')
        .then(response => {
            console.log('Header response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log('Header data received, length:', data.length);
            const headerElement = document.getElementById('header');
            if (headerElement) {
                headerElement.innerHTML = data;
                console.log('Header loaded successfully');
            } else {
                console.error('Header element not found in DOM');
            }
        })
        .catch(error => {
            console.error('Header loading error:', error);
        });

    // Footer
    console.log('Attempting to load footer...');
    fetch('./src/components/footer.html')
        .then(response => {
            console.log('Footer response status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log('Footer data received, length:', data.length);
            const footerElement = document.getElementById('footer');
            if (footerElement) {
                footerElement.innerHTML = data;
                console.log('Footer loaded successfully');
            } else {
                console.error('Footer element not found in DOM');
            }
        })
        .catch(error => {
            console.error('Footer loading error:', error);
        });

    // Infinite Scroll Functionality
    console.log('Setting up infinite scroll...');
    const scrollTrack = document.querySelector('.scroll-track');
    if (scrollTrack) {
        console.log('Scroll track found, setting up infinite scroll...');
        // Get the original scroll items
        const originalItems = Array.from(scrollTrack.children);
        
        // Clear the track
        scrollTrack.innerHTML = '';
        
        // Add original items (first set)
        originalItems.forEach(item => {
            scrollTrack.appendChild(item.cloneNode(true));
        });
        
        // Add duplicate items (second set) for seamless loop
        originalItems.forEach(item => {
            scrollTrack.appendChild(item.cloneNode(true));
        });
        
        // Add third set to ensure smooth transition
        originalItems.forEach(item => {
            scrollTrack.appendChild(item.cloneNode(true));
        });
        console.log('Infinite scroll setup complete');
    } else {
        console.log('Scroll track not found');
    }

    // Quick Browse Products Navigation Arrows
    console.log('Setting up quick browse navigation arrows...');
    const leftArrow = document.querySelector('.quick-browse-bottom .arrow-left');
    const rightArrow = document.querySelector('.quick-browse-bottom .arrow-right');
    const productsWrapper = document.querySelector('.quick-browse-products-wrapper');
    
    if (leftArrow && rightArrow && productsWrapper) {
        console.log('Navigation arrows and products wrapper found');
        
        // Get the width of one item container for incremental scrolling
        const firstItem = productsWrapper.querySelector('.qbp-container');
        const itemWidth = firstItem ? firstItem.offsetWidth + 20 : 349; // 329px width + 20px gap
        
        // Left arrow - scroll left by one item
        leftArrow.addEventListener('click', () => {
            console.log('Left arrow clicked - scrolling left by one item');
            const currentScrollLeft = productsWrapper.scrollLeft;
            const newScrollLeft = Math.max(0, currentScrollLeft - itemWidth);
            
            productsWrapper.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        });
        
        // Right arrow - scroll right by one item
        rightArrow.addEventListener('click', () => {
            console.log('Right arrow clicked - scrolling right by one item');
            const currentScrollLeft = productsWrapper.scrollLeft;
            const maxScrollLeft = productsWrapper.scrollWidth - productsWrapper.clientWidth;
            const newScrollLeft = Math.min(maxScrollLeft, currentScrollLeft + itemWidth);
            
            productsWrapper.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        });
        
        // Add cursor pointer to arrows
        leftArrow.style.cursor = 'pointer';
        rightArrow.style.cursor = 'pointer';
        
        console.log('Quick browse navigation arrows setup complete - incremental scrolling enabled');
    } else {
        console.log('Navigation arrows or products wrapper not found');
    }
});

