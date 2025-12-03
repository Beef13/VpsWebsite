// Products Page Loader - 3 Column Layout

let productsData = [];
let currentProduct = null;

document.addEventListener('DOMContentLoaded', function() {
    loadProductsPage();
    setupModalHandlers();
});

async function loadProductsPage() {
    try {
        const response = await fetch('../data/products.json');
        const data = await response.json();
        productsData = data.products;
        
        // Group products by category
        const groupedProducts = groupProductsByCategory(productsData);
        
        // Render category list
        renderCategoryList(groupedProducts);
        
        // Auto-select first product after a short delay to ensure DOM is ready
        if (productsData.length > 0) {
            setTimeout(() => {
                const firstProductItem = document.querySelector('.product-item');
                if (firstProductItem) {
                    selectProduct(productsData[0], firstProductItem);
                }
            }, 100);
        }
        
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function groupProductsByCategory(products) {
    const grouped = {};
    
    products.forEach(product => {
        const category = product.name;
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push(product);
    });
    
    // Sort Australian Standard and Second Hand Standard products by weight (Light -> Heavy)
    const weightOrder = { 'Light Weight': 1, 'Medium Weight': 2, 'Heavy Weight': 3 };
    
    Object.keys(grouped).forEach(category => {
        if (category.includes('Australian Standard') || category.includes('Second Hand Standard')) {
            grouped[category].sort((a, b) => {
                return (weightOrder[a.weightType] || 999) - (weightOrder[b.weightType] || 999);
            });
        }
    });
    
    return grouped;
}

function renderCategoryList(groupedProducts) {
    const categoryList = document.getElementById('productCategoryList');
    categoryList.innerHTML = '';
    
    Object.keys(groupedProducts).forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';
        
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.textContent = category;
        categorySection.appendChild(categoryHeader);
        
        const productList = document.createElement('div');
        productList.className = 'product-list';
        
        groupedProducts[category].forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            
            // For Australian Standard, Second Hand Standard, and Non Standard products, only show weight type
            if (category.includes('Australian Standard') || category.includes('Second Hand Standard') || category.includes('Non Standard')) {
                productItem.textContent = product.weightType;
            }
            // For Export, Euro, and Block Pallets, only show size
            else if (category.includes('Export') || category.includes('Euro') || category.includes('Block')) {
                productItem.textContent = product.size;
            }
            // For other products, show weight type and size
            else {
                productItem.textContent = `${product.weightType} - ${product.size}`;
            }
            
            productItem.addEventListener('click', () => selectProduct(product, productItem));
            productList.appendChild(productItem);
        });
        
        categorySection.appendChild(productList);
        categoryList.appendChild(categorySection);
    });
}

function selectProduct(product, clickedElement) {
    // Store current product
    currentProduct = product;
    
    // Remove previous active states
    document.querySelectorAll('.product-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active state to clicked item
    if (clickedElement) {
        clickedElement.classList.add('active');
    }
    
    // Update product details
    renderProductDetails(product);
    
    // Update product image
    renderProductImage(product);
}

function renderProductDetails(product) {
    const detailContent = document.getElementById('productDetailContent');
    
    detailContent.innerHTML = `
        <div class="product-detail-header">
            <h2>${product.name}</h2>
        </div>
        
        <div class="product-specs-list">
            <div class="spec-row">
                <span class="spec-label">Weight Type:</span>
                <span class="spec-value spec-value-weight">${product.weightType}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">Size:</span>
                <span class="spec-value">${product.size}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">Capacity:</span>
                <span class="spec-value">${product.weightCapacity}</span>
            </div>
        </div>
        
        <div class="product-description-section">
            <h3>Description:</h3>
            <p>${product.description}</p>
        </div>
        
        <div class="product-actions">
            <button class="btn-enquire" id="openQuoteModalBtn">Get Quote</button>
        </div>
    `;
    
    // Attach event listener to the button
    const openBtn = document.getElementById('openQuoteModalBtn');
    if (openBtn) {
        openBtn.addEventListener('click', openQuoteModal);
    }
}

function renderProductImage(product) {
    const imageMain = document.getElementById('productImageMain');
    const thumbnails = document.getElementById('productImageThumbnails');
    
    // Adjust image path for products page subdirectory
    const imagePath = product.image.replace('./src/', '../');
    
    // Main image
    imageMain.innerHTML = `
        <img src="${imagePath}" alt="${product.name} - ${product.weightType}" id="mainProductImage" />
    `;
    
    // Thumbnails (repeat same image 4 times for now)
    thumbnails.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const thumb = document.createElement('div');
        thumb.className = `product-thumbnail ${i === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${imagePath}" alt="Thumbnail ${i + 1}" />`;
        thumb.addEventListener('click', () => {
            // Update main image
            document.getElementById('mainProductImage').src = imagePath;
            // Update active state
            document.querySelectorAll('.product-thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
        thumbnails.appendChild(thumb);
    }
}

// Modal Handlers
function setupModalHandlers() {
    const modal = document.getElementById('quoteModal');
    const closeBtn = document.getElementById('closeQuoteModal');
    
    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeQuoteModal);
    }
    
    // Close modal when clicking outside the modal content
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeQuoteModal();
            }
        });
    }
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeQuoteModal();
        }
    });
}

function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    const productField = document.getElementById('modal-product');
    
    // Pre-fill product field with current product
    if (currentProduct && productField) {
        const productName = `${currentProduct.name} - ${currentProduct.weightType} (${currentProduct.size})`;
        productField.value = productName;
    }
    
    // Show modal
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    }
}

