"use client";
import React, { useState, useEffect } from "react";
import { settingsAPI } from "@/lib/api";
import { Save, RefreshCw, Settings, DollarSign, Bell, Globe } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    settingsAPI.get().then(res => {
      setSettings(res.data || {});
    }).catch(() => setError("Failed to load settings"))
    .finally(() => setLoading(false));
  }, []);

  const handleSave = async (section, data) => {
    try {
      setSaving(section); setSuccess(""); setError("");
      if (section === "payment") await settingsAPI.updatePayment(data);
      else if (section === "notification") await settingsAPI.updateNotification(data);
      else await settingsAPI.update({ [section]: data });
      setSuccess("Settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch { setError("Failed to save settings"); }
    finally { setSaving(null); }
  };

  const updateField = (section, key, value) => {
    setSettings(s => ({ ...s, [section]: { ...(s?.[section] || {}), [key]: value } }));
  };

  const TABS = [
    { key: "general", label: "General", icon: Globe },
    { key: "payment", label: "Payment", icon: DollarSign },
    { key: "notification", label: "Notifications", icon: Bell },
  ];

  if (loading) return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="animate-pulse space-y-4">
        {[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-gray-100"/>)}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Platform-wide configuration</p>
      </div>

      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}
      {success && <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700">{success}</div>}

      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${activeTab === t.key ? "bg-black text-white" : "border border-gray-200 hover:bg-gray-50"}`}>
            <t.icon className="h-4 w-4"/>{t.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-5 flex items-center gap-2"><Globe className="h-5 w-5"/>General Settings</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { key: "appName", label: "App Name", type: "text", placeholder: "GroFast" },
              { key: "supportEmail", label: "Support Email", type: "email", placeholder: "support@grofast.app" },
              { key: "supportPhone", label: "Support Phone", type: "text", placeholder: "+91 1800-000-0000" },
              { key: "currency", label: "Currency", type: "text", placeholder: "INR" },
              { key: "timezone", label: "Timezone", type: "text", placeholder: "Asia/Kolkata" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-sm font-medium text-gray-700">{f.label}</label>
                <input type={f.type} value={settings?.general?.[f.key] || ""} placeholder={f.placeholder}
                  onChange={e => updateField("general", f.key, e.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
              </div>
            ))}
          </div>
          <button onClick={() => handleSave("general", settings?.general)} disabled={saving === "general"}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50">
            <Save className="h-4 w-4"/>{saving === "general" ? "Saving..." : "Save General Settings"}
          </button>
        </div>
      )}

      {/* Payment Settings */}
      {activeTab === "payment" && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-5 flex items-center gap-2"><DollarSign className="h-5 w-5"/>Payment Settings</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { key: "commissionPercent", label: "Commission (%)", type: "number", placeholder: "12" },
              { key: "deliveryCharge", label: "Delivery Charge (₹)", type: "number", placeholder: "35" },
              { key: "platformFee", label: "Platform Fee (₹)", type: "number", placeholder: "5" },
              { key: "minWithdrawAmount", label: "Min Withdraw Amount (₹)", type: "number", placeholder: "500" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-sm font-medium text-gray-700">{f.label}</label>
                <input type={f.type} value={settings?.payment?.[f.key] || ""} placeholder={f.placeholder}
                  onChange={e => updateField("payment", f.key, Number(e.target.value))}
                  className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
              </div>
            ))}
          </div>
          <button onClick={() => handleSave("payment", settings?.payment)} disabled={saving === "payment"}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50">
            <Save className="h-4 w-4"/>{saving === "payment" ? "Saving..." : "Save Payment Settings"}
          </button>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "notification" && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-5 flex items-center gap-2"><Bell className="h-5 w-5"/>Notification Settings</h2>
          <div className="space-y-4">
            {[
              { key: "newOrderAlert", label: "New order alerts" },
              { key: "riderOffline", label: "Rider offline alerts" },
              { key: "withdrawRequests", label: "Withdraw request alerts" },
              { key: "kycSubmissions", label: "KYC submission alerts" },
              { key: "dailySummaryEmail", label: "Daily summary email" },
            ].map(f => (
              <div key={f.key} className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <div className="font-medium text-sm">{f.label}</div>
                </div>
                <button onClick={() => updateField("notification", f.key, !settings?.notification?.[f.key])}
                  className={`relative h-6 w-11 rounded-full transition-all ${settings?.notification?.[f.key] ? "bg-black" : "bg-gray-300"}`}>
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${settings?.notification?.[f.key] ? "left-[22px]" : "left-0.5"}`}/>
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => handleSave("notification", settings?.notification)} disabled={saving === "notification"}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50">
            <Save className="h-4 w-4"/>{saving === "notification" ? "Saving..." : "Save Notification Settings"}
          </button>
        </div>
      )}
    </div>
  );
}