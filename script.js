document.addEventListener('DOMContentLoaded', () => {

    if (!Array.isArray(JSON.parse(localStorage.getItem('tickets')))) {
        localStorage.setItem('tickets', JSON.stringify([]));
    }

    let tickets = JSON.parse(localStorage.getItem('tickets')) || [];

    /* ===== INDEX ===== */
    const grid = document.getElementById('ticketGrid');

    function renderTickets(filter = 'all') {
        if (!grid) return;
        grid.innerHTML = '';

        tickets.forEach(ticket => {
            if (filter !== 'all' && ticket.status !== filter) return;

            const card = document.createElement('custom-ticket-card');

            // 🔧 MAPEO EXPLÍCITO (NO ROMPE NADA)
            card.setAttribute('ticket-id', ticket.ticketId);
            card.setAttribute('date', ticket.date);
            card.setAttribute('time', ticket.time);
            card.setAttribute('client', ticket.client);
            card.setAttribute('issue', ticket.issue);
            card.setAttribute('description', ticket.description);
            card.setAttribute('status', ticket.status);
            card.setAttribute('priority', ticket.priority);
            card.setAttribute('type', ticket.type);

            // Datos nuevos (se conservan aunque no se muestren aún)
            card.setAttribute('phone', ticket.phone || '');
            card.setAttribute('email', ticket.email || '');
            card.setAttribute('source', ticket.source || '');

            grid.appendChild(card);
        });
    }

    renderTickets();

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn')
                .forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTickets(btn.dataset.filter);
        });
    });

    /* ===== FORM ===== */
    const form = document.getElementById('ticketForm');
    if (!form) return;

    const params = new URLSearchParams(location.search);
    const ticketIdParam = params.get('ticket');
    const isEdit = Boolean(ticketIdParam);

    let current = tickets.find(t => t.ticketId === ticketIdParam);

    if (isEdit && current) {
        ticketId.value = current.ticketId;
        ticketDate.value = `${current.date} • ${current.time}`;
        client.value = current.client;
        phone.value = current.phone || '';
        email.value = current.email || '';
        source.value = current.source || '';
        issue.value = current.issue;
        description.value = current.description;
        status.value = current.status;
        priority.value = current.priority;
        type.value = current.type;
    } else {
        const now = new Date();
        ticketId.value = `TS-${now.getTime()}`;
        ticketDate.value = `${now.toLocaleDateString()} • ${now.toLocaleTimeString()}`;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        const data = {
            ticketId: ticketId.value,
            date: ticketDate.value.split(' • ')[0],
            time: ticketDate.value.split(' • ')[1],
            client: client.value,
            phone: phone.value,
            email: email.value,
            source: source.value,
            issue: issue.value,
            description: description.value,
            status: status.value,
            priority: priority.value,
            type: type.value
        };

        if (isEdit) {
            const i = tickets.findIndex(t => t.ticketId === ticketIdParam);
            tickets[i] = { ...tickets[i], ...data };
        } else {
            tickets.push(data);
        }

        localStorage.setItem('tickets', JSON.stringify(tickets));
        location.href = '/';
    });
});
