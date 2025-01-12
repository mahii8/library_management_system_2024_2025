document.addEventListener("DOMContentLoaded", () => {
    const showAddBookFormButton = document.querySelector("#showAddBookForm");
    const addBookFormContainer = document.querySelector("#addBookFormContainer");
    const addBookForm = document.querySelector("#addBookForm");
    showAddBookFormButton.addEventListener("click", () => {
        addBookFormContainer.style.display = "block";
    });
    addBookForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const title = document.querySelector("#bookTitle").value.trim();
        const author = document.querySelector("#bookAuthor").value.trim();
        const publicationYear = parseInt(document.querySelector("#bookPublicationYear").value.trim(), 10);
        const publisher = document.querySelector("#bookPublisher").value.trim();
        const quantity = parseInt(document.querySelector("#bookQuantity").value.trim(), 10);
        if (!title || !author || !publicationYear || !publisher || quantity < 0) {
            alert("Please fill in all fields correctly.");
            return;
        }
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch("http://localhost:5000/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
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
            addBookForm.reset();
            addBookFormContainer.style.display = "none";
        }
        catch (err) {
            console.error("Error adding book:", err);
            alert("An error occurred while adding the book. Please try again.");
        }
    });
});
//# sourceMappingURL=addbook.js.map