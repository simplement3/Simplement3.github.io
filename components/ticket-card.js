class TicketCard extends HTMLElement {
    connectedCallback() {
        const ticketId = this.getAttribute('ticket-id') || 'TS-XXXX';
        const date = this.getAttribute('date') || '';
        const time = this.getAttribute('time') || '';
        const status = this.getAttribute('status') || 'Apertura';
        const priority = this.getAttribute('priority') || 'Media';
        const type = this.getAttribute('type') || 'Software';
        const client = this.getAttribute('client') || 'Cliente';
        const issue = this.getAttribute('issue') || '';
        const description = this.getAttribute('description') || '';

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }

                .ticket-card {
                    background: white;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                    overflow: hidden;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    transition: transform .2s ease, box-shadow .2s ease;
                }

                .ticket-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
                }

                a {
                    text-decoration: none;
                    color: inherit;
                }

                .ticket-header {
                    padding: 0.75rem 1rem;
                    border-bottom: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.8rem;
                }

                .ticket-id {
                    font-weight: 600;
                    color: #1e40af;
                    white-space: nowrap;
                }

                .ticket-date {
                    color: #6b7280;
                    white-space: nowrap;
                }

                .ticket-body {
                    padding: 1rem;
                    flex: 1;
                    overflow: hidden;
                }

                .ticket-title {
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #0f172a;

                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .ticket-description {
                    font-size: 0.85rem;
                    color: #475569;
                    line-height: 1.4;

                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .ticket-footer {
                    padding: 0.75rem 1rem;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 0.5rem;
                }

                .client {
                    font-size: 0.75rem;
                    color: #334155;
                    max-width: 45%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .badge-container {
                    display: flex;
                    gap: 0.25rem;
                    flex-wrap: wrap;
                    justify-content: flex-end;
                }
            </style>

            <div class="ticket-card">
                <a href="/edit-ticket.html?ticket=${ticketId}">
                    <div class="ticket-header">
                        <span class="ticket-id">${ticketId}</span>
                        <span class="ticket-date">${date} • ${time}</span>
                    </div>
                </a>

                <div class="ticket-body">
                    <div class="ticket-title">${issue}</div>
                    <div class="ticket-description">${description}</div>
                </div>

                <div class="ticket-footer">
                    <span class="client">${client}</span>
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
