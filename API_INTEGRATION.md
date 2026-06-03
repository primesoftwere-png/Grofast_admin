# API Integration Documentation

## Overview
All API endpoints have been integrated into the admin panel components. The integration uses a centralized API service layer located in `src/lib/api.js`.

## Configuration

### Environment Variables
Set your API base URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

If not set, it defaults to `http://localhost:3001`.

## API Service (`src/lib/api.js`)

The API service provides organized methods for all endpoints:

### Dashboard APIs
- `dashboardAPI.getStatistics()` - GET /api/admin/dashboard
- `dashboardAPI.getLiveOrders()` - GET /api/admin/live-orders
- `dashboardAPI.getRecentTransactions()` - GET /api/admin/recent-transactions
- `dashboardAPI.getLiveActivities()` - GET /api/admin/live-activities
- `dashboardAPI.getTopProducts()` - GET /api/admin/top-products
- `dashboardAPI.getTopShopkeepers()` - GET /api/admin/top-shopkeepers
- `dashboardAPI.getActiveDeliveryBoys()` - GET /api/admin/active-delivery-boys

### Analytics APIs
- `analyticsAPI.getRevenue()` - GET /api/admin/analytics/revenue
- `analyticsAPI.getOrders()` - GET /api/admin/analytics/orders
- `analyticsAPI.getUsers()` - GET /api/admin/analytics/users
- `analyticsAPI.getHeatmap()` - GET /api/admin/analytics/heatmap
- `analyticsAPI.getPeakHours()` - GET /api/admin/analytics/peak-hours

### Tracking APIs
- `trackingAPI.getLiveOrders()` - GET /api/admin/tracking/live-orders
- `trackingAPI.getOrderTracking(orderId)` - GET /api/admin/tracking/order/:orderId
- `trackingAPI.getDeliveryBoys()` - GET /api/admin/tracking/delivery-boys
- `trackingAPI.getRoute(orderId)` - GET /api/admin/tracking/route/:orderId

### Notification APIs
- `notificationAPI.send(data)` - POST /api/admin/notifications/send
- `notificationAPI.getLogs()` - GET /api/admin/notifications/logs
- `notificationAPI.sendPush(data)` - POST /api/admin/notifications/push
- `notificationAPI.sendSMS(data)` - POST /api/admin/sms/send
- `notificationAPI.sendEmail(data)` - POST /api/admin/email/send

## Integrated Components

### 1. Dashboard (`src/app/dashboard/page.js`)
**Integrated APIs:**
- `dashboardAPI.getStatistics()` - Fetches main statistics (orders, revenue, etc.)

**Features:**
- Displays total orders, pending orders, delivered orders, and revenue
- Shows revenue & expenses chart
- Auto-refreshes on component mount
- Falls back to dummy data if API fails

### 2. Analytics (`src/app/analytics/page.js`)
**Integrated APIs:**
- `analyticsAPI.getRevenue()` - Revenue trajectory data
- `analyticsAPI.getOrders()` - Daily sales data
- `analyticsAPI.getPeakHours()` - Peak order hours

**Features:**
- Revenue trajectory chart
- Peak order hours visualization
- Daily sales bar chart
- Order heatmap (day × hour)
- Falls back to dummy data if API fails

### 3. Live Tracking (`src/app/live-tracking/page.js`)
**Integrated APIs:**
- `trackingAPI.getLiveOrders()` - Active deliveries
- `trackingAPI.getDeliveryBoys()` - Delivery boy locations

**Features:**
- Real-time delivery tracking
- Auto-refreshes every 10 seconds
- Shows active deliveries with progress
- Falls back to dummy data if API fails

### 4. Notifications (`src/app/notifications/page.js`)
**Integrated APIs:**
- `notificationAPI.getLogs()` - SMS and email logs

**Features:**
- Real-time order alerts
- SMS logs with status
- Email logs with status
- Channel management (Push, SMS, Email)
- Falls back to dummy data if API fails

## Authentication

All API calls automatically include the authentication token from localStorage:

```javascript
Authorization: Bearer <token>
```

The token is retrieved from `localStorage.getItem('token')`.

## Error Handling

All API integrations include:
1. **Try-catch blocks** - Catches and logs errors
2. **Fallback data** - Shows dummy data if API fails
3. **Loading states** - Displays loading indicators
4. **Console logging** - Logs errors for debugging

## Expected API Response Format

### Dashboard Statistics
```json
{
  "totalOrders": 15420,
  "pendingOrders": 126,
  "deliveredOrders": 14280,
  "revenue": 1250000,
  "activeUsers": 8450,
  "shopkeepers": 248,
  "deliveryBoys": 312,
  "cancelledOrders": 84,
  "revenueData": [
    { "month": "Jan", "revenue": 12000, "expenses": 8001 },
    ...
  ]
}
```

### Analytics Revenue
```json
{
  "data": [
    { "month": "Jan", "revenue": 12000 },
    ...
  ]
}
```

### Tracking Live Orders
```json
{
  "data": [
    {
      "id": "GF-29481",
      "customer": "Aarav Sharma",
      "rider": "Rahul K.",
      "shop": "FreshMart Andheri",
      "eta": "6 min",
      "distance": "1.2 km",
      "progress": 65
    },
    ...
  ]
}
```

### Notification Logs
```json
{
  "data": {
    "sms": [
      {
        "to": "+91 98xxxxx100",
        "body": "OTP 4821 for GroFast order",
        "time": "2 min ago",
        "status": "Sent"
      },
      ...
    ],
    "email": [
      {
        "to": "user1@grofast.app",
        "subject": "Order confirmation",
        "time": "1 hr ago",
        "status": "Delivered"
      },
      ...
    ]
  },
  "notifications": [
    {
      "id": 1,
      "title": "New order received",
      "body": "Order #GF-29481 placed successfully.",
      "time": "2 min ago"
    },
    ...
  ]
}
```

## Usage Example

```javascript
import { dashboardAPI } from "@/lib/api";

// In your component
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await dashboardAPI.getStatistics();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };
  
  fetchData();
}, []);
```

## Testing

To test the integration:

1. Start your backend API server
2. Set `NEXT_PUBLIC_API_URL` in `.env.local`
3. Run the Next.js app: `npm run dev`
4. Navigate to the integrated pages
5. Check browser console for API calls and responses

## Notes

- All components maintain dummy data as fallback
- API calls are made on component mount
- Live tracking auto-refreshes every 10 seconds
- Authentication token is automatically included
- No changes were made to component UI/structure
