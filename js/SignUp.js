const usernameDisplay = document.getElementById("usernameDisplay");
const userAvatar = document.getElementById("userAvatar");
const logoutLink = document.getElementById("logoutLink");
const form = document.getElementById("signupForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const avatar = document.getElementById("avatar").value;
  const isAdmin = document.getElementById("isAdmin").checked;
  if (password !== confirmPassword)
  {
    alert("Passwords do not match!");
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find((user) => user.email === email);
  if (exists)
  {
    alert("This email already exists!");
    return;
  }
  const newUser = {
    username: username,
    email: email,
    password: password,
    role: isAdmin ? "admin" : "user",
    avatar: avatar,
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created successfully 🎉");
  localStorage.setItem("lastSignedUpUser", JSON.stringify(newUser));
  window.location.href = "Loginpage.html";
});

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser)
{
  usernameDisplay.textContent = "Welcome, " + loggedInUser.username;
  userAvatar.style.display = "inline";
  if (loggedInUser.avatar)
  {
    userAvatar.src = loggedInUser.avatar;
  }
  logoutLink.style.display = "inline";
}

logoutLink.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "Loginpage.html";
});
