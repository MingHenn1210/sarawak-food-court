// ========================================
// REAL-TIME NOTIFICATION SYSTEM
// ========================================

class NotificationManager {
    constructor() {
        this.container = null;
        this.notificationQueue = [];
        this.maxNotifications = 3;
        this.soundEnabled = true;
        this.serviceWorkerRegistration = null;
        this.init();
    }

    async init() {
        // Create notification container
        this.container = document.createElement('div');
        this.container.className = 'notification-bar';
        document.body.appendChild(this.container);

        // Register Service Worker for persistent notifications
        await this.registerServiceWorker();

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                this.serviceWorkerRegistration = await navigator.serviceWorker.register('/service-worker.js');
                console.log('✅ Service Worker registered for persistent notifications');

                // Update service worker when new version available
                this.serviceWorkerRegistration.addEventListener('updatefound', () => {
                    const newWorker = this.serviceWorkerRegistration.installing;
                    console.log('🔄 New Service Worker available');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available, reload to update
                            if (confirm('New version available! Reload to update?')) {
                                window.location.reload();
                            }
                        }
                    });
                });
            } catch (error) {
                console.warn('⚠️ Service Worker registration failed:', error);
            }
        }
    }

    // Show notification with enhanced UI
    show(options) {
        const {
            status,
            title,
            message,
            duration = 5000,
            sound = true
        } = options;

        // Create notification element
        const notification = this.createNotificationElement(status, title, message);
        
        // Add to DOM
        this.container.appendChild(notification);

        // Show animation
        setTimeout(() => notification.classList.add('show'), 10);

        // Play sound
        if (sound && this.soundEnabled) {
            this.playNotificationSound(status);
        }

        // Show browser notification (if permission granted)
        this.showBrowserNotification(title, message);

        // Auto dismiss
        setTimeout(() => this.dismiss(notification), duration);

        // Manage queue
        this.notificationQueue.push(notification);
        if (this.notificationQueue.length > this.maxNotifications) {
            const oldNotification = this.notificationQueue.shift();
            this.dismiss(oldNotification);
        }

        return notification;
    }

    createNotificationElement(status, title, message) {
        const notification = document.createElement('div');
        notification.className = 'notification-card';
        
        const icon = this.getStatusIcon(status);
        const time = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        notification.innerHTML = `
            <div class="notification-icon ${status}">
                ${icon}
            </div>
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
                <div class="notification-time">${time}</div>
            </div>
            <button class="notification-close" aria-label="Close notification">
                ✕
            </button>
        `;

        // Close button handler
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.dismiss(notification);
        });

        return notification;
    }

    getStatusIcon(status) {
        const icons = {
            'pending': '🕐',
            'preparing': '👨‍🍳',
            'ready': '✅',
            'completed': '🎉',
            'cancelled': '❌'
        };
        return icons[status] || '🔔';
    }

    dismiss(notification) {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            const index = this.notificationQueue.indexOf(notification);
            if (index > -1) {
                this.notificationQueue.splice(index, 1);
            }
        }, 400);
    }

    playNotificationSound(status) {
        // Create audio context for notification sounds
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Different frequencies for different statuses
            const frequencies = {
                'pending': 440,
                'preparing': 523,
                'ready': 659,
                'completed': 784
            };

            oscillator.frequency.value = frequencies[status] || 440;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Could not play notification sound:', e);
        }
    }

    async showBrowserNotification(title, message, orderId = null) {
        if ('Notification' in window && Notification.permission === 'granted') {
            // Use Service Worker for persistent notifications (works even when tab closed)
            if (this.serviceWorkerRegistration && this.serviceWorkerRegistration.active) {
                try {
                    await this.serviceWorkerRegistration.showNotification(title, {
                        body: message,
                        icon: './assets/logo.png',
                        badge: './assets/logo.png',
                        tag: 'order-update',
                        requireInteraction: false,
                        vibrate: [200, 100, 200],
                        data: { orderId },
                        actions: [
                            {
                                action: 'view',
                                title: 'View Order'
                            },
                            {
                                action: 'dismiss',
                                title: 'Dismiss'
                            }
                        ]
                    });
                    console.log('📬 Persistent notification sent via Service Worker');
                    return;
                } catch (error) {
                    console.warn('⚠️ Service Worker notification failed:', error);
                }
            }

            // Fallback to regular notification (only works when tab open)
            const notification = new Notification(title, {
                body: message,
                icon: './assets/logo.png',
                badge: './assets/logo.png',
                tag: 'order-update',
                requireInteraction: false
            });

            // Auto close after 5 seconds
            setTimeout(() => notification.close(), 5000);
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }
}

