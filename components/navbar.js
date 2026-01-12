class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background-color: #1e40af;
                    color: white;
                    padding: 1rem 2rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: white;
                    text-decoration: none;
                }
                .logo-img {
                    height: 80px;
                }
                .logo2-img {
                    height: 70px;
                }
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                }
                .nav-link {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }
                .nav-link:hover {
                    opacity: 0.8;
                }
                @media (max-width: 768px) {
                    .nav-container {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }
            </style>

            <nav>
                <div class="nav-container">
                    <a href="index.html" class="logo">
                        <img src="assets/logo2.png" class="logo2-img">
                        <img src="assets/logo.png" class="logo-img">
                    </a>

                    <div class="nav-links">
                        <a href="index.html" class="nav-link">Inicio</a>
                        <a href="tickets.html" class="nav-link">Tickets</a>
                        <a href="edit-ticket.html" class="nav-link">Nuevo Ticket</a>
                        <a href="reports.html" class="nav-link">Reportes</a>
                        <a href="profile.html" class="nav-link">Perfil</a>
                    </div>
                </div>
            </nav>
        `;
    }
}
customElements.define('custom-navbar', CustomNavbar);
