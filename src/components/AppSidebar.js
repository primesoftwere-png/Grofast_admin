"use client";

import React, { useState } from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ShoppingBag,
  Radio,
  Users,
  Store,
  Bike,
  Package,
  Tags,
  Ticket,
  Wallet,
  CreditCard,
  ArrowDownToLine,
  Bell,
  BarChart3,
  FileText,
  Settings,
  LifeBuoy,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* =========================
   SIDEBAR DATA
========================= */

const main = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingBag,
  },
  {
    title: "Live Tracking",
    url: "/live-tracking",
    icon: Radio,
    live: true,
  },
];

const ops = [
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Shopkeepers",
    url: "/shopkeepers",
    icon: Store,
  },
  {
    title: "Delivery Boys",
    url: "/delivery-boys",
    icon: Bike,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Tags,
  },
  {
    title: "Coupons",
    url: "/coupons",
    icon: Ticket,
  },
];

const finance = [
  {
    title: "Wallet",
    url: "/wallet",
    icon: Wallet,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: CreditCard,
  },
  {
    title: "Withdraw Requests",
    url: "/withdraw",
    icon: ArrowDownToLine,
  },
];

const insights = [
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
];

const system = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Support",
    url: "/support",
    icon: LifeBuoy,
  },
];

/* =========================
   MANUAL COMPONENTS
========================= */

function SidebarGroup({
  label,
  items,
  collapsed,
  pathname,
}) {
  return (
    <div className="mb-4">
      {!collapsed && (
        <div className="mb-2 px-2 text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
          {label}
        </div>
      )}

      <div className="space-y-0.5">
        {items.map((item) => {
          const active =
            pathname === item.url ||
            pathname.startsWith(
              item.url + "/"
            );

          const Icon = item.icon;

          return (
            <Link
              key={item.url}
              href={item.url}
              className={`group flex h-9 items-center rounded-lg transition-all ${
                active
                  ? "bg-green-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-700"
              } ${
                collapsed
                  ? "justify-center px-0"
                  : "px-3"
              }`}
              title={collapsed ? item.title : undefined}
            >
              <Icon
                className={`h-[17px] w-[17px] shrink-0 ${
                  active
                    ? "text-white"
                    : "text-gray-500 group-hover:text-green-600"
                }`}
              />

              {!collapsed && (
                <>
                  <span className="ml-3 flex-1 text-[13px] font-medium">
                    {item.title}
                  </span>

                  {item.live && (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />

                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */

export default function AppSidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <aside
      className={`sticky top-0 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        collapsed
          ? "w-[70px]"
          : "w-[260px]"
      }`}
    >
      {/* HEADER */}
      <div className="border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2.5 ${collapsed ? 'justify-center w-full' : ''}`}
          >
            {/* LOGO */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 shadow-sm">
              <Zap className="h-4 w-4 text-white" />
            </div>

            {!collapsed && (
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold tracking-tight">
                  GroFast
                </span>

                <span className="text-[10px] text-gray-500">
                  Admin Console
                </span>
              </div>
            )}
          </Link>

          {!collapsed && (
            <button
              onClick={() =>
                setCollapsed(
                  !collapsed
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="mt-2 flex h-7 w-full items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-3 scrollbar-thin">
        <SidebarGroup
          label="Overview"
          items={main}
          collapsed={collapsed}
          pathname={pathname}
        />

        <SidebarGroup
          label="Operations"
          items={ops}
          collapsed={collapsed}
          pathname={pathname}
        />

        <SidebarGroup
          label="Finance"
          items={finance}
          collapsed={collapsed}
          pathname={pathname}
        />

        <SidebarGroup
          label="Insights"
          items={insights}
          collapsed={collapsed}
          pathname={pathname}
        />

        <SidebarGroup
          label="System"
          items={system}
          collapsed={collapsed}
          pathname={pathname}
        />
      </div>
    </aside>
  );
}