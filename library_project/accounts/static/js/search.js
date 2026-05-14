document.getElementById("searchBtn").addEventListener("click", () => {
  const nameQ = document.getElementById("nameSearch").value.trim();
  const authorQ = document.getElementById("authorSearch").value.trim();
  const catQ = document.getElementById("categorySearch").value;

  const params = new URLSearchParams({
      q: nameQ,
      author: authorQ,
      category: catQ
  });

  window.location.href = "?" + params.toString();
});

function showDesc(description)
{
  const box = document.getElementById("descBox");
  box.style.display = "block";
  box.textContent = "Description: " + (description || "No description available");
}