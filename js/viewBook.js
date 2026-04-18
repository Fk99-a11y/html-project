const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

const usernameDisplay = document.getElementById("usernameDisplay");
const logoutLink = document.getElementById("logoutLink");
const userAvatar = document.getElementById("userAvatar");

if (!loggedInUser || loggedInUser.role !== "admin") {
  alert("Access Denied! Admins only.");
  window.location.href = "Loginpage.html";
} else {
  usernameDisplay.textContent = "Admin: " + loggedInUser.username;
  if (loggedInUser.avatar) userAvatar.src = loggedInUser.avatar;
  logoutLink.style.display = "inline";
}

logoutLink.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "Loginpage.html";
});

let books = JSON.parse(localStorage.getItem("books")) || [
  { name: "Learn C++", author: "Ahmed Ali", description: "C++ Guide", status: "available" },
  { name: "Software Engineering", author: "D. Ali", description: "SE Basics", status: "available" },
  { name: "Web Technology", author: "Sarah Mahmoud", description: "Web Dev", status: "not" }
];

const booksTableBody = document.querySelector("#booksTable tbody");

function renderBooks() {
  booksTableBody.innerHTML = "";

  books.forEach((book, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td class="desc-col">${book.description || "No description"}</td>
      <td>
        <button class="btn-edit">Edit</button>
        <button class="btn-delete">Delete</button>
      </td>
    `;

    tr.querySelector(".btn-edit").onclick = () => {
      const newName = prompt("Book Name", book.name);
      const newAuthor = prompt("Author", book.author);
      const newDesc = prompt("Description", book.description);

      if (newName && newAuthor) {
        books[index].name = newName;
        books[index].author = newAuthor;
        books[index].description = newDesc;
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
      }
    };

    tr.querySelector(".btn-delete").onclick = () => {
      if (confirm("Delete this book?")) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
      }
    };

    booksTableBody.appendChild(tr);
  });
}

renderBooks();

document.getElementById("addBookBtn").addEventListener("click", () => {
  window.location.href = "AddBook.html";
});