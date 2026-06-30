"use client";
import { Loader2 } from 'lucide-react';

import React, { useState, useEffect } from "react";
import { notificationAPI } from "@/lib/api";

import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Send,
} from "lucide-react";

/* =========================
   MANUAL COMPONENTS
========================= */

function Card({ children, className = "" }) {
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
    <div className={`p-5 ${className}`}>
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
}) {
  const sizeClass =
    size === "sm"
      ? "h-9 px-4 text-sm"
      : "h-10 px-5";

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl bg-black font-medium text-white transition-all hover:bg-black/90 ${sizeClass} ${className}`}
    >
      {children}
    </button>
  );
}

function Switch({
  defaultChecked = false,
}) {
  const [enabled, setEnabled] =
    useState(defaultChecked);

  return (
    <button
      onClick={() =>
        setEnabled(!enabled)
      }
      className={`relative h-6 w-11 rounded-full transition-all ${
        enabled
          ? "bg-black"
          : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
          enabled
            ? "left-[22px]"
            : "left-0.5"
        }`}
      />
    </button>
  );
}

function PageHeader({
  title,
  subtitle,
  actions,
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {subtitle}
        </p>
      </div>

      {actions}
    </div>
  );
}

function Tabs({
  children,
  value,
  onValueChange,
}) {
  return React.Children.map(
    children,
    (child) =>
      React.cloneElement(child, {
        value,
        onValueChange,
      })
  );
}

function TabsList({ children }) {
  return (
    <div className="inline-flex rounded-xl bg-gray-100 p-1">
      {children}
    </div>
  );
}

function TabsTrigger({
  children,
  tabValue,
  value,
  onValueChange,
}) {
  return (
    <button
      onClick={() =>
        onValueChange(tabValue)
      }
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        value === tabValue
          ? "bg-white shadow-sm"
          : "text-gray-500"
      }`}
    >
      {children}
    </button>
  );
}

function TabsContent({
  children,
  tabValue,
  value,
}) {
  if (value !== tabValue) return null;

  return <div>{children}</div>;
}

/* =========================
   DATA
========================= */

const notifications = [
  {
    id: 1,
    title: "New order received",
    body: "Order #GF-29481 placed successfully.",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "Delivery assigned",
    body: "Rahul K. assigned to order GF-29477.",
    time: "5 min ago",
  },
  {
    id: 3,
    title: "Payment completed",
    body: "₹850 payment received.",
    time: "12 min ago",
  },
];

const sms = Array.from(
  { length: 6 },
  (_, i) => ({
    to: `+91 98xxxxx${100 + i}`,
    body: [
      "OTP 4821 for GroFast order",
      "Your order is out for delivery",
      "Order delivered. Rate your experience",
    ][i % 3],
    time: `${i + 2} min ago`,
    status:
      i % 4 === 3
        ? "Failed"
        : "Sent",
  })
);

const emails = Array.from(
  { length: 5 },
  (_, i) => ({
    to: `user${
      i + 1
    }@grofast.app`,
    subject: [
      "Order confirmation #GF-29481",
      "Weekly newsletter",
      "Wallet credited ₹150",
      "KYC approved",
      "Refund processed",
    ][i],
    time: `${i + 1} hr ago`,
    status: "Delivered",
  })
);

