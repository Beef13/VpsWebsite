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
    setupMobileHeroFormModal();
    setupServicesScrollActivation();
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
            if (elementId === 'header') {
                setupHeaderMenu();
            }
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
        productsWrapper.style.userSelect = 'auto';
    });
    
    productsWrapper.addEventListener('mouseleave', () => {
        isDragging = false;
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
}

// Header menu toggle
function setupHeaderMenu() {
    const header = document.querySelector('.header-container');
    if (!header) return;

    const toggle = header.querySelector('.menu-toggle');
    const overlay = header.querySelector('.nav-overlay');
    const closeTargets = header.querySelectorAll('.nav-wrapper .nav-button, .nav-wrapper .call-button');
    const mq = window.matchMedia('(max-width: 1100px)');

    const setState = (isOpen) => {
        header.classList.toggle('nav-open', isOpen);
        document.body.classList.toggle('nav-locked', isOpen);
        if (toggle) {
            toggle.setAttribute('aria-expanded', String(isOpen));
        }
    };

    const closeMenu = () => setState(false);

    toggle?.addEventListener('click', () => {
        const willOpen = !header.classList.contains('nav-open');
        setState(willOpen);
    });

    overlay?.addEventListener('click', closeMenu);

    closeTargets.forEach((target) => {
        target.addEventListener('click', closeMenu);
    });

    const handleMqChange = (event) => {
        if (!event.matches) {
            closeMenu();
        }
    };

    if (mq.addEventListener) {
        mq.addEventListener('change', handleMqChange);
    } else if (mq.addListener) {
        mq.addListener(handleMqChange);
    }
}

function setupMobileHeroFormModal() {
    const openButton = document.querySelector('.hero-quote-button');
    const modal = document.getElementById('heroFormModal');
    if (!openButton || !modal) return;

    const closeButton = modal.querySelector('.hero-form-modal__close');
    const content = modal.querySelector('.hero-form-modal__content');

    const toggleModal = (shouldOpen) => {
        modal.classList.toggle('is-open', shouldOpen);
        modal.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
        document.body.classList.toggle('modal-open', shouldOpen);
    };

    const openModal = () => toggleModal(true);
    const closeModal = () => toggleModal(false);

    openButton.addEventListener('click', openModal);
    closeButton?.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (!content || content.contains(event.target)) return;
        closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });
}

function setupServicesScrollActivation() {
    const cards = document.querySelectorAll('.services-container');
    if (!cards.length) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) return;

    const breakpointQuery = window.matchMedia('(max-width: 1024px)');
    let observer = null;

    const resetState = () => {
        cards.forEach((card) => card.classList.remove('is-active'));
    };

    const createObserver = () => {
        const options = {
            root: null,
            threshold: [0.35, 0.65],
            rootMargin: '-10% 0px -10% 0px',
        };

        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-active');
                } else {
                    entry.target.classList.remove('is-active');
                }
            });
        }, options);

        cards.forEach((card) => obs.observe(card));
        return obs;
    };

    const teardown = () => {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        resetState();
    };

    const handleBreakpointChange = (event) => {
        if (event.matches) {
            if (!observer) {
                observer = createObserver();
            }
        } else {
            teardown();
        }
    };

    handleBreakpointChange(breakpointQuery);

    if (breakpointQuery.addEventListener) {
        breakpointQuery.addEventListener('change', handleBreakpointChange);
    } else if (breakpointQuery.addListener) {
        breakpointQuery.addListener(handleBreakpointChange);
    }

    const handleReducedMotion = (event) => {
        if (event.matches) {
            teardown();
        } else {
            handleBreakpointChange(breakpointQuery);
        }
    };

    if (reducedMotionQuery.addEventListener) {
        reducedMotionQuery.addEventListener('change', handleReducedMotion);
    } else if (reducedMotionQuery.addListener) {
        reducedMotionQuery.addListener(handleReducedMotion);
    }
}
