/**
 * borrowed.js - Displays only books borrowed by the current user
 */
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!currentUser) {
    window.location.href = "Loginpage.html";
} else {
    document.getElementById("usernameDisplay").textContent = "Welcome, " + currentUser.username;
    document.getElementById("logoutLink").style.display = "inline";

    const allBooks = JSON.parse(localStorage.getItem("books")) || [];
    // Filter books borrowed by THIS user 
    const myBorrowed = allBooks.filter(b => b.borrowedBy === currentUser.username);

    const tbody = document.getElementById("borrowedBody");
    if (myBorrowed.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3' style='padding: 20px;'>You haven't borrowed any books yet.</td></tr>";
    } else {
        myBorrowed.forEach(book => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="padding: 12px; border: 1px solid #ddd;">${book.name}</td>
                <td style="padding: 12px; border: 1px solid #ddd;">${book.author}</td>
                <td style="padding: 12px; border: 1px solid #ddd; color: orange; font-weight: bold;">Borrowed</td>
            `;
            tbody.appendChild(tr);
        });
    }
}