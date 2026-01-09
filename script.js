document.addEventListener('DOMContentLoaded', () => {

    const ticketGrid = document.getElementById('ticketGrid');

    /* ===== STORAGE INIT ===== */
    if (!localStorage.getItem('tickets')) {
        localStorage.setItem('tickets', JSON.stringify([]));
    }

    /* ===== RENDER TICKETS ===== */
    function renderTickets(filter = 'all') {
        if (!ticketGrid) return;

        const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        ticketGrid.innerHTML = '';

        if (tickets.length === 0) {
            ticketGrid.innerHTML = `
                <p class="col-span-full text-center text-gray-500">
                    No hay tickets creados aún.
                </p>
            `;
            return;
        }

        tickets.forEach(ticket => {
            if (filter !== 'all' && ticket.status !== filter) return;

            const card = document.createElement('custom-ticket-card');

            Object.entries(ticket).forEach(([key, value]) => {
                const attr = key === 'ticketId' ? 'ticket-id' : key;
                card.setAttribute(attr, value);
            });

            ticketGrid.appendChild(card);
        });
    }

    renderTickets();

    /* ===== EDITAR / CREAR TICKET ===== */
    const ticketForm = document.getElementById('ticketForm');

    if (ticketForm) {
        const params = new URLSearchParams(window.location.search);
        const ticketId = params.get('ticket');

        const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        const ticketIndex = tickets.findIndex(t => t.ticketId === ticketId);

        // Editar ticket existente
        if (ticketIndex !== -1) {
            const ticket = tickets[ticketIndex];

            document.getElementById('ticketId').value = ticket.ticketId;
            document.getElementById('ticketDate').value = `${ticket.date} • ${ticket.time}`;
            client.value = ticket.client;
            issue.value = ticket.issue;
            description.value = ticket.description;
            status.value = ticket.status;
            priority.value = ticket.priority;
            type.value = ticket.type;
        }

        ticketForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const now = new Date();

            const data = {
                ticketId: ticketId || `TS-${Date.now()}`,
                date: now.toLocaleDateString(),
                time: now.toLocaleTimeString(),
                client: client.value,
                issue: issue.value,
                description: description.value,
                status: status.value,
                priority: priority.value,
                type: type.value
            };

            if (ticketIndex !== -1) {
                tickets[ticketIndex] = data;
            } else {
                tickets.push(data);
            }

            localStorage.setItem('tickets', JSON.stringify(tickets));
            window.location.href = '/';
        });
    }

    /* ===== FILTROS ===== */
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document
                .querySelectorAll('.filter-btn')
                .forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');
            renderTickets(button.dataset.filter);
        });
    });
});
