import toast from 'react-hot-toast';
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { couponAPI } from "@/lib/api";
import { Plus, Ticket, Copy, Trash2, X, Power, PowerOff, RefreshCw } from "lucide-react";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [actioning, setActioning] = useState(null);
  const [form, setForm] = useState({
    offerName: "", couponCode: "", couponType: "percentage", discountValue: "", minOrderAmount: "",
    maxDiscountAmount: "", usageLimit: "", validFrom: "", validUntil: "",
  });

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true); setError("");
      const res = await couponAPI.getList({ limit: 50 });
      setCoupons(res.data || []);
    } catch { setError("Failed to load coupons"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const handleCreate = async () => {
    if (!form.offerName || !form.couponCode || !form.discountValue || !form.validFrom || !form.validUntil)
      return toast.error("Offer name, code, discount value, and dates are required");
    try {
      setSaving(true);
      await couponAPI.create({ ...form, discountValue: Number(form.discountValue), minOrderAmount: Number(form.minOrderAmount || 0), maxDiscountAmount: Number(form.maxDiscountAmount || 0), usageLimit: Number(form.usageLimit || 0) });
      setShowForm(false);
      setForm({ offerName: "", couponCode: "", couponType: "percentage", discountValue: "", minOrderAmount: "", maxDiscountAmount: "", usageLimit: "", validFrom: "", validUntil: "" });
      fetchCoupons();
    } catch (e) { toast.error("Failed to create coupon: " + (e.response?.data?.message || e.message)); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, code) => {
    if (!confirm(`Delete coupon ${code}?`)) return;
    try { await couponAPI.delete(id); setCoupons(c => c.filter(x => x._id !== id)); }
    catch { toast.error("Failed to delete coupon"); }
  };

  const handleToggle = async (coupon) => {
    try {
      setActioning(coupon._id);
      if (coupon.status === "active") await couponAPI.deactivate(coupon._id);
      else await couponAPI.activate(coupon._id);
      fetchCoupons();
    } catch { toast.error("Failed to update status"); }
    finally { setActioning(null); }
  };

  const pct = (used, limit) => limit ? Math.round((used / limit) * 100) : 0;

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
          <p className="mt-1 text-sm text-gray-500">{coupons.length} promotional codes</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchCoupons} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
            <RefreshCw className="h-4 w-4"/>
          </button>
          <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90">
            <Plus className="h-4 w-4"/>New coupon
          </button>
        </div>
      </div>

      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(0).map((_, i) => <div key={i} className="h-48 rounded-2xl bg-gray-100 animate-pulse"/>)}
        </div>
      ) : coupons.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-16 text-center text-gray-400">
          <Ticket className="mx-auto h-10 w-10 mb-3 opacity-40"/>
          <p className="font-medium">No coupons yet</p>
          <button onClick={() => setShowForm(true)} className="mt-4 inline-flex items-center gap-1 rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-black/90">
            <Plus className="h-4 w-4"/>Create first coupon
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map(c => (
            <div key={c._id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative bg-black p-5 text-white">
                <Ticket className="absolute right-3 top-3 h-5 w-5 opacity-30"/>
                <div className="text-xs opacity-70">Coupon code</div>
                <div className="text-2xl font-bold tracking-wider">{c.couponCode}</div>
                <div className="text-sm font-semibold mb-1 opacity-90">{c.offerName}</div>
                <div className="mt-1 text-sm opacity-80">
                  {c.couponType === "percentage" ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                  {c.minOrderAmount > 0 && ` · Min ₹${c.minOrderAmount}`}
                </div>
              </div>
              <div className="space-y-3 p-4">
                {c.usageLimit > 0 && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Used</span>
                      <span>{c.usageCount}/{c.usageLimit}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full bg-black rounded-full" style={{ width: `${pct(c.usageCount, c.usageLimit)}%` }}/>
                    </div>
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  Valid: {new Date(c.validFrom).toLocaleDateString("en-IN")} – {new Date(c.validUntil).toLocaleDateString("en-IN")}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    c.status === "active" ? "bg-green-100 text-green-700" :
                    c.status === "expired" ? "bg-gray-100 text-gray-500" : "bg-yellow-100 text-yellow-700"
                  }`}>{c.status}</span>
                  <div className="flex gap-1">
                    <button onClick={() => navigator.clipboard.writeText(c.couponCode)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                      <Copy className="h-3.5 w-3.5"/>
                    </button>
                    {c.status !== "expired" && (
                      <button onClick={() => handleToggle(c)} disabled={actioning === c._id}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        {c.status === "active" ? <PowerOff className="h-3.5 w-3.5 text-orange-500"/> : <Power className="h-3.5 w-3.5 text-green-500"/>}
                      </button>
                    )}
                    <button onClick={() => handleDelete(c._id, c.couponCode)}
                      className="rounded-lg p-1.5 text-red-400 hover:bg-red-50">
                      <Trash2 className="h-3.5 w-3.5"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">New Coupon</h2>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-2 hover:bg-gray-100"><X className="h-4 w-4"/></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Offer Name *</label>
                <input value={form.offerName} onChange={e => setForm(f => ({ ...f, offerName: e.target.value }))}
                  placeholder="Summer Sale 2026"
                  className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Coupon Code *</label>
                  <input value={form.couponCode} onChange={e => setForm(f => ({ ...f, couponCode: e.target.value.toUpperCase() }))}
                    placeholder="GROFAST50"
                    className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm font-mono uppercase outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <select value={form.couponType} onChange={e => setForm(f => ({ ...f, couponType: e.target.value }))}
                    className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10">
                    <option value="percentage">Percentage %</option>
                    <option value="flat">Flat ₹</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Discount Value *</label>
                  <input type="number" value={form.discountValue} onChange={e => setForm(f => ({ ...f, discountValue: e.target.value }))}
                    placeholder={form.couponType === "percentage" ? "50" : "100"}
                    className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
                </div>
                <div>
                  <label className="text-sm font-medium">Min Order Amount</label>
                  <input type="number" value={form.minOrderAmount} onChange={e => setForm(f => ({ ...f, minOrderAmount: e.target.value }))}
                    placeholder="299"
                    className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Max Discount (₹)</label>
                  <input type="number" value={form.maxDiscountAmount} onChange={e => setForm(f => ({ ...f, maxDiscountAmount: e.target.value }))}
                    placeholder="500"
                    className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
                </div>
                <div>
                  <label className="text-sm font-medium">Usage Limit</label>
                  <input type="number" value={form.usageLimit} onChange={e => setForm(f => ({ ...f, usageLimit: e.target.value }))}
                    placeholder="1000"
                    className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Valid From *</label>
                  <input type="date" value={form.validFrom} onChange={e => setForm(f => ({ ...f, validFrom: e.target.value }))}
                    className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
                </div>
                <div>
                  <label className="text-sm font-medium">Valid Until *</label>
                  <input type="date" value={form.validUntil} onChange={e => setForm(f => ({ ...f, validUntil: e.target.value }))}
                    className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button onClick={handleCreate} disabled={saving}
                  className="flex-1 rounded-xl bg-black py-2 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50">
                  {saving ? "Creating..." : "Create Coupon"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}