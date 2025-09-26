// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});

// Login form validation
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return false;
    }

    // Here you would typically make an API call to verify credentials
    // For this demo, we'll just redirect to the landing page
    alert('Login successful!');
    window.location.href = 'index.html';
    return false;
}

// Registration form validation
function validateRegistration() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!fullName || !email || !username || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    // Here you would typically make an API call to register the user
    // For this demo, we'll just redirect to the login page
    alert('Registration successful! Please log in.');
    window.location.href = 'login.html';
    return false;
}