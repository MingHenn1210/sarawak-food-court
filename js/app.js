// ========================================
// SARAWAK FOOD COURT - MAIN APP JS
// Common utilities and functions
// ========================================

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('🍜 Sarawak Food Court System Initialized');
});

// Utility Functions
const utils = {
    // Format currency
    formatPrice: (amount) => {
        return `RM ${parseFloat(amount).toFixed(2)}`;
    },
    
    // Format date/time
    formatDateTime: (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-MY');
    },
    
    // Format time ago
    timeAgo: (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diff = now - past;
        
        const minutes = Math.floor(diff / 60000);
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    },
    
    // Generate order ID
    generateOrderId: () => {
        return 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    },
    
    // Get table number
    getTableNumber: () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('table') || localStorage.getItem('tableNumber') || '1';
    },
    
    // Show toast notification
    showToast: (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'check-circle' : 
                     type === 'error' ? 'exclamation-circle' : 
                     'info-circle';
        
        toast.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Local storage helpers
    storage: {
        get: (key, defaultValue = null) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('Error reading from localStorage:', e);
                return defaultValue;
            }
        },
        
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Error writing to localStorage:', e);
                return false;
            }
        },
        
        remove: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Error removing from localStorage:', e);
                return false;
            }
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
}
