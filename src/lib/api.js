import axiosInstance from './axios';
import {
  AUTH_ENDPOINTS,
  DASHBOARD_ENDPOINTS,
  ANALYTICS_ENDPOINTS,
  TRACKING_ENDPOINTS,
  NOTIFICATION_ENDPOINTS,
  USER_ENDPOINTS,
  SHOPKEEPER_ENDPOINTS,
  DELIVERY_BOY_ENDPOINTS,
  PRODUCT_ENDPOINTS,
  CATEGORY_ENDPOINTS,
  KYC_ENDPOINTS,
  COUPON_ENDPOINTS,
  ORDER_ENDPOINTS,
  PAYMENT_ENDPOINTS,
  WALLET_ENDPOINTS,
  WITHDRAW_ENDPOINTS,
  REPORT_ENDPOINTS,
  SETTINGS_ENDPOINTS,
  SUPPORT_ENDPOINTS,
} from './endpoints';

// ==================== AUTHENTICATION ====================
export const authAPI = {
  login: (credentials) => axiosInstance.post(AUTH_ENDPOINTS.LOGIN, credentials),
  logout: () => axiosInstance.post(AUTH_ENDPOINTS.LOGOUT),
  getProfile: () => axiosInstance.get(AUTH_ENDPOINTS.PROFILE),
  updateProfile: (data) => axiosInstance.patch(AUTH_ENDPOINTS.PROFILE, data),
  changePassword: (data) => axiosInstance.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, data),
};

// ==================== DASHBOARD ====================
export const dashboardAPI = {
  getStatistics: () => axiosInstance.get(DASHBOARD_ENDPOINTS.STATISTICS),
  getLiveOrders: () => axiosInstance.get(DASHBOARD_ENDPOINTS.LIVE_ORDERS),
  getRecentTransactions: () => axiosInstance.get(DASHBOARD_ENDPOINTS.RECENT_TRANSACTIONS),
  getLiveActivities: () => axiosInstance.get(DASHBOARD_ENDPOINTS.LIVE_ACTIVITIES),
  getTopProducts: () => axiosInstance.get(DASHBOARD_ENDPOINTS.TOP_PRODUCTS),
  getTopShopkeepers: () => axiosInstance.get(DASHBOARD_ENDPOINTS.TOP_SHOPKEEPERS),
  getActiveDeliveryBoys: () => axiosInstance.get(DASHBOARD_ENDPOINTS.ACTIVE_DELIVERY_BOYS),
};

// ==================== ANALYTICS ====================
export const analyticsAPI = {
  getRevenue: () => axiosInstance.get(ANALYTICS_ENDPOINTS.REVENUE),
  getOrders: () => axiosInstance.get(ANALYTICS_ENDPOINTS.ORDERS),
  getUsers: () => axiosInstance.get(ANALYTICS_ENDPOINTS.USERS),
  getHeatmap: () => axiosInstance.get(ANALYTICS_ENDPOINTS.HEATMAP),
  getPeakHours: () => axiosInstance.get(ANALYTICS_ENDPOINTS.PEAK_HOURS),
};

// ==================== TRACKING ====================
export const trackingAPI = {
  getLiveOrders: () => axiosInstance.get(TRACKING_ENDPOINTS.LIVE_ORDERS),
  getOrderTracking: (orderId) => axiosInstance.get(TRACKING_ENDPOINTS.ORDER_DETAIL(orderId)),
  getDeliveryBoys: () => axiosInstance.get(TRACKING_ENDPOINTS.DELIVERY_BOYS),
  getRoute: (orderId) => axiosInstance.get(TRACKING_ENDPOINTS.ROUTE(orderId)),
};

// ==================== NOTIFICATIONS ====================
export const notificationAPI = {
  send: (data) => axiosInstance.post(NOTIFICATION_ENDPOINTS.SEND, data),
  getLogs: () => axiosInstance.get(NOTIFICATION_ENDPOINTS.LOGS),
  sendPush: (data) => axiosInstance.post(NOTIFICATION_ENDPOINTS.PUSH, data),
  sendSMS: (data) => axiosInstance.post(NOTIFICATION_ENDPOINTS.SMS, data),
  sendEmail: (data) => axiosInstance.post(NOTIFICATION_ENDPOINTS.EMAIL, data),
};

