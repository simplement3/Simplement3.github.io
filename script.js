
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle ticket form submission
    const ticketForm = document.getElementById('ticketForm');
    if (ticketForm) {
        ticketForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const ticketData = {
                client: document.getElementById('client').value,
                issue: document.getElementById('issue').value,
                description: document.getElementById('description').value,
                status: document.getElementById('status').value,
                priority: document.getElementById('priority').value,
                type: document.getElementById('type').value
            };

            // In a real app, this would send to an API
            console.log('Saving ticket:', ticketData);
            
            // Show success message and redirect
            alert('Ticket actualizado correctamente');
            window.location.href = '/';
        });
    }

    // Ticket filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                filterTickets(filterValue);
            });
        });
    }

    function filterTickets(filter) {
        const tickets = document.querySelectorAll('.ticket-card');
        tickets.forEach(ticket => {
            if (filter === 'all') {
                ticket.style.display = 'block';
            } else {
                const ticketStatus = ticket.getAttribute('data-status');
                if (ticketStatus === filter) {
                    ticket.style.display = 'block';
                } else {
                    ticket.style.display = 'none';
                }
            }
        });
    }
});

// Function to open ticket details modal
function openTicketDetails(ticketId) {
    // In a real app, this would fetch ticket details from an API
    console.log(`Opening details for ticket ${ticketId}`);
    // Show modal with ticket details
}