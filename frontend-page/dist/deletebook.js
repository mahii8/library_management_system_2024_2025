async function deleteBook(bookId) {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authorization token is missing");
        }
        const response = await fetch(`http://localhost:5000/books/${bookId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete the book. Please try again.");
        }
        alert("Book deleted successfully!");
        await fetchBooks();
    }
    catch (error) {
        console.error("Error deleting the book:", error);
        alert("An error occurred while deleting the book. Please try again.");
    }
}
window.deleteBook = deleteBook;
//# sourceMappingURL=deletebook.js.map