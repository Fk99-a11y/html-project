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
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td style="max-width: 250px; text-align: left; font-size: 0.9em;">
        ${book.description || "No description available."}
      </td>
      <td>
        <button class="btn-edit" onclick="editBook(${index})">Edit</button>
        <button class="btn-delete" onclick="deleteBook(${index})">Delete</button>
      </td>
    `;

        booksTableBody.appendChild(tr);
    });
}

window.deleteBook = function (index) {
    if (confirm("Are you sure you want to delete this book?")) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
    }
};

window.editBook = function (index) {
    const newName = prompt("Edit Book Name:", books[index].name);
    const newAuthor = prompt("Edit Author:", books[index].author);
    const newDesc = prompt("Edit Description:", books[index].description || "");

    if (newName && newAuthor) {
        books[index].name = newName;
        books[index].author = newAuthor;
        if (newDesc !== null) books[index].description = newDesc;

        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
    }
};

renderBooks();
