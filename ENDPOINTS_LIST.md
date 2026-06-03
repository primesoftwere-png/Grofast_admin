# Complete API Endpoints List

## Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| POST | `/api/auth/refresh` | Refresh token |
| GET | `/api/auth/verify` | Verify token |

## Dashboard Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Main statistics |
| GET | `/api/admin/live-orders` | Live orders |
| GET | `/api/admin/recent-transactions` | Recent transactions |
| GET | `/api/admin/live-activities` | Activity feed |
| GET | `/api/admin/top-products` | Top products |
| GET | `/api/admin/top-shopkeepers` | Top shopkeepers |
| GET | `/api/admin/active-delivery-boys` | Active delivery boys |

## Analytics Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/analytics/revenue` | Revenue analytics |
| GET | `/api/admin/analytics/orders` | Order analytics |
| GET | `/api/admin/analytics/users` | User growth |
| GET | `/api/admin/analytics/heatmap` | Order heatmap |
| GET | `/api/admin/analytics/peak-hours` | Peak timing |

## Tracking Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/tracking/live-orders` | Live order tracking |
| GET | `/api/admin/tracking/order/:orderId` | Specific order tracking |
| GET | `/api/admin/tracking/delivery-boys` | All delivery boy locations |
| GET | `/api/admin/tracking/route/:orderId` | Route information |

## Notification Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/notifications/send` | Send notifications |
| GET | `/api/admin/notifications/logs` | Notification logs |
| POST | `/api/admin/notifications/push` | Push notifications |
| POST | `/api/admin/sms/send` | Send SMS |
| POST | `/api/admin/email/send` | Send email |

## User Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/users/:userId` | Get user details |
| POST | `/api/admin/users` | Create new user |
| PUT | `/api/admin/users/:userId` | Update user |
| DELETE | `/api/admin/users/:userId` | Delete user |
| POST | `/api/admin/users/:userId/block` | Block user |
| POST | `/api/admin/users/:userId/unblock` | Unblock user |

## Shopkeeper Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/shopkeepers` | Get all shopkeepers |
| GET | `/api/admin/shopkeepers/:shopkeeperId` | Get shopkeeper details |
| POST | `/api/admin/shopkeepers` | Create new shopkeeper |
| PUT | `/api/admin/shopkeepers/:shopkeeperId` | Update shopkeeper |
| DELETE | `/api/admin/shopkeepers/:shopkeeperId` | Delete shopkeeper |
| POST | `/api/admin/shopkeepers/:shopkeeperId/approve` | Approve shopkeeper |
| POST | `/api/admin/shopkeepers/:shopkeeperId/reject` | Reject shopkeeper |

## Delivery Boy Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/delivery-boys` | Get all delivery boys |
| GET | `/api/admin/delivery-boys/:deliveryBoyId` | Get delivery boy details |
| POST | `/api/admin/delivery-boys` | Create new delivery boy |
| PUT | `/api/admin/delivery-boys/:deliveryBoyId` | Update delivery boy |
| DELETE | `/api/admin/delivery-boys/:deliveryBoyId` | Delete delivery boy |
| POST | `/api/admin/delivery-boys/:deliveryBoyId/approve` | Approve delivery boy |
| POST | `/api/admin/delivery-boys/:deliveryBoyId/reject` | Reject delivery boy |
| POST | `/api/admin/delivery-boys/:deliveryBoyId/assign` | Assign delivery boy to order |

## Product Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/products` | Get all products |
| GET | `/api/admin/products/:productId` | Get product details |
| POST | `/api/admin/products` | Create new product |
| PUT | `/api/admin/products/:productId` | Update product |
| DELETE | `/api/admin/products/:productId` | Delete product |
| POST | `/api/admin/products/bulk-upload` | Bulk upload products |

## Category Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/categories` | Get all categories |
| GET | `/api/admin/categories/:categoryId` | Get category details |
| POST | `/api/admin/categories` | Create new category |
| PUT | `/api/admin/categories/:categoryId` | Update category |
| DELETE | `/api/admin/categories/:categoryId` | Delete category |

## Coupon Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/coupons` | Get all coupons |
| GET | `/api/admin/coupons/:couponId` | Get coupon details |
| POST | `/api/admin/coupons` | Create new coupon |
| PUT | `/api/admin/coupons/:couponId` | Update coupon |
| DELETE | `/api/admin/coupons/:couponId` | Delete coupon |
| POST | `/api/admin/coupons/:couponId/activate` | Activate coupon |
| POST | `/api/admin/coupons/:couponId/deactivate` | Deactivate coupon |

## Order Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/orders` | Get all orders |
| GET | `/api/admin/orders/:orderId` | Get order details |
| PUT | `/api/admin/orders/:orderId/status` | Update order status |
| POST | `/api/admin/orders/:orderId/assign-delivery` | Assign delivery boy |
| POST | `/api/admin/orders/:orderId/cancel` | Cancel order |

## Payment Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/payments` | Get all payments |
| GET | `/api/admin/payments/:paymentId` | Get payment details |
| POST | `/api/admin/payments/:paymentId/refund` | Process refund |
| GET | `/api/admin/payments/transactions` | Get all transactions |

## Wallet Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/wallets` | Get all wallets |
| GET | `/api/admin/wallets/:walletId` | Get wallet details |
| POST | `/api/admin/wallets/:walletId/credit` | Credit wallet |
| POST | `/api/admin/wallets/:walletId/debit` | Debit wallet |
| GET | `/api/admin/wallets/:walletId/transactions` | Get wallet transactions |

## Withdraw Request Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/withdraw-requests` | Get all withdraw requests |
| GET | `/api/admin/withdraw-requests/:requestId` | Get request details |
| POST | `/api/admin/withdraw-requests/:requestId/approve` | Approve request |
| POST | `/api/admin/withdraw-requests/:requestId/reject` | Reject request |

## Report Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/reports/sales` | Sales report |
| GET | `/api/admin/reports/revenue` | Revenue report |
| GET | `/api/admin/reports/orders` | Orders report |
| GET | `/api/admin/reports/users` | Users report |
| GET | `/api/admin/reports/export` | Export reports |

## Settings Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/settings` | Get all settings |
| PUT | `/api/admin/settings` | Update settings |
| GET | `/api/admin/settings/general` | Get general settings |
| PUT | `/api/admin/settings/payment` | Update payment settings |
| PUT | `/api/admin/settings/notification` | Update notification settings |

## Support Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/support/tickets` | Get all tickets |
| GET | `/api/admin/support/tickets/:ticketId` | Get ticket details |
| POST | `/api/admin/support/tickets/:ticketId/reply` | Reply to ticket |
| POST | `/api/admin/support/tickets/:ticketId/close` | Close ticket |

---

## Total Endpoints: 100+

### Breakdown by Category:
- Authentication: 4 endpoints
- Dashboard: 7 endpoints
- Analytics: 5 endpoints
- Tracking: 4 endpoints
- Notifications: 5 endpoints
- Users: 7 endpoints
- Shopkeepers: 7 endpoints
- Delivery Boys: 8 endpoints
- Products: 6 endpoints
- Categories: 5 endpoints
- Coupons: 7 endpoints
- Orders: 5 endpoints
- Payments: 4 endpoints
- Wallets: 5 endpoints
- Withdraw: 4 endpoints
- Reports: 5 endpoints
- Settings: 5 endpoints
- Support: 4 endpoints
