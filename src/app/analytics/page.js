"use client";

import React, { useEffect, useState } from "react";
import { analyticsAPI } from "@/lib/api";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  TrendingUp,
  Users,
  ShoppingBag,
  MapPin,
} from "lucide-react";

/* =========================
   DUMMY DATA
========================= */

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18001 },
  { month: "Mar", revenue: 22000 },
  { month: "Apr", revenue: 26000 },
  { month: "May", revenue: 32000 },
  { month: "Jun", revenue: 38001 },
];

const peakHours = [
  { hour: "6AM", orders: 40 },
  { hour: "8AM", orders: 80 },
  { hour: "10AM", orders: 120 },
  { hour: "12PM", orders: 200 },
  { hour: "2PM", orders: 260 },
  { hour: "4PM", orders: 180 },
  { hour: "6PM", orders: 320 },
  { hour: "8PM", orders: 400 },
  { hour: "10PM", orders: 250 },
];

const salesData = [
  { day: "Mon", orders: 120 },
  { day: "Tue", orders: 180 },
  { day: "Wed", orders: 220 },
  { day: "Thu", orders: 300 },
  { day: "Fri", orders: 360 },
  { day: "Sat", orders: 420 },
  { day: "Sun", orders: 390 },
];

const areaData = [
  { area: "Andheri", orders: 2480 },
  { area: "BKC", orders: 1920 },
  { area: "Powai", orders: 1640 },
  { area: "Bandra", orders: 1380 },
  { area: "Worli", orders: 1100 },
  { area: "Juhu", orders: 980 },
  { area: "Dadar", orders: 760 },
];

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

function CardHeader({ children }) {
  return <div className="p-5 pb-0">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

function CardContent({ children }) {
  return <div className="p-5">{children}</div>;
}

function PageHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  hint,
}) {
  return (
    <Card className="p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>

          <h3 className="mt-2 text-2xl font-bold">{value}</h3>

          {delta && (
            <p className="mt-1 text-sm text-green-600">
              +{delta}% this month
            </p>
          )}

          {hint && (
            <p className="mt-1 text-sm text-gray-500">{hint}</p>
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
   MAIN COMPONENT
========================= */

export default function AnalyticsPage() {
  const [revenueData, setRevenueData] = useState([]);
  const [peakHours, setPeakHours] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        
        const [revenue, orders, peakHoursData] = await Promise.all([
          analyticsAPI.getRevenue().catch(() => null),
          analyticsAPI.getOrders().catch(() => null),
          analyticsAPI.getPeakHours().catch(() => null),
        ]);

        if (revenue?.data) setRevenueData(revenue.data);
        if (orders?.data) setSalesData(orders.data);
        if (peakHoursData?.data) setPeakHours(peakHoursData.data);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  // Fallback dummy data
  const defaultRevenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18001 },
    { month: "Mar", revenue: 22000 },
    { month: "Apr", revenue: 26000 },
    { month: "May", revenue: 32000 },
    { month: "Jun", revenue: 38001 },
  ];

  const defaultPeakHours = [
    { hour: "6AM", orders: 40 },
    { hour: "8AM", orders: 80 },
    { hour: "10AM", orders: 120 },
    { hour: "12PM", orders: 200 },
    { hour: "2PM", orders: 260 },
    { hour: "4PM", orders: 180 },
    { hour: "6PM", orders: 320 },
    { hour: "8PM", orders: 400 },
    { hour: "10PM", orders: 250 },
  ];

  const defaultSalesData = [
    { day: "Mon", orders: 120 },
    { day: "Tue", orders: 180 },
    { day: "Wed", orders: 220 },
    { day: "Thu", orders: 300 },
    { day: "Fri", orders: 360 },
    { day: "Sat", orders: 420 },
    { day: "Sun", orders: 390 },
  ];

  const displayRevenueData = revenueData.length > 0 ? revenueData : defaultRevenueData;
  const displayPeakHours = peakHours.length > 0 ? peakHours : defaultPeakHours;
  const displaySalesData = salesData.length > 0 ? salesData : defaultSalesData;

  const heatmap = Array.from({ length: 7 }, (_, d) =>
    Array.from({ length: 24 }, (_, h) =>
      Math.round(
        20 +
          Math.sin((h - 6) / 3) * 40 +
          (h > 18 && h < 23 ? 60 : 0) +
          (d === 5 || d === 6 ? 30 : 0) +
          Math.random() * 15
      )
    )
  );

  const max = Math.max(...heatmap.flat());

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Analytics"
        subtitle="Deep insights across revenue, users and operational efficiency."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Revenue growth"
          value="+18.7%"
          icon={TrendingUp}
          delta={4.2}
        />

        <StatCard
          label="User growth"
          value="+9.4%"
          icon={Users}
          delta={1.8}
        />

        <StatCard
          label="Order growth"
          value="+12.1%"
          icon={ShoppingBag}
          delta={2.4}
        />

        <StatCard
          label="Top area"
          value="Andheri"
          icon={MapPin}
          hint="2,480 orders"
        />
      </div>

      {/* Revenue + Area */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Revenue trajectory</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={displayRevenueData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Area-wise orders</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {areaData.map((a) => (
                <div key={a.area}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{a.area}</span>

                    <span className="font-medium">
                      {a.orders}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-black"
                      style={{
                        width: `${(a.orders / 2480) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peak Hours + Sales */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Peak order hours</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={displayPeakHours}>
                  <defs>
                    <linearGradient
                      id="ph"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopOpacity={0.5}
                      />

                      <stop
                        offset="100%"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="hour"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="orders"
                    strokeWidth={2.5}
                    fill="url(#ph)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Daily sales</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={displaySalesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="orders"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Order heatmap · day × hour</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="flex">
                <div className="w-12" />

                {Array.from({ length: 24 }, (_, h) => (
                  <div
                    key={h}
                    className="w-6 text-center text-[9px] text-gray-500"
                  >
                    {h}
                  </div>
                ))}
              </div>

              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (d, i) => (
                  <div
                    key={d}
                    className="mt-1 flex items-center"
                  >
                    <div className="w-12 text-xs text-gray-500">
                      {d}
                    </div>

                    {heatmap[i].map((v, h) => {
                      const intensity = v / max;

                      return (
                        <div
                          key={h}
                          className="m-[1px] h-6 w-6 rounded-md transition-transform hover:scale-110"
                          style={{
                            background: `rgba(0,0,0,${intensity})`,
                          }}
                          title={`${d} ${h}:00 · ${v} orders`}
                        />
                      );
                    })}
                  </div>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}