document.addEventListener('DOMContentLoaded', function() {
    let contactForm = document.getElementById('contactForm');
    let formMessage = document.getElementById('formMessage');
    let loadingSpinner = document.getElementById('loadingSpinner');
    
    // Form Inputs //
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('email');
    let phoneInput = document.getElementById('phone');
    let subjectSelect = document.getElementById('subject');
    let messageTextarea = document.getElementById('message');
    
    // Error message elements //
    let nameError = document.getElementById('nameError');
    let emailError = document.getElementById('emailError');
    let phoneError = document.getElementById('phoneError');
    let subjectError = document.getElementById('subjectError');
    let messageError = document.getElementById('messageError');
    
    // Input event listeners //
    nameInput.addEventListener('input', function() {
        validateName();
    });
    emailInput.addEventListener('input', function() {
        validateEmail();
    });
    phoneInput.addEventListener('input', function() {
        validatePhone();
    });
    subjectSelect.addEventListener('change', function() {
        validateSubject();
    });
    messageTextarea.addEventListener('input', function() {
        validateMessage();
    });
    // Form submission //
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all inputs //
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        // If all required inputs are valid, form submits //
        if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
            // loading spinner //
            loadingSpinner.style.display = 'inline-block';
            setTimeout(function() {
                // Hide loading spinner //
                loadingSpinner.style.display = 'none';
                
                // Success Message //
                formMessage.className = 'form-message success-message';
                formMessage.style.display = 'block';
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';

                contactForm.reset();
            }, 1500);
        } else {
            // Form Errors //
            formMessage.className = 'form-message error-message';
            formMessage.style.display = 'block';
            formMessage.textContent = 'Please correct the errors in the form and try again.';
        }
    });
    
  // VALIDATION FUNCTIONS //

  // name validation //
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            showError(nameInput, nameError, 'Please enter your full name');
            return false;
        } else if (name.length < 3) {
            showError(nameInput, nameError, 'Name must be at least 3 characters');
            return false;
        } else {
            hideError(nameInput, nameError);
            return true;
        }
    }
  // email validation //
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailInput, emailError, 'Please enter your email address');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            hideError(emailInput, emailError);
            return true;
        }
    }
  // phone validation //
    function validatePhone() {
        const phone = phoneInput.value.trim();
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        
        if (phone === '') {// Phone is optional, so empty is valid
            hideError(phoneInput, phoneError);
            return true;
        } else if (!phoneRegex.test(phone)) {
            showError(phoneInput, phoneError, 'Please enter a valid phone number');
            return false;
        } else {
            hideError(phoneInput, phoneError);
            return true;
        }
    }
  // subject validation //
    function validateSubject() {
        const subject = subjectSelect.value;
        if (subject === '') {
            showError(subjectSelect, subjectError, 'Please select a subject');
            return false;
        } else {
            hideError(subjectSelect, subjectError);
            return true;
        }
    }
  // message validation //
    function validateMessage() {
        const message = messageTextarea.value.trim();
        if (message === '') {
            showError(messageTextarea, messageError, 'Please enter your message');
            return false;
        } else if (message.length < 20) {
            showError(messageTextarea, messageError, 'Message must be at least 20 characters');
            return false;
        } else {
            hideError(messageTextarea, messageError);
            return true;
        }
    }
    
    function showError(inputElement, errorElement, message) {
        inputElement.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function hideError(inputElement, errorElement) {
        inputElement.classList.remove('invalid');
        errorElement.style.display = 'none';
    }
});