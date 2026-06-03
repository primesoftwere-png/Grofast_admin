# 🚀 Quick Start Guide

Get your admin panel up and running in 5 minutes!

---

## ⚡ 5-Minute Setup

### Step 1: Start Backend (1 min)
```bash
# Make sure your backend is running
# Default: http://localhost:8001
```

### Step 2: Start Frontend (1 min)
```bash
npm run dev
```

### Step 3: Login (1 min)
```
URL: http://localhost:3000/login
Email: superadmin@gmail.com
Password: superadmin123
```

### Step 4: Test Features (2 min)
1. Go to `/users` - Test user management
2. Go to `/shopkeepers` - Test shopkeeper management
3. Go to `/delivery-boys` - Test delivery boy management

**Done! 🎉**

---

## 📋 Quick Reference

### Main Pages
| Page | URL | Description |
|------|-----|-------------|
| Login | `/login` | Admin login |
| Dashboard | `/dashboard` | Main dashboard |
| Users | `/users` | User management |
| Shopkeepers | `/shopkeepers` | Shopkeeper management |
| Delivery Boys | `/delivery-boys` | Delivery boy management |
| Products | `/products` | Product management |
| Categories | `/categories` | Category management |
| Profile | `/profile` | Admin profile |

### Common Actions
| Action | How To |
|--------|--------|
| Search | Type in search box, press Enter |
| Filter | Select status from dropdown |
| Block User | Click "Block" button |
| Unblock User | Click "Unblock" button |
| Approve | Click "Approve" button |
| Reject | Click "Reject", enter reason, submit |

---

## 🔑 Default Credentials

```
Email: superadmin@gmail.com
Password: superadmin123
```

---

## 🎯 Quick Test

### Test User Management:
```
1. Go to /users
2. Search for "john"
3. Click "Block" on any user
4. Click "Unblock" to restore
```

### Test Shopkeeper Management:
```
1. Go to /shopkeepers
2. Filter by "Pending"
3. Click "Approve" on any pending shopkeeper
4. Or click "Reject" and provide reason
```

### Test Delivery Boy Management:
```
1. Go to /delivery-boys
2. Filter by "Pending"
3. Click "Approve" on any pending delivery boy
4. Or click "Reject" and provide reason
```

---

## 🔧 Configuration

### API Base URL
Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

### Change Port
Edit `package.json`:
```json
"dev": "next dev -p 3001"
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `INTEGRATION_COMPLETE.md` | Main guide |
| `API_INTEGRATION_SUMMARY.md` | Quick reference |
| `FINAL_SUMMARY.md` | Project summary |

---

## 🚨 Troubleshooting

### Issue: Can't login
**Solution:** Check if backend is running on port 8001

### Issue: Data not loading
**Solution:** Check browser console for errors

### Issue: 401 Error
**Solution:** Token expired, logout and login again

---

## 💡 Tips

1. **Search:** Press Enter to search
2. **Filters:** Auto-refresh on change
3. **Actions:** Wait for loading state
4. **Errors:** Check console for details
5. **Logout:** Click profile icon → Logout

---

## 🎨 Theme

**Primary Color:** Green-600  
**Success:** Green  
**Warning:** Yellow  
**Danger:** Red  

---

## ✅ Checklist

Before going live:
- [ ] Backend running
- [ ] Frontend running
- [ ] Can login
- [ ] Can view users
- [ ] Can block/unblock users
- [ ] Can approve/reject shopkeepers
- [ ] Can approve/reject delivery boys
- [ ] Search working
- [ ] Filters working

---

## 🎉 You're Ready!

Your admin panel is ready to use. Enjoy! 🚀

**Need Help?** Check the documentation files.

---

**Last Updated:** May 13, 2026  
**Version:** 2.0.0
