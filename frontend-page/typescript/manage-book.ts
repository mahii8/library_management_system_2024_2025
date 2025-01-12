// Get DOM elements
const toggleFormButton = document.getElementById(
  "toggleFormButton"
) as HTMLButtonElement;
const addBookFormContainer = document.getElementById(
  "addBookFormContainer"
) as HTMLDivElement;
const addBookForm = document.getElementById("addBookForm") as HTMLFormElement;
const manageBooksTableBody = document.querySelector(
  "#manageBooksTable tbody"
) as HTMLTableSectionElement;

// Track the next book ID
let nextBookId: number = manageBooksTableBody.rows.length + 1;

// Toggle Add Book Form Visibility
toggleFormButton.addEventListener("click", () => {
  if (
    addBookFormContainer.style.display === "none" ||
    addBookFormContainer.style.display === ""
  ) {
    addBookFormContainer.style.display = "block";
    toggleFormButton.textContent = "Close Form";
  } else {
    addBookFormContainer.style.display = "none";
    toggleFormButton.textContent = "Add Book";
  }
});

// Add Book Form Submission Logic
addBookForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const bookTitle = (
    document.getElementById("bookTitle") as HTMLInputElement
  ).value.trim();
  const bookAuthor = (
    document.getElementById("bookAuthor") as HTMLInputElement
  ).value.trim();
  const bookGenre = (
    document.getElementById("bookGenre") as HTMLInputElement
  ).value.trim();
  const bookAvailability = (
    document.getElementById("bookAvailability") as HTMLSelectElement
  ).value;

  // Validate inputs
  if (!bookTitle || !bookAuthor || !bookGenre) {
    alert("Please fill in all fields.");
    return;
  }

  // Add the new book to the "Manage Books" table
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

  // Add event listeners to the new row's buttons
  addEventListenersToActions(newRow);

  // Reset the form and hide it
  addBookForm.reset();
  addBookFormContainer.style.display = "none";
  toggleFormButton.textContent = "Add Book";

  alert("Book added successfully!");
});

// Add event listeners to edit and delete buttons
function addEventListenersToActions(row: HTMLTableRowElement): void {
  const editButton = row.querySelector(".editBtn") as HTMLButtonElement;
  const deleteButton = row.querySelector(".deleteBtn") as HTMLButtonElement;

  // Edit button functionality
  editButton.addEventListener("click", () => {
    const cells = row.querySelectorAll("td");
    const bookTitle = cells[1].textContent || "";
    const bookAuthor = cells[2].textContent || "";
    const bookGenre = cells[3].textContent || "";
    const bookAvailability = cells[4].textContent || "";

    // Pre-fill the form with the selected book's data
    (document.getElementById("bookTitle") as HTMLInputElement).value =
      bookTitle;
    (document.getElementById("bookAuthor") as HTMLInputElement).value =
      bookAuthor;
    (document.getElementById("bookGenre") as HTMLInputElement).value =
      bookGenre;
    (document.getElementById("bookAvailability") as HTMLSelectElement).value =
      bookAvailability.toLowerCase();

    // Show the form and update the button text
    addBookFormContainer.style.display = "block";
    toggleFormButton.textContent = "Close Form";

    // Update the table row when the form is submitted again
    const originalOnSubmit = addBookForm.onsubmit;
    addBookForm.onsubmit = (event: SubmitEvent) => {
      event.preventDefault();
      cells[1].textContent = (
        document.getElementById("bookTitle") as HTMLInputElement
      ).value.trim();
      cells[2].textContent = (
        document.getElementById("bookAuthor") as HTMLInputElement
      ).value.trim();
      cells[3].textContent = (
        document.getElementById("bookGenre") as HTMLInputElement
      ).value.trim();
      cells[4].textContent = (
        document.getElementById("bookAvailability") as HTMLSelectElement
      ).value;

      addBookForm.reset();
      addBookFormContainer.style.display = "none";
      toggleFormButton.textContent = "Add Book";
      alert("Book updated successfully!");

      // Restore original form submission behavior
      addBookForm.onsubmit = originalOnSubmit;
    };
  });

  // Delete button functionality
  deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this book?")) {
      row.remove();
    }
  });
}

// Add event listeners to existing rows
document
  .querySelectorAll<HTMLTableRowElement>("#manageBooksTable tbody tr")
  .forEach((row) => addEventListenersToActions(row));
