document.addEventListener('DOMContentLoaded', () => {

    /* ===== SESSION ===== */
    const loginView = document.getElementById('loginView');
    const dashboardView = document.getElementById('dashboardView');

    function showLogin() {
        dashboardView.classList.add('hidden');
        loginView.classList.remove('hidden');
    }

    function showDashboard() {
        loginView.classList.add('hidden');
        dashboardView.classList.remove('hidden');
        loadKPIs();
    }

    if (localStorage.getItem('loggedIn') === 'true') {
        showDashboard();
    } else {
        showLogin();
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            localStorage.setItem('loggedIn', 'true');
            showDashboard();
        });
    }

    /* ===== KPI LOGIC ===== */
    function loadKPIs() {
        const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

        const total = tickets.length;
        const open = tickets.filter(t => t.status === 'Apertura').length;
        const resolved = tickets.filter(t => t.status === 'Resuelto').length;
        const escalated = tickets.filter(t => t.status === 'Escalada').length;

        document.getElementById('kpiTotal').textContent = total;
        document.getElementById('kpiOpen').textContent = open;
        document.getElementById('kpiResolved').textContent = resolved;
        document.getElementById('kpiEscalated').textContent = escalated;
    }
});
