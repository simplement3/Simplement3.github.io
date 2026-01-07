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
                    font-size: 1.5rem;
                    font-weight: 700;
                    text-decoration: none;
                    color: white;
                }
                .logo-icon {
                    margin-right: 0.5rem;
                }
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                }
                .nav-link {
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    transition: opacity 0.2s;
                    display: flex;
                    align-items: center;
                }
                .nav-link:hover {
                    opacity: 0.8;
                }
                .nav-link-icon {
                    margin-right: 0.5rem;
                }
                @media (max-width: 768px) {
                    .nav-container {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .nav-links {
                        width: 100%;
                        justify-content: space-around;
                    }
                }
            </style>
            <nav>
                <div class="nav-container">
                    <a href="/" class="logo">
                        <i data-feather="tool" class="logo-icon"></i>
                        TechTroubleTickets
                    </a>
                    <div class="nav-links">
                        <a href="/" class="nav-link">
                            <i data-feather="home" class="nav-link-icon"></i>
                            Inicio
                        </a>
                        <a href="/tickets" class="nav-link">
                            <i data-feather="list" class="nav-link-icon"></i>
                            Tickets
                        </a>
                        <a href="/reports" class="nav-link">
                            <i data-feather="bar-chart-2" class="nav-link-icon"></i>
                            Reportes
                        </a>
                        <a href="/profile" class="nav-link">
                            <i data-feather="user" class="nav-link-icon"></i>
                            Perfil
                        </a>
                    </div>
                </div>
            </nav>
        `;
    }
}
customElements.define('custom-navbar', CustomNavbar);