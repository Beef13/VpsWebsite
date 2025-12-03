// Form Submission Handler for Web3Forms
// Handles all form submissions with validation, feedback, error handling, and analytics tracking

document.addEventListener('DOMContentLoaded', () => {
    setupFormSubmissions();
    createSuccessOverlay();
});

function setupFormSubmissions() {
    const forms = document.querySelectorAll('form[data-form-type]');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

// Create Success Overlay (runs once on page load)
function createSuccessOverlay() {
    // Check if overlay already exists
    if (document.getElementById('successOverlay')) {
        return;
    }
    
    const overlay = document.createElement('div');
    overlay.id = 'successOverlay';
    overlay.className = 'success-overlay';
    overlay.setAttribute('role', 'alert');
    overlay.setAttribute('aria-live', 'polite');
    
    overlay.innerHTML = `
        <div class="success-content">
            <div class="success-checkmark">
                <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                    <path class="checkmark-path" d="M14 27l7 7 16-16" />
                </svg>
            </div>
            <p class="success-message">Request Received!</p>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

// Show Success Overlay with analytics tracking
function showSuccessOverlay(formType = 'contact') {
    const overlay = document.getElementById('successOverlay');
    if (!overlay) return;
    
    // Show overlay
    overlay.classList.add('active');
    
    // Track conversion in Google Analytics (if available)
    if (typeof gtag !== 'undefined') {
        // Send virtual pageview for conversion tracking
        gtag('event', 'page_view', {
            page_title: 'Form Success - ' + formType,
            page_location: window.location.href + '/form-success',
            page_path: '/form-success'
        });
        
        // Send form submission event
        gtag('event', 'form_submit', {
            event_category: 'Form',
            event_label: formType,
            value: 1
        });
    }
    
    // Auto-hide after 2 seconds
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 2000);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Check honeypot (spam protection)
    const honeypot = form.querySelector('input[name="botcheck"]');
    if (honeypot && honeypot.checked) {
        return; // Bot detected, silently fail
    }
    
    // Disable submit button during submission
    if (submitButton) {
        submitButton.disabled = true;
    }
    
    try {
        // Prepare form data
        const formData = new FormData(form);
        
        // Send to Web3Forms
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Get form type for analytics tracking
            const formType = form.getAttribute('data-form-type') || 'contact';
            
            // Show success overlay with analytics tracking
            showSuccessOverlay(formType);
            
            // Success - turn button green and show "Submitted"
            if (submitButton) {
                submitButton.classList.add('form-submitted');
                submitButton.textContent = 'Submitted';
            }
            
            form.reset();
            
            // Close modal if this is a modal form
            if (form.classList.contains('hero-modal-form')) {
                setTimeout(() => {
                    const modal = document.getElementById('heroFormModal');
                    if (modal) {
                        modal.classList.remove('is-open');
                        modal.setAttribute('aria-hidden', 'true');
                        document.body.classList.remove('modal-open');
                    }
                    // Reset button after modal closes
                    if (submitButton) {
                        submitButton.classList.remove('form-submitted');
                        submitButton.textContent = 'Submit';
                        submitButton.disabled = false;
                    }
                }, 2000);
            } else if (form.classList.contains('quote-modal-form')) {
                setTimeout(() => {
                    const modal = document.getElementById('quoteModal');
                    if (modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    // Reset button after modal closes
                    if (submitButton) {
                        submitButton.classList.remove('form-submitted');
                        submitButton.textContent = 'Submit';
                        submitButton.disabled = false;
                    }
                }, 2000);
            } else {
                // Reset button after 3 seconds for non-modal forms
                setTimeout(() => {
                    if (submitButton) {
                        submitButton.classList.remove('form-submitted');
                        submitButton.textContent = 'Submit';
                        submitButton.disabled = false;
                    }
                }, 3000);
            }
        } else {
            // Error from API - re-enable button
            if (submitButton) {
                submitButton.disabled = false;
            }
            console.error('Form submission error:', result.message);
        }
        
    } catch (error) {
        // Network or other error - re-enable button
        console.error('Form submission error:', error);
        if (submitButton) {
            submitButton.disabled = false;
        }
    }
}