// ==================== USERS ====================
export const userAPI = {
  getList: (params) => axiosInstance.get(USER_ENDPOINTS.LIST, { params }),
  getDetail: (userId) => axiosInstance.get(USER_ENDPOINTS.DETAIL(userId)),
  create: (data) => axiosInstance.post(USER_ENDPOINTS.CREATE, data),
  update: (userId, data) => axiosInstance.put(USER_ENDPOINTS.UPDATE(userId), data),
  delete: (userId) => axiosInstance.delete(USER_ENDPOINTS.DELETE(userId)),
  block: (userId) => axiosInstance.patch(USER_ENDPOINTS.BLOCK(userId)),
  unblock: (userId) => axiosInstance.patch(USER_ENDPOINTS.UNBLOCK(userId)),
};

// ==================== SHOPKEEPERS ====================
export const shopkeeperAPI = {
  getList: (params) => axiosInstance.get(SHOPKEEPER_ENDPOINTS.LIST, { params }),
  getDetail: (shopkeeperId) => axiosInstance.get(SHOPKEEPER_ENDPOINTS.DETAIL(shopkeeperId)),
  create: (data) => axiosInstance.post(SHOPKEEPER_ENDPOINTS.CREATE, data),
  update: (shopkeeperId, data) => axiosInstance.put(SHOPKEEPER_ENDPOINTS.UPDATE(shopkeeperId), data),
  delete: (shopkeeperId) => axiosInstance.delete(SHOPKEEPER_ENDPOINTS.DELETE(shopkeeperId)),
  approve: (shopkeeperId) => axiosInstance.patch(SHOPKEEPER_ENDPOINTS.APPROVE(shopkeeperId)),
  reject: (shopkeeperId, data) => axiosInstance.patch(SHOPKEEPER_ENDPOINTS.REJECT(shopkeeperId), data),
};

// ==================== DELIVERY BOYS ====================
export const deliveryBoyAPI = {
  getList: (params) => axiosInstance.get(DELIVERY_BOY_ENDPOINTS.LIST, { params }),
  getDetail: (deliveryBoyId) => axiosInstance.get(DELIVERY_BOY_ENDPOINTS.DETAIL(deliveryBoyId)),
  create: (data) => axiosInstance.post(DELIVERY_BOY_ENDPOINTS.CREATE, data),
  update: (deliveryBoyId, data) => axiosInstance.put(DELIVERY_BOY_ENDPOINTS.UPDATE(deliveryBoyId), data),
  delete: (deliveryBoyId) => axiosInstance.delete(DELIVERY_BOY_ENDPOINTS.DELETE(deliveryBoyId)),
  approve: (deliveryBoyId) => axiosInstance.patch(DELIVERY_BOY_ENDPOINTS.APPROVE(deliveryBoyId)),
  reject: (deliveryBoyId, data) => axiosInstance.patch(DELIVERY_BOY_ENDPOINTS.REJECT(deliveryBoyId), data),
  assign: (deliveryBoyId, data) => axiosInstance.post(DELIVERY_BOY_ENDPOINTS.ASSIGN(deliveryBoyId), data),
};

// ==================== PRODUCTS ====================
export const productAPI = {
  getList: (params) => axiosInstance.get(PRODUCT_ENDPOINTS.LIST, { params }),
  getTopProducts: () => axiosInstance.get(PRODUCT_ENDPOINTS.TOP_PRODUCTS),
  getDetail: (productId) => axiosInstance.get(PRODUCT_ENDPOINTS.DETAIL(productId)),
  create: (data) => axiosInstance.post(PRODUCT_ENDPOINTS.CREATE, data),
  update: (productId, data) => axiosInstance.put(PRODUCT_ENDPOINTS.UPDATE(productId), data),
  delete: (productId) => axiosInstance.delete(PRODUCT_ENDPOINTS.DELETE(productId)),
  bulkUpload: (data) => axiosInstance.post(PRODUCT_ENDPOINTS.BULK_UPLOAD, data),
};

