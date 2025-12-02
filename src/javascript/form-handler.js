// Form Submission Handler for Web3Forms
// Handles all form submissions with validation, feedback, and error handling

document.addEventListener('DOMContentLoaded', () => {
    setupFormSubmissions();
});

function setupFormSubmissions() {
    const forms = document.querySelectorAll('form[data-form-type]');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const messageContainer = form.querySelector('.form-message');
    
    // Check honeypot (spam protection)
    const honeypot = form.querySelector('input[name="botcheck"]');
    if (honeypot && honeypot.checked) {
        return; // Bot detected, silently fail
    }
    
    // Disable submit button and show loading state
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.dataset.originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.classList.add('is-loading');
    }
    
    // Clear previous messages
    if (messageContainer) {
        messageContainer.textContent = '';
        messageContainer.className = 'form-message';
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
            // Success
            showMessage(messageContainer, 'success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
            form.reset();
            
            // Close modal if this is the modal form
            if (form.classList.contains('hero-modal-form')) {
                setTimeout(() => {
                    const modal = document.getElementById('heroFormModal');
                    if (modal) {
                        modal.classList.remove('is-open');
                        modal.setAttribute('aria-hidden', 'true');
                        document.body.classList.remove('modal-open');
                    }
                }, 2000);
            }
        } else {
            // Error from API
            showMessage(messageContainer, 'error', result.message || 'Something went wrong. Please try again.');
        }
        
    } catch (error) {
        // Network or other error
        console.error('Form submission error:', error);
        showMessage(messageContainer, 'error', 'Failed to send message. Please check your connection and try again.');
    } finally {
        // Re-enable submit button
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.dataset.originalText || 'Submit';
            submitButton.classList.remove('is-loading');
            delete submitButton.dataset.originalText;
        }
    }
}

function showMessage(container, type, message) {
    if (!container) return;
    
    container.textContent = message;
    container.className = `form-message form-message--${type}`;
    container.setAttribute('role', type === 'error' ? 'alert' : 'status');
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            container.classList.add('form-message--hidden');
            setTimeout(() => {
                container.textContent = '';
                container.className = 'form-message';
            }, 300);
        }, 5000);
    }
}

