class StatusBadge extends HTMLElement {
    connectedCallback() {
        const status = this.getAttribute('status') || 'Unknown';
        const type = this.getAttribute('type') || 'status';
        
        let bgColor = 'bg-gray-100';
        let textColor = 'text-gray-800';
        let icon = 'alert-circle';
        
        if (type === 'status') {
            switch(status.toLowerCase()) {
                case 'apertura':
                    bgColor = 'bg-blue-100';
                    textColor = 'text-blue-800';
                    icon = 'alert-circle';
                    break;
                case 'resuelto':
                    bgColor = 'bg-green-100';
                    textColor = 'text-green-800';
                    icon = 'check-circle';
                    break;
                case 'cierre':
                    bgColor = 'bg-purple-100';
                    textColor = 'text-purple-800';
                    icon = 'lock';
                    break;
                case 'escalada':
                    bgColor = 'bg-yellow-100';
                    textColor = 'text-yellow-800';
                    icon = 'arrow-up';
                    break;
                default:
                    bgColor = 'bg-gray-100';
                    textColor = 'text-gray-800';
                    icon = 'help-circle';
            }
        } else if (type === 'priority') {
            switch(status.toLowerCase()) {
                case 'alta':
                    bgColor = 'bg-red-100';
                    textColor = 'text-red-800';
                    icon = 'alert-triangle';
                    break;
                case 'media':
                    bgColor = 'bg-yellow-100';
                    textColor = 'text-yellow-800';
                    icon = 'alert-octagon';
                    break;
                case 'baja':
                    bgColor = 'bg-green-100';
                    textColor = 'text-green-800';
                    icon = 'alert-circle';
                    break;
                default:
                    bgColor = 'bg-gray-100';
                    textColor = 'text-gray-800';
                    icon = 'help-circle';
            }
        } else if (type === 'issue') {
            switch(status.toLowerCase()) {
                case 'hardware':
                    bgColor = 'bg-orange-100';
                    textColor = 'text-orange-800';
                    icon = 'cpu';
                    break;
                case 'software':
                    bgColor = 'bg-indigo-100';
                    textColor = 'text-indigo-800';
                    icon = 'code';
                    break;
                case 'redes':
                    bgColor = 'bg-blue-100';
                    textColor = 'text-blue-800';
                    icon = 'wifi';
                    break;
                case 'periféricos':
                    bgColor = 'bg-purple-100';
                    textColor = 'text-purple-800';
                    icon = 'printer';
                    break;
                default:
                    bgColor = 'bg-gray-100';
                    textColor = 'text-gray-800';
                    icon = 'help-circle';
            }
        }

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .badge {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.375rem;
                    font-size: 0.75rem;
                    font-weight: 500;
                    white-space: nowrap;
                }
                .badge-icon {
                    width: 0.875rem;
                    height: 0.875rem;
                    margin-right: 0.25rem;
                }
            </style>
            <span class="badge ${bgColor} ${textColor}">
                <i data-feather="${icon}" class="badge-icon"></i>
                ${status}
            </span>
        `;
    }
}
customElements.define('custom-status-badge', StatusBadge);