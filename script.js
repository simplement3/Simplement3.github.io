document.addEventListener('DOMContentLoaded', () => {

    /* ===== STORAGE INIT ===== */
    let tickets = JSON.parse(localStorage.getItem('tickets'));
    if (!Array.isArray(tickets)) {
        tickets = [];
        localStorage.setItem('tickets', JSON.stringify([]));
    }

    /* ===== INDEX: RENDER TICKETS ===== */
    const ticketGrid = document.querySelector('.grid');

    function renderTickets(filter = 'all') {
        if (!ticketGrid) return;

        ticketGrid.innerHTML = '';

        tickets.forEach(ticket => {
            if (filter !== 'all' && ticket.status !== filter) return;

            const card = document.createElement('custom-ticket-card');
            card.setAttribute('ticket-id', ticket.ticketId);
            card.setAttribute('date', ticket.date);
            card.setAttribute('time', ticket.time);
            card.setAttribute('status', ticket.status);
            card.setAttribute('priority', ticket.priority);
            card.setAttribute('type', ticket.type);
            card.setAttribute('client', ticket.client);
            card.setAttribute('issue', ticket.issue);
            card.setAttribute('description', ticket.description);

            ticketGrid.appendChild(card);
        });
    }

    renderTickets();

    /* ===== FILTROS ===== */
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTickets(btn.dataset.filter);
        });
    });

    /* ===== EDIT / CREATE TICKET ===== */
    const ticketForm = document.getElementById('ticketForm');
    if (!ticketForm) return;

    const params = new URLSearchParams(window.location.search);
    const ticketIdParam = params.get('ticket');
    const isEdit = Boolean(ticketIdParam);

    let currentTicket = null;

    if (isEdit) {
        currentTicket = tickets.find(t => t.ticketId === ticketIdParam);

        if (currentTicket) {
            ticketId.value = currentTicket.ticketId;
            ticketDate.value = `${currentTicket.date} • ${currentTicket.time}`;
            client.value = currentTicket.client;
            issue.value = currentTicket.issue;
            description.value = currentTicket.description;
            status.value = currentTicket.status;
            priority.value = currentTicket.priority;
            type.value = currentTicket.type;
        }
    } else {
        // CREAR NUEVO
        const now = new Date();
        ticketId.value = `TS-${now.getTime()}`;
        ticketDate.value = now.toLocaleDateString() + ' • ' + now.toLocaleTimeString();
    }

    ticketForm.addEventListener('submit', e => {
        e.preventDefault();

        const ticketData = {
            ticketId: ticketId.value,
            date: ticketDate.value.split(' • ')[0],
            time: ticketDate.value.split(' • ')[1],
            client: client.value,
            issue: issue.value,
            description: description.value,
            status: status.value,
            priority: priority.value,
            type: type.value
        };

        if (isEdit) {
            const index = tickets.findIndex(t => t.ticketId === ticketIdParam);
            tickets[index] = { ...tickets[index], ...ticketData };
            alert('Ticket actualizado correctamente');
        } else {
            tickets.push(ticketData);
            alert('Ticket creado correctamente');
        }

        localStorage.setItem('tickets', JSON.stringify(tickets));
        window.location.href = '/';
    });
});
