"use client";

import React, { useState, useEffect } from "react";
import { shopkeeperAPI, kycAPI } from "@/lib/api";

import {
  Store,
  ShieldCheck,
  ShieldX,
  Package,
  IndianRupee,
  Star,
  Search,
  Filter,
  Phone,
  Loader2,
  CheckCircle2,
  XCircle,
  X,
  Eye,
  FileText,
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
      : variant === "ghost"
      ? "bg-transparent hover:bg-gray-100 text-gray-600"
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

function Avatar({
  children,
  className = "",
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full ${className}`}
    >
      {children}
    </div>
  );
}

function AvatarFallback({
  children,
  className = "",
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full ${className}`}
    >
      {children}
    </div>
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

function StatusBadge({
  status,
}) {
  const styles = {
    Approved:
      "bg-green-100 text-green-700",
    APPROVED:
      "bg-green-100 text-green-700",
    approved:
      "bg-green-100 text-green-700",
    active:
      "bg-green-100 text-green-700",
    Pending:
      "bg-yellow-100 text-yellow-700",
    PENDING:
      "bg-yellow-100 text-yellow-700",
    pending:
      "bg-yellow-100 text-yellow-700",
    Rejected:
      "bg-red-100 text-red-700",
    REJECTED:
      "bg-red-100 text-red-700",
    rejected:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  delta,
}) {
  return (
    <Card className="p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">
            {label}
          </div>

          <div className="mt-2 text-2xl font-bold">
            {value}
          </div>

          {delta && (
            <div className="mt-1 text-sm text-green-600">
              +{delta}%
            </div>
          )}
        </div>

        <div className="rounded-xl bg-gray-100 p-3">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

/* =========================
   TOAST COMPONENT
========================= */

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-medium text-white shadow-lg transition-all ${
        type === "success"
          ? "bg-green-600"
          : type === "error"
          ? "bg-red-600"
          : "bg-blue-600"
      }`}
      style={{
        animation: "slideUp 0.3s ease-out",
      }}
    >
      {type === "success" ? (
        <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
      ) : (
        <XCircle className="h-4.5 w-4.5 shrink-0" />
      )}
      {message}
      <button
        onClick={onClose}
        className="ml-2 rounded-full p-0.5 hover:bg-white/20 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* =========================
   DATA
========================= */

const dummyShopkeepers = [
  {
    _id: "1",
    name: "FreshMart",
    owner: "Rahul Sharma",
    city: "Ahmedabad",
    orders: 1240,
    revenue: 284000,
    rating: 4.8,
    kyc: "active",
  },
  {
    _id: "2",
    name: "Metro Grocers",
    owner: "Amit Patel",
    city: "Surat",
    orders: 820,
    revenue: 164000,
    rating: 4.5,
    kyc: "pending",
  },
  {
    _id: "3",
    name: "Daily Basket",
    owner: "Priya Shah",
    city: "Rajkot",
    orders: 640,
    revenue: 132000,
    rating: 4.7,
    kyc: "active",
  },
  {
    _id: "4",
    name: "Quick Store",
    owner: "Vikram Joshi",
    city: "Vadodara",
    orders: 420,
    revenue: 98001,
    rating: 4.3,
    kyc: "rejected",
  },
];

const fmtINR = (n) =>
  "₹" + n.toLocaleString("en-IN");

/* =========================
   MAIN COMPONENT
========================= */

export default function ShopkeepersPage() {
  const [shopkeepers, setShopkeepers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(null); // stores kycId
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1
  });

  // Pending KYCs from dedicated KYC endpoint
  const [pendingKYCs, setPendingKYCs] = useState([]);
  const [pendingKYCLoading, setPendingKYCLoading] = useState(true);

  // KYC Detail modal
  const [kycDetail, setKycDetail] = useState(null);
  const [showKycDetailModal, setShowKycDetailModal] = useState(false);
  const [kycDetailLoading, setKycDetailLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    fetchShopkeepers();
    fetchPendingKYCs();
  }, [page, status]);

  const fetchShopkeepers = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 20,
      };
      if (status) params.status = status;
      if (search) params.search = search;

      const response = await shopkeeperAPI.getList(params);
      if (response?.success) {
        setShopkeepers(response.data || []);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (error) {
      console.error('Error fetching shopkeepers:', error);
      setShopkeepers(dummyShopkeepers);
    } finally {
      setLoading(false);
    }
  };

  // Fetch pending KYCs from the dedicated /api/admin/kyc/shopkeeper/pending endpoint
  const fetchPendingKYCs = async () => {
    try {
      setPendingKYCLoading(true);
      const response = await kycAPI.getPendingShopkeepers();

      if (response.success && response.data) {
        setPendingKYCs(response.data.kycs || []);
      }
    } catch (error) {
      console.error('Error fetching pending shopkeeper KYCs:', error);
      setPendingKYCs([]);
    } finally {
      setPendingKYCLoading(false);
    }
  };

  // Approve KYC or Account
  const handleApprove = async (kyc) => {
    try {
      setActionLoading(kyc._id);
      let response;
      if (kyc.kycDetails && kyc.kycDetails._id) {
        response = await kycAPI.approveShopkeeper(kyc.kycDetails._id);
      } else {
        response = await shopkeeperAPI.approve(kyc._id);
      }
      if (response.success) {
        showToast("Shopkeeper approved successfully!");
        fetchPendingKYCs();
        fetchShopkeepers();
      }
    } catch (error) {
      console.error('Error approving shopkeeper:', error);
      showToast("Failed to approve. Please try again.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // Reject KYC or Account
  const handleReject = async (kycId) => {
    const kyc = pendingKYCs.find(k => k._id === kycId);
    if (!kyc) return;

    if (!rejectReason.trim()) {
      showToast("Please provide a reason for rejection.", "error");
      return;
    }
    try {
      setActionLoading(kyc._id);
      let response;
      if (kyc.kycDetails && kyc.kycDetails._id) {
        response = await kycAPI.rejectShopkeeper(kyc.kycDetails._id, { rejectionReason: rejectReason.trim() });
      } else {
        response = await shopkeeperAPI.reject(kyc._id, { reason: rejectReason.trim() });
      }
      if (response.success) {
        setShowRejectModal(null);
        setRejectReason('');
        showToast("Shopkeeper rejected.", "success");
        fetchPendingKYCs();
        fetchShopkeepers();
      }
    } catch (error) {
      console.error('Error rejecting shopkeeper:', error);
      showToast("Failed to reject. Please try again.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // View KYC Details
  const handleViewKYCDetail = async (kycId) => {
    try {
      setKycDetailLoading(true);
      setShowKycDetailModal(true);
      const response = await kycAPI.getShopkeeperDetail(kycId);
      if (response.success && response.data) {
        setKycDetail(response.data);
      }
    } catch (error) {
      console.error('Error fetching KYC details:', error);
      showToast("Failed to load KYC details.", "error");
      setShowKycDetailModal(false);
    } finally {
      setKycDetailLoading(false);
    }
  };

  const handleSearch = () => {
    fetchShopkeepers();
  };

  const displayShopkeepers = shopkeepers.length > 0 ? shopkeepers : dummyShopkeepers;

  // Helpers for KYC records (populated from backend)
  const getKYCShopName = (kyc) => {
    return kyc.shopkeeperProfile?.shopName || kyc.fullname || "Unknown Shop";
  };
  const getKYCOwnerName = (kyc) => {
    return kyc.shopkeeperProfile?.ownerName || kyc.fullname || "N/A";
  };
  const getKYCPhone = (kyc) => {
    return kyc.phone || "N/A";
  };
  const getKYCInitials = (kyc) => {
    const name = getKYCShopName(kyc);
    return name
      .split(" ")
      .map((s) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Shopkeepers"
        subtitle="Approve KYC, monitor inventory and earnings."
      />

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total shops"
          value={pagination.total || displayShopkeepers.length}
          icon={Store}
          delta={4.1}
        />

        <StatCard
          label="KYC pending"
          value={pendingKYCs.length}
          icon={ShieldCheck}
        />

        <StatCard
          label="Avg rating"
          value="4.7"
          icon={Star}
        />

        <StatCard
          label="Revenue (MTD)"
          value={fmtINR(
            displayShopkeepers.reduce(
              (a, s) =>
                a + (s.revenue || 0),
              0
            )
          )}
          icon={IndianRupee}
          delta={12.3}
        />
      </div>

      {/* FILTERS */}
      <Card className="shadow-sm">
        <CardContent className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by shop name, owner..."
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
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="rejected">Rejected</option>
                <option value="blocked">Blocked</option>
              </select>

              <Button size="sm" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PENDING KYC — fetched from dedicated /api/admin/kyc/shopkeeper/pending endpoint */}
      {!pendingKYCLoading && pendingKYCs.length > 0 && (
        <Card className="border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-yellow-200/60">
            <CardTitle className="flex items-center gap-2.5 text-base">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-200/70">
                <ShieldCheck className="h-4.5 w-4.5 text-yellow-700" />
              </div>
              <div>
                <span className="text-yellow-900">Pending KYC Verifications</span>
                <span className="ml-2 inline-flex items-center justify-center rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-bold text-yellow-800">
                  {pendingKYCs.length}
                </span>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2.5 p-5 pt-4">
            {pendingKYCs.map((kyc) => {
              const viewId = kyc.shopkeeperProfile?._id || kyc._id;
              return (
              <div
                key={kyc._id}
                className="flex items-center justify-between rounded-xl border border-yellow-200/80 bg-white p-4 transition-all hover:shadow-md hover:border-yellow-300"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-yellow-100 text-xs font-semibold text-yellow-700">
                      {getKYCInitials(kyc)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {getKYCShopName(kyc)}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      {getKYCOwnerName(kyc)} · <Phone className="h-3 w-3 ml-0.5" /> {getKYCPhone(kyc)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* View KYC Details */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewKYCDetail(viewId)}
                    className="gap-1.5"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setShowRejectModal(kyc._id)}
                    disabled={actionLoading === kyc._id}
                    className="gap-1.5"
                  >
                    {actionLoading === kyc._id && showRejectModal === kyc._id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <ShieldX className="h-3.5 w-3.5" />
                    )}
                    Reject
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => handleApprove(kyc)}
                    disabled={actionLoading === kyc._id}
                    className="gap-1.5"
                  >
                    {actionLoading === kyc._id && showRejectModal !== kyc._id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <ShieldCheck className="h-3.5 w-3.5" />
                    )}
                    {actionLoading === kyc._id && showRejectModal !== kyc._id ? 'Approving...' : 'Approve'}
                  </Button>
                </div>
              </div>
            )})}
          </CardContent>
        </Card>
      )}

      {/* SHOPKEEPERS GRID */}
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 p-12 text-gray-400">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="text-sm">Loading shopkeepers...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayShopkeepers.map((s) => (
            <Card
              key={s._id}
              className="shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <CardContent className="p-5">
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 font-bold text-white">
                      {(s.shopkeeperProfile?.shopName || s.name || 'S')[0]}
                    </div>

                    <div>
                      <div className="font-semibold">
                        {s.shopkeeperProfile?.shopName || s.name || 'Shop'}
                      </div>

                      <div className="text-xs text-gray-500">
                        {s.shopkeeperProfile?.ownerName || s.fullname || s.owner} ·{" "}
                        {s.city || 'N/A'}
                      </div>
                    </div>
                  </div>

                  <StatusBadge
                    status={s.roleDetails?.shopkeeper?.status === 'active' ? 'Approved' : s.roleDetails?.shopkeeper?.status === 'pending' ? 'Pending' : s.kyc === 'active' ? 'Approved' : s.kyc === 'pending' ? 'Pending' : 'Rejected'}
                  />
                </div>

                {/* STATS */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-gray-100 p-2">
                    <div className="text-[10px] text-gray-500">
                      Orders
                    </div>

                    <div className="text-sm font-semibold">
                      {s.orders || 0}
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-100 p-2">
                    <div className="text-[10px] text-gray-500">
                      Revenue
                    </div>

                    <div className="text-sm font-semibold">
                      {fmtINR(
                        s.revenue || 0
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-100 p-2">
                    <div className="text-[10px] text-gray-500">
                      Rating
                    </div>

                    <div className="text-sm font-semibold">
                      ⭐ {s.rating || 0}
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Package className="mr-1.5 h-3.5 w-3.5" />
                    Products
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    View details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {pagination.pages > 1 && (
        <Card className="shadow-sm">
          <CardContent className="flex items-center justify-between p-5">
            <div className="text-sm text-gray-500">
              Showing page {pagination.page} of {pagination.pages} ({pagination.total} total shopkeepers)
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
          </CardContent>
        </Card>
      )}

      {/* REJECT MODAL */}
      {showRejectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRejectModal(null);
              setRejectReason('');
            }
          }}
        >
          <Card className="w-full max-w-md mx-4 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                  <ShieldX className="h-5 w-5 text-red-700" />
                </div>
                <div>
                  <CardTitle className="text-base">Reject Shopkeeper KYC</CardTitle>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Provide a reason for rejecting this shopkeeper
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowRejectModal(null);
                  setRejectReason('');
                }}
                className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-4">
                {/* KYC info */}
                <div className="flex items-center gap-3 rounded-xl bg-red-50 p-3 border border-red-100">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-red-100 text-xs font-semibold text-red-700">
                      {getKYCInitials(
                        pendingKYCs.find((k) => k._id === showRejectModal) || {}
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {getKYCShopName(
                        pendingKYCs.find((k) => k._id === showRejectModal) || {}
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {getKYCOwnerName(
                        pendingKYCs.find((k) => k._id === showRejectModal) || {}
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason for rejection</label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter reason for rejection..."
                    className="mt-1 w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all resize-none"
                    rows={4}
                    autoFocus
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowRejectModal(null);
                      setRejectReason('');
                    }}
                    disabled={actionLoading === showRejectModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    className="flex-1 gap-1.5"
                    onClick={() => handleReject(showRejectModal)}
                    disabled={actionLoading === showRejectModal || !rejectReason.trim()}
                  >
                    {actionLoading === showRejectModal ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Rejecting...
                      </>
                    ) : (
                      <>
                        <ShieldX className="h-3.5 w-3.5" />
                        Reject KYC
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* KYC DETAIL MODAL */}
      {showKycDetailModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowKycDetailModal(false);
              setKycDetail(null);
            }
          }}
        >
          <Card className="w-full max-w-lg mx-4 shadow-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4 sticky top-0 bg-white z-10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <FileText className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <CardTitle className="text-base">Shopkeeper KYC Details</CardTitle>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Document details and verification info
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowKycDetailModal(false);
                  setKycDetail(null);
                }}
                className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </CardHeader>
            <CardContent className="p-5">
              {kycDetailLoading ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-gray-400">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="text-sm">Loading KYC details...</span>
                </div>
              ) : kycDetail ? (
                <div className="space-y-4">
                  {/* Applicant info */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start rounded-xl bg-gray-50 p-4">
                    {(kycDetail.kyc?.shopImage || kycDetail.shopImage || kycDetail.kyc?.shopkeeperId?.shopImage) && (
                      <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                        <img 
                          src={kycDetail.kyc?.shopImage || kycDetail.shopImage || kycDetail.kyc?.shopkeeperId?.shopImage} 
                          alt="Shop" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-1">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Shop / Owner</h3>
                      <div className="text-lg font-bold text-gray-900">{kycDetail.kyc?.shopkeeperId?.shopName || kycDetail.shopName || kycDetail.kyc?.shopName || 'N/A'}</div>
                      <div className="text-sm font-medium text-gray-700">{kycDetail.kyc?.shopkeeperId?.userId?.fullname || kycDetail.ownerName || kycDetail.kyc?.ownerName || 'N/A'}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Phone className="h-3 w-3" /> {kycDetail.kyc?.shopkeeperId?.userId?.phone || kycDetail.userId?.phone || kycDetail.kyc?.userId?.phone || kycDetail.phone || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <FileText className="h-3 w-3" /> {kycDetail.kyc?.shopkeeperId?.userId?.email || kycDetail.userId?.email || kycDetail.kyc?.userId?.email || kycDetail.email || 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* KYC Status */}
                  <div className="rounded-xl bg-gray-50 p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</h3>
                    <StatusBadge status={kycDetail.kyc?.kycStatus || 'PENDING'} />
                    {kycDetail.kyc?.createdAt && (
                      <div className="text-xs text-gray-500 mt-2">
                        Submitted: {new Date(kycDetail.kyc.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    )}
                  </div>

                  {/* Documents */}
                  <div className="rounded-xl bg-gray-50 p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Documents</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {kycDetail.kyc?.aadhaarCard && (
                        <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3">
                          <div className="flex items-center gap-2 text-sm font-medium"><FileText className="h-4 w-4 text-blue-500" /> Aadhaar Card</div>
                          <a href={kycDetail.kyc.aadhaarCard} target="_blank" rel="noopener noreferrer" className="block rounded-md overflow-hidden border border-gray-100 h-32 bg-gray-50 hover:opacity-90 transition-opacity relative group">
                            <img src={kycDetail.kyc.aadhaarCard} alt="Aadhaar" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                            <div className="hidden h-full items-center justify-center text-xs text-blue-600 font-medium underline">View Document</div>
                          </a>
                        </div>
                      )}
                      {kycDetail.kyc?.panCard && (
                        <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3">
                          <div className="flex items-center gap-2 text-sm font-medium"><FileText className="h-4 w-4 text-blue-500" /> PAN Card</div>
                          <a href={kycDetail.kyc.panCard} target="_blank" rel="noopener noreferrer" className="block rounded-md overflow-hidden border border-gray-100 h-32 bg-gray-50 hover:opacity-90 transition-opacity relative group">
                            <img src={kycDetail.kyc.panCard} alt="PAN Card" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                            <div className="hidden h-full items-center justify-center text-xs text-blue-600 font-medium underline">View Document</div>
                          </a>
                        </div>
                      )}
                      {kycDetail.kyc?.shopLicense && (
                        <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3">
                          <div className="flex items-center gap-2 text-sm font-medium"><FileText className="h-4 w-4 text-blue-500" /> Shop License</div>
                          <a href={kycDetail.kyc.shopLicense} target="_blank" rel="noopener noreferrer" className="block rounded-md overflow-hidden border border-gray-100 h-32 bg-gray-50 hover:opacity-90 transition-opacity relative group">
                            <img src={kycDetail.kyc.shopLicense} alt="Shop License" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                            <div className="hidden h-full items-center justify-center text-xs text-blue-600 font-medium underline">View Document</div>
                          </a>
                        </div>
                      )}
                      {kycDetail.kyc?.gstNumber && (
                        <div className="flex flex-col justify-center gap-2 rounded-lg border border-gray-200 bg-white p-3 sm:col-span-2">
                          <div className="flex items-center gap-2 text-sm font-medium"><FileText className="h-4 w-4 text-blue-500" /> GST Number</div>
                          <div className="text-sm font-mono bg-gray-50 p-2 rounded border border-gray-100">{kycDetail.kyc.gstNumber}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rejection reason if any */}
                  {kycDetail.kyc?.rejectionReason && (
                    <div className="rounded-xl bg-red-50 p-4 border border-red-100">
                      <h3 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">Rejection Reason</h3>
                      <p className="text-sm text-red-700">{kycDetail.kyc.rejectionReason}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">No details available</div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Inline animation keyframes */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}