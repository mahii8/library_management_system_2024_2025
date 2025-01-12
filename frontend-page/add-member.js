// Toggle Add Member Form Visibility 
const toggleFormButton = document.getElementById('toggleFormButton');
const addMemberFormContainer = document.getElementById('addMemberFormContainer');
const addMemberForm = document.getElementById('addMemberForm');
const manageMembersTableBody = document.querySelector('#manageMembersTable tbody');

// Track the next member ID
let nextMemberId = manageMembersTableBody.rows.length + 1;

toggleFormButton.addEventListener('click', () => {
    if (addMemberFormContainer.style.display === 'none' || addMemberFormContainer.style.display === '') {
        addMemberFormContainer.style.display = 'block';
        toggleFormButton.textContent = 'Close Form';
    } else {
        addMemberFormContainer.style.display = 'none';
        toggleFormButton.textContent = 'Add Member';
    }
});

// Add Member Form Submission Logic
addMemberForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting

    // Get form values
    const memberName = document.getElementById('memberName').value.trim();
    const memberEmail = document.getElementById('memberEmail').value.trim();
    const membershipDate = document.getElementById('membershipDate').value;
    const memberStatus = document.getElementById('memberStatus').value;

    // Validate inputs
    if (!memberName || !memberEmail || !membershipDate) {
        alert('Please fill in all fields.');
        return;
    }

    // Add the new member to the "Manage Members" table
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${nextMemberId++}</td>
        <td>${memberName}</td>
        <td>${memberEmail}</td>
        <td>${membershipDate}</td>
        <td>${memberStatus}</td>
        <td>
            <button class="btn btn-warning btn-sm editBtn">Edit</button>
            <button class="btn btn-danger btn-sm deleteBtn">Delete</button>
        </td>
    `;
    manageMembersTableBody.appendChild(newRow);

    // Add event listeners to the new buttons
    addEventListenersToActions(newRow);

    // Reset form and hide it
    addMemberForm.reset();
    addMemberFormContainer.style.display = 'none';
    toggleFormButton.textContent = 'Add Member';

    alert('Member added successfully!');
});

// Add event listeners to edit and delete buttons
function addEventListenersToActions(row) {
    const editButton = row.querySelector('.editBtn');
    const deleteButton = row.querySelector('.deleteBtn');

    // Edit button functionality
    editButton.addEventListener('click', () => {
        const cells = row.querySelectorAll('td');
        const memberName = cells[1].textContent;
        const memberEmail = cells[2].textContent;
        const membershipDate = cells[3].textContent;
        const memberStatus = cells[4].textContent;

        // Pre-fill the form with the selected member's data
        document.getElementById('memberName').value = memberName;
        document.getElementById('memberEmail').value = memberEmail;
        document.getElementById('membershipDate').value = membershipDate;
        document.getElementById('memberStatus').value = memberStatus.toLowerCase();

        // Show the form and update the button text
        addMemberFormContainer.style.display = 'block';
        toggleFormButton.textContent = 'Close Form';

        // Update the table row when the form is submitted again
        addMemberForm.onsubmit = (event) => {
            event.preventDefault();
            cells[1].textContent = document.getElementById('memberName').value.trim();
            cells[2].textContent = document.getElementById('memberEmail').value.trim();
            cells[3].textContent = document.getElementById('membershipDate').value;
            cells[4].textContent = document.getElementById('memberStatus').value;

            addMemberForm.reset();
            addMemberFormContainer.style.display = 'none';
            toggleFormButton.textContent = 'Add Member';
            alert('Member updated successfully!');

            // Reset the form submission behavior
            addMemberForm.onsubmit = null;
        };
    });

    // Delete button functionality
    deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this member?')) {
            row.remove();
        }
    });
}

// Add event listeners to existing rows
document.querySelectorAll('#manageMembersTable tbody tr').forEach(addEventListenersToActions);
