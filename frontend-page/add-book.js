// Toggle Add Book Form Visibility
const toggleFormButton = document.getElementById('toggleFormButton');
const addBookFormContainer = document.getElementById('addBookFormContainer');
const addBookForm = document.getElementById('addBookForm');
const manageBooksTableBody = document.querySelector('#manageBooksTable tbody');
// Track the next book ID
let nextBookId = manageBooksTableBody.rows.length + 1;
toggleFormButton.addEventListener('click', () => {
    if (addBookFormContainer.style.display === 'none' || addBookFormContainer.style.display === '') {
        addBookFormContainer.style.display = 'block';
        toggleFormButton.textContent = 'Close Form';
    } else {
        addBookFormContainer.style.display = 'none';
        toggleFormButton.textContent = 'Add Book';
    }
});
// Add Book Form Submission Logic
addBookForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting

    // Get form values
    const bookTitle = document.getElementById('bookTitle').value.trim();
    const bookAuthor = document.getElementById('bookAuthor').value.trim();
    const bookGenre = document.getElementById('bookGenre').value.trim();
    const bookAvailability = document.getElementById('bookAvailability').value;

    // Validate inputs
    if (!bookTitle || !bookAuthor || !bookGenre) {
        alert('Please fill in all fields.');
        return;
    }

    // Add the new book to the "Manage Books" table
    const newRow = document.createElement('tr');
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

    // Add event listeners to the new buttons
    addEventListenersToActions(newRow);

    // Reset form and hide it
    addBookForm.reset();
    addBookFormContainer.style.display = 'none';
    toggleFormButton.textContent = 'Add Book';

    alert('Book added successfully!');
});

// Add event listeners to edit and delete buttons
function addEventListenersToActions(row) {
    const editButton = row.querySelector('.editBtn');
    const deleteButton = row.querySelector('.deleteBtn');

    // Edit button functionality
    editButton.addEventListener('click', () => {
        const cells = row.querySelectorAll('td');
        const bookTitle = cells[1].textContent;
        const bookAuthor = cells[2].textContent;
        const bookGenre = cells[3].textContent;
        const bookAvailability = cells[4].textContent;

        // Pre-fill the form with the selected book's data
        document.getElementById('bookTitle').value = bookTitle;
        document.getElementById('bookAuthor').value = bookAuthor;
        document.getElementById('bookGenre').value = bookGenre;
        document.getElementById('bookAvailability').value = bookAvailability.toLowerCase();

        // Show the form and update the button text
        addBookFormContainer.style.display = 'block';
        toggleFormButton.textContent = 'Close Form';

        // Update the table row when the form is submitted again
        addBookForm.onsubmit = (event) => {
            event.preventDefault();
            cells[1].textContent = document.getElementById('bookTitle').value.trim();
            cells[2].textContent = document.getElementById('bookAuthor').value.trim();
            cells[3].textContent = document.getElementById('bookGenre').value.trim();
            cells[4].textContent = document.getElementById('bookAvailability').value;

            addBookForm.reset();
            addBookFormContainer.style.display = 'none';
            toggleFormButton.textContent = 'Add Book';
            alert('Book updated successfully!');

            // Reset the form submission behavior
            addBookForm.onsubmit = null;
        };
    });

    // Delete button functionality
    deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this book?')) {
            row.remove();
        }
    });
}

// Add event listeners to existing rows
document.querySelectorAll('#manageBooksTable tbody tr').forEach(addEventListenersToActions);
