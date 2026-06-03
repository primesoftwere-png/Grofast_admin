# 🔐 Complete Login & Profile Flow Guide

## Overview
This guide covers the complete authentication and profile management flow for the GroFast Admin Panel.

## 🚀 Quick Start

### 1. Environment Setup
Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

### 2. Default Credentials
```
Email: superadmin@gmail.com
Password: superadmin123
```

## 📋 Authentication Flow

### Login Process

```
1. User visits http://localhost:3000
   ↓
2. AuthWrapper checks for token in localStorage
   ↓
3. No token → Redirect to /login
   ↓
4. User enters credentials
   ↓
5. POST /api/admin/login
   ↓
6. Server validates credentials
   ↓
7. Server returns { success, data: { user, token } }
   ↓
8. Client stores token & user in localStorage
   ↓
9. Redirect to /dashboard
   ↓
10. All API calls include: Authorization: Bearer <token>
```

### Logout Process

```
1. User clicks "Sign out" in profile dropdown
   ↓
2. POST /api/admin/logout (optional, clears server session)
   ↓
3. Clear localStorage (token & user)
   ↓
4. Redirect to /login
```

## 🔑 API Endpoints

### 1. Login
**Endpoint:** `POST /api/admin/login`

**Request:**
```json
{
  "email": "superadmin@gmail.com",
  "password": "superadmin123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "fullname": "Super Admin",
      "email": "superadmin@gmail.com",
      "phone": "9876543210",
      "role": "superadmin",
      "accountStatus": "active"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `403` - Not SuperAdmin or account blocked
- `500` - Server error

### 2. Logout
**Endpoint:** `POST /api/admin/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### 3. Get Profile
**Endpoint:** `GET /api/admin/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "fullname": "Super Admin",
    "email": "superadmin@gmail.com",
    "phone": "9876543210",
    "role": "superadmin",
    "accountStatus": "active"
  }
}
```

### 4. Update Profile
**Endpoint:** `PATCH /api/admin/profile`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "fullname": "Updated Name",
  "phone": "9999999999"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "fullname": "Updated Name",
    "email": "superadmin@gmail.com",
    "phone": "9999999999",
    "role": "superadmin",
    "accountStatus": "active"
  }
}
```

### 5. Change Password
**Endpoint:** `POST /api/admin/change-password`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "currentPassword": "superadmin123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

## 📁 File Structure

### Core Files

```
src/
├── lib/
│   ├── axios.js              # Axios instance with interceptors
│   ├── endpoints.js          # AUTH_ENDPOINTS constants
│   └── api.js                # authAPI methods
│
├── app/
│   ├── login/
│   │   └── page.js           # Login page with API integration
│   ├── profile/
│   │   └── page.js           # Profile management page
│   └── page.js               # Root redirect logic
│
└── components/
    ├── AuthWrapper.js        # Authentication guard
    └── Topbar.js             # User profile dropdown
```

## 🔧 Implementation Details

### 1. Login Page (`src/app/login/page.js`)

**Features:**
- Email & password form
- API integration with error handling
- Loading states
- Token & user storage
- Auto-redirect if already logged in
- Beautiful UI with green theme

**Key Functions:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await authAPI.login({ email, password });
    
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/dashboard');
    }
  } catch (error) {
    // Handle errors
  }
};
```

### 2. Profile Page (`src/app/profile/page.js`)

**Features:**
- View profile information
- Update name & phone
- Change password
- Account status display
- Success/error messages
- Loading states

**Key Functions:**
```javascript
// Fetch profile
const fetchProfile = async () => {
  const response = await authAPI.getProfile();
  setUser(response.data);
};

// Update profile
const handleUpdateProfile = async (e) => {
  const response = await authAPI.updateProfile({ fullname, phone });
  localStorage.setItem('user', JSON.stringify(response.data));
};

// Change password
const handleChangePassword = async (e) => {
  const response = await authAPI.changePassword({
    currentPassword,
    newPassword
  });
};
```

### 3. Topbar (`src/components/Topbar.js`)

**Features:**
- Display user name & role
- Profile dropdown menu
- Logout functionality
- Navigate to profile page

**Key Functions:**
```javascript
// Load user from localStorage
useEffect(() => {
  const userData = localStorage.getItem('user');
  if (userData) {
    setUser(JSON.parse(userData));
  }
}, []);

// Logout
const handleLogout = async () => {
  await authAPI.logout();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
```

