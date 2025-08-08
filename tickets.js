// Tickets Page Functionality

// Event filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Filter events
        filterEvents(filter);
    });
});

function filterEvents(filter) {
    eventCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        
        if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Ticket purchasing functionality
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('kaufen') || button.textContent.includes('Kaufen')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const eventCard = button.closest('.event-card, .featured-event-card');
            const eventName = eventCard.querySelector('h3, h2').textContent;
            const eventPrice = eventCard.querySelector('.price, .ticket-price').textContent;
            
            purchaseTicket(eventName, eventPrice);
        });
    }
});

function purchaseTicket(eventName, price) {
    // Show purchase modal
    showPurchaseModal(eventName, price);
}

function showPurchaseModal(eventName, price) {
    // Remove existing modal
    const existingModal = document.querySelector('.purchase-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Ticket kaufen</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="ticket-details">
                        <h4>${eventName}</h4>
                        <p class="ticket-price">${price}</p>
                    </div>
                    <form class="purchase-form">
                        <div class="form-group">
                            <label for="quantity">Anzahl:</label>
                            <select id="quantity" name="quantity">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">E-Mail:</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Telefon (optional):</label>
                            <input type="tel" id="phone" name="phone">
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="newsletter" value="1">
                                Newsletter abonnieren
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary modal-cancel">Abbrechen</button>
                    <button class="btn btn-primary purchase-confirm">Kaufen</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .purchase-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        
        .modal-content {
            background: white;
            border-radius: var(--border-radius);
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: var(--shadow-hover);
        }
        
        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            margin: 0;
            color: var(--dark-color);
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .ticket-details {
            text-align: center;
            margin-bottom: 2rem;
            padding: 1rem;
            background: var(--light-color);
            border-radius: var(--border-radius);
        }
        
        .ticket-details h4 {
            margin: 0 0 0.5rem 0;
            color: var(--dark-color);
        }
        
        .ticket-price {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
            margin: 0;
        }
        
        .purchase-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .form-group label {
            font-weight: 500;
            color: var(--dark-color);
        }
        
        .form-group input,
        .form-group select {
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: var(--border-radius);
            font-size: 1rem;
        }
        
        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: var(--primary-color);
        }
        
        .form-group label:has(input[type="checkbox"]) {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
        }
        
        .modal-footer {
            padding: 1.5rem;
            border-top: 1px solid #eee;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                margin: 1rem;
            }
            
            .modal-footer {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Modal functionality
    const modalClose = modal.querySelector('.modal-close');
    const modalCancel = modal.querySelector('.modal-cancel');
    const purchaseConfirm = modal.querySelector('.purchase-confirm');
    
    modalClose.addEventListener('click', () => modal.remove());
    modalCancel.addEventListener('click', () => modal.remove());
    
    // Close modal when clicking outside
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            modal.remove();
        }
    });
    
    // Purchase confirmation
    purchaseConfirm.addEventListener('click', () => {
        const form = modal.querySelector('.purchase-form');
        const formData = new FormData(form);
        
        // Validate form
        const name = formData.get('name');
        const email = formData.get('email');
        const quantity = formData.get('quantity');
        
        if (!name || !email) {
            showNotification('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
            return;
        }
        
        // Simulate purchase process
        purchaseConfirm.textContent = 'Wird verarbeitet...';
        purchaseConfirm.disabled = true;
        
        setTimeout(() => {
            showNotification(`Tickets für ${eventName} erfolgreich gekauft! Sie erhalten eine Bestätigung per E-Mail.`, 'success');
            modal.remove();
        }, 2000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Featured event ticket options
document.querySelectorAll('.ticket-option').forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        document.querySelectorAll('.ticket-option').forEach(o => o.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
    });
});

// Event card hover effects
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Featured event card hover effect
document.querySelector('.featured-event-card').addEventListener('mouseenter', () => {
    document.querySelector('.featured-event-card').style.transform = 'translateY(-5px) scale(1.01)';
});

document.querySelector('.featured-event-card').addEventListener('mouseleave', () => {
    document.querySelector('.featured-event-card').style.transform = 'translateY(0) scale(1)';
});

// Contact methods functionality
document.querySelectorAll('.contact-method').forEach(method => {
    method.addEventListener('click', () => {
        const text = method.querySelector('span').textContent;
        
        if (text.includes('WhatsApp')) {
            showNotification('WhatsApp Support wird geöffnet...', 'info');
            // In a real implementation, this would open WhatsApp
        } else if (text.includes('@')) {
            showNotification('E-Mail Client wird geöffnet...', 'info');
            // In a real implementation, this would open email client
        } else if (text.includes('+43')) {
            showNotification('Telefon wird gewählt...', 'info');
            // In a real implementation, this would initiate a call
        }
    });
});

// Contact button functionality
document.querySelector('.contact-section .btn').addEventListener('click', () => {
    showPurchaseModal('Support Kontakt', 'Kostenlos');
});

// Notification system (reuse from main script)
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add animation for ticket options
const ticketOptionStyles = document.createElement('style');
ticketOptionStyles.textContent = `
    .ticket-option.active {
        border-color: var(--primary-color);
        background: rgba(255, 107, 107, 0.05);
    }
    
    .ticket-option:hover {
        border-color: var(--primary-color);
        transform: translateY(-2px);
    }
`;
document.head.appendChild(ticketOptionStyles);

// Initialize page
console.log('🎵 Bussi Baba Tickets loaded successfully!');
