"use client";
import React, { useState, useEffect, useCallback } from "react";
import { orderAPI, deliveryBoyAPI } from "@/lib/api";
import { Search, Filter, Download, Eye, X, CheckCircle, XCircle, RefreshCw } from "lucide-react";

const fmtINR = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");
const STATUS_STYLES = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  ASSIGNED: "bg-indigo-100 text-indigo-700",
  PICKED_UP: "bg-purple-100 text-purple-700",
  IN_TRANSIT: "bg-orange-100 text-orange-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [selected, setSelected] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const params = { page, limit: 20 };
      if (tab !== "all") params.status = tab;
      if (search) params.search = search;
      const res = await orderAPI.getList(params);
      setOrders(res.data || []);
      setPagination(res.pagination || {});
    } catch (e) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [page, tab, search]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleCancel = async (id) => {
    if (!confirm("Cancel this order?")) return;
    try {
      setActionLoading(true);
      await orderAPI.cancel(id, { reason: "Cancelled by admin" });
      fetchOrders();
      setSelected(null);
    } finally { setActionLoading(false); }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      setActionLoading(true);
      await orderAPI.updateStatus(id, { status });
      fetchOrders();
    } finally { setActionLoading(false); }
  };

  const TABS = ["all", "PENDING", "CONFIRMED", "ASSIGNED", "IN_TRANSIT", "DELIVERED", "CANCELLED"];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">Real-time order management · {pagination.total || 0} total</p>
        </div>
        <button onClick={fetchOrders} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="space-y-4 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search by order id, customer..."
                className="h-10 w-full rounded-xl border border-gray-300 bg-white pl-9 pr-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {TABS.map(t => (
                <button key={t} onClick={() => { setTab(t); setPage(1); }}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${tab === t ? "bg-black text-white" : "border border-gray-200 hover:bg-gray-50"}`}>
                  {t === "all" ? "All" : t.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b text-left text-xs uppercase text-gray-500">
                <tr>
                  {["Order","Customer","Shop","Rider","Total","Payment","Status","Actions"].map(h => (
                    <th key={h} className="px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-500">Loading orders...</td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-400">No orders found</td></tr>
                ) : orders.map(o => (
                  <tr key={o._id} className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-mono text-xs font-medium">{o.orderNumber}</div>
                      <div className="text-[11px] text-gray-400">{new Date(o.createdAt).toLocaleString("en-IN", { dateStyle:"short", timeStyle:"short" })}</div>
                    </td>
                    <td className="px-4 py-3">{o.customerId?.fullname || "—"}</td>
                    <td className="px-4 py-3 text-gray-500">{o.shopId?.fullname || "—"}</td>
                    <td className="px-4 py-3 text-gray-500">{o.deliveryBoyId?.fullname || "—"}</td>
                    <td className="px-4 py-3 font-medium">{fmtINR(o.totalAmount)}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border px-2 py-0.5 text-xs">{o.paymentMethod}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLES[o.orderStatus] || "bg-gray-100 text-gray-700"}`}>
                        {o.orderStatus?.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(o)} className="rounded-lg p-1.5 hover:bg-gray-100">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.pages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500">Page {pagination.page} of {pagination.pages}</span>
              <div className="flex gap-2">
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                  className="rounded-lg border px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-gray-50">Prev</button>
                <button disabled={page >= pagination.pages} onClick={() => setPage(p => p + 1)}
                  className="rounded-lg border px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-gray-50">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Side Panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => setSelected(null)}>
          <div className="h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-mono text-lg font-semibold">{selected.orderNumber}</h2>
                <p className="text-sm text-gray-500">{selected.paymentMethod} · {selected.orderStatus?.replace("_"," ")}</p>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-lg p-2 hover:bg-gray-100"><X className="h-4 w-4"/></button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border p-4 space-y-2">
                <div className="text-xs font-medium uppercase text-gray-400">Customer</div>
                <div className="font-medium">{selected.customerId?.fullname}</div>
                <div className="text-sm text-gray-500">{selected.customerId?.phone} · {selected.customerId?.email}</div>
              </div>
              <div className="rounded-xl border p-4 space-y-2">
                <div className="text-xs font-medium uppercase text-gray-400">Shop</div>
                <div className="font-medium">{selected.shopId?.fullname || "—"}</div>
              </div>
              <div className="rounded-xl border p-4 space-y-2">
                <div className="text-xs font-medium uppercase text-gray-400">Delivery Boy</div>
                <div className="font-medium">{selected.deliveryBoyId?.fullname || "Not assigned"}</div>
              </div>
              <div className="rounded-xl border p-4 space-y-3">
                <div className="text-xs font-medium uppercase text-gray-400">Bill Summary</div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>{fmtINR(selected.subtotal)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Delivery</span><span>{fmtINR(selected.deliveryCharge)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Tax</span><span>{fmtINR(selected.taxAmount)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Discount</span><span>-{fmtINR(selected.discountAmount)}</span></div>
                <div className="h-px bg-gray-200"/>
                <div className="flex justify-between font-semibold"><span>Total</span><span>{fmtINR(selected.totalAmount)}</span></div>
              </div>

              <div className="flex gap-2">
                {selected.orderStatus !== "CANCELLED" && selected.orderStatus !== "DELIVERED" && (
                  <button onClick={() => handleCancel(selected._id)} disabled={actionLoading}
                    className="flex-1 rounded-xl border border-red-200 bg-red-50 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:opacity-50">
                    <XCircle className="inline h-4 w-4 mr-1"/>Cancel
                  </button>
                )}
                <button onClick={() => setSelected(null)} className="flex-1 rounded-xl border py-2 text-sm font-medium hover:bg-gray-50">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}