// ========================================
// PROGRESS TRACKER
// ========================================

class ProgressTracker {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.steps = ['pending', 'completed'];
        this.currentStep = 'pending';
    }

    render() {
        if (!this.container) return;

        const stepLabels = {
            'pending': 'Order Placed',
            'completed': 'Order Completed'
        };

        const stepIcons = {
            'pending': '📝',
            'completed': '🎉'
        };

        this.container.innerHTML = `
            <div class="progress-tracker">
                <div class="progress-tracker-title">
                    <span>🔔</span>
                    <span>Order Progress</span>
                    <span class="live-status-badge">
                        <span class="live-pulse"></span>
                        <span>Live Updates</span>
                    </span>
                </div>
                <div class="progress-steps">
                    <div class="progress-line">
                        <div class="progress-line-fill" style="width: ${this.getProgressWidth()}%"></div>
                    </div>
                    ${this.steps.map(step => `
                        <div class="progress-step ${this.getStepClass(step)}" data-step="${step}">
                            <div class="progress-step-circle">${stepIcons[step]}</div>
                            <div class="progress-step-label">${stepLabels[step]}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getStepClass(step) {
        const currentIndex = this.steps.indexOf(this.currentStep);
        const stepIndex = this.steps.indexOf(step);

        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'active';
        return '';
    }

    getProgressWidth() {
        const currentIndex = this.steps.indexOf(this.currentStep);
        return (currentIndex / (this.steps.length - 1)) * 100;
    }

    updateStatus(newStatus) {
        if (this.currentStep === newStatus) return;
        
        this.currentStep = newStatus;
        this.render();

        // Trigger notification
        if (window.notificationManager) {
            const messages = {
                'pending': {
                    title: 'Order Confirmed! 🎉',
                    message: 'Your order has been placed successfully'
                },
                'completed': {
                    title: 'Order Completed! 🎉',
                    message: 'Thank you for your order. Enjoy your meal!'
                }
            };

            const notifData = messages[newStatus];
            if (notifData) {
                window.notificationManager.show({
                    status: newStatus,
                    title: notifData.title,
                    message: notifData.message
                });
            }
        }
    }
}

// ========================================
// REAL-TIME ORDER SUBSCRIPTION
// ========================================

class OrderSubscription {
    constructor(orderId, supabase) {
        this.orderId = orderId;
        this.supabase = supabase;
        this.subscription = null;
        this.onUpdate = null;
    }

    async subscribe(callback) {
        this.onUpdate = callback;

        console.log('📡 Setting up real-time subscription for order:', this.orderId);

        // Subscribe to order changes
        this.subscription = this.supabase
            .channel(`order-${this.orderId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `order_id=eq.${this.orderId}`
                },
                (payload) => {
                    console.log('📡 Order update received:', payload);
                    if (this.onUpdate) {
                        this.onUpdate(payload.new);
                    }
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('✅ Subscribed to real-time updates for order:', this.orderId);
                } else {
                    console.log('📡 Subscription status:', status);
                }
            });

        // Also subscribe to order_items changes for more granular updates
        this.supabase
            .channel(`order-items-${this.orderId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'order_items',
                    filter: `order_id=eq.${this.orderId}`
                },
                (payload) => {
                    console.log('📡 Order item update received:', payload);
                    if (this.onUpdate) {
                        this.onUpdate({ status: payload.new.status });
                    }
                }
            )
            .subscribe();
    }

    unsubscribe() {
        if (this.subscription) {
            this.supabase.removeChannel(this.subscription);
            console.log('🔌 Unsubscribed from order updates');
        }
    }
}

// ========================================
// LEGACY FUNCTIONS (for compatibility)
// ========================================

// Order status notifications (legacy)
function notifyOrderStatusChange(orderId, oldStatus, newStatus) {
    const statusMessages = {
        pending: 'Your order has been received',
        completed: 'Order completed. Enjoy your meal!'
    };

    if (window.notificationManager) {
        window.notificationManager.show({
            status: newStatus,
            title: `Order ${orderId}`,
            message: statusMessages[newStatus]
        });
    }
}

// Hawker new order notification (legacy)
function notifyNewOrder(orderId, tableNumber) {
    if (window.notificationManager) {
        window.notificationManager.show({
            status: 'pending',
            title: 'New Order! 🔔',
            message: `New order ${orderId} from Table ${tableNumber}`
        });
    }
}

// Initialize global notification manager
window.notificationManager = new NotificationManager();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        NotificationManager, 
        ProgressTracker, 
        OrderSubscription,
        notificationManager: window.notificationManager 
    };
}
