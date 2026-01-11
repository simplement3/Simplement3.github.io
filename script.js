document.addEventListener('DOMContentLoaded', () => {

    /* ===== STORAGE INIT ===== */
    let tickets = JSON.parse(localStorage.getItem('tickets'));
    if (!Array.isArray(tickets)) {
        tickets = [];
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }

    /* ======================================================
       INDEX.HTML → RENDER TICKETS
    ====================================================== */
    const ticketGrid = document.querySelector('.grid');

    function renderTickets(filter = 'all') {
        if (!ticketGrid) return;

        ticketGrid.innerHTML = '';

        if (tickets.length === 0) {
            ticketGrid.innerHTML = `
                <p class="text-gray-500 col-span-full text-center">
                    No hay tickets creados todavía
                </p>`;
            return;
        }

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

    /* ======================================================
       EDIT-TICKET.HTML → CREATE / EDIT
    ====================================================== */
    const ticketForm = document.getElementById('ticketForm');
    if (!ticketForm) return; // 👈 ahora sí, SOLO corta aquí

    const params = new URLSearchParams(window.location.search);
    const ticketIdParam = params.get('ticket');
    const isEdit = Boolean(ticketIdParam);

    const ticketIdInput = document.getElementById('ticketId');
    const ticketDateInput = document.getElementById('ticketDate');

    /* ===== EDIT MODE ===== */
    if (isEdit) {
        const ticket = tickets.find(t => t.ticketId === ticketIdParam);

        if (!ticket) {
            alert('Ticket no encontrado');
            window.location.href = '/';
            return;
        }

        ticketIdInput.value = ticket.ticketId;
        ticketDateInput.value = `${ticket.date} • ${ticket.time}`;
        client.value = ticket.client;
        issue.value = ticket.issue;
        description.value = ticket.description;
        status.value = ticket.status;
        priority.value = ticket.priority;
        type.value = ticket.type;

    } 
    /* ===== CREATE MODE ===== */
    else {
        const now = new Date();
        ticketIdInput.value = `TS-${now.getTime()}`;
        ticketDateInput.value =
            now.toLocaleDateString() + ' • ' + now.toLocaleTimeString();
    }

    /* ===== SUBMIT ===== */
    ticketForm.addEventListener('submit', e => {
        e.preventDefault();

        const [date, time] = ticketDateInput.value.split(' • ');

        const ticketData = {
            ticketId: ticketIdInput.value,
            date,
            time,
            client: client.value.trim(),
            issue: issue.value.trim(),
            description: description.value.trim(),
            status: status.value,
            priority: priority.value,
            type: type.value
        };

        if (isEdit) {
            const index = tickets.findIndex(t => t.ticketId === ticketIdParam);
            tickets[index] = ticketData;
            alert('Ticket actualizado correctamente');
        } else {
            tickets.push(ticketData);
            alert('Ticket creado correctamente');
        }

        localStorage.setItem('tickets', JSON.stringify(tickets));
        window.location.href = '/';
    });
});
