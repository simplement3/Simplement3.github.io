document.addEventListener('DOMContentLoaded', () => {

    /* ===== EDITAR / CREAR TICKET ===== */
    const ticketForm = document.getElementById('ticketForm');

    if (ticketForm) {
        ticketForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const ticketData = {
                client: document.getElementById('client').value,
                issue: document.getElementById('issue').value,
                description: document.getElementById('description').value,
                status: document.getElementById('status').value,
                priority: document.getElementById('priority').value,
                type: document.getElementById('type').value
            };

            console.log('Ticket guardado (demo):', ticketData);
            alert('Ticket actualizado correctamente');
            window.location.href = '/';
        });
    }

    /* ===== FILTROS DE TICKETS ===== */
    const buttons = document.querySelectorAll('.filter-btn');
    const tickets = document.querySelectorAll('custom-ticket-card');

    if (buttons.length && tickets.length) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                // UX: marcar botón activo
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                tickets.forEach(ticket => {
                    const status = ticket.getAttribute('status');

                    ticket.style.display =
                        filter === 'all' || status === filter
                            ? 'block'
                            : 'none';
                });
            });
        });
    }
});
