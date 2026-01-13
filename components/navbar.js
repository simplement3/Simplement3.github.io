class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            nav {
                background: linear-gradient(135deg, #1e3a8a, #7c3aed);
                color: white;
                padding: 1rem 2rem;
            }
            .nav-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                max-width: 1200px;
                margin: auto;
            }
            .logo {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .logo img {
                height: 60px;
            }
            .nav-links {
                display: flex;
                gap: 1.25rem;
                align-items: center;
            }
            .nav-link {
                color: white;
                text-decoration: none;
                font-weight: 500;
                cursor: pointer;
            }
        </style>

        <nav>
            <div class="nav-container">
                <a href="index.html" class="logo">
                    <img src="assets/logo2.png">
                    <img src="assets/logo.png">
                </a>

                <div class="nav-links">
                    <a href="index.html" class="nav-link">Inicio</a>
                    <a href="tickets.html" class="nav-link">Tickets</a>
                    <a href="edit-ticket.html" class="nav-link">Nuevo Ticket</a>
                    <a href="reports.html" class="nav-link">Reportes</a>
                    <a href="profile.html" class="nav-link">Perfil</a>
                    <span id="themeToggle" class="nav-link">🌙</span>
                </div>
            </div>
        </nav>
        `;
    }
}
customElements.define('custom-navbar', CustomNavbar);
