function ShowLoginForm(){
	
	const form = document.getElementById('loginForm');
	const current = document.getElementById('registrationForm');
	current.style.display = 'none';
	form.style.display = 'block';
}

function ShowRegistrationForm(){
	
	const form = document.getElementById('registrationForm');
	const current = document.getElementById('loginForm');
	current.style.display = 'block';
	form.style.display = 'none';
}