# Setup Guide - API Integration

## Installation

### 1. Install Axios
```bash
npm install axios
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Replace `http://localhost:3001` with your actual API base URL.

## Project Structure

```
src/
├── lib/
│   ├── axios.js          # Axios instance with interceptors
│   ├── endpoints.js      # All API endpoint constants
│   └── api.js            # API service methods
├── app/
│   ├── dashboard/        # Dashboard page (integrated)
│   ├── analytics/        # Analytics page (integrated)
│   ├── live-tracking/    # Live tracking page (integrated)
│   ├── notifications/    # Notifications page (integrated)
│   └── ...
└── components/
    ├── AdminLayout.js    # Main layout with sidebar & topbar
    ├── AppSidebar.js     # Sidebar navigation
    ├── Topbar.js         # Top navigation bar
    └── ...
```

## API Architecture

### 1. Axios Instance (`src/lib/axios.js`)
- Centralized axios configuration
- Automatic token injection
- Request/response interceptors
- Error handling
- Auto-redirect on 401 Unauthorized

### 2. Endpoint Constants (`src/lib/endpoints.js`)
- Organized by feature/module
- Type-safe endpoint definitions
- Dynamic route parameters
- Easy to maintain and update

### 3. API Services (`src/lib/api.js`)
- Clean API methods
- Uses axios instance
- Organized by feature
- Easy to use in components

## Usage Examples

### Basic GET Request
```javascript
import { dashboardAPI } from '@/lib/api';

const fetchData = async () => {
  try {
    const data = await dashboardAPI.getStatistics();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### POST Request with Data
```javascript
import { notificationAPI } from '@/lib/api';

