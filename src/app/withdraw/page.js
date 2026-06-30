import toast from 'react-hot-toast';
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { withdrawAPI } from "@/lib/api";
import { Clock, IndianRupee, ArrowDownToLine, Check, X, RefreshCw } from "lucide-react";

const fmtINR = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function WithdrawPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [totalPending, setTotalPending] = useState(0);
  const [filter, setFilter] = useState("pending");
  const [actioning, setActioning] = useState(null);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true); setError("");
      const params = { page, limit: 20 };
      if (filter !== "all") params.status = filter;
      const res = await withdrawAPI.getList(params);
      setRequests(res.data || []);
      setPagination(res.pagination || {});
      if (res.totalPending !== undefined) setTotalPending(res.totalPending);
    } catch { setError("Failed to load withdraw requests"); }
    finally { setLoading(false); }
  }, [page, filter]);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  const handleApprove = async (id) => {
    if (!confirm("Approve this withdrawal?")) return;
    try {
      setActioning(id);
      await withdrawAPI.approve(id, {});
      fetchRequests();
    } catch { toast.error("Failed to approve"); }
    finally { setActioning(null); }
  };

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    try {
      setActioning(id);
      await withdrawAPI.reject(id, { reason });
      fetchRequests();
    } catch { toast.error("Failed to reject"); }
    finally { setActioning(null); }
  };

  const pendingCount = requests.filter(r => r.status === "pending").length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Withdraw Requests</h1>
          <p className="mt-1 text-sm text-gray-500">Approve or reject pending payouts</p>
        </div>
        <button onClick={fetchRequests} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          <RefreshCw className="h-4 w-4"/> Refresh
        </button>
      </div>

      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Pending Requests", value: pendingCount, icon: Clock },
          { label: "Pending Amount", value: fmtINR(totalPending), icon: IndianRupee },
          { label: "Total Requests", value: pagination.total || 0, icon: ArrowDownToLine },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-500">{s.label}</div>
                <div className="mt-2 text-2xl font-bold">{s.value}</div>
              </div>
              <div className="rounded-xl bg-gray-100 p-3"><s.icon className="h-5 w-5"/></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["all", "pending", "approved", "rejected"].map(f => (
          <button key={f} onClick={() => { setFilter(f); setPage(1); }}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${filter === f ? "bg-black text-white" : "border border-gray-200 hover:bg-gray-50"}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Requests */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="text-lg font-semibold">Requests Queue</h2>
        </div>
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No {filter !== "all" ? filter : ""} requests found</div>
        ) : (
          <div className="divide-y">
            {requests.map(r => (
              <div key={r._id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-medium">{r.shopkeeperId?.fullname || "Unknown"}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {r.payoutType?.toUpperCase()} · {r.bankName || r.upiId || "—"} · {r._id?.toString().slice(-8).toUpperCase()}
                  </div>
                  {r.rejectionReason && (
                    <div className="mt-1 text-xs text-red-500">Rejected: {r.rejectionReason}</div>
                  )}
                </div>
                <div className="text-xl font-bold">{fmtINR(r.amount)}</div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    r.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                    r.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>{r.status}</span>
                  {r.status === "pending" && (
                    <div className="flex gap-2">
                      <button onClick={() => handleReject(r._id)} disabled={actioning === r._id}
                        className="inline-flex items-center gap-1 rounded-xl border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50">
                        <X className="h-3.5 w-3.5"/>Reject
                      </button>
                      <button onClick={() => handleApprove(r._id)} disabled={actioning === r._id}
                        className="inline-flex items-center gap-1 rounded-xl bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-black/90 disabled:opacity-50">
                        <Check className="h-3.5 w-3.5"/>Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t">
            <span className="text-xs text-gray-500">Page {pagination.page} of {pagination.pages}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded-lg border px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-gray-50">Prev</button>
              <button disabled={page >= pagination.pages} onClick={() => setPage(p => p + 1)} className="rounded-lg border px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-gray-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}