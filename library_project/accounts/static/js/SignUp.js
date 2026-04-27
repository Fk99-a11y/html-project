const form = document.getElementById("signupForm");

const username = document.querySelector('input[name="username"]');
const email = document.querySelector('input[name="email"]');
const password = document.querySelector('input[name="password"]');

function showError(input, message) {
  let error = input.nextElementSibling;

  if (!error || !error.classList.contains("error-text")) {
    error = document.createElement("div");
    error.classList.add("error-text");
    input.parentNode.appendChild(error);
  }

  error.textContent = message;
  input.classList.add("input-error");
}

function clearError(input) {
  let error = input.nextElementSibling;

  if (error && error.classList.contains("error-text")) {
    error.textContent = "";
  }

  input.classList.remove("input-error");
}

email.addEventListener("input", () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email.value)) {
    showError(email, "Invalid email format");
  } else {
    clearError(email);
  }
});

password.addEventListener("input", () => {
  let value = password.value;
  let strength = 0;

  if (value.length >= 6) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[@$!%*?&]/.test(value)) strength++;

  let msg = "";

  if (strength <= 1) msg = "Weak";
  else if (strength === 2) msg = "Medium";
  else msg = "Strong";

  let error = password.nextElementSibling;

  if (!error || !error.classList.contains("error-text")) {
    error = document.createElement("div");
    error.classList.add("error-text");
    password.parentNode.appendChild(error);
  }

  error.textContent = "Password strength: " + msg;
});

form.addEventListener("submit", function (e) {
  let valid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (username.value.trim().length < 3) {
    showError(username, "Username must be at least 3 characters");
    valid = false;
  }

  if (!emailRegex.test(email.value)) {
    showError(email, "Invalid email format");
    valid = false;
  }

  if (password.value.length < 6) {
    showError(password, "Password must be at least 6 characters");
    valid = false;
  }

  if (!valid) {
    e.preventDefault();
  }
});
