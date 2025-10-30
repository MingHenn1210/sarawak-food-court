// ========================================
// HAWKER FUNCTIONS
// ========================================

// Check hawker authentication
function checkHawkerAuth() {
    const session = localStorage.getItem('hawkerSession') || sessionStorage.getItem('hawkerSession');
    if (!session) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(session);
}

// Logout
function logoutHawker() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('hawkerSession');
        sessionStorage.removeItem('hawkerSession');
        window.location.href = 'login.html';
    }
}

// Load orders for hawker's stall
function getStallOrders(stallName) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.filter(order => 
        order.stallOrders.some(so => so.stallName === stallName)
    );
}

// Update order status for stall
function updateStallOrderStatus(orderId, stallName, newStatus) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.orderId === orderId);
    
    if (order) {
        if (!order.stallStatuses) {
            order.stallStatuses = {};
        }
        order.stallStatuses[stallName] = newStatus;
        
        // Update overall order status to slowest stall
        const statuses = ['pending', 'preparing', 'ready', 'completed'];
        const allStallStatuses = Object.values(order.stallStatuses);
        const minStatusIndex = Math.min(...allStallStatuses.map(s => statuses.indexOf(s)));
        order.status = statuses[minStatusIndex];
        
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Update current order if it's the active one
        const currentOrder = JSON.parse(localStorage.getItem('currentOrder') || 'null');
        if (currentOrder && currentOrder.orderId === orderId) {
            currentOrder.stallStatuses = order.stallStatuses;
            currentOrder.status = order.status;
            localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
        }
        
        return true;
    }
    return false;
}

// Get order statistics for hawker
function getStallStatistics(stallName) {
    const orders = getStallOrders(stallName);
    const today = new Date().toDateString();
    const todayOrders = orders.filter(o => 
        new Date(o.timestamp).toDateString() === today
    );
    
    const stats = {
        pending: 0,
        ready: 0,
        completed: 0,
        totalRevenue: 0
    };
    
    todayOrders.forEach(order => {
        const status = order.stallStatuses?.[stallName] || 'pending';
        stats[status]++;
        
        const stallOrder = order.stallOrders.find(so => so.stallName === stallName);
        if (stallOrder) {
            stats.totalRevenue += stallOrder.total;
        }
    });
    
    return stats;
}

// Export hawker session data
function getHawkerSession() {
    return checkHawkerAuth();
}
