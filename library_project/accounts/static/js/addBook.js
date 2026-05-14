const form = document.getElementById("addBookForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (e)
{
  const name = document.getElementById("bookName").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value.trim();

  if (!name || !author || !category)
  {
    e.preventDefault();
    msg.style.display = "block";
    msg.style.color = "red";
    msg.textContent = "Book Name, Author, and Category are required!";
  }
});