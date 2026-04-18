const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
const books = JSON.parse(localStorage.getItem("books")) || [];

if (currentUser) {
  document.getElementById("usernameDisplay").textContent =
    "Welcome, " + currentUser.username;

  const avatar = document.getElementById("userAvatar");

  if (currentUser.avatar) {
    avatar.src = currentUser.avatar;
    avatar.style.display = "inline";
  }

  document.getElementById("logoutLink").style.display = "inline";
}

document.getElementById("logoutLink").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "Loginpage.html";
});

const categorySelect = document.getElementById("categorySearch");

function loadCategories() {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  let categories = [...new Set(books.map(b => b.category))];

  categorySelect.innerHTML = `<option value="">All Categories</option>`;

  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}

loadCategories();

function display(list) {
  const tbody = document.getElementById("booksTableBody");
  tbody.innerHTML = "";

  list.forEach(book => {
    const tr = document.createElement("tr");

    tr.style.cursor = "pointer";

    tr.addEventListener("click", () => {
        document.getElementById("descBox").textContent =
          "Description: " + (book.description || "No description available");
      });

    tr.innerHTML = `
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td style="color:${book.available ? 'green' : 'red'};font-weight:bold;">
        ${book.available ? "Available" : "Not Available"}
      </td>
    `;

    tbody.appendChild(tr);
  });
}

document.getElementById("searchBtn").addEventListener("click", () => {

  const idQ = document.getElementById("idSearch").value.toLowerCase();
  const nameQ = document.getElementById("nameSearch").value.toLowerCase();
  const authorQ = document.getElementById("authorSearch").value.toLowerCase();
  const catQ = document.getElementById("categorySearch").value;

  const filtered = books.filter(b =>
    b.id.toString().includes(idQ) &&
    b.name.toLowerCase().includes(nameQ) &&
    b.author.toLowerCase().includes(authorQ) &&
    (!catQ || b.category === catQ)
  );

  display(filtered);
});

display(books);