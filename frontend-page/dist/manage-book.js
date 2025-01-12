const toggleFormButton = document.getElementById("toggleFormButton");
const addBookFormContainer = document.getElementById("addBookFormContainer");
const addBookForm = document.getElementById("addBookForm");
const manageBooksTableBody = document.querySelector("#manageBooksTable tbody");
let nextBookId = manageBooksTableBody.rows.length + 1;
toggleFormButton.addEventListener("click", () => {
    if (addBookFormContainer.style.display === "none" ||
        addBookFormContainer.style.display === "") {
        addBookFormContainer.style.display = "block";
        toggleFormButton.textContent = "Close Form";
    }
    else {
        addBookFormContainer.style.display = "none";
        toggleFormButton.textContent = "Add Book";
    }
});
addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const bookTitle = document.getElementById("bookTitle").value.trim();
    const bookAuthor = document.getElementById("bookAuthor").value.trim();
    const bookGenre = document.getElementById("bookGenre").value.trim();
    const bookAvailability = document.getElementById("bookAvailability").value;
    if (!bookTitle || !bookAuthor || !bookGenre) {
        alert("Please fill in all fields.");
        return;
    }
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${nextBookId++}</td>
      <td>${bookTitle}</td>
      <td>${bookAuthor}</td>
      <td>${bookGenre}</td>
      <td>${bookAvailability}</td>
      <td>
          <button class="btn btn-warning btn-sm editBtn">Edit</button>
          <button class="btn btn-danger btn-sm deleteBtn">Delete</button>
      </td>
  `;
    manageBooksTableBody.appendChild(newRow);
    addEventListenersToActions(newRow);
    addBookForm.reset();
    addBookFormContainer.style.display = "none";
    toggleFormButton.textContent = "Add Book";
    alert("Book added successfully!");
});
function addEventListenersToActions(row) {
    const editButton = row.querySelector(".editBtn");
    const deleteButton = row.querySelector(".deleteBtn");
    editButton.addEventListener("click", () => {
        const cells = row.querySelectorAll("td");
        const bookTitle = cells[1].textContent || "";
        const bookAuthor = cells[2].textContent || "";
        const bookGenre = cells[3].textContent || "";
        const bookAvailability = cells[4].textContent || "";
        document.getElementById("bookTitle").value =
            bookTitle;
        document.getElementById("bookAuthor").value =
            bookAuthor;
        document.getElementById("bookGenre").value =
            bookGenre;
        document.getElementById("bookAvailability").value =
            bookAvailability.toLowerCase();
        addBookFormContainer.style.display = "block";
        toggleFormButton.textContent = "Close Form";
        const originalOnSubmit = addBookForm.onsubmit;
        addBookForm.onsubmit = (event) => {
            event.preventDefault();
            cells[1].textContent = document.getElementById("bookTitle").value.trim();
            cells[2].textContent = document.getElementById("bookAuthor").value.trim();
            cells[3].textContent = document.getElementById("bookGenre").value.trim();
            cells[4].textContent = document.getElementById("bookAvailability").value;
            addBookForm.reset();
            addBookFormContainer.style.display = "none";
            toggleFormButton.textContent = "Add Book";
            alert("Book updated successfully!");
            addBookForm.onsubmit = originalOnSubmit;
        };
    });
    deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this book?")) {
            row.remove();
        }
    });
}
document
    .querySelectorAll("#manageBooksTable tbody tr")
    .forEach((row) => addEventListenersToActions(row));
//# sourceMappingURL=manage-book.js.map