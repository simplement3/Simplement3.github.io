class TicketCard extends HTMLElement {
    connectedCallback() {
        const ticketId = this.getAttribute('ticket-id');
        const date = this.getAttribute('date');
        const time = this.getAttribute('time');
        const client = this.getAttribute('client');
        const issue = this.getAttribute('issue');
        const description = this.getAttribute('description');
        const status = this.getAttribute('status');
        const priority = this.getAttribute('priority');
        const type = this.getAttribute('type');

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 6px 16px rgba(0,0,0,.1);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                a { text-decoration:none; color:inherit }
                .header { padding:12px; display:flex; justify-content:space-between; font-size:.8rem }
                .body { padding:12px; flex:1 }
                .title { font-weight:600; margin-bottom:6px;
                    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden }
                .desc { font-size:.85rem;color:#475569;
                    display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden }
                .footer { padding:12px; display:flex; justify-content:space-between }
                .client { font-size:.75rem; max-width:45%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis }
            </style>

            <div class="card">
                <a href="edit-ticket.html?ticket=${ticketId}">
                    <div class="header">
                        <span>${ticketId}</span>
                        <span>${date} • ${time}</span>
                    </div>
                </a>

                <div class="body">
                    <div class="title">${issue}</div>
                    <div class="desc">${description}</div>
                </div>

                <div class="footer">
                    <span class="client">${client}</span>
                    <div>
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
