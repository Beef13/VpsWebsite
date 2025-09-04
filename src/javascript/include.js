// Loading Header and Footer
// Header
fetch('/src/components/header.html')
    .then(response => response.text())
    .then(data => document.getElementById('header').innerHTML = data);

// Get a Quick Qoute Form
fetch('/src/components/qoute.html')
    .then(response => response.text())
    .then(data => document.getElementById('qoute-form-wrapper').innerHTML = data);

// Footer
fetch('/src/components/footer.html')
    .then(response => response.text())
    .then(data => document.getElementById('footer').innerHTML = data);

// Make QBP marquee seamless with individual card pause
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.qbp-track');
    if (track) {
        // Get the original cards
        const originalCards = Array.from(track.children);
        
        // Clear the track and rebuild with seamless loop
        track.innerHTML = '';
        
        // Add original cards
        originalCards.forEach(card => track.appendChild(card.cloneNode(true)));
        
        // Add the first few cards again to create seamless transition
        // This ensures the first card appears immediately after the last one
        for (let i = 0; i < 3; i++) {
            track.appendChild(originalCards[i].cloneNode(true));
        }
        
        // optional: allow speed control via CSS variable --qbp-speed (defaults to 20s)
        const speed = getComputedStyle(document.documentElement).getPropertyValue('--qbp-speed').trim();
        if (speed) {
            track.style.animationDuration = speed;
        }
        
        // Pause auto-scroll only when hovering over individual cards
        const cards = document.querySelectorAll('.qbp-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                track.style.animationPlayState = 'paused';
            });
            
            card.addEventListener('mouseleave', () => {
                track.style.animationPlayState = 'running';
            });
        });
    }
});

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

