let currentBookId = null;
// Show book id in modal when "Borrow Book" is clicked
document.querySelectorAll('[data-bs-target="#borrowModal"]').forEach(button => {
    button.addEventListener('click', function() {
        currentBookId = this.getAttribute('data-book-id');
    });
});
// Handle confirm borrow
document.getElementById('confirmBorrow').addEventListener('click', function() {
    if (currentBookId) {
        // Here, you would normally make an API request or update the database.
        // For this example, we're just going to show an alert.
        alert('You have fully borrowed the book with ID: ' + currentBookId);
        // Close the modal after borrowing
        $('#borrowModal').modal('hide');
    }
});
