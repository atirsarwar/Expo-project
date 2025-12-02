// Form validation and handling
class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            this.enhanceForm(form);
            this.addValidation(form);
        });
    }

    enhanceForm(form) {
        // Add loading states to submit buttons
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
            form.addEventListener('submit', (e) => {
                this.handleFormSubmit(e, form, submitBtn);
            });
        }

        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    addValidation(form) {
        const fields = form.querySelectorAll('[data-validate]');
        
        fields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Minimum length validation
        const minLength = field.getAttribute('minlength');
        if (minLength && value.length < parseInt(minLength)) {
            isValid = false;
            errorMessage = `Minimum ${minLength} characters required`;
        }

        // Maximum length validation
        const maxLength = field.getAttribute('maxlength');
        if (maxLength && value.length > parseInt(maxLength)) {
            isValid = false;
            errorMessage = `Maximum ${maxLength} characters allowed`;
        }

        // Pattern validation
        const pattern = field.getAttribute('pattern');
        if (pattern && value) {
            const regex = new RegExp(pattern);
            if (!regex.test(value)) {
                isValid = false;
                errorMessage = field.getAttribute('data-pattern-error') || 'Invalid format';
            }
        }

        this.setFieldState(field, isValid, errorMessage);
        return isValid;
    }

    setFieldState(field, isValid, errorMessage) {
        // Remove existing error messages
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        field.classList.remove('error', 'success');

        if (!isValid && errorMessage) {
            field.classList.add('error');
            this.showError(field, errorMessage);
        } else if (isValid && field.value.trim()) {
            field.classList.add('success');
        }
    }

    showError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #E4002B;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
    }

    async handleFormSubmit(e, form, submitBtn) {
        e.preventDefault();

        // Validate all fields
        const fields = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showFormMessage(form, 'Please fix the errors above', 'error');
            return;
        }

        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission
            await this.submitForm(form);
            
            this.showFormMessage(form, 'Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                this.clearFormMessage(form);
            }, 5000);

        } catch (error) {
            this.showFormMessage(form, 'Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async submitForm(form) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                Math.random() > 0.2 ? resolve() : reject();
            }, 2000);
        });
    }

    showFormMessage(form, message, type) {
        this.clearFormMessage(form);

        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 4px;
            text-align: center;
            font-weight: 500;
            ${type === 'success' ? 
                'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
                'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;

        form.insertBefore(messageElement, form.firstChild);
    }

    clearFormMessage(form) {
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }
}

// Registration form specific functionality
class RegistrationForm {
    constructor() {
        this.form = document.getElementById('registrationForm');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.setupCourseSelection();
        this.setupDateValidation();
        this.setupFileUpload();
    }

    setupCourseSelection() {
        const courseSelect = this.form.querySelector('#course');
        if (courseSelect) {
            courseSelect.addEventListener('change', (e) => {
                this.updateCourseDetails(e.target.value);
            });
        }
    }

    updateCourseDetails(courseId) {
        // Update course details based on selection
        const details = {
            'it': { duration: '6 months', fee: 'PKR 15,000' },
            'business': { duration: '8 months', fee: 'PKR 12,000' },
            'design': { duration: '4 months', fee: 'PKR 10,000' }
        };

        const courseInfo = document.getElementById('courseInfo');
        if (courseInfo && details[courseId]) {
            const info = details[courseId];
            courseInfo.innerHTML = `
                <div class="course-details">
                    <p><strong>Duration:</strong> ${info.duration}</p>
                    <p><strong>Fee:</strong> ${info.fee}</p>
                </div>
            `;
        }
    }

    setupDateValidation() {
        const dobInput = this.form.querySelector('#dob');
        if (dobInput) {
            dobInput.addEventListener('change', (e) => {
                const dob = new Date(e.target.value);
                const today = new Date();
                const age = today.getFullYear() - dob.getFullYear();
                
                if (age < 16) {
                    this.showFieldError(dobInput, 'You must be at least 16 years old to register');
                } else {
                    this.clearFieldError(dobInput);
                }
            });
        }
    }

    setupFileUpload() {
        const fileInput = this.form.querySelector('#photo');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    // Validate file type
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                    if (!allowedTypes.includes(file.type)) {
                        this.showFieldError(fileInput, 'Please upload a JPEG or PNG image');
                        e.target.value = '';
                        return;
                    }

                    // Validate file size (max 2MB)
                    if (file.size > 2 * 1024 * 1024) {
                        this.showFieldError(fileInput, 'File size must be less than 2MB');
                        e.target.value = '';
                        return;
                    }

                    this.clearFieldError(fileInput);
                }
            });
        }
    }

    showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = field.parentNode.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #E4002B;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        
        if (!field.parentNode.querySelector('.error-message')) {
            field.parentNode.appendChild(errorElement);
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
    new RegistrationForm();
});