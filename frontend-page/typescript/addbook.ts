document.addEventListener("DOMContentLoaded", () => {
  const showAddBookFormButton = document.querySelector(
    "#showAddBookForm"
  ) as HTMLButtonElement;
  const addBookFormContainer = document.querySelector(
    "#addBookFormContainer"
  ) as HTMLElement;
  const addBookForm = document.querySelector("#addBookForm") as HTMLFormElement;

  // Show Add Book Form when the button is clicked
  showAddBookFormButton.addEventListener("click", () => {
    addBookFormContainer.style.display = "block"; // Show the form
  });

  // Handle form submission
  addBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = (
      document.querySelector("#bookTitle") as HTMLInputElement
    ).value.trim();
    const author = (
      document.querySelector("#bookAuthor") as HTMLInputElement
    ).value.trim();
    const publicationYear = parseInt(
      (
        document.querySelector("#bookPublicationYear") as HTMLInputElement
      ).value.trim(),
      10
    );
    const publisher = (
      document.querySelector("#bookPublisher") as HTMLInputElement
    ).value.trim();
    const quantity = parseInt(
      (
        document.querySelector("#bookQuantity") as HTMLInputElement
      ).value.trim(),
      10
    );

    // Validate the inputs
    if (!title || !author || !publicationYear || !publisher || quantity < 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken"); // Get token from local storage or cookies

      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token to the request
        },
        body: JSON.stringify({
          title,
          author,
          publicationYear,
          publisher,
          quantity,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || "Failed to add book.");
        return;
      }

      const data = await response.json();
      alert("Book added successfully!");

      // Optionally, reset the form or update the book list
      addBookForm.reset();
      addBookFormContainer.style.display = "none"; // Hide the form after submission
    } catch (err) {
      console.error("Error adding book:", err);
      alert("An error occurred while adding the book. Please try again.");
    }
  });
});
