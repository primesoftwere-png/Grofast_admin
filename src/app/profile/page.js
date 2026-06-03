"use client";

import React, { useState, useEffect } from "react";
import { authAPI } from "@/lib/api";
import { User, Mail, Phone, Shield, Key, Save } from "lucide-react";

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ children, className = "" }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

function Button({ children, className = "", onClick, disabled, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Profile form
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();
      
      if (response.success) {
        setUser(response.data);
        setFullname(response.data.fullname || "");
        setPhone(response.data.phone || "");
        
        // Update localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ type: 'error', text: 'Failed to load profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setUpdating(true);

    try {
      const response = await authAPI.updateProfile({
        fullname,
        phone,
      });

      if (response.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully' });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validation
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setChangingPassword(true);

    try {
      const response = await authAPI.changePassword({
        currentPassword,
        newPassword,
      });

      if (response.success) {
        setMessage({ type: 'success', text: 'Password changed successfully' });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to change password' 
      });
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Profile Information */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{user?.email}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 capitalize">{user?.role}</span>
                </div>
              </div>

              <Button type="submit" disabled={updating} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                {updating ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  minLength={6}
                />
                <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  minLength={6}
                />
              </div>

              <Button type="submit" disabled={changingPassword} className="w-full">
                <Key className="mr-2 h-4 w-4" />
                {changingPassword ? 'Changing...' : 'Change Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Account Status */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Account Status</p>
              <p className="mt-1 text-lg font-semibold capitalize">{user?.accountStatus}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Role</p>
              <p className="mt-1 text-lg font-semibold capitalize">{user?.role}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">User ID</p>
              <p className="mt-1 text-sm font-mono">{user?._id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
