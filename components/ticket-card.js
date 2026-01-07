class TicketCard extends HTMLElement {
    connectedCallback() {
        const ticketId = this.getAttribute('ticket-id') || 'TS-XXXX-XXXX';
        const date = this.getAttribute('date') || 'DD/MM/YYYY';
        const time = this.getAttribute('time') || 'HH:MM';
        const status = this.getAttribute('status') || 'Apertura';
        const priority = this.getAttribute('priority') || 'Media';
        const type = this.getAttribute('type') || 'Software';
        const client = this.getAttribute('client') || 'Cliente';
        const issue = this.getAttribute('issue') || 'Problema no especificado';
        const description = this.getAttribute('description') || 'Descripción no disponible';

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .ticket-card {
                    background-color: white;
                    border-radius: 0.5rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    transition: transform 0.2s, box-shadow 0.2s;
                    cursor: pointer;
                }
                .ticket-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .ticket-header {
                    padding: 1rem;
                    border-bottom: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .ticket-id {
                    font-weight: 600;
                    color: #1e40af;
                }
                .ticket-date {
                    color: #6b7280;
                    font-size: 0.875rem;
                }
                .ticket-body {
                    padding: 1rem;
                }
                .ticket-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #111827;
                }
                .ticket-description {
                    color: #4b5563;
                    font-size: 0.875rem;
                    margin-bottom: 1rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .ticket-footer {
                    padding: 1rem;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .ticket-client {
                    font-weight: 500;
                    color: #374151;
                }
                .badge-container {
                    display: flex;
                    gap: 0.5rem;
                }
            </style>
            <div class="ticket-card">
                <a href="/edit-ticket.html?ticket=${ticketId}" class="block">
<div class="ticket-header">
                    <span class="ticket-id">${ticketId}</span>
                    <span class="ticket-date">${date} • ${time}</span>
                </a>
            </div>
<div class="ticket-body">
                    <h3 class="ticket-title">${issue}</h3>
                    <p class="ticket-description">${description}</p>
                </div>
                <div class="ticket-footer">
                    <span class="ticket-client">${client}</span>
                    <div class="badge-container">
                        <custom-status-badge status="${status}"></custom-status-badge>
                        <custom-status-badge status="${priority}" type="priority"></custom-status-badge>
                        <custom-status-badge status="${type}" type="issue"></custom-status-badge>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('custom-ticket-card', TicketCard);