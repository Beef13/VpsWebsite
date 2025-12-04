// Main initialization - Header and Footer are now inline for instant loading
// Updated: 2025-01-04 - Optimized for performance with inline components
document.addEventListener('DOMContentLoaded', () => {
    // Setup header and footer functionality
    setupHeaderMenu();
    setupNavigation();
    setupMobileHeaderScroll();
    
    // Setup page functionality
    setupInfiniteScroll();
    setupQuickBrowseNavigation();
    setupMobileHeroFormModal();
    setupServicesScrollActivation();
    setupQuickBrowseCardExpansion();
});

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
    
    // Setup drag-to-scroll functionality
    setupDragToScroll(productsWrapper);
}

// Ultra-smooth drag-to-scroll functionality for quick browse products
function setupDragToScroll(container) {
    if (!container) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    let lastX;
    let velocityTracker = [];
    let animationID;
    let momentumID;
    let hasMoved = false;
    
    // Mouse down event - start dragging
    container.addEventListener('mousedown', (e) => {
        // Don't start drag if clicking on a button
        if (e.target.closest('.qbp-button')) return;
        
        isDown = true;
        hasMoved = false;
        container.style.cursor = 'grabbing';
        container.classList.add('dragging');
        
        startX = e.pageX;
        lastX = startX;
        scrollLeft = container.scrollLeft;
        velocityTracker = [];
        
        // Cancel any ongoing animations
        cancelAnimations();
        
        // Prevent default to avoid text selection
        e.preventDefault();
    });
    
    // Mouse leave event - stop dragging
    container.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            container.style.cursor = 'grab';
            container.classList.remove('dragging');
            applyMomentum();
        }
    });
    
    // Mouse up event - stop dragging
    container.addEventListener('mouseup', (e) => {
        if (isDown) {
            isDown = false;
            container.style.cursor = 'grab';
            container.classList.remove('dragging');
            
            // Prevent click events if user dragged
            if (hasMoved) {
                e.preventDefault();
                e.stopPropagation();
                
                // Set a flag to prevent immediate clicks
                container.dataset.justDragged = 'true';
                setTimeout(() => {
                    delete container.dataset.justDragged;
                }, 100);
            }
            
            applyMomentum();
        }
    });
    
    // Mouse move event - perform dragging with RAF for smoothness
    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        
        e.preventDefault();
        
        const currentX = e.pageX;
        const diff = currentX - lastX;
        
        // Track if user actually moved (more than 3px threshold)
        if (Math.abs(currentX - startX) > 3) {
            hasMoved = true;
        }
        
        // Store velocity samples (last 5 frames for smooth average)
        velocityTracker.push({
            time: Date.now(),
            value: diff
        });
        
        // Keep only recent samples
        if (velocityTracker.length > 5) {
            velocityTracker.shift();
        }
        
        lastX = currentX;
        
        // Use RAF for buttery smooth scrolling
        if (!animationID) {
            animationID = requestAnimationFrame(() => {
                container.scrollLeft -= diff * 1.2; // Smooth multiplier
                animationID = null;
            });
        }
    });
    
    // Touch support for mobile
    let touchStartX;
    let touchScrollLeft;
    let lastTouchX;
    
    container.addEventListener('touchstart', (e) => {
        if (e.target.closest('.qbp-button')) return;
        
        isDown = true;
        hasMoved = false;
        touchStartX = e.touches[0].pageX;
        lastTouchX = touchStartX;
        touchScrollLeft = container.scrollLeft;
        velocityTracker = [];
        cancelAnimations();
    }, { passive: true });
    
    container.addEventListener('touchend', () => {
        isDown = false;
        applyMomentum();
    });
    
    container.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        
        const currentX = e.touches[0].pageX;
        const diff = currentX - lastTouchX;
        
        if (Math.abs(currentX - touchStartX) > 3) {
            hasMoved = true;
        }
        
        velocityTracker.push({
            time: Date.now(),
            value: diff
        });
        
        if (velocityTracker.length > 5) {
            velocityTracker.shift();
        }
        
        lastTouchX = currentX;
        
        if (!animationID) {
            animationID = requestAnimationFrame(() => {
                container.scrollLeft -= diff * 1.2;
                animationID = null;
            });
        }
    }, { passive: true });
    
    // Calculate smooth velocity from samples
    function getAverageVelocity() {
        if (velocityTracker.length < 2) return 0;
        
        // Filter recent samples (within last 50ms)
        const now = Date.now();
        const recentSamples = velocityTracker.filter(s => now - s.time < 50);
        
        if (recentSamples.length === 0) return 0;
        
        // Calculate weighted average (more recent = more weight)
        let totalWeight = 0;
        let weightedSum = 0;
        
        recentSamples.forEach((sample, index) => {
            const weight = index + 1; // Linear weight increase
            weightedSum += sample.value * weight;
            totalWeight += weight;
        });
        
        return weightedSum / totalWeight;
    }
    
    // Apply momentum scrolling with easing
    function applyMomentum() {
        cancelAnimations();
        
        let velocity = getAverageVelocity() * -8; // Amplify for natural feel
        
        // Only apply momentum if velocity is significant
        if (Math.abs(velocity) < 1) return;
        
        function momentumLoop() {
            // Smooth deceleration
            velocity *= 0.94; // Higher = smoother, slower stop
            
            // Apply scroll
            container.scrollLeft += velocity;
            
            // Continue if still moving significantly
            if (Math.abs(velocity) > 0.3) {
                momentumID = requestAnimationFrame(momentumLoop);
            } else {
                momentumID = null;
            }
        }
        
        momentumID = requestAnimationFrame(momentumLoop);
    }
    
    function cancelAnimations() {
        if (animationID) {
            cancelAnimationFrame(animationID);
            animationID = null;
        }
        if (momentumID) {
            cancelAnimationFrame(momentumID);
            momentumID = null;
        }
    }
    
    // Set initial cursor
    container.style.cursor = 'grab';
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
    let activeCard = null;
    const metrics = new Map();
    let scheduled = false;

    const resetState = () => {
        cards.forEach((card) => card.classList.remove('is-active'));
        activeCard = null;
        metrics.clear();
    };

    const scheduleUpdate = () => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            scheduled = false;
            updateActiveCard();
        });
    };

    const updateActiveCard = () => {
        if (!metrics.size) {
            if (activeCard) {
                activeCard.classList.remove('is-active');
                activeCard = null;
            }
            return;
        }

        let bestCard = null;
        let bestScore = Number.POSITIVE_INFINITY;
        metrics.forEach((value, card) => {
            if (value.distance < bestScore) {
                bestScore = value.distance;
                bestCard = card;
            }
        });

        if (activeCard !== bestCard) {
            if (activeCard) {
                activeCard.classList.remove('is-active');
            }
            if (bestCard) {
                bestCard.classList.add('is-active');
            }
            activeCard = bestCard;
        }
    };

    const recalcMetrics = () => {
        const viewportCenter = window.innerHeight / 2;
        metrics.forEach((value, card) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const distance = Math.abs(cardCenter - viewportCenter);
            metrics.set(card, { distance });
        });
        scheduleUpdate();
    };

    const handleScroll = () => {
        if (!metrics.size) return;
        recalcMetrics();
    };

    const handleResize = () => {
        if (!metrics.size) return;
        recalcMetrics();
    };

    const createObserver = () => {
        const options = {
            root: null,
            threshold: Array.from({ length: 11 }, (_, i) => i / 10),
            rootMargin: '-20% 0px -20% 0px',
        };

        const obs = new IntersectionObserver((entries) => {
            const viewportCenter = window.innerHeight / 2;
            entries.forEach((entry) => {
                const card = entry.target;
                if (entry.isIntersecting) {
                    const rect = entry.boundingClientRect;
                    const cardCenter = rect.top + rect.height / 2;
                    const distance = Math.abs(cardCenter - viewportCenter);
                    metrics.set(card, { distance });
                } else {
                    metrics.delete(card);
                }
            });
            scheduleUpdate();
        }, options);

        cards.forEach((card) => obs.observe(card));
        return obs;
    };

    const teardown = () => {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        resetState();
    };

    const handleBreakpointChange = (event) => {
        if (event.matches) {
            if (!observer) {
                observer = createObserver();
            }
            recalcMetrics();
            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('resize', handleResize);
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

function setupQuickBrowseCardExpansion() {
    const cards = document.querySelectorAll('.qbp-card');
    if (!cards.length) return;

    const coarsePointerQuery = window.matchMedia('(hover: none), (pointer: coarse)');

    const collapseAll = (except) => {
        cards.forEach((card) => {
            if (card !== except) {
                card.classList.remove('is-expanded');
            }
        });
    };

    const handleCardClick = (event) => {
        if (!coarsePointerQuery.matches) return;
        if (event.target.closest('.qbp-button')) return;
        
        // Prevent expansion if user just dragged the container
        const container = document.querySelector('.quick-browse-products-wrapper');
        if (container && container.dataset.justDragged === 'true') return;

        const card = event.currentTarget;
        const shouldExpand = !card.classList.contains('is-expanded');

        collapseAll(null);

        if (shouldExpand) {
            card.classList.add('is-expanded');
        }

        event.preventDefault();
    };

    const handleKeyDown = (event) => {
        if (!coarsePointerQuery.matches) return;
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        handleCardClick.call(event.currentTarget, event);
    };

    const handleMouseLeave = (event) => {
        if (coarsePointerQuery.matches) return;
        event.currentTarget.classList.remove('is-expanded');
    };

    cards.forEach((card) => {
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
        card.addEventListener('click', handleCardClick);
        card.addEventListener('keydown', handleKeyDown);
        card.addEventListener('mouseleave', handleMouseLeave);
    });

    const resetOnChange = () => {
        collapseAll(null);
    };

    if (coarsePointerQuery.addEventListener) {
        coarsePointerQuery.addEventListener('change', resetOnChange);
    } else if (coarsePointerQuery.addListener) {
        coarsePointerQuery.addListener(resetOnChange);
    }
}

// Mobile header scroll behavior - hide on scroll down, show on scroll up
function setupMobileHeaderScroll() {
    // Only run on mobile devices
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    const header = document.querySelector('.header-container');
    
    if (!header) return;
    
    const updateHeaderVisibility = () => {
        const currentScrollY = window.scrollY;
        
        // Only apply on mobile
        if (!mobileQuery.matches) {
            header.classList.remove('header-hidden', 'header-visible');
            ticking = false;
            return;
        }
        
        // Don't hide header at the very top
        if (currentScrollY < 70) {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
        } else if (currentScrollY > lastScrollY && Math.abs(currentScrollY - lastScrollY) > 5) {
            // Scrolling down (with threshold to avoid jitter)
            header.classList.add('header-hidden');
            header.classList.remove('header-visible');
        } else if (currentScrollY < lastScrollY && Math.abs(currentScrollY - lastScrollY) > 5) {
            // Scrolling up (with threshold to avoid jitter)
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    };
    
    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeaderVisibility);
            ticking = true;
        }
    };
    
    // Listen to scroll events
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Handle responsive changes
    mobileQuery.addEventListener('change', (e) => {
        if (!e.matches) {
            header.classList.remove('header-hidden', 'header-visible');
        }
    });
}

