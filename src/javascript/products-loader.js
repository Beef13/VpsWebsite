// Products Loader - Dynamically load and display product cards from JSON data
// This allows easy product management by editing src/data/products.json

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

async function loadProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) {
        console.error('Products container not found');
        return;
    }

    try {
        // Fetch products data
        const response = await fetch('./src/data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Clear container (remove placeholder)
        container.innerHTML = '';
        
        // Generate and append product cards
        data.products.forEach(product => {
            const productCard = createProductCard(product);
            container.appendChild(productCard);
        });
        
        // Re-initialize card expansion functionality after cards are loaded
        if (typeof setupQuickBrowseCardExpansion === 'function') {
            setupQuickBrowseCardExpansion();
        }
        
    } catch (error) {
        console.error('Error loading products:', error);
        container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Failed to load products. Please try again later.</p>';
    }
}

function createProductCard(product) {
    // Create container
    const container = document.createElement('div');
    container.className = 'qbp-container';
    
    // Create card
    const card = document.createElement('div');
    card.className = 'qbp-card';
    
    // Create card image
    const cardImage = document.createElement('div');
    cardImage.className = 'qbp-card-image';
    if (product.image) {
        cardImage.style.backgroundImage = `url('${product.image}')`;
    }
    
    // Create card content
    const cardContent = document.createElement('div');
    cardContent.className = 'qbp-card-content';
    
    // Product name
    const name = document.createElement('h3');
    name.textContent = product.name;
    
    // Product size
    const size = document.createElement('p');
    size.textContent = product.size;
    
    // Product weight type
    const weightType = document.createElement('p');
    weightType.textContent = product.weightType;
    
    // Product description
    const description = document.createElement('p');
    description.className = 'p2';
    description.textContent = product.description;
    
    // Chevron icon
    const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevron.setAttribute('class', 'chevron-up');
    chevron.setAttribute('width', '26');
    chevron.setAttribute('height', '26');
    chevron.setAttribute('viewBox', '0 0 32 32');
    chevron.setAttribute('fill', 'none');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M24,20l-8-8-8,8');
    path.setAttribute('stroke', '#808080');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    
    chevron.appendChild(path);
    
    // View More button
    const button = document.createElement('button');
    button.className = 'qbp-button';
    button.textContent = 'View More';
    if (product.link) {
        button.addEventListener('click', () => {
            window.location.href = product.link;
        });
    }
    
    // Assemble card content
    cardContent.appendChild(name);
    cardContent.appendChild(size);
    cardContent.appendChild(weightType);
    cardContent.appendChild(description);
    cardContent.appendChild(chevron);
    cardContent.appendChild(button);
    
    // Assemble card
    card.appendChild(cardImage);
    card.appendChild(cardContent);
    
    // Assemble container
    container.appendChild(card);
    
    return container;
}

