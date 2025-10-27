// ========================================
// REAL-TIME NOTIFICATIONS
// ========================================

class NotificationManager {
    constructor() {
        this.soundEnabled = true;
        this.notificationSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTA=');
    }

    // Request permission for browser notifications
    async requestPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }
        return Notification.permission === 'granted';
    }

    // Show notification
    show(title, options = {}) {
        // Browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification(title, {
                icon: '../assets/images/logo.png',
                badge: '../assets/images/logo.png',
                vibrate: [200, 100, 200],
                ...options
            });

            notification.onclick = () => {
                window.focus();
                notification.close();
            };
        }

        // Toast notification
        this.showToast(title, options.body);

        // Play sound
        if (this.soundEnabled) {
            this.playSound();
        }

        // Vibrate if supported
        if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
        }
    }

    // Show toast notification
    showToast(title, message) {
        const toast = document.createElement('div');
        toast.className = 'toast notification';
        toast.innerHTML = `
            <i class="fas fa-bell"></i>
            <div>
                <strong>${title}</strong>
                ${message ? `<p>${message}</p>` : ''}
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    // Play notification sound
    playSound() {
        try {
            this.notificationSound.play().catch(e => console.log('Could not play sound:', e));
        } catch (e) {
            console.log('Sound playback failed:', e);
        }
    }

    // Toggle sound
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }
}

// Create global notification manager
const notificationManager = new NotificationManager();

// Order status notifications
function notifyOrderStatusChange(orderId, oldStatus, newStatus) {
    const statusMessages = {
        pending: 'Your order has been received',
        preparing: 'Your order is being prepared',
        ready: 'Your order is ready for pickup!',
        completed: 'Order completed. Enjoy your meal!'
    };

    notificationManager.show(
        `Order ${orderId}`,
        {
            body: statusMessages[newStatus],
            tag: orderId,
            requireInteraction: newStatus === 'ready'
        }
    );
}

// Hawker new order notification
function notifyNewOrder(orderId, tableNumber) {
    notificationManager.show(
        'New Order!',
        {
            body: `New order ${orderId} from Table ${tableNumber}`,
            tag: 'new-order',
            requireInteraction: true
        }
    );
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NotificationManager, notificationManager };
}
