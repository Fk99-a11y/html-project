const user = JSON.parse(localStorage.getItem("loggedInUser"));
      const booksTableBody = document.getElementById("booksTableBody");

      const usernameDisplay = document.getElementById("usernameDisplay");
      const userAvatar = document.getElementById("userAvatar");
      const logoutLink = document.getElementById("logoutLink");

      if (!user) {
        alert("Please login first!");
        window.location.href = "Loginpage.html";
      } else if (user.role !== "admin") {
        alert("Access denied (Admin only)");
        window.location.href = "Home.html";
      } else {
        usernameDisplay.textContent = "Admin: " + user.username;

        if (user.avatar) {
          userAvatar.src = user.avatar;
        }

        logoutLink.style.display = "inline";
      }

      logoutLink.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "Loginpage.html";
      });

      let books = JSON.parse(localStorage.getItem("books")) || [];

      function renderBooks() {
        booksTableBody.innerHTML = "";

        books.forEach((book, index) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td>
              <span class="book-link" onclick="showDesc(${index})">
                ${book.name}
              </span>
            </td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>
              <button class="btn-edit" onclick="editBook(${index})">Edit</button>
              <button class="btn-delete" onclick="deleteBook(${index})">Delete</button>
            </td>
          `;

          booksTableBody.appendChild(tr);
        });
      }

      window.showDesc = function (index) {
        alert(
          "Description:\n" +
            (books[index].description || "No description available")
        );
      };

      window.deleteBook = function (index) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
      };

      window.editBook = function (index) {
        const newName = prompt("Edit Book Name:", books[index].name);
        if (newName) {
          books[index].name = newName;
          localStorage.setItem("books", JSON.stringify(books));
          renderBooks();
        }
      };

      renderBooks();