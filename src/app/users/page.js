"use client";
import toast from 'react-hot-toast';

import React, { useState, useEffect } from "react";
import { userAPI } from "@/lib/api";

import {
  Users,
  Search,
  Filter,
} from "lucide-react";

/* =========================
   MANUAL COMPONENTS
========================= */

function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  children,
  className = "",
}) {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
}

function CardContent({
  children,
  className = "",
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

function CardTitle({
  children,
  className = "",
}) {
  return (
    <h2
      className={`text-lg font-semibold ${className}`}
    >
      {children}
    </h2>
  );
}

function Button({
  children,
  className = "",
  size = "default",
  variant = "default",
  onClick,
  disabled,
}) {
  const sizeClass =
    size === "sm"
      ? "h-9 px-4 text-sm"
      : "h-10 px-5";

  const variantClass =
    variant === "outline"
      ? "border border-gray-300 bg-white text-black hover:bg-gray-50"
      : variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700"
      : variant === "success"
      ? "bg-green-600 text-white hover:bg-green-700"
      : "bg-green-600 text-white hover:bg-green-700";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${sizeClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
}

function Badge({
  children,
  className = "",
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function PageHeader({
  title,
  subtitle,
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        {title}
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}

/* =========================
   DATA
========================= */

const dummyUsers = [
  {
    _id: "1",
    fullname: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 9876543210",
    accountStatus: "active",
    totalOrders: 24,
    totalSpent: 12400,
  },
  {
    _id: "2",
    fullname: "Priya Patel",
    email: "priya@example.com",
    phone: "+91 9876543211",
    accountStatus: "active",
    totalOrders: 18,
    totalSpent: 8900,
  },
  {
    _id: "3",
    fullname: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "+91 9876543212",
    accountStatus: "blocked",
    totalOrders: 5,
    totalSpent: 2100,
  },
];

/* =========================
   MAIN COMPONENT
========================= */

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1
  });

  useEffect(() => {
    fetchUsers();
  }, [page, status]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 20,
      };
      if (status) params.status = status;
      if (search) params.search = search;

      const response = await userAPI.getList(params);
      
      if (response.success) {
        setUsers(response.data || []);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers(dummyUsers);
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (userId) => {
    try {
      setActionLoading(userId);
      await userAPI.block(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error blocking user:', error);
      toast.error('Failed to block user');
    } finally {
      setActionLoading(null);
    }
  };

  const handleUnblock = async (userId) => {
    try {
      setActionLoading(userId);
      await userAPI.unblock(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error unblocking user:', error);
      toast.error('Failed to unblock user');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSearch = () => {
    fetchUsers();
  };

  const displayUsers = users.length > 0 ? users : dummyUsers;

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Users"
        subtitle="Manage customer accounts and activity."
      />

      {/* FILTERS */}
      <Card className="shadow-sm">
        <CardContent className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm outline-none"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>

              <Button size="sm" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* USERS TABLE */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            All Users ({pagination.total})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading users...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b text-left text-xs uppercase text-gray-500">
                    <tr>
                      <th className="px-5 py-3">Name</th>
                      <th className="px-5 py-3">Email</th>
                      <th className="px-5 py-3">Phone</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {displayUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                      >
                        <td className="px-5 py-3 font-medium">{user.fullname}</td>
                        <td className="px-5 py-3 text-gray-600">{user.email}</td>
                        <td className="px-5 py-3 text-gray-600">{user.phone}</td>
                        <td className="px-5 py-3">
                          <Badge
                            className={
                              user.accountStatus === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }
                          >
                            {user.accountStatus}
                          </Badge>
                        </td>
                        <td className="px-5 py-3">
                          {user.accountStatus === 'active' ? (
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleBlock(user._id)}
                              disabled={actionLoading === user._id}
                            >
                              {actionLoading === user._id ? 'Blocking...' : 'Block'}
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleUnblock(user._id)}
                              disabled={actionLoading === user._id}
                            >
                              {actionLoading === user._id ? 'Unblocking...' : 'Unblock'}
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-between border-t p-5">
                  <div className="text-sm text-gray-500">
                    Showing page {pagination.page} of {pagination.pages} ({pagination.total} total users)
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPage(page + 1)}
                      disabled={page === pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}