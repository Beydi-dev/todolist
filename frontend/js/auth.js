function ShowLoginForm() {
    const form = document.getElementById('loginForm');
    const current = document.getElementById('registrationForm');
    current.style.display = 'none';
    form.style.display = 'block';
}

function ShowRegistrationForm() {
    const form = document.getElementById('registrationForm');
    const current = document.getElementById('loginForm');
    current.style.display = 'none';
    form.style.display = 'block';
}

document.getElementById('registrationForm').style.display = 'none';
document.getElementById('loginForm').style.display = 'block';
// Register
document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const pseudo = document.getElementById('pseudo').value;
    const email = document.getElementById('register-email').value;
    const mot_de_passe = document.getElementById('register-password').value;

    const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo, email, mot_de_passe })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Inscription réussie ! Connecte-toi.');
        ShowLoginForm();
    } else {
        alert(data.message);
    }
});

// Login
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const mot_de_passe = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mot_de_passe })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'todos.html';
    } else {
        alert(data.message);
    }
});