
const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
  alert("Please login first!");
  window.location.href = "Loginpage.html";
}


let books = JSON.parse(localStorage.getItem("books")) || [];

const form = document.getElementById("addBookForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("bookId").value.trim();
  const name = document.getElementById("bookName").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();


  if (!id || !name || !author || !category || !description) {
    showMsg("All fields are required!", "red");
    return;
  }

  if (books.some((book) => book.id === id)) {
    showMsg("Book ID already exists!", "red");
    return;
  }

 
  const newBook = {
    id,
    name,
    author,
    category,
    description,
  };

  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));

  showMsg("Book added successfully!", "green");

  form.reset();
});


function showMsg(text, color) {
  msg.style.display = "block";
  msg.style.color = color;
  msg.textContent = text;
}
