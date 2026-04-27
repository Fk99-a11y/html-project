
      
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      const usernameDisplay = document.getElementById("usernameDisplay");
      const userAvatar = document.getElementById("userAvatar");
      const logoutLink = document.getElementById("logoutLink");

      if (!user || user.role !== "admin") {
        alert("Access Denied! Admins only.");
        window.location.href = "Loginpage.html";
      } else {
        usernameDisplay.textContent = "Admin: " + user.username;
        if (user.avatar) userAvatar.src = user.avatar;
        logoutLink.style.display = "inline";
      }

      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        window.location.href = "Loginpage.html";
      });