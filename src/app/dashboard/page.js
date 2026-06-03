"use client";

import React, { useEffect, useState } from "react";
import { dashboardAPI } from "@/lib/api";

import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  IndianRupee,
  Users,
  Store,
  Bike,
  Zap,
  MapPin,
} from "lucide-react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

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

function CardHeader({ children, className = "" }) {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return (
    <div className={`p-5 ${className}`}>
      {children}
    </div>
  );
}

function CardTitle({ children }) {
  return (
    <h2 className="text-lg font-semibold">
      {children}
    </h2>
  );
}

function Button({
  children,
  className = "",
  size = "default",
  variant = "default",
}) {
  const sizeClass =
    size === "sm"
      ? "h-9 px-4 text-sm"
      : "h-10 px-5 text-base";

  const variantClass =
    variant === "ghost"
      ? "bg-transparent hover:bg-gray-100 text-gray-700"
      : variant === "outline"
      ? "border border-gray-300 bg-white hover:bg-gray-50"
      : "bg-black text-white hover:bg-black/90";

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-all ${sizeClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function Avatar({ children, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-100 ${className}`}
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

      <div className="flex items-center gap-2">
        {actions}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Delivered: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
    Processing: "bg-blue-100 text-blue-700",
    Paid: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  hint,
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
              {delta > 0 ? "+" : ""}
              {delta}%
            </div>
          )}

          {hint && (
            <div className="mt-1 text-xs text-gray-500">
              {hint}
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
   DUMMY DATA
========================= */

const stats = {
  totalOrders: 15420,
  pendingOrders: 126,
  deliveredOrders: 14280,
  revenue: 1250000,
  activeUsers: 8450,
  shopkeepers: 248,
  deliveryBoys: 312,
  cancelledOrders: 84,
};

const revenueData = [
  {
    month: "Jan",
    revenue: 12000,
    expenses: 8001,
  },
  {
    month: "Feb",
    revenue: 18001,
    expenses: 10000,
  },
  {
    month: "Mar",
    revenue: 22000,
    expenses: 14000,
  },
  {
    month: "Apr",
    revenue: 30000,
    expenses: 18001,
  },
  {
    month: "May",
    revenue: 40000,
    expenses: 22000,
  },
];

const categorySplit = [
  { name: "Groceries", value: 35 },
  { name: "Snacks", value: 25 },
  { name: "Beverages", value: 20 },
  { name: "Dairy", value: 12 },
  { name: "Others", value: 8 },
];

const salesData = [
  { day: "Mon", sales: 120 },
  { day: "Tue", sales: 180 },
  { day: "Wed", sales: 240 },
  { day: "Thu", sales: 320 },
  { day: "Fri", sales: 400 },
  { day: "Sat", sales: 500 },
  { day: "Sun", sales: 450 },
];

const orders = [
  {
    id: "#ORD001",
    customer: "Rahul",
    total: 499,
    status: "Delivered",
    eta: "10 min",
  },
  {
    id: "#ORD002",
    customer: "Priya",
    total: 899,
    status: "Pending",
    eta: "18 min",
  },
];

const activity = [
  {
    who: "Aditya",
    what: "created new coupon",
    when: "2 mins ago",
  },
  {
    who: "Ravi",
    what: "completed delivery",
    when: "10 mins ago",
  },
];

const topProducts = [
  {
    name: "Fresh Milk",
    category: "Dairy",
    sold: 1240,
    revenue: 52000,
    trend: 12,
  },
  {
    name: "Potato Chips",
    category: "Snacks",
    sold: 980,
    revenue: 32000,
    trend: -2,
  },
];

const topShops = [
  {
    name: "Fresh Mart",
    orders: 420,
    rating: 4.8,
    revenue: 84000,
  },
  {
    name: "Daily Needs",
    orders: 360,
    rating: 4.6,
    revenue: 62000,
  },
];

const transactions = [
  {
    id: "#TXN001",
    user: "Rahul",
    type: "Order",
    method: "UPI",
    amount: 499,
    status: "Paid",
  },
  {
    id: "#TXN002",
    user: "Priya",
    type: "Refund",
    method: "Card",
    amount: 299,
    status: "Pending",
  },
];

const PIE_COLORS = [
  "#111827",
  "#374151",
  "#6B7280",
  "#9CA3AF",
  "#D1D5DB",
];

const fmtINR = (n) =>
  "₹" + n.toLocaleString("en-IN");

/* =========================
   MAIN COMPONENT
========================= */

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    revenue: 0,
    activeUsers: 0,
    shopkeepers: 0,
    deliveryBoys: 0,
    cancelledOrders: 0,
  });
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await dashboardAPI.getStatistics();
        
        if (data) {
          setStats({
            totalOrders: data.totalOrders || 0,
            pendingOrders: data.pendingOrders || 0,
            deliveredOrders: data.deliveredOrders || 0,
            revenue: data.revenue || 0,
            activeUsers: data.activeUsers || 0,
            shopkeepers: data.shopkeepers || 0,
            deliveryBoys: data.deliveryBoys || 0,
            cancelledOrders: data.cancelledOrders || 0,
          });
          
          if (data.revenueData) {
            setRevenueData(data.revenueData);
          }
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Keep default dummy data on error
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Use dummy data as fallback
  const defaultRevenueData = [
    { month: "Jan", revenue: 12000, expenses: 8001 },
    { month: "Feb", revenue: 18001, expenses: 10000 },
    { month: "Mar", revenue: 22000, expenses: 14000 },
    { month: "Apr", revenue: 30000, expenses: 18001 },
    { month: "May", revenue: 40000, expenses: 22000 },
  ];

  const displayRevenueData = revenueData.length > 0 ? revenueData : defaultRevenueData;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Welcome back, Aditya"
        subtitle="Here's what's happening across GroFast right now."
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
            >
              Export
            </Button>

            <Button size="sm">
              <Zap className="mr-1.5 h-4 w-4" />
              Live Mode
            </Button>
          </>
        }
      />

      {/* KPI GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Orders"
          value={loading ? "..." : stats.totalOrders.toLocaleString()}
          delta={12.4}
          icon={ShoppingBag}
        />

        <StatCard
          label="Pending"
          value={loading ? "..." : stats.pendingOrders}
          delta={-3.1}
          icon={Clock}
          hint="Awaiting confirmation"
        />

        <StatCard
          label="Delivered"
          value={loading ? "..." : stats.deliveredOrders.toLocaleString()}
          delta={8.2}
          icon={CheckCircle2}
        />

        <StatCard
          label="Revenue (MTD)"
          value={loading ? "..." : fmtINR(stats.revenue)}
          delta={18.7}
          icon={IndianRupee}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>
                Revenue & Expenses
              </CardTitle>

              <p className="mt-1 text-xs text-gray-500">
                Monthly performance
              </p>
            </div>

            <Badge className="bg-green-100 text-green-700">
              +18.7%
            </Badge>
          </CardHeader>

          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <AreaChart data={displayRevenueData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#16a34a"
                    fill="#dcfce7"
                  />

                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#6b7280"
                    fill="#e5e7eb"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>
              Category split
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={categorySplit}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={85}
                  >
                    {categorySplit.map((_, i) => (
                      <Cell
                        key={i}
                        fill={
                          PIE_COLORS[
                            i % PIE_COLORS.length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}