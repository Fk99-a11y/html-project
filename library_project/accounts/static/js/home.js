function toggleMenu() {
    const menu = document.getElementById("menuContent");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
  
  
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  
  const loginLink = document.getElementById("loginLink");
  const signupLink = document.getElementById("signupLink");
  const logoutLink = document.getElementById("logoutLink");
  
  const dashboardLink = document.getElementById("dashboardLink");
  const adminLink = document.getElementById("adminLink");
  
  const usernameDisplay = document.getElementById("usernameDisplay");
  const avatar = document.getElementById("userAvatar");
  
  if (!user) {
    dashboardLink.style.display = "none";
    adminLink.style.display = "none";
    logoutLink.style.display = "none";
  } 
  else if (user.role === "user") {
    usernameDisplay.textContent = "Welcome, " + user.username;
  
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    adminLink.style.display = "none";
  
    avatar.style.display = "inline";
    if (user.avatar) avatar.src = user.avatar;
  } 
  else if (user.role === "admin") {
    usernameDisplay.textContent = "Admin: " + user.username;
  
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    dashboardLink.style.display = "none";
  
    adminLink.style.display = "block";
  
    avatar.style.display = "inline";
    if (user.avatar) avatar.src = user.avatar;
  }
  
  logoutLink.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "Loginpage.html";
  });