const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", function (e) {
  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document
    .querySelector('input[name="password"]')
    .value.trim();

  let errors = [];

  errorMsg.style.display = "none";
  errorMsg.innerHTML = "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("Email is required!");
  } else if (!emailRegex.test(email)) {
    errors.push("Invalid email format!");
  }

  if (!password) {
    errors.push("Password is required!");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters!");
  }

  if (errors.length > 0) {
    e.preventDefault();
    errorMsg.style.display = "block";
    errorMsg.innerHTML = errors.join("<br>");
  }
});
