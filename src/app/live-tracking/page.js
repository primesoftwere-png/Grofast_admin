import { Loader2 } from 'lucide-react';
"use client";

import React, { useEffect, useState } from "react";
import { trackingAPI } from "@/lib/api";

import {
  Bike,
  Clock,
  MapPin,
  Navigation,
  Phone,
  Store,
  User,
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
    <div className={className}>
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
  variant = "default",
  size = "default",
}) {
  const sizeClass =
    size === "icon"
      ? "h-10 w-10"
      : size === "sm"
      ? "h-9 px-4 text-sm"
      : "h-10 px-5";

  const variantClass =
    variant === "secondary"
      ? "bg-white/80 backdrop-blur text-black hover:bg-white"
      : variant === "ghost"
      ? "bg-transparent hover:bg-gray-100 text-black"
      : "bg-black text-white hover:bg-black/90";

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl transition-all font-medium ${sizeClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
}

function Badge({
  children,
  className = "",
}) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </div>
  );
}

function Avatar({
  children,
  className = "",
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full ${className}`}
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

      {actions}
    </div>
  );
}

/* =========================
   DATA
========================= */

const activeDeliveries = [
  {
    id: "GF-29481",
    customer: "Aarav Sharma",
    rider: "Rahul K.",
    shop: "FreshMart Andheri",
    eta: "6 min",
    distance: "1.2 km",
    progress: 65,
  },
  {
    id: "GF-29477",
    customer: "Karan Verma",
    rider: "Suresh P.",
    shop: "Metro Express",
    eta: "3 min",
    distance: "0.4 km",
    progress: 88,
  },
  {
    id: "GF-29480",
    customer: "Priya Mehta",
    rider: "Amit S.",
    shop: "QuickGrocer BKC",
    eta: "12 min",
    distance: "2.8 km",
    progress: 32,
  },
];

/* =========================
   MAIN COMPONENT
========================= */

export default function LiveTracking() {
  const [activeDeliveries, setActiveDeliveries] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        setLoading(true);
        
        const [liveOrders, deliveryBoysData] = await Promise.all([
          trackingAPI.getLiveOrders().catch(() => null),
          trackingAPI.getDeliveryBoys().catch(() => null),
        ]);

        if (liveOrders?.data) {
          setActiveDeliveries(liveOrders.data);
        }
        
        if (deliveryBoysData?.data) {
          setDeliveryBoys(deliveryBoysData.data);
        }
      } catch (error) {
        console.error('Failed to fetch tracking data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();
    
    // Refresh every 10 seconds
    const interval = setInterval(fetchTrackingData, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Fallback dummy data
  const defaultDeliveries = [
    {
      id: "GF-29481",
      customer: "Aarav Sharma",
      rider: "Rahul K.",
      shop: "FreshMart Andheri",
      eta: "6 min",
      distance: "1.2 km",
      progress: 65,
    },
    {
      id: "GF-29477",
      customer: "Karan Verma",
      rider: "Suresh P.",
      shop: "Metro Express",
      eta: "3 min",
      distance: "0.4 km",
      progress: 88,
    },
    {
      id: "GF-29480",
      customer: "Priya Mehta",
      rider: "Amit S.",
      shop: "QuickGrocer BKC",
      eta: "12 min",
      distance: "2.8 km",
      progress: 32,
    },
  ];

  const displayDeliveries = activeDeliveries.length > 0 ? activeDeliveries : defaultDeliveries;

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Live Tracking"
        subtitle="Watch deliveries move across your zones in real time."
        actions={
          <Badge className="gap-1.5 bg-black text-white shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>

            Live · 142 active
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* MAP */}
        <Card className="overflow-hidden shadow-sm lg:col-span-2">
          <CardContent className="p-0">
            <div className="relative h-[560px] overflow-hidden bg-gradient-to-br from-gray-100 via-white to-blue-50">
              {/* GRID */}
              <svg className="absolute inset-0 h-full w-full opacity-40">
                <defs>
                  <pattern
                    id="grid2"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#d1d5db"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>

                <rect
                  width="100%"
                  height="100%"
                  fill="url(#grid2)"
                />
              </svg>

              {/* ROUTES */}
              <svg className="absolute inset-0 h-full w-full">
                <path
                  d="M 80 460 Q 280 320 520 220"
                  fill="none"
                  stroke="#111827"
                  strokeWidth="2.5"
                />

                <path
                  d="M 200 100 Q 360 250 600 380"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                />

                <path
                  d="M 120 200 Q 320 380 480 460"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />
              </svg>

              {/* PINS */}
              {[
                {
                  x: "12%",
                  y: "82%",
                  icon: Store,
                  label: "FreshMart",
                  color: "black",
                },
                {
                  x: "70%",
                  y: "38%",
                  icon: User,
                  label: "Aarav S.",
                  color: "blue",
                },
                {
                  x: "45%",
                  y: "55%",
                  icon: Bike,
                  label: "Rahul K.",
                  color: "black",
                  live: true,
                },
                {
                  x: "80%",
                  y: "70%",
                  icon: User,
                  label: "Karan V.",
                  color: "blue",
                },
                {
                  x: "30%",
                  y: "20%",
                  icon: Store,
                  label: "QuickGrocer",
                  color: "black",
                },
              ].map((p, i) => {
                const Icon = p.icon;

                return (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: p.x,
                      top: p.y,
                    }}
                  >
                    <div className="relative">
                      {p.live && (
                        <span className="absolute inset-0 animate-ping rounded-full bg-black opacity-30" />
                      )}

                      <div
                        className={`relative flex h-9 w-9 items-center justify-center rounded-full shadow-lg ${
                          p.color === "black"
                            ? "bg-black text-white"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-medium shadow backdrop-blur">
                        {p.label}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* HUD */}
              <div className="absolute left-4 top-4 rounded-xl bg-white/80 p-3 backdrop-blur">
                <div className="text-[10px] uppercase tracking-wider text-gray-500">
                  Mumbai zone
                </div>

                <div className="text-xl font-bold">
                  12 zones · 284 riders
                </div>
              </div>

              {/* CONTROLS */}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full shadow-sm"
                >
                  +
                </Button>

                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full shadow-sm"
                >
                  −
                </Button>

                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full shadow-sm"
                >
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>

              {/* BOTTOM STATS */}
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white/80 p-3 backdrop-blur">
                  <div className="text-[10px] text-gray-500">
                    Avg ETA
                  </div>

                  <div className="font-semibold">
                    9 min
                  </div>
                </div>

                <div className="rounded-xl bg-white/80 p-3 backdrop-blur">
                  <div className="text-[10px] text-gray-500">
                    In transit
                  </div>

                  <div className="font-semibold">
                    142
                  </div>
                </div>

                <div className="rounded-xl bg-white/80 p-3 backdrop-blur">
                  <div className="text-[10px] text-gray-500">
                    Delayed
                  </div>

                  <div className="font-semibold text-yellow-600">
                    7
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ACTIVE DELIVERIES */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>
              Active deliveries
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 p-5">
            {loading && <div className="text-center text-sm text-gray-500"><div className="flex items-center justify-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> Loading...</div></div>}
            {!loading && displayDeliveries.map((d) => (
              <div
                key={d.id}
                className="rounded-xl border bg-white p-3 transition-all hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs">
                    {d.id}
                  </span>

                  <Badge className="bg-gray-100 text-[10px] text-black">
                    <Clock className="mr-1 h-3 w-3" />
                    {d.eta}
                  </Badge>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-black/10 text-[10px] text-black">
                      {d.rider.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">
                      {d.rider}
                    </div>

                    <div className="truncate text-[11px] text-gray-500">
                      {d.shop} → {d.customer}
                    </div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                  >
                    <Phone className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[11px] text-gray-500">
                    <span>
                      <MapPin className="mr-0.5 inline h-3 w-3" />
                      {d.distance}
                    </span>

                    <span>
                      {d.progress}%
                    </span>
                  </div>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-black transition-all"
                      style={{
                        width: `${d.progress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}