# 🚀 Quick Reference Card

## Environment Setup
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8001
```

## Default Credentials
```
Email: superadmin@gmail.com
Password: superadmin123
```

## Start Application
```bash
# Backend
cd backend && npm start

# Frontend
cd admin-panel && npm run dev
```

## API Endpoints

### Authentication
```javascript
import { authAPI } from '@/lib/api';

// Login
await authAPI.login({ email, password })

// Logout
await authAPI.logout()

// Get Profile
await authAPI.getProfile()

// Update Profile
await authAPI.updateProfile({ fullname, phone })

// Change Password
await authAPI.changePassword({ currentPassword, newPassword })
```

### Dashboard
```javascript
import { dashboardAPI } from '@/lib/api';

await dashboardAPI.getStatistics()
await dashboardAPI.getLiveOrders()
await dashboardAPI.getRecentTransactions()
```

### Analytics
```javascript
import { analyticsAPI } from '@/lib/api';

await analyticsAPI.getRevenue()
await analyticsAPI.getOrders()
await analyticsAPI.getPeakHours()
```

### Tracking
```javascript
import { trackingAPI } from '@/lib/api';

await trackingAPI.getLiveOrders()
await trackingAPI.getOrderTracking(orderId)
await trackingAPI.getDeliveryBoys()
```

### Notifications
```javascript
import { notificationAPI } from '@/lib/api';

await notificationAPI.send(data)
await notificationAPI.getLogs()
await notificationAPI.sendSMS(data)
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Root (redirects based on auth) |
| `/login` | Login page |
| `/dashboard` | Main dashboard |
| `/profile` | User profile |
| `/analytics` | Analytics page |
| `/live-tracking` | Live tracking |
| `/notifications` | Notifications |
| `/orders` | Orders management |
| `/products` | Products management |
| `/categories` | Categories |
| `/coupons` | Coupons |
| `/users` | Users management |
| `/shopkeepers` | Shopkeepers |
| `/delivery-boys` | Delivery boys |
| `/payments` | Payments |
| `/wallet` | Wallet |
| `/withdraw` | Withdraw requests |
| `/reports` | Reports |
| `/settings` | Settings |
| `/support` | Support |

## LocalStorage

```javascript
// Get token
const token = localStorage.getItem('token');

// Get user
const user = JSON.parse(localStorage.getItem('user'));

// Clear on logout
localStorage.removeItem('token');
localStorage.removeItem('user');
```

## Error Handling

```javascript
try {
  const response = await authAPI.login({ email, password });
  // Success
} catch (error) {
  if (error.response?.status === 401) {
    // Unauthorized
  } else if (error.response?.status === 403) {
    // Forbidden
  } else {
    // Other errors
  }
}
```

## Common Tasks

### Check if logged in
```javascript
const isLoggedIn = !!localStorage.getItem('token');
```

### Get current user
```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log(user.fullname, user.email, user.role);
```

### Logout
```javascript
await authAPI.logout();
localStorage.clear();
router.push('/login');
```

### Update profile
```javascript
const response = await authAPI.updateProfile({
  fullname: 'New Name',
  phone: '9999999999'
});
localStorage.setItem('user', JSON.stringify(response.data));
```

## File Locations

```
src/
├── lib/
│   ├── axios.js          # Axios config
│   ├── endpoints.js      # API endpoints
│   └── api.js            # API methods
├── app/
│   ├── login/page.js     # Login page
│   ├── profile/page.js   # Profile page
│   └── dashboard/page.js # Dashboard
└── components/
    ├── AuthWrapper.js    # Auth guard
    ├── AdminLayout.js    # Layout
    ├── Topbar.js         # Top bar
    └── AppSidebar.js     # Sidebar
```

## Documentation

- `LOGIN_FLOW_GUIDE.md` - Complete auth guide
- `SETUP_GUIDE.md` - Setup instructions
- `ENDPOINTS_LIST.md` - All endpoints
- `AUTHENTICATION_COMPLETE.md` - Summary
- `QUICK_REFERENCE.md` - This file

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Login fails | Check backend is running |
| 401 error | Token expired, login again |
| No redirect | Clear localStorage |
| API not called | Check .env.local |
| CORS error | Check backend CORS config |

## Status

✅ Login System  
✅ Profile Management  
✅ Logout System  
✅ Route Protection  
✅ API Integration  
✅ Error Handling  
✅ Documentation  

**Ready for Production!** 🚀