// ==================== CATEGORIES ====================
export const categoryAPI = {
  getList: (params) => axiosInstance.get(CATEGORY_ENDPOINTS.LIST, { params }),
  getDetail: (categoryId) => axiosInstance.get(CATEGORY_ENDPOINTS.DETAIL(categoryId)),
  create: (data) => axiosInstance.post(CATEGORY_ENDPOINTS.CREATE, data),
  update: (categoryId, data) => axiosInstance.put(CATEGORY_ENDPOINTS.UPDATE(categoryId), data),
  delete: (categoryId) => axiosInstance.delete(CATEGORY_ENDPOINTS.DELETE(categoryId)),
};

// ==================== KYC ====================
export const kycAPI = {
  // Shopkeeper KYC
  getPendingShopkeepers: (params) => axiosInstance.get(KYC_ENDPOINTS.SHOPKEEPERS_PENDING, { params }),
  getAllShopkeepers: (params) => axiosInstance.get(KYC_ENDPOINTS.SHOPKEEPERS_ALL, { params }),
  getShopkeeperDetail: (kycId) => axiosInstance.get(KYC_ENDPOINTS.SHOPKEEPERS_DETAIL(kycId)),
  approveShopkeeper: (kycId) => axiosInstance.post(KYC_ENDPOINTS.SHOPKEEPERS_APPROVE(kycId)),
  rejectShopkeeper: (kycId, data) => axiosInstance.post(KYC_ENDPOINTS.SHOPKEEPERS_REJECT(kycId), data),
  // Delivery Boy KYC
  getPendingDeliveryBoys: (params) => axiosInstance.get(KYC_ENDPOINTS.DELIVERY_BOYS_PENDING, { params }),
  getAllDeliveryBoys: (params) => axiosInstance.get(KYC_ENDPOINTS.DELIVERY_BOYS_ALL, { params }),
  getDeliveryBoyDetail: (kycId) => axiosInstance.get(KYC_ENDPOINTS.DELIVERY_BOYS_DETAIL(kycId)),
  approveDeliveryBoy: (kycId) => axiosInstance.post(KYC_ENDPOINTS.DELIVERY_BOYS_APPROVE(kycId)),
  rejectDeliveryBoy: (kycId, data) => axiosInstance.post(KYC_ENDPOINTS.DELIVERY_BOYS_REJECT(kycId), data),
};

// ==================== COUPONS ====================
export const couponAPI = {
  getList: (params) => axiosInstance.get(COUPON_ENDPOINTS.LIST, { params }),
  getDetail: (couponId) => axiosInstance.get(COUPON_ENDPOINTS.DETAIL(couponId)),
  create: (data) => axiosInstance.post(COUPON_ENDPOINTS.CREATE, data),
  update: (couponId, data) => axiosInstance.put(COUPON_ENDPOINTS.UPDATE(couponId), data),
  delete: (couponId) => axiosInstance.delete(COUPON_ENDPOINTS.DELETE(couponId)),
  activate: (couponId) => axiosInstance.post(COUPON_ENDPOINTS.ACTIVATE(couponId)),
  deactivate: (couponId) => axiosInstance.post(COUPON_ENDPOINTS.DEACTIVATE(couponId)),
};

// ==================== ORDERS ====================
export const orderAPI = {
  getList: (params) => axiosInstance.get(ORDER_ENDPOINTS.LIST, { params }),
  getDetail: (orderId) => axiosInstance.get(ORDER_ENDPOINTS.DETAIL(orderId)),
  updateStatus: (orderId, data) => axiosInstance.put(ORDER_ENDPOINTS.UPDATE_STATUS(orderId), data),
  assignDelivery: (orderId, data) => axiosInstance.post(ORDER_ENDPOINTS.ASSIGN_DELIVERY(orderId), data),
  cancel: (orderId, data) => axiosInstance.post(ORDER_ENDPOINTS.CANCEL(orderId), data),
};

