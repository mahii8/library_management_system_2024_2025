// Get all "Return Book" buttons
const returnButtons = document.querySelectorAll('.returnBookBtn');

// Add event listeners to each "Return Book" button
returnButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Ask the user for confirmation before returning the book
        const confirmReturn = confirm("Are you sure you want to return this book?");
        
        if (confirmReturn) {
            // Find the book row containing the clicked button
            const bookRow = this.closest('tr');
            
            // Change the status of the book to "Returned"
            const statusCell = bookRow.querySelector('.status');
            statusCell.textContent = "Returned"; // Update status text

            // Disable the "Return Book" button after it's clicked
            this.disabled = true;
            this.textContent = "Returned"; // Update button text

            // Optionally, send a request to the backend to mark the book as returned
            const bookId = bookRow.getAttribute('data-book-id');
            console.log(`Book with ID ${bookId} has been returned`);

            // Optional: Send data to backend (example)
            // fetch('/api/return-book', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ bookId }),
            // });
        }
    });
});
