// Mobile navigation toggle and authentication check
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Check authentication and update navigation
    updateNavigation();
});

// Update navigation based on authentication status
function updateNavigation() {
    const navLinks = document.querySelector('.nav-links');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        navLinks.innerHTML = `
            <a href="index.html" ${window.location.pathname.endsWith('index.html') ? 'class="active"' : ''}>Home</a>
            <a href="#" onclick="showProfile()" ${window.location.pathname.endsWith('profile.html') ? 'class="active"' : ''}>Profile</a>
            <a href="#" onclick="logout()">Logout</a>
        `;
    } else {
        navLinks.innerHTML = `
            <a href="index.html" ${window.location.pathname.endsWith('index.html') ? 'class="active"' : ''}>Home</a>
            <a href="login.html" ${window.location.pathname.endsWith('login.html') ? 'class="active"' : ''}>Login</a>
            <a href="register.html" ${window.location.pathname.endsWith('register.html') ? 'class="active"' : ''}>Register</a>
        `;
    }
}

// Login form validation
async function validateLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return false;
    }

    try {
        const response = await fetch('http://localhost:8000/php/login.php', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.status === 'error') {
            alert(data.message);
            if (data.message === 'Account does not exist') {
                window.location.href = 'register.html';
            }
            return false;
        }

        if (data.status === 'success') {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            alert('Login successful!');
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
    }
    return false;
}

// Registration form validation
async function validateRegistration() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic validation
    if (!fullName || !email || !username || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return false;
    }

    // Password confirmation
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    try {
        console.log('Attempting to register user...');
        console.log('Starting registration process...');
        const registerUrl = new URL('/php/register.php', window.location.origin);
        console.log('Sending request to:', registerUrl.toString());
        
        const response = await fetch(registerUrl.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                username,
                password
            })
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (data.status === 'error') {
            alert(data.message);
            return false;
        }

        if (data.status === 'success') {
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Registration error:', error);
        console.log('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        alert(`Registration failed: ${error.message}. Please check the console for more details.`);
    }
    return false;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    updateNavigation();
    window.location.href = 'index.html';
}

// Show profile function
function showProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        alert(`Profile Information:
Name: ${currentUser.fullName}
Email: ${currentUser.email}
Username: ${currentUser.username}`);
    } else {
        window.location.href = 'login.html';
    }
}