const sendNotification = async () => {
  try {
    const result = await notificationAPI.send({
      title: 'New Order',
      message: 'Order #123 received',
      users: ['user1', 'user2']
    });
    console.log('Sent:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Dynamic Route Parameters
```javascript
import { trackingAPI } from '@/lib/api';

const getOrderTracking = async (orderId) => {
  try {
    const tracking = await trackingAPI.getOrderTracking(orderId);
    console.log(tracking);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### With Query Parameters
```javascript
import { userAPI } from '@/lib/api';

const getUsers = async () => {
  try {
    const users = await userAPI.getList({
      page: 1,
      limit: 10,
      status: 'active'
    });
    console.log(users);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Available API Services

### Authentication
```javascript
import { authAPI } from '@/lib/api';

authAPI.login(credentials)
authAPI.logout()
authAPI.refresh()
authAPI.verify()
```

### Dashboard
```javascript
import { dashboardAPI } from '@/lib/api';

dashboardAPI.getStatistics()
dashboardAPI.getLiveOrders()
dashboardAPI.getRecentTransactions()
dashboardAPI.getLiveActivities()
dashboardAPI.getTopProducts()
dashboardAPI.getTopShopkeepers()
dashboardAPI.getActiveDeliveryBoys()
```

### Analytics
```javascript
import { analyticsAPI } from '@/lib/api';

analyticsAPI.getRevenue()
analyticsAPI.getOrders()
analyticsAPI.getUsers()
analyticsAPI.getHeatmap()
analyticsAPI.getPeakHours()
```

### Tracking
```javascript
import { trackingAPI } from '@/lib/api';

trackingAPI.getLiveOrders()
trackingAPI.getOrderTracking(orderId)
trackingAPI.getDeliveryBoys()
trackingAPI.getRoute(orderId)
```

### Notifications
```javascript
import { notificationAPI } from '@/lib/api';

notificationAPI.send(data)
notificationAPI.getLogs()
notificationAPI.sendPush(data)
notificationAPI.sendSMS(data)
notificationAPI.sendEmail(data)
```

### Users
```javascript
import { userAPI } from '@/lib/api';

userAPI.getList(params)
userAPI.getDetail(userId)
userAPI.create(data)
userAPI.update(userId, data)
userAPI.delete(userId)
userAPI.block(userId)
userAPI.unblock(userId)
```

### Shopkeepers
```javascript
import { shopkeeperAPI } from '@/lib/api';

shopkeeperAPI.getList(params)
shopkeeperAPI.getDetail(shopkeeperId)
shopkeeperAPI.create(data)
shopkeeperAPI.update(shopkeeperId, data)
shopkeeperAPI.delete(shopkeeperId)
shopkeeperAPI.approve(shopkeeperId)
shopkeeperAPI.reject(shopkeeperId)
```

### Delivery Boys
```javascript
import { deliveryBoyAPI } from '@/lib/api';

deliveryBoyAPI.getList(params)
deliveryBoyAPI.getDetail(deliveryBoyId)
deliveryBoyAPI.create(data)
deliveryBoyAPI.update(deliveryBoyId, data)
deliveryBoyAPI.delete(deliveryBoyId)
deliveryBoyAPI.approve(deliveryBoyId)
deliveryBoyAPI.reject(deliveryBoyId)
deliveryBoyAPI.assign(deliveryBoyId, data)
```

### Products
```javascript
import { productAPI } from '@/lib/api';

productAPI.getList(params)
productAPI.getDetail(productId)
productAPI.create(data)
productAPI.update(productId, data)
productAPI.delete(productId)
productAPI.bulkUpload(data)
```

### Categories
```javascript
import { categoryAPI } from '@/lib/api';

categoryAPI.getList(params)
categoryAPI.getDetail(categoryId)
categoryAPI.create(data)
categoryAPI.update(categoryId, data)
categoryAPI.delete(categoryId)
```

### Coupons
```javascript
import { couponAPI } from '@/lib/api';

couponAPI.getList(params)
couponAPI.getDetail(couponId)
couponAPI.create(data)
couponAPI.update(couponId, data)
couponAPI.delete(couponId)
couponAPI.activate(couponId)
couponAPI.deactivate(couponId)
```

### Orders
```javascript
import { orderAPI } from '@/lib/api';

orderAPI.getList(params)
orderAPI.getDetail(orderId)
orderAPI.updateStatus(orderId, data)
orderAPI.assignDelivery(orderId, data)
orderAPI.cancel(orderId, data)
```

### Payments
```javascript
import { paymentAPI } from '@/lib/api';

paymentAPI.getList(params)
paymentAPI.getDetail(paymentId)
paymentAPI.refund(paymentId, data)
paymentAPI.getTransactions(params)
```

### Wallet
```javascript
import { walletAPI } from '@/lib/api';

walletAPI.getList(params)
walletAPI.getDetail(walletId)
walletAPI.credit(walletId, data)
walletAPI.debit(walletId, data)
walletAPI.getTransactions(walletId, params)
```

### Withdraw
```javascript
import { withdrawAPI } from '@/lib/api';

withdrawAPI.getList(params)
withdrawAPI.getDetail(requestId)
withdrawAPI.approve(requestId, data)
withdrawAPI.reject(requestId, data)
```

### Reports
```javascript
import { reportAPI } from '@/lib/api';

reportAPI.getSales(params)
reportAPI.getRevenue(params)
reportAPI.getOrders(params)
reportAPI.getUsers(params)
reportAPI.export(params)
```

### Settings
```javascript
import { settingsAPI } from '@/lib/api';

settingsAPI.get()
settingsAPI.update(data)
settingsAPI.getGeneral()
settingsAPI.updatePayment(data)
settingsAPI.updateNotification(data)
```

### Support
```javascript
import { supportAPI } from '@/lib/api';

supportAPI.getTickets(params)
supportAPI.getTicketDetail(ticketId)
supportAPI.reply(ticketId, data)
supportAPI.close(ticketId)
```

## Error Handling

The axios instance automatically handles errors:

```javascript
// 401 Unauthorized - Auto redirects to login
// Other errors - Logged to console and rejected

try {
  const data = await dashboardAPI.getStatistics();
} catch (error) {
  // Handle error
  if (error.response) {
    // Server responded with error
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('No response received');
  } else {
    // Error setting up request
    console.error('Error:', error.message);
  }
}
```

## Testing

1. Start your backend API server
2. Update `.env.local` with correct API URL
3. Run the Next.js app: `npm run dev`
4. Open browser and check Network tab
5. Verify API calls are being made correctly

## Notes

- All API calls automatically include the Bearer token
- Token is retrieved from localStorage
- 401 errors automatically redirect to login
- All endpoints are organized and easy to find
- Response data is automatically extracted from axios response
