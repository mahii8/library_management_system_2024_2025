async function fetchBooks() {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("Authorization token is missing");
        }
        const response = await fetch("http://localhost:5000/books", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        const books = await response.json();
        populateBooksTable(books);
    }
    catch (error) {
        console.error("Error fetching books:", error);
    }
}
function populateBooksTable(books) {
    const tableBody = document.getElementById("books-table-body");
    tableBody.innerHTML = "";
    books.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${index + 1}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.publisher}</td>
      <td>${book.quantity > 0 ? "Available" : "Unavailable"}</td>
      <td>
          <button class="btn btn-warning btn-sm" onclick="editBook('${book._id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteBook('${book._id}')">Delete</button>
        </td>
    `;
        tableBody.appendChild(row);
    });
}
document.addEventListener("DOMContentLoaded", fetchBooks);
//# sourceMappingURL=getbook.js.map