// ==================== PAYMENTS ====================
export const paymentAPI = {
  getList: (params) => axiosInstance.get(PAYMENT_ENDPOINTS.LIST, { params }),
  getDetail: (paymentId) => axiosInstance.get(PAYMENT_ENDPOINTS.DETAIL(paymentId)),
  refund: (paymentId, data) => axiosInstance.post(PAYMENT_ENDPOINTS.REFUND(paymentId), data),
  getTransactions: (params) => axiosInstance.get(PAYMENT_ENDPOINTS.TRANSACTIONS, { params }),
};

// ==================== WALLET ====================
export const walletAPI = {
  getList: (params) => axiosInstance.get(WALLET_ENDPOINTS.LIST, { params }),
  getDetail: (walletId) => axiosInstance.get(WALLET_ENDPOINTS.DETAIL(walletId)),
  credit: (walletId, data) => axiosInstance.post(WALLET_ENDPOINTS.CREDIT(walletId), data),
  debit: (walletId, data) => axiosInstance.post(WALLET_ENDPOINTS.DEBIT(walletId), data),
  getTransactions: (walletId, params) => axiosInstance.get(WALLET_ENDPOINTS.TRANSACTIONS(walletId), { params }),
};

// ==================== WITHDRAW ====================
export const withdrawAPI = {
  getList: (params) => axiosInstance.get(WITHDRAW_ENDPOINTS.LIST, { params }),
  getDetail: (requestId) => axiosInstance.get(WITHDRAW_ENDPOINTS.DETAIL(requestId)),
  approve: (requestId, data) => axiosInstance.post(WITHDRAW_ENDPOINTS.APPROVE(requestId), data),
  reject: (requestId, data) => axiosInstance.post(WITHDRAW_ENDPOINTS.REJECT(requestId), data),
};

// ==================== REPORTS ====================
export const reportAPI = {
  getSales: (params) => axiosInstance.get(REPORT_ENDPOINTS.SALES, { params }),
  getRevenue: (params) => axiosInstance.get(REPORT_ENDPOINTS.REVENUE, { params }),
  getOrders: (params) => axiosInstance.get(REPORT_ENDPOINTS.ORDERS, { params }),
  getUsers: (params) => axiosInstance.get(REPORT_ENDPOINTS.USERS, { params }),
  export: (params) => axiosInstance.get(REPORT_ENDPOINTS.EXPORT, { params }),
};

// ==================== SETTINGS ====================
export const settingsAPI = {
  get: () => axiosInstance.get(SETTINGS_ENDPOINTS.GET),
  update: (data) => axiosInstance.put(SETTINGS_ENDPOINTS.UPDATE, data),
  getGeneral: () => axiosInstance.get(SETTINGS_ENDPOINTS.GENERAL),
  updatePayment: (data) => axiosInstance.put(SETTINGS_ENDPOINTS.PAYMENT, data),
  updateNotification: (data) => axiosInstance.put(SETTINGS_ENDPOINTS.NOTIFICATION, data),
};

// ==================== SUPPORT ====================
export const supportAPI = {
  getList: (params) => axiosInstance.get(SUPPORT_ENDPOINTS.TICKETS, { params }),
  getTickets: (params) => axiosInstance.get(SUPPORT_ENDPOINTS.TICKETS, { params }),
  getTicketDetail: (ticketId) => axiosInstance.get(SUPPORT_ENDPOINTS.TICKET_DETAIL(ticketId)),
  create: (data) => axiosInstance.post(SUPPORT_ENDPOINTS.TICKETS, data),
  reply: (ticketId, data) => axiosInstance.post(SUPPORT_ENDPOINTS.REPLY(ticketId), data),
  close: (ticketId) => axiosInstance.post(SUPPORT_ENDPOINTS.CLOSE(ticketId)),
};