### 4. AuthWrapper (`src/components/AuthWrapper.js`)

**Features:**
- Check authentication on every page
- Auto-redirect based on token
- Wrap authenticated pages with AdminLayout
- Show login page without layout

**Logic:**
```javascript
useEffect(() => {
  const token = localStorage.getItem('token');
  
  if (pathname === '/login') {
    if (token) router.push('/dashboard');
  } else {
    if (!token) router.push('/login');
  }
}, [pathname]);
```

## 🎯 Usage Examples

### Login from Component
```javascript
import { authAPI } from '@/lib/api';

const login = async () => {
  try {
    const response = await authAPI.login({
      email: 'superadmin@gmail.com',
      password: 'superadmin123'
    });
    
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Redirect to dashboard
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Get Current User
```javascript
// From localStorage
const user = JSON.parse(localStorage.getItem('user'));
console.log(user.fullname, user.email, user.role);

// From API
const response = await authAPI.getProfile();
console.log(response.data);
```

### Update Profile
```javascript
const updateProfile = async () => {
  try {
    const response = await authAPI.updateProfile({
      fullname: 'New Name',
      phone: '9999999999'
    });
    
    if (response.success) {
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('Profile updated!');
    }
  } catch (error) {
    console.error('Update failed:', error);
  }
};
```

### Change Password
```javascript
const changePassword = async () => {
  try {
    const response = await authAPI.changePassword({
      currentPassword: 'oldpass123',
      newPassword: 'newpass123'
    });
    
    if (response.success) {
      console.log('Password changed!');
    }
  } catch (error) {
    console.error('Change failed:', error);
  }
};
```

### Logout
```javascript
const logout = async () => {
  try {
    await authAPI.logout();
  } catch (error) {
    // Ignore errors
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};
```

## 🔒 Security Features

### 1. Token Management
- Stored in localStorage
- Auto-included in all API requests via axios interceptor
- Cleared on logout

### 2. Auto-Redirect on 401
```javascript
// In axios.js
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 3. Route Protection
- AuthWrapper checks token on every route
- Redirects to login if no token
- Redirects to dashboard if token exists on login page

### 4. Role-Based Access
- Server validates SuperAdmin role
- Client displays role in UI
- Can be extended for role-based features

## 🧪 Testing

### Test Login Flow
```bash
# 1. Start backend
cd backend
npm start

# 2. Start frontend
cd admin-panel
npm run dev

# 3. Visit http://localhost:3000
# 4. Should redirect to /login
# 5. Enter credentials and login
# 6. Should redirect to /dashboard
# 7. Check localStorage for token & user
```

### Test Profile Flow
```bash
# 1. Login first
# 2. Click profile dropdown in topbar
# 3. Click "Profile"
# 4. Update name/phone
# 5. Click "Update Profile"
# 6. Check success message
# 7. Change password
# 8. Logout and login with new password
```

### Test Logout Flow
```bash
# 1. Login
# 2. Click profile dropdown
# 3. Click "Sign out"
# 4. Should redirect to /login
# 5. Check localStorage (should be empty)
# 6. Try accessing /dashboard (should redirect to /login)
```

## 🐛 Troubleshooting

### Issue: Login fails with network error
**Solution:** Check if backend is running on port 8001

### Issue: Token not included in requests
**Solution:** Check axios interceptor in `src/lib/axios.js`

### Issue: Redirect loop
**Solution:** Clear localStorage and try again

### Issue: 401 Unauthorized
**Solution:** Token expired or invalid, logout and login again

### Issue: Profile not updating
**Solution:** Check API response and localStorage update

## 📝 Notes

1. **Token Expiry:** Tokens expire after 24 hours
2. **SuperAdmin Only:** Only SuperAdmin role can access admin panel
3. **Account Status:** Only 'active' accounts can login
4. **Password Requirements:** Minimum 6 characters
5. **Email Cannot Change:** Email is immutable after account creation

## 🎉 Features Implemented

✅ Complete login flow with API integration  
✅ Token-based authentication  
✅ Auto-redirect logic  
✅ Profile management page  
✅ Update profile (name, phone)  
✅ Change password  
✅ Logout functionality  
✅ User display in topbar  
✅ Profile dropdown menu  
✅ Error handling  
✅ Loading states  
✅ Success/error messages  
✅ Beautiful UI with green theme  
✅ Responsive design  

---

**Status:** ✅ Production Ready  
**Last Updated:** Now  
**Version:** 1.0.0
