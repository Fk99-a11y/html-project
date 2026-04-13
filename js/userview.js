
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      const loginLink = document.getElementById("loginLink");
      const signupLink = document.getElementById("signupLink");
      const logoutLink = document.getElementById("logoutLink");
      const usernameDisplay = document.getElementById("usernameDisplay");
      const userAvatar = document.getElementById("userAvatar");

      if (!user) {
        alert("Please login first!");
        window.location.href = "Loginpage.html";
      } else {
        if (user.role !== "user") {
          alert("Admins should use Admin Dashboard!");
          window.location.href = "AdminDashboard.html";
        }

        usernameDisplay.textContent = "Welcome, " + user.username;

        loginLink.style.display = "none";
        signupLink.style.display = "none";
        logoutLink.style.display = "inline";

        if (user.avatar) {
          userAvatar.src = user.avatar;
        }
        userAvatar.style.display = "inline";
      }

      logoutLink.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "Loginpage.html";
      });

      const books = JSON.parse(localStorage.getItem("books")) || [];
      const tbody = document.getElementById("booksBody");

      function renderBooks() {
        tbody.innerHTML = "";

        books.forEach((book, index) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td>
              <span class="book-link" onclick="showDesc(${index})">
                ${book.name}
              </span>
            </td>
            <td>${book.author}</td>
            <td class="${book.available ? "available" : "not-available"}">
              ${book.available ? "Available" : "Not Available"}
            </td>
          `;

          tbody.appendChild(tr);
        });
      }

      window.showDesc = function (index) {
        alert(
          "Description:\n" +
            (books[index].description || "No description available")
        );
      };

      renderBooks();
    