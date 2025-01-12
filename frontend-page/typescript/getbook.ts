// TypeScript code to fetch books and display them
async function fetchBooks(): Promise<void> {
  try {
    const token = localStorage.getItem("authToken"); // Get token from local storage or cookies
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Fetch books from the backend (replace with your actual API endpoint)
    const response = await fetch("http://localhost:5000/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attach token to the request
      },
    });

    // If the response is successful, parse the JSON
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const books: Book[] = await response.json(); // Parse the JSON response
    populateBooksTable(books); // Call the function to populate the table with books
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Interface for Book type
interface Book {
  _id: string;
  title: string;
  author: string;
  publisher: string;
  quantity: number;
}

// Function to populate the table with book data
function populateBooksTable(books: Book[]): void {
  const tableBody = document.getElementById(
    "books-table-body"
  ) as HTMLTableSectionElement;
  tableBody.innerHTML = ""; // Clear any existing rows

  books.forEach((book, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.publisher}</td>
      <td>${book.quantity > 0 ? "Available" : "Unavailable"}</td>
      <td>
          <button class="btn btn-warning btn-sm" onclick="editBook('${
            book._id
          }')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteBook('${
            book._id
          }')">Delete</button>
        </td>
    `;
    tableBody.appendChild(row); // Append the row to the table body
  });
}

// Call fetchBooks when the page is loaded
document.addEventListener("DOMContentLoaded", fetchBooks);
