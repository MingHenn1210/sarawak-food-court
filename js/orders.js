// ========================================
// ORDER MANAGEMENT
// ========================================

// Create new order
function createOrder(cart, tableNumber) {
    const orderId = 'ORD' + Date.now();
    const timestamp = new Date().toISOString();
    
    // Group items by stall
    const stallOrders = {};
    cart.forEach(item => {
        const stallName = item.stallName || 'Unknown Stall';
        if (!stallOrders[stallName]) {
            stallOrders[stallName] = {
                stallId: item.stallId,
                stallName: stallName,
                items: [],
                total: 0
            };
        }
        stallOrders[stallName].items.push(item);
        stallOrders[stallName].total += item.price * item.quantity;
    });
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceCharge = subtotal * 0.06;
    
    const order = {
        orderId,
        tableNumber,
        items: cart,
        stallOrders: Object.values(stallOrders),
        subtotal,
        serviceCharge,
        total: subtotal + serviceCharge,
        status: 'pending',
        stallStatuses: {},
        timestamp
    };
    
    // Initialize stall statuses
    Object.keys(stallOrders).forEach(stallName => {
        order.stallStatuses[stallName] = 'pending';
    });
    
    // Save order
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('currentOrder', JSON.stringify(order));
    
    return order;
}

// Get order by ID
function getOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.find(o => o.orderId === orderId);
}

// Get all orders
function getAllOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
}

// Get current order
function getCurrentOrder() {
    return JSON.parse(localStorage.getItem('currentOrder') || 'null');
}

// Update order status
function updateOrderStatus(orderId, status) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.orderId === orderId);
    
    if (order) {
        order.status = status;
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Update current order if it matches
        const currentOrder = getCurrentOrder();
        if (currentOrder && currentOrder.orderId === orderId) {
            currentOrder.status = status;
            localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
        }
        
        return true;
    }
    return false;
}

// Get orders by table
function getOrdersByTable(tableNumber) {
    const orders = getAllOrders();
    return orders.filter(o => o.tableNumber === tableNumber);
}

// Get today's orders
function getTodaysOrders() {
    const orders = getAllOrders();
    const today = new Date().toDateString();
    return orders.filter(o => new Date(o.timestamp).toDateString() === today);
}

// Get order status color
function getStatusColor(status) {
    const colors = {
        pending: '#F57C00',
        preparing: '#1976D2',
        ready: '#388E3C',
        completed: '#7B1FA2'
    };
    return colors[status] || '#757575';
}

// Format order status
function formatOrderStatus(status) {
    const labels = {
        pending: 'Pending',
        preparing: 'Preparing',
        ready: 'Ready for Pickup',
        completed: 'Completed'
    };
    return labels[status] || status;
}
