const accounts = JSON.parse(localStorage.getItem("users")) || [];

const usernameDisplay = document.getElementById("usernameDisplay");
const userAvatar = document.getElementById("userAvatar");
const logoutLink = document.getElementById("logoutLink");

const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const errorMsg = document.getElementById("error-msg");

  if (email === "" || password === "") {
    errorMsg.style.display = "block";
    errorMsg.textContent = "All fields are required!";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    errorMsg.style.display = "block";
    errorMsg.textContent = "Invalid email format!";
    return;
  }

  if (password.length < 4) {
    errorMsg.style.display = "block";
    errorMsg.textContent = "Password must be at least 4 characters!";
    return;
  }

  const user = accounts.find(
    (acc) => acc.email === email && acc.password === password,
  );

  if (user) {
    errorMsg.style.display = "none";

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    usernameDisplay.textContent = "Welcome, " + user.username;

    if (user.avatar) {
      userAvatar.src = user.avatar;
    }

    userAvatar.style.display = "inline-block";;
    logoutLink.style.display = "inline-block";;

    if (user.role === "admin") {
      window.location.href = "ViewBooks.html";
    } else {
      window.location.href = "UserView.html";
    }
  } else {
    errorMsg.style.display = "block";
    errorMsg.textContent = "Login Failed: Invalid email or password!";
  }
});

logoutLink.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");

  userAvatar.style.display = "none";
  logoutLink.style.display = "none";
  usernameDisplay.textContent = "Welcome, Guest";

  window.location.href = "Loginpage.html";
});
