// API Endpoints Configuration

// ==================== AUTHENTICATION ====================
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/admin/login',
  LOGOUT: '/api/admin/logout',
  PROFILE: '/api/admin/profile',
  CHANGE_PASSWORD: '/api/admin/change-password',
};

// ==================== DASHBOARD ====================
export const DASHBOARD_ENDPOINTS = {
  STATISTICS: '/api/admin/dashboard',
  LIVE_ORDERS: '/api/admin/live-orders',
  RECENT_TRANSACTIONS: '/api/admin/recent-transactions',
  LIVE_ACTIVITIES: '/api/admin/live-activities',
  TOP_PRODUCTS: '/api/admin/top-products',
  TOP_SHOPKEEPERS: '/api/admin/top-shopkeepers',
  ACTIVE_DELIVERY_BOYS: '/api/admin/active-delivery-boys',
};

// ==================== ANALYTICS ====================
export const ANALYTICS_ENDPOINTS = {
  REVENUE: '/api/admin/analytics/revenue',
  ORDERS: '/api/admin/analytics/orders',
  USERS: '/api/admin/analytics/users',
  HEATMAP: '/api/admin/analytics/heatmap',
  PEAK_HOURS: '/api/admin/analytics/peak-hours',
};

// ==================== TRACKING ====================
export const TRACKING_ENDPOINTS = {
  LIVE_ORDERS: '/api/admin/tracking/live-orders',
  ORDER_DETAIL: (orderId) => `/api/admin/tracking/order/${orderId}`,
  DELIVERY_BOYS: '/api/admin/tracking/delivery-boys',
  ROUTE: (orderId) => `/api/admin/tracking/route/${orderId}`,
};

// ==================== NOTIFICATIONS ====================
export const NOTIFICATION_ENDPOINTS = {
  SEND: '/api/admin/notifications/send',
  LOGS: '/api/admin/notifications/logs',
  PUSH: '/api/admin/notifications/push',
  SMS: '/api/admin/sms/send',
  EMAIL: '/api/admin/email/send',
};

// ==================== USERS ====================
export const USER_ENDPOINTS = {
  LIST: '/api/admin/users',
  DETAIL: (userId) => `/api/admin/users/${userId}`,
  CREATE: '/api/admin/users',
  UPDATE: (userId) => `/api/admin/users/${userId}`,
  DELETE: (userId) => `/api/admin/users/${userId}`,
  BLOCK: (userId) => `/api/admin/users/${userId}/block`,
  UNBLOCK: (userId) => `/api/admin/users/${userId}/unblock`,
};

// ==================== SHOPKEEPERS ====================
export const SHOPKEEPER_ENDPOINTS = {
  LIST: '/api/admin/shopkeepers',
  DETAIL: (shopkeeperId) => `/api/admin/shopkeepers/${shopkeeperId}`,
  CREATE: '/api/admin/shopkeepers',
  UPDATE: (shopkeeperId) => `/api/admin/shopkeepers/${shopkeeperId}`,
  DELETE: (shopkeeperId) => `/api/admin/shopkeepers/${shopkeeperId}`,
  APPROVE: (shopkeeperId) => `/api/admin/shopkeepers/${shopkeeperId}/approve`,
  REJECT: (shopkeeperId) => `/api/admin/shopkeepers/${shopkeeperId}/reject`,
};

// ==================== DELIVERY BOYS ====================
export const DELIVERY_BOY_ENDPOINTS = {
  LIST: '/api/admin/delivery-boys',
  DETAIL: (deliveryBoyId) => `/api/admin/delivery-boys/${deliveryBoyId}`,
  CREATE: '/api/admin/delivery-boys',
  UPDATE: (deliveryBoyId) => `/api/admin/delivery-boys/${deliveryBoyId}`,
  DELETE: (deliveryBoyId) => `/api/admin/delivery-boys/${deliveryBoyId}`,
  APPROVE: (deliveryBoyId) => `/api/admin/delivery-boys/${deliveryBoyId}/approve`,
  REJECT: (deliveryBoyId) => `/api/admin/delivery-boys/${deliveryBoyId}/reject`,
  ASSIGN: (deliveryBoyId) => `/api/admin/delivery-boys/${deliveryBoyId}/assign`,
};

// ==================== PRODUCTS ====================
export const PRODUCT_ENDPOINTS = {
  LIST: '/api/admin/products',
  TOP_PRODUCTS: '/api/admin/top-products',
  DETAIL: (productId) => `/api/admin/products/${productId}`,
  CREATE: '/api/admin/products',
  UPDATE: (productId) => `/api/admin/products/${productId}`,
  DELETE: (productId) => `/api/admin/products/${productId}`,
  BULK_UPLOAD: '/api/admin/products/bulk-upload',
};

// ==================== CATEGORIES ====================
export const CATEGORY_ENDPOINTS = {
  LIST: '/api/admin/categories',
  DETAIL: (categoryId) => `/api/admin/categories/${categoryId}`,
  CREATE: '/api/admin/categories',
  UPDATE: (categoryId) => `/api/admin/categories/${categoryId}`,
  DELETE: (categoryId) => `/api/admin/categories/${categoryId}`,
};

