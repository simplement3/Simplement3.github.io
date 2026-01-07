document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

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