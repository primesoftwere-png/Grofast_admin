import toast from 'react-hot-toast';
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { walletAPI } from "@/lib/api";
import { Wallet, ArrowUpRight, ArrowDownLeft, IndianRupee, Plus, Minus, RefreshCw, X } from "lucide-react";

const fmtINR = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function WalletPage() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [modal, setModal] = useState(null); // { wallet, type: 'credit'|'debit' }
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [processing, setProcessing] = useState(false);

  const totalBalance = wallets.reduce((s, w) => s + (w.balance || 0), 0);
  const totalEarnings = wallets.reduce((s, w) => s + (w.totalEarnings || 0), 0);

  const fetchWallets = useCallback(async () => {
    try {
      setLoading(true); setError("");
      const res = await walletAPI.getList({ page, limit: 20 });
      setWallets(res.data || []);
      setPagination(res.pagination || {});
    } catch { setError("Failed to load wallets"); }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchWallets(); }, [fetchWallets]);

  const handleTransaction = async () => {
    if (!amount || Number(amount) <= 0) return toast.error("Enter a valid amount");
    try {
      setProcessing(true);
      if (modal.type === "credit") await walletAPI.credit(modal.wallet._id, { amount: Number(amount), note });
      else await walletAPI.debit(modal.wallet._id, { amount: Number(amount), note });
      setModal(null); setAmount(""); setNote("");
      fetchWallets();
    } catch (e) { toast.error(e.response?.data?.message || "Transaction failed"); }
    finally { setProcessing(false); }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <p className="mt-1 text-sm text-gray-500">Shopkeeper wallet management · {pagination.total || 0} wallets</p>
        </div>
        <button onClick={fetchWallets} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          <RefreshCw className="h-4 w-4"/> Refresh
        </button>
      </div>

      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Wallet Balance", value: fmtINR(totalBalance), icon: Wallet },
          { label: "Total Earnings", value: fmtINR(totalEarnings), icon: ArrowUpRight },
          { label: "Total Wallets", value: pagination.total || 0, icon: IndianRupee },
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

      {/* Wallet Table */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="text-lg font-semibold">Shopkeeper Wallets</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-left text-xs uppercase text-gray-500">
              <tr>
                {["Shopkeeper","Balance","Total Earnings","Total Withdrawn","Actions"].map(h => (
                  <th key={h} className="px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-400">Loading wallets...</td></tr>
              ) : wallets.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-400">No wallets found</td></tr>
              ) : wallets.map(w => (
                <tr key={w._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="font-medium">{w.shopkeeperId?.fullname || w.shopkeeperId || "—"}</div>
                    <div className="text-xs text-gray-400">{w.shopkeeperId?.email}</div>
                  </td>
                  <td className="px-5 py-3 font-semibold text-green-600">{fmtINR(w.balance)}</td>
                  <td className="px-5 py-3">{fmtINR(w.totalEarnings)}</td>
                  <td className="px-5 py-3 text-gray-500">{fmtINR(w.totalWithdrawn)}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => { setModal({ wallet: w, type: "credit" }); setAmount(""); setNote(""); }}
                        className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-xs text-green-700 hover:bg-green-100">
                        <Plus className="h-3 w-3"/>Credit
                      </button>
                      <button onClick={() => { setModal({ wallet: w, type: "debit" }); setAmount(""); setNote(""); }}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2 py-1 text-xs text-red-700 hover:bg-red-100">
                        <Minus className="h-3 w-3"/>Debit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

      {/* Credit/Debit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{modal.type === "credit" ? "Credit Wallet" : "Debit Wallet"}</h2>
              <button onClick={() => setModal(null)} className="rounded-lg p-2 hover:bg-gray-100"><X className="h-4 w-4"/></button>
            </div>
            <p className="text-sm text-gray-500 mb-4">{modal.wallet.shopkeeperId?.fullname} · Current Balance: <strong>{fmtINR(modal.wallet.balance)}</strong></p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Amount (₹) *</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount"
                  className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
              </div>
              <div>
                <label className="text-sm font-medium">Note</label>
                <input value={note} onChange={e => setNote(e.target.value)} placeholder="Optional note"
                  className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setModal(null)} className="flex-1 rounded-xl border py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button onClick={handleTransaction} disabled={processing}
                  className={`flex-1 rounded-xl py-2 text-sm font-medium text-white disabled:opacity-50 ${modal.type === "credit" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}>
                  {processing ? "Processing..." : modal.type === "credit" ? "Credit" : "Debit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}