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
            // Success - turn button green and show "Submitted"
            if (submitButton) {
                submitButton.classList.add('form-submitted');
                submitButton.textContent = 'Submitted';
            }
            
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

