document.addEventListener('DOMContentLoaded', () => {

    /* ================= STORAGE ================= */
    let tickets = JSON.parse(localStorage.getItem('tickets'));
    if (!Array.isArray(tickets)) {
        tickets = [];
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }

    function refreshTickets() {
        tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    }

    /* ================= THEME SWITCH ================= */
    const themeToggle = document.getElementById('themeToggle');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    /* ================= LOGIN / DASHBOARD ================= */
    const loginView = document.getElementById('loginView');
    const dashboardView = document.getElementById('dashboardView');
    const loginForm = document.getElementById('loginForm');

    function showLogin() {
        if (loginView) loginView.classList.remove('hidden');
        if (dashboardView) dashboardView.classList.add('hidden');
    }

    function showDashboard() {
        if (loginView) loginView.classList.add('hidden');
        if (dashboardView) dashboardView.classList.remove('hidden');
        refreshTickets();
        loadKPIs();
    }

    if (loginView && dashboardView) {
        localStorage.getItem('loggedIn') === 'true'
            ? showDashboard()
            : showLogin();
    }

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            localStorage.setItem('loggedIn', 'true');
            showDashboard();
        });
    }

    function loadKPIs() {
        if (!document.getElementById('kpiTotal')) return;

        document.getElementById('kpiTotal').textContent = tickets.length;
        document.getElementById('kpiOpen').textContent =
            tickets.filter(t => t.status === 'Apertura').length;
        document.getElementById('kpiResolved').textContent =
            tickets.filter(t => t.status === 'Resuelto').length;
        document.getElementById('kpiEscalated').textContent =
            tickets.filter(t => t.status === 'Escalada').length;
    }

    /* ================= RENDER TICKETS ================= */
    const ticketGrid = document.getElementById('ticketGrid');

    if (ticketGrid) {
        refreshTickets();
        ticketGrid.innerHTML = '';

        tickets.forEach(t => {
            const card = document.createElement('custom-ticket-card');

            card.setAttribute('ticket-id', t.ticketId);
            card.setAttribute('date', t.date);
            card.setAttribute('time', t.time);
            card.setAttribute('client', t.client);
            card.setAttribute('issue', t.issue);
            card.setAttribute('description', t.description);
            card.setAttribute('status', t.status);
            card.setAttribute('priority', t.priority);
            card.setAttribute('type', t.type);

            ticketGrid.appendChild(card);
        });
    }

    /* ================= FORM CREATE / EDIT ================= */
    const form = document.getElementById('ticketForm');
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const ticketIdParam = params.get('ticket');
    const isEdit = Boolean(ticketIdParam);

    let currentTicket = tickets.find(t => t.ticketId === ticketIdParam);

    if (isEdit && currentTicket) {
        ticketId.value = currentTicket.ticketId;
        ticketDate.value = `${currentTicket.date} • ${currentTicket.time}`;
        client.value = currentTicket.client;
        phone.value = currentTicket.phone || '';
        email.value = currentTicket.email || '';
        source.value = currentTicket.source || '';
        issue.value = currentTicket.issue;
        description.value = currentTicket.description;
        status.value = currentTicket.status;
        priority.value = currentTicket.priority;
        type.value = currentTicket.type;
    } else {
        const now = new Date();
        ticketId.value = `TS-${now.getTime()}`;
        ticketDate.value =
            `${now.toLocaleDateString()} • ${now.toLocaleTimeString()}`;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        const [date, time] = ticketDate.value.split(' • ');

        const data = {
            ticketId: ticketId.value,
            date,
            time,
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

        if (isEdit && currentTicket) {
            const index = tickets.findIndex(t => t.ticketId === ticketIdParam);
            tickets[index] = { ...tickets[index], ...data };
        } else {
            tickets.push(data);
        }

        localStorage.setItem('tickets', JSON.stringify(tickets));
        window.location.href = 'tickets.html';
    });
});
