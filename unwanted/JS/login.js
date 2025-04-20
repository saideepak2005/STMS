document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const success = urlParams.get('login') || urlParams.get('register');

    // Show error messages
    if (error) {
        let errorMessage = '';
        switch(error) {
            case 'empty_fields':
                errorMessage = 'Please fill in all fields';
                break;
            case 'invalid_credentials':
                errorMessage = 'Invalid username or password';
                break;
            case 'password_mismatch':
                errorMessage = 'Passwords do not match';
                break;
            case 'password_length':
                errorMessage = 'Password must be at least 8 characters long';
                break;
            case 'user_exists':
                errorMessage = 'Username or email already exists';
                break;
            case 'database_error':
                errorMessage = 'An error occurred. Please try again later';
                break;
            case 'registration_failed':
                errorMessage = 'Registration failed. Please try again';
                break;
        }
        showMessage(errorMessage, 'error');
    }

    // Show success messages
    if (success) {
        let successMessage = '';
        switch(success) {
            case 'login':
                successMessage = 'Login successful!';
                break;
            case 'register':
                successMessage = 'Registration successful!';
                break;
        }
        showMessage(successMessage, 'success');
    }

    // Form validation
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const username = document.querySelector('#loginForm input[name="username"]').value;
            const password = document.querySelector('#loginForm input[name="password"]').value;

            if (!username || !password) {
                e.preventDefault();
                showMessage('Please fill in all fields', 'error');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            const password = document.querySelector('#registerForm input[name="password"]').value;
            const confirmPassword = document.querySelector('#registerForm input[name="confirm_password"]').value;
            const terms = document.querySelector('#registerForm input[name="terms"]').checked;

            if (password !== confirmPassword) {
                e.preventDefault();
                showMessage('Passwords do not match', 'error');
            }

            if (!terms) {
                e.preventDefault();
                showMessage('Please agree to the terms and conditions', 'error');
            }
        });
    }
});

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
} 