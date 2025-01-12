// Function to delete a book by ID
async function deleteBook(bookId: string): Promise<void> {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve the auth token from local storage
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await fetch(`http://localhost:5000/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attach the token for authorization
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete the book. Please try again.");
    }

    // Successfully deleted
    alert("Book deleted successfully!");
    await fetchBooks(); // Refresh the book list after deletion
  } catch (error) {
    console.error("Error deleting the book:", error);
    alert("An error occurred while deleting the book. Please try again.");
  }
}

// Expose the deleteBook function to the global scope if required for button actions
(window as any).deleteBook = deleteBook;