/* =========================
   MAIN COMPONENT
========================= */

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("sms");
  const [notifications, setNotifications] = useState([]);
  const [logs, setLogs] = useState({ sms: [], email: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        setLoading(true);
        const logsData = await notificationAPI.getLogs().catch(() => null);
        
        if (logsData?.data) {
          setLogs({
            sms: logsData.data.sms || [],
            email: logsData.data.email || [],
          });
        }
        
        if (logsData?.notifications) {
          setNotifications(logsData.notifications);
        }
      } catch (error) {
        console.error('Failed to fetch notification data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationData();
  }, []);

  // Fallback dummy data
  const defaultNotifications = [
    {
      id: 1,
      title: "New order received",
      body: "Order #GF-29481 placed successfully.",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Delivery assigned",
      body: "Rahul K. assigned to order GF-29477.",
      time: "5 min ago",
    },
    {
      id: 3,
      title: "Payment completed",
      body: "₹850 payment received.",
      time: "12 min ago",
    },
  ];

  const defaultSms = Array.from({ length: 6 }, (_, i) => ({
    to: `+91 98xxxxx${100 + i}`,
    body: [
      "OTP 4821 for GroFast order",
      "Your order is out for delivery",
      "Order delivered. Rate your experience",
    ][i % 3],
    time: `${i + 2} min ago`,
    status: i % 4 === 3 ? "Failed" : "Sent",
  }));

  const defaultEmails = Array.from({ length: 5 }, (_, i) => ({
    to: `user${i + 1}@grofast.app`,
    subject: [
      "Order confirmation #GF-29481",
      "Weekly newsletter",
      "Wallet credited ₹150",
      "KYC approved",
      "Refund processed",
    ][i],
    time: `${i + 1} hr ago`,
    status: "Delivered",
  }));

  const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications;
  const sms = logs.sms.length > 0 ? logs.sms : defaultSms;
  const emails = logs.email.length > 0 ? logs.email : defaultEmails;

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Notifications"
        subtitle="Push, SMS and email reach across all users."
        actions={
          <Button size="sm">
            <Send className="mr-1.5 h-4 w-4" />
            New broadcast
          </Button>
        }
      />

      {/* TOP GRID */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* CHANNELS */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4" />
              Channels
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            {[
              {
                icon: Smartphone,
                label:
                  "Push notifications",
              },
              {
                icon: MessageSquare,
                label: "SMS",
              },
              {
                icon: Mail,
                label: "Email",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border p-3"
              >
                <span className="flex items-center gap-2">
                  <c.icon className="h-4 w-4 text-gray-500" />

                  {c.label}
                </span>

                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ALERTS */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>
              Realtime order alerts
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {loading && <div className="text-center text-sm text-gray-500"><div className="flex items-center justify-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> Loading...</div></div>}
            {!loading && displayNotifications.map((n) => (
              <div
                key={n.id}
                className="flex gap-3 rounded-xl border p-3 transition-colors hover:bg-gray-50"
              >
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-black" />

                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {n.title}
                  </div>

                  <div className="text-xs text-gray-500">
                    {n.body}
                  </div>

                  <div className="mt-1 text-[10px] text-gray-400">
                    {n.time}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* LOGS */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Logs</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger
                tabValue="sms"
                value={activeTab}
                onValueChange={
                  setActiveTab
                }
              >
                SMS
              </TabsTrigger>

              <TabsTrigger
                tabValue="email"
                value={activeTab}
                onValueChange={
                  setActiveTab
                }
              >
                Email
              </TabsTrigger>
            </TabsList>

            {/* SMS */}
            <TabsContent
              tabValue="sms"
              value={activeTab}
            >
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b text-left text-xs uppercase text-gray-500">
                    <tr>
                      <th className="py-2">
                        To
                      </th>

                      <th className="py-2">
                        Message
                      </th>

                      <th className="py-2">
                        Time
                      </th>

                      <th className="py-2">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {sms.map((s, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-100"
                      >
                        <td className="py-2 font-mono text-xs">
                          {s.to}
                        </td>

                        <td className="py-2 text-gray-500">
                          {s.body}
                        </td>

                        <td className="py-2">
                          {s.time}
                        </td>

                        <td className="py-2">
                          <span
                            className={`text-xs ${
                              s.status ===
                              "Failed"
                                ? "text-red-500"
                                : "text-green-600"
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* EMAIL */}
            <TabsContent
              tabValue="email"
              value={activeTab}
            >
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b text-left text-xs uppercase text-gray-500">
                    <tr>
                      <th className="py-2">
                        To
                      </th>

                      <th className="py-2">
                        Subject
                      </th>

                      <th className="py-2">
                        Time
                      </th>

                      <th className="py-2">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {emails.map((e, i) => (
                      <tr
                        key={i}
                        className="border-b border-gray-100"
                      >
                        <td className="py-2">
                          {e.to}
                        </td>

                        <td className="py-2 text-gray-500">
                          {e.subject}
                        </td>

                        <td className="py-2">
                          {e.time}
                        </td>

                        <td className="py-2">
                          <span className="text-xs text-green-600">
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}