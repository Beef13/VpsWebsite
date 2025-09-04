// Loading Header and Footer
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
});

