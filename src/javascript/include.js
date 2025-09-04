// Loading Header and Footer
// Header
fetch('./src/components/header.html')
    .then(response => response.text())
    .then(data => document.getElementById('header').innerHTML = data)
    .catch(error => console.log('Header loading error:', error));

// Footer
fetch('./src/components/footer.html')
    .then(response => response.text())
    .then(data => document.getElementById('footer').innerHTML = data)
    .catch(error => console.log('Footer loading error:', error));

// Infinite Scroll Functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollTrack = document.querySelector('.scroll-track');
    if (scrollTrack) {
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
    }
});