// Fix header asset paths based on current location
function fixHeaderPaths() {
    // No longer needed - asset paths are now correctly set in each page
    // This function is kept for backward compatibility but does nothing
}

// Setup navigation links with correct paths
function setupNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    if (!navLinks.length) return;
    
    // Detect current page from pathname
    const currentPath = window.location.pathname;
    let currentPage = 'home'; // default
    
    if (currentPath.includes('/products/') || currentPath.includes('/products')) {
        currentPage = 'products';
    } else if (currentPath.includes('/services/') || currentPath.includes('/services')) {
        currentPage = 'services';
    } else if (currentPath.includes('/gallery/') || currentPath.includes('/gallery')) {
        currentPage = 'gallery';
    } else if (currentPath === '/' || currentPath.includes('index.html')) {
        // Check if we have a hash for about or contact
        if (window.location.hash === '#about') {
            currentPage = 'about';
        } else if (window.location.hash === '#contact') {
            currentPage = 'contact';
        } else {
            currentPage = 'home';
        }
    }
    
    // Detect if we're on homepage or in a subdirectory
    const isHomePage = currentPath === '/' || currentPath.endsWith('index.html');
    const isInProductsDir = currentPath.includes('/products');
    const isInServicesDir = currentPath.includes('/services');
    const isInGalleryDir = currentPath.includes('/gallery');
    
    // Build page map with clean URLs
    let pageMap = {};
    
    if (isHomePage) {
        // From homepage
        pageMap = {
            'home': './index.html',
            'products': './products/',
            'services': './services/',
            'about': '#about',
            'gallery': './gallery/',
            'contact': '#contact'
        };
    } else if (isInProductsDir || isInServicesDir || isInGalleryDir) {
        // From subdirectory pages
        pageMap = {
            'home': '../index.html',
            'products': '../products/',
            'services': '../services/',
            'about': '../index.html#about',
            'gallery': '../gallery/',
            'contact': '../index.html#contact'
        };
    }
    
    navLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        
        // Apply active class to current page
        if (page === currentPage && link.classList.contains('nav-button')) {
            link.classList.add('active');
        }
        
        if (pageMap[page]) {
            link.href = pageMap[page];
        }
    });
    
    // Update active state on hash change (for about/contact sections)
    window.addEventListener('hashchange', () => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const page = link.getAttribute('data-page');
            
            if (window.location.hash === '#about' && page === 'about') {
                link.classList.add('active');
            } else if (window.location.hash === '#contact' && page === 'contact') {
                link.classList.add('active');
            } else if (!window.location.hash && page === 'home') {
                link.classList.add('active');
            }
        });
    });
}
