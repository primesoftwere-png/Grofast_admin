import toast from 'react-hot-toast';
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { paymentAPI } from "@/lib/api";
import { IndianRupee, CreditCard, Smartphone, Percent, RefreshCw, RotateCcw } from "lucide-react";

const fmtINR = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

const PAY_STATUS = {
  PAID: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-blue-100 text-blue-700",
};

export default function PaymentsPage() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, upiCount: 0, cardCount: 0, codCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [refunding, setRefunding] = useState(null);

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true); setError("");
      const res = await paymentAPI.getList({ page, limit: 20 });
      setTransactions(res.data || []);
      setPagination(res.pagination || {});
      if (res.totalRevenue !== undefined) {
        setStats(s => ({ ...s, totalRevenue: res.totalRevenue }));
      }
      // Calculate method stats
      const all = res.data || [];
      setStats(s => ({
        ...s,
        upiCount: all.filter(o => o.paymentMethod === "ONLINE").length,
        codCount: all.filter(o => o.paymentMethod === "COD").length,
        walletCount: all.filter(o => o.paymentMethod === "WALLET").length,
      }));
    } catch { setError("Failed to load payments"); }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  const handleRefund = async (id) => {
    if (!confirm("Process refund for this payment?")) return;
    try {
      setRefunding(id);
      await paymentAPI.refund(id, {});
      fetchPayments();
    } catch { toast.error("Failed to process refund"); }
    finally { setRefunding(null); }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="mt-1 text-sm text-gray-500">Transaction history & payment management</p>
        </div>
        <button onClick={fetchPayments} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          <RefreshCw className="h-4 w-4"/> Refresh
        </button>
      </div>

      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: fmtINR(stats.totalRevenue), icon: IndianRupee },
          { label: "Online Payments", value: stats.upiCount, icon: Smartphone },
          { label: "COD Orders", value: stats.codCount, icon: CreditCard },
          { label: "Wallet Payments", value: stats.walletCount || 0, icon: Percent },
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

      {/* Transactions Table */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="text-lg font-semibold">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-left text-xs uppercase text-gray-500">
              <tr>
                {["Order #","Customer","Method","Amount","Status","Date","Actions"].map(h => (
                  <th key={h} className="px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-400">Loading transactions...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-gray-400">No transactions found</td></tr>
              ) : transactions.map(t => (
                <tr key={t._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-5 py-3 font-mono text-xs">{t.orderNumber}</td>
                  <td className="px-5 py-3">{t.customerId?.fullname || "—"}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full border px-2 py-0.5 text-xs">{t.paymentMethod}</span>
                  </td>
                  <td className="px-5 py-3 font-medium">{fmtINR(t.totalAmount)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${PAY_STATUS[t.paymentStatus] || "bg-gray-100 text-gray-600"}`}>
                      {t.paymentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{new Date(t.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-5 py-3">
                    {t.paymentStatus === "PAID" && (
                      <button onClick={() => handleRefund(t._id)} disabled={refunding === t._id}
                        className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs hover:bg-gray-50 disabled:opacity-50">
                        <RotateCcw className="h-3 w-3"/>{refunding === t._id ? "..." : "Refund"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t">
            <span className="text-xs text-gray-500">Page {pagination.page} of {pagination.pages} · {pagination.total} transactions</span>
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