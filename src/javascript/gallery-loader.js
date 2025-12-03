// Gallery Loader - Dynamically loads gallery images from gallery.json

let galleryImages = [];
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadGalleryImages();
    createLightbox();
    setupKeyboardNavigation();
});

async function loadGalleryImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) return;

    try {
        // Determine correct path based on page location
        const isInSubdirectory = window.location.pathname.includes('/gallery/');
        const jsonPath = isInSubdirectory ? '../src/data/gallery.json' : './src/data/gallery.json';
        
        const response = await fetch(jsonPath);
        const data = await response.json();
        
        // Store images with valid sources for lightbox navigation
        galleryImages = data.images.filter(img => img.src && img.src.trim() !== '');
        
        // Clear existing content
        galleryGrid.innerHTML = '';
        
        // Create gallery items
        data.images.forEach((image, index) => {
            const galleryItem = createGalleryItem(image, index);
            galleryGrid.appendChild(galleryItem);
        });
        
    } catch (error) {
        console.error('Error loading gallery images:', error);
        // Show placeholder message if loading fails
        galleryGrid.innerHTML = '<p class="gallery-error">Unable to load gallery images.</p>';
    }
}

function createGalleryItem(image, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.id = image.id;
    
    // Check if image source exists
    if (image.src && image.src.trim() !== '') {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt || 'Gallery image';
        img.loading = 'lazy';
        item.appendChild(img);
        
        // Add click handler to open lightbox
        item.addEventListener('click', () => {
            const validIndex = galleryImages.findIndex(img => img.id === image.id);
            if (validIndex !== -1) {
                openLightbox(validIndex);
            }
        });
        
        // Add caption if exists
        if (image.caption && image.caption.trim() !== '') {
            const caption = document.createElement('div');
            caption.className = 'gallery-caption';
            caption.textContent = image.caption;
            item.appendChild(caption);
        }
    } else {
        // Show placeholder if no image
        item.classList.add('gallery-placeholder');
    }
    
    return item;
}

function createLightbox() {
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.id = 'galleryLightbox';
    
    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <button class="lightbox-close" aria-label="Close gallery">&times;</button>
        <button class="lightbox-arrow lightbox-prev" aria-label="Previous image">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div class="lightbox-content">
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
        <button class="lightbox-arrow lightbox-next" aria-label="Next image">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18l6-6-6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div class="lightbox-counter"></div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Event listeners
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrevImage);
    lightbox.querySelector('.lightbox-next').addEventListener('click', showNextImage);
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('galleryLightbox');
    
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    const lightbox = document.getElementById('galleryLightbox');
    const image = galleryImages[currentImageIndex];
    
    const img = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    const counter = lightbox.querySelector('.lightbox-counter');
    
    img.src = image.src;
    img.alt = image.alt || 'Gallery image';
    
    if (image.caption && image.caption.trim() !== '') {
        caption.textContent = image.caption;
        caption.style.display = 'block';
    } else {
        caption.style.display = 'none';
    }
    
    counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('galleryLightbox');
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'Escape':
                closeLightbox();
                break;
        }
    });
}

