const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", function (e) {
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  if (!email || !password) {
    e.preventDefault(); // 🔥 مهم جدًا

    errorMsg.style.display = "block";
    errorMsg.textContent = "All fields are required!";
  }
});
