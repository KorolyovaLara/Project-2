const email = document.querySelector("#email-login").value.trim();
const password = document.querySelector("#password-login").value.trim();

const loginFormHandler = async (event) => {
    event.preventDefault();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Login attempt failed');
        }
    }
    else {
        if(!email) {
            email.add
        }
    }
};

document
    .querySelector(".login-form")
    .addEventListener('submit', loginFormHandler);