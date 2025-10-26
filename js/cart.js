// ========================================
// CART MANAGEMENT
// ========================================

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatchCartUpdate();
}

// Add item to cart
function addToCart(item) {
    const cart = getCart();
    
    // Check if item already exists
    const existingIndex = cart.findIndex(cartItem => 
        cartItem.id === item.id && 
        cartItem.specialInstructions === item.specialInstructions
    );
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }
    
    saveCart(cart);
    return cart;
}

// Update cart item
function updateCartItem(index, updates) {
    const cart = getCart();
    if (cart[index]) {
        cart[index] = { ...cart[index], ...updates };
        saveCart(cart);
    }
    return cart;
}

// Remove item from cart
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    return cart;
}

// Clear cart
function clearCart() {
    localStorage.setItem('cart', '[]');
    dispatchCartUpdate();
}

// Get cart totals
function getCartTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceCharge = subtotal * 0.06;
    const total = subtotal + serviceCharge;
    
    return {
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        serviceCharge,
        total
    };
}

// Group cart by stall
function groupCartByStall() {
    const cart = getCart();
    return cart.reduce((acc, item) => {
        const stallName = item.stallName || 'Unknown Stall';
        if (!acc[stallName]) {
            acc[stallName] = [];
        }
        acc[stallName].push(item);
        return acc;
    }, {});
}

// Dispatch cart update event
function dispatchCartUpdate() {
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}

// Listen for cart updates
window.addEventListener('cartUpdated', () => {
    console.log('Cart updated');
    // Update cart badge if it exists
    const cartBadges = document.querySelectorAll('.cart-badge, .nav-badge');
    const count = getCartTotals().itemCount;
    cartBadges.forEach(badge => {
        badge.textContent = count;
        if (count > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
});