// ==================== COUPONS ====================
export const COUPON_ENDPOINTS = {
  LIST: '/api/admin/coupons',
  DETAIL: (couponId) => `/api/admin/coupons/${couponId}`,
  CREATE: '/api/admin/coupons',
  UPDATE: (couponId) => `/api/admin/coupons/${couponId}`,
  DELETE: (couponId) => `/api/admin/coupons/${couponId}`,
  ACTIVATE: (couponId) => `/api/admin/coupons/${couponId}/activate`,
  DEACTIVATE: (couponId) => `/api/admin/coupons/${couponId}/deactivate`,
};

// ==================== ORDERS ====================
export const ORDER_ENDPOINTS = {
  LIST: '/api/admin/orders',
  DETAIL: (orderId) => `/api/admin/orders/${orderId}`,
  UPDATE_STATUS: (orderId) => `/api/admin/orders/${orderId}/status`,
  ASSIGN_DELIVERY: (orderId) => `/api/admin/orders/${orderId}/assign-delivery`,
  CANCEL: (orderId) => `/api/admin/orders/${orderId}/cancel`,
};

// ==================== PAYMENTS ====================
export const PAYMENT_ENDPOINTS = {
  LIST: '/api/admin/payments',
  DETAIL: (paymentId) => `/api/admin/payments/${paymentId}`,
  REFUND: (paymentId) => `/api/admin/payments/${paymentId}/refund`,
  TRANSACTIONS: '/api/admin/payments/transactions',
};

// ==================== WALLET ====================
export const WALLET_ENDPOINTS = {
  LIST: '/api/admin/wallets',
  DETAIL: (walletId) => `/api/admin/wallets/${walletId}`,
  CREDIT: (walletId) => `/api/admin/wallets/${walletId}/credit`,
  DEBIT: (walletId) => `/api/admin/wallets/${walletId}/debit`,
  TRANSACTIONS: (walletId) => `/api/admin/wallets/${walletId}/transactions`,
};

// ==================== WITHDRAW ====================
export const WITHDRAW_ENDPOINTS = {
  LIST: '/api/admin/withdraw-requests',
  DETAIL: (requestId) => `/api/admin/withdraw-requests/${requestId}`,
  APPROVE: (requestId) => `/api/admin/withdraw-requests/${requestId}/approve`,
  REJECT: (requestId) => `/api/admin/withdraw-requests/${requestId}/reject`,
};

// ==================== KYC ====================
export const KYC_ENDPOINTS = {
  // Shopkeeper KYC
  SHOPKEEPERS_PENDING: '/api/admin/kyc/shopkeeper/pending',
  SHOPKEEPERS_ALL: '/api/admin/kyc/shopkeeper/all',
  SHOPKEEPERS_DETAIL: (kycId) => `/api/admin/kyc/shopkeeper/${kycId}`,
  SHOPKEEPERS_APPROVE: (kycId) => `/api/admin/kyc/shopkeeper/${kycId}/approve`,
  SHOPKEEPERS_REJECT: (kycId) => `/api/admin/kyc/shopkeeper/${kycId}/reject`,
  // Delivery Boy KYC
  DELIVERY_BOYS_PENDING: '/api/admin/kyc/delivery-boy/pending',
  DELIVERY_BOYS_ALL: '/api/admin/kyc/delivery-boy/all',
  DELIVERY_BOYS_DETAIL: (kycId) => `/api/admin/kyc/delivery-boy/${kycId}`,
  DELIVERY_BOYS_APPROVE: (kycId) => `/api/admin/kyc/delivery-boy/${kycId}/approve`,
  DELIVERY_BOYS_REJECT: (kycId) => `/api/admin/kyc/delivery-boy/${kycId}/reject`,
};

// ==================== REPORTS ====================
export const REPORT_ENDPOINTS = {
  SALES: '/api/admin/reports/sales',
  REVENUE: '/api/admin/reports/revenue',
  ORDERS: '/api/admin/reports/orders',
  USERS: '/api/admin/reports/users',
  EXPORT: '/api/admin/reports/export',
};

// ==================== SETTINGS ====================
export const SETTINGS_ENDPOINTS = {
  GET: '/api/admin/settings',
  UPDATE: '/api/admin/settings',
  GENERAL: '/api/admin/settings/general',
  PAYMENT: '/api/admin/settings/payment',
  NOTIFICATION: '/api/admin/settings/notification',
};

// ==================== SUPPORT ====================
export const SUPPORT_ENDPOINTS = {
  TICKETS: '/api/admin/support/tickets',
  TICKET_DETAIL: (ticketId) => `/api/admin/support/tickets/${ticketId}`,
  REPLY: (ticketId) => `/api/admin/support/tickets/${ticketId}/reply`,
  CLOSE: (ticketId) => `/api/admin/support/tickets/${ticketId}/close`,
};
