
function showDesc(description) {
    const box = document.getElementById("descBox");
    box.style.display = "block";
    box.textContent = "Description: " + (description || "No description available");
}

