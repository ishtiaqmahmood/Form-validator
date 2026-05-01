const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (input.value.trim() === '') {
    showError(input, 'Email is required');
  } else if (!re.test(input.value.trim())) {
    showError(input, 'Email is not valid');
  } else {
    showSuccess(input);
  }
}

// Check username
function checkUsername(input) {
  if (input.value.trim() === '') {
    showError(input, 'Username is required');
  } else if (input.value.length < 3) {
    showError(input, 'Username must be at least 3 characters');
  } else if (input.value.length > 15) {
    showError(input, 'Username must be less than 15 characters');
  } else {
    showSuccess(input);
  }
}

// Check password
function checkPassword(input) {
  if (input.value.trim() === '') {
    showError(input, 'Password is required');
  } else if (input.value.length < 6) {
    showError(input, 'Password must be at least 6 characters');
  } else {
    showSuccess(input);
  }
}

// Check password match
function checkPasswordMatch(input1, input2) {
  if (input2.value.trim() === '') {
    showError(input2, 'Confirm Password is required');
  } else if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  } else {
    showSuccess(input2);
  }
}

// Event listeners for real-time validation
username.addEventListener('input', () => checkUsername(username));
email.addEventListener('input', () => checkEmail(email));
password.addEventListener('input', () => {
  checkPassword(password);
  if (password2.value !== '') {
    checkPasswordMatch(password, password2);
  }
});
password2.addEventListener('input', () => checkPasswordMatch(password, password2));

// Form submit listener
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkUsername(username);
  checkEmail(email);
  checkPassword(password);
  checkPasswordMatch(password, password2);
});
