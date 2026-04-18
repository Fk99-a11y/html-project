const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
const books = JSON.parse(localStorage.getItem("books")) || [];

if (currentUser) {
    document.getElementById("usernameDisplay").textContent = "Welcome, " + currentUser.username;
    const avatar = document.getElementById("userAvatar");
    if (currentUser.avatar) {
        avatar.src = currentUser.avatar;
        avatar.style.display = "inline";
    }
    document.getElementById("logoutLink").style.display = "inline";

    if (currentUser.role === "admin") {
        const borrowedLink = document.querySelector('a[href="BorrowedBooks.html"]');
        if (borrowedLink) {
            borrowedLink.style.display = "none";
        }
    }
}

document.getElementById("logoutLink").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "Loginpage.html";
});

const categorySelect = document.getElementById("categorySearch");
const categories = [...new Set(books.map(b => b.category))].filter(Boolean);
categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
});

function displayFilteredBooks(list) {
    const tbody = document.getElementById("booksTableBody");
    tbody.innerHTML = "";
    list.forEach(book => {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        tr.innerHTML = `
            <td style="padding: 12px; border-bottom: 1px solid #ddd;">${book.name}</td>
            <td style="padding: 12px; border-bottom: 1px solid #ddd;">${book.author}</td>
            <td style="padding: 12px; border-bottom: 1px solid #ddd;">${book.category}</td>
            <td style="padding: 12px; border-bottom: 1px solid #ddd; font-weight: bold; color: ${book.available ? 'green' : 'red'};">
                ${book.available ? 'Available' : 'Not Available'}
            </td>
        `;

        tr.addEventListener("click", () => {
            localStorage.setItem("selectedBook", JSON.stringify(book));
            window.location.href = "search.html";
        });
        tbody.appendChild(tr);
    });
}

document.getElementById("searchBtn").addEventListener("click", () => {
    const nameQuery = document.getElementById("nameSearch").value.toLowerCase();
    const authorQuery = document.getElementById("authorSearch").value.toLowerCase();
    const catQuery = document.getElementById("categorySearch").value;

    const filtered = books.filter(b =>
        (b.name.toLowerCase().includes(nameQuery)) &&
        (b.author.toLowerCase().includes(authorQuery)) &&
        (!catQuery || b.category === catQuery)
    );
    displayFilteredBooks(filtered);
});

displayFilteredBooks(books);
