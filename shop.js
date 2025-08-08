// Shopping Cart Functionality
let cart = [];
let cartTotal = 0;

// Cart toggle functionality
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const cartClose = document.getElementById('cart-close');
const cartItems = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Toggle cart sidebar
cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

cartClose.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
        cartSidebar.classList.remove('active');
    }
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('€', ''));
        const productDescription = productCard.querySelector('.product-description').textContent;
        
        addToCart(productName, productPrice, productDescription);
        
        // Show success notification
        showNotification(`${productName} wurde zum Warenkorb hinzugefügt!`, 'success');
    });
});

function addToCart(name, price, description) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            description: description,
            quantity: 1
        });
    }
    
    updateCart();
}

function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    cartItems.innerHTML = '';
    cartTotal = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-content">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <div class="cart-item-price">
                    <span>€${item.price.toFixed(2)} x ${item.quantity}</span>
                    <span class="cart-item-total">€${itemTotal.toFixed(2)}</span>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="cart-item-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="cart-item-btn" onclick="updateQuantity(${index}, 1)">+</button>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Update total
    cartTotalElement.textContent = `€${cartTotal.toFixed(2)}`;
}

function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity += change;
    
    if (item.quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    showNotification('Artikel wurde aus dem Warenkorb entfernt.', 'info');
}

// Checkout functionality
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Ihr Warenkorb ist leer.', 'error');
        return;
    }
    
    // Simulate checkout process
    const checkoutBtn = document.querySelector('.checkout-btn');
    const originalText = checkoutBtn.textContent;
    checkoutBtn.textContent = 'Wird verarbeitet...';
    checkoutBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Bestellung erfolgreich! Sie erhalten eine Bestätigung per E-Mail.', 'success');
        cart = [];
        updateCart();
        cartSidebar.classList.remove('active');
        checkoutBtn.textContent = originalText;
        checkoutBtn.disabled = false;
    }, 2000);
});

// Category filtering
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all buttons
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const targetSection = btn.getAttribute('href').substring(1);
        
        // Smooth scroll to section
        document.getElementById(targetSection).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Product size selection
document.querySelectorAll('.size-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        // Remove active class from all sizes in the same product
        const productCard = tag.closest('.product-card');
        productCard.querySelectorAll('.size-tag').forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked size
        tag.classList.add('active');
    });
});

// Add hover effects to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
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

// Add cart item styles
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .cart-item-content h4 {
        margin: 0 0 0.5rem 0;
        color: var(--dark-color);
    }
    
    .cart-item-content p {
        margin: 0 0 0.5rem 0;
        color: #666;
        font-size: 0.9rem;
    }
    
    .cart-item-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
    }
    
    .cart-item-total {
        font-weight: 600;
        color: var(--primary-color);
    }
    
    .cart-item-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .cart-item-btn {
        width: 30px;
        height: 30px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
    }
    
    .cart-item-btn:hover {
        background: var(--light-color);
    }
    
    .cart-item-quantity {
        min-width: 30px;
        text-align: center;
        font-weight: 600;
    }
    
    .cart-item-remove {
        background: none;
        border: none;
        color: #f44336;
        cursor: pointer;
        padding: 0.5rem;
        transition: var(--transition);
    }
    
    .cart-item-remove:hover {
        color: #d32f2f;
    }
    
    .size-tag.active {
        background: var(--primary-color);
        color: white;
    }
`;
document.head.appendChild(cartStyles);

// Initialize cart
updateCart();

console.log('🎵 Bussi Baba Shop loaded successfully!');
