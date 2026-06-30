import toast from 'react-hot-toast';
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { reportAPI } from "@/lib/api";
import { FileText, Download, RefreshCw, TrendingUp, ShoppingBag, Users, DollarSign } from "lucide-react";

const fmtINR = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function ReportsPage() {
  const [salesData, setSalesData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [orderStats, setOrderStats] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true); setError("");
      const [sales, revenue, orders, users] = await Promise.allSettled([
        reportAPI.getSales({}),
        reportAPI.getRevenue({}),
        reportAPI.getOrders({}),
        reportAPI.getUsers({}),
      ]);
      if (sales.status === "fulfilled") setSalesData(sales.value.data || []);
      if (revenue.status === "fulfilled") setRevenueData(revenue.value.data || []);
      if (orders.status === "fulfilled") setOrderStats(orders.value.data || []);
      if (users.status === "fulfilled") setUserStats(users.value.data || []);
    } catch { setError("Failed to load reports"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  const handleExport = async (type) => {
    try {
      setExporting(type);
      const res = await reportAPI.export({ type });
      const json = JSON.stringify(res.data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `${type}-report.json`; a.click();
      URL.revokeObjectURL(url);
    } catch { toast.error("Export failed"); }
    finally { setExporting(null); }
  };

  const totalRevenue = revenueData.reduce((s, r) => s + (r.revenue || 0), 0);
  const totalOrders = orderStats.reduce((s, o) => s + (o.count || 0), 0);
  const totalUsers = userStats.reduce((s, u) => s + (u.count || 0), 0);
  const deliveredCount = orderStats.find(o => o._id === "DELIVERED")?.count || 0;

  const REPORT_TYPES = [
    { key: "orders", name: "Sales Report", desc: "Daily orders & revenue breakdown", icon: ShoppingBag },
    { key: "orders", name: "Order Status Report", desc: "Breakdown by order status", icon: TrendingUp },
    { key: "users", name: "User Report", desc: "Customer & shopkeeper registrations", icon: Users },
    { key: "orders", name: "Revenue Report", desc: "Monthly revenue trends", icon: DollarSign },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">Analytics snapshots & exportable data</p>
        </div>
        <button onClick={fetchReports} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}/> Refresh
        </button>
      </div>

      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: loading ? "—" : fmtINR(totalRevenue), icon: DollarSign },
          { label: "Total Orders", value: loading ? "—" : totalOrders, icon: ShoppingBag },
          { label: "Delivered Orders", value: loading ? "—" : deliveredCount, icon: TrendingUp },
          { label: "Total Users", value: loading ? "—" : totalUsers, icon: Users },
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

      {/* Order Status Breakdown */}
      {orderStats.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">Order Status Breakdown</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {orderStats.map(o => (
              <div key={o._id} className="rounded-xl border p-3 text-center">
                <div className="text-2xl font-bold">{o.count}</div>
                <div className="text-xs text-gray-500 mt-1">{o._id?.replace("_", " ")}</div>
                <div className="text-xs font-medium text-gray-700 mt-1">{fmtINR(o.total)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Revenue */}
      {revenueData.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b text-left text-xs uppercase text-gray-500">
                <tr>
                  <th className="pb-3">Month</th>
                  <th className="pb-3">Orders</th>
                  <th className="pb-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.map(r => (
                  <tr key={r._id} className="border-b border-gray-100">
                    <td className="py-3 font-medium">{r._id}</td>
                    <td className="py-3">{r.orders}</td>
                    <td className="py-3 font-medium text-green-600">{fmtINR(r.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Breakdown */}
      {userStats.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">User Breakdown by Role</h2>
          <div className="flex flex-wrap gap-3">
            {userStats.map(u => (
              <div key={u._id} className="rounded-xl border px-5 py-3">
                <div className="text-2xl font-bold">{u.count}</div>
                <div className="text-sm text-gray-500 mt-1 capitalize">{u._id}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export Reports */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-4">Export Reports</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REPORT_TYPES.map((r, i) => (
            <div key={i} className="rounded-xl border p-4 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5">
                  <r.icon className="h-5 w-5"/>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
                  <button onClick={() => handleExport(r.key)} disabled={exporting === r.key}
                    className="mt-3 inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-gray-50 disabled:opacity-50">
                    <Download className="h-3 w-3"/>
                    {exporting === r.key ? "Exporting..." : "Export JSON"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}