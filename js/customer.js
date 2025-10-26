// ========================================
// CUSTOMER FUNCTIONS
// ========================================

// Load and display food stalls
async function loadStalls() {
    try {
        const response = await fetch('../data/stalls.json');
        if (!response.ok) throw new Error('Failed to load stalls');
        return await response.json();
    } catch (error) {
        console.error('Error loading stalls:', error);
        return [];
    }
}

// Load menu items for a stall
async function loadMenuForStall(stallId) {
    try {
        const response = await fetch('../data/menus.json');
        if (!response.ok) throw new Error('Failed to load menu');
        const allMenus = await response.json();
        return allMenus.filter(item => item.stallId === stallId);
    } catch (error) {
        console.error('Error loading menu:', error);
        return [];
    }
}

// Filter stalls by category
function filterStalls(stalls, category) {
    if (category === 'all') return stalls;
    return stalls.filter(stall => stall.category.toLowerCase() === category.toLowerCase());
}

// Search stalls
function searchStalls(stalls, searchTerm) {
    if (!searchTerm) return stalls;
    const term = searchTerm.toLowerCase();
    return stalls.filter(stall => 
        stall.name.toLowerCase().includes(term) ||
        stall.description.toLowerCase().includes(term) ||
        stall.category.toLowerCase().includes(term)
    );
}

// Update cart count display
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const badges = document.querySelectorAll('.cart-badge, .nav-badge, #cartCount, #cartCountNav');
    badges.forEach(badge => {
        if (badge) {
            badge.textContent = count;
            if (count > 0) {
                badge.style.display = 'flex';
            }
        }
    });
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            console.log('Notification permission:', permission);
        });
    }
}

// Show browser notification
function showNotification(title, options = {}) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            icon: '../assets/images/logo.png',
            badge: '../assets/images/logo.png',
            ...options
        });
    }
}

// Initialize customer features
document.addEventListener('DOMContentLoaded', () => {
    // Request notification permission on first load
    if (window.location.pathname.includes('customer')) {
        requestNotificationPermission();
    }
});
