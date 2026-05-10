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

    // إضافة الحدث لعرض الوصف عند الضغط على الصف
    tr.addEventListener("click", (e) => {
      // نمنع عرض الوصف إذا ضغطنا على زر الاستعارة نفسه
      if (e.target.tagName !== 'BUTTON') {
        document.getElementById("descBox").textContent =
          "Description: " + (book.description || "No description available");
      }
    });

    // بناء الصف مع إضافة زر الاستعارة في الخلية الأخيرة
    tr.innerHTML = `
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td style="color:${book.available ? 'green' : 'red'};font-weight:bold;">
        ${book.available ? "Available" : "Not Available"}
      </td>
      <td>
        ${book.available 
          ? `<button class="borrow-btn" onclick="borrowBook('${book.id}')" style="background:#5d3a21; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">Borrow</button>` 
          : `<button disabled style="background:#ccc; color:white; border:none; padding:5px 10px; border-radius:5px;">Unavailable</button>`}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// دالة منطق الاستعارة (تحتاج لربطها بالباك إند لاحقاً)
function borrowBook(bookId) {
    alert("Book ID " + bookId + " has been borrowed successfully!");
    // هنا يتم إضافة الكود لتغيير حالة الكتاب في الـ LocalStorage
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