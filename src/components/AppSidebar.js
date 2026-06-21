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
  setIsMobileOpen,
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
            pathname.startsWith(item.url + "/");

          const Icon = item.icon;

          return (
            <Link
              key={item.url}
              href={item.url}
              onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
              className={`group flex h-9 items-center rounded-lg transition-all ${
                active
                  ? "bg-green-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-700"
              } ${
                collapsed ? "justify-center px-0 lg:px-0" : "px-3"
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
                  <span className="ml-3 flex-1 text-[13px] font-medium whitespace-nowrap">
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

export default function AppSidebar({ isMobileOpen, setIsMobileOpen }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 lg:sticky lg:top-0 ${
          collapsed ? "lg:w-[70px]" : "lg:w-[260px]"
        } ${
          isMobileOpen
            ? "translate-x-0 w-[260px]"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* HEADER */}
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2.5 ${
                collapsed ? "lg:justify-center w-full" : ""
              }`}
              onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
            >
              {/* LOGO */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-600 shadow-sm">
                <Zap className="h-4 w-4 text-white" />
              </div>

              <div
                className={`flex flex-col leading-tight ${
                  collapsed ? "lg:hidden" : ""
                }`}
              >
                <span className="text-sm font-bold tracking-tight whitespace-nowrap">
                  GroFast
                </span>
                <span className="text-[10px] text-gray-500 whitespace-nowrap">
                  Admin Console
                </span>
              </div>
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`hidden lg:flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors ${
                collapsed ? "hidden" : ""
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setCollapsed(false)}
            className={`mt-2 hidden lg:flex h-7 w-full items-center justify-center rounded-lg hover:bg-gray-100 transition-colors ${
              !collapsed ? "hidden" : ""
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-3 scrollbar-thin">
          <SidebarGroup
            label="Overview"
            items={main}
            collapsed={collapsed}
            pathname={pathname}
            setIsMobileOpen={setIsMobileOpen}
          />

          <SidebarGroup
            label="Operations"
            items={ops}
            collapsed={collapsed}
            pathname={pathname}
            setIsMobileOpen={setIsMobileOpen}
          />

          <SidebarGroup
            label="Finance"
            items={finance}
            collapsed={collapsed}
            pathname={pathname}
            setIsMobileOpen={setIsMobileOpen}
          />

          <SidebarGroup
            label="Insights"
            items={insights}
            collapsed={collapsed}
            pathname={pathname}
            setIsMobileOpen={setIsMobileOpen}
          />

          <SidebarGroup
            label="System"
            items={system}
            collapsed={collapsed}
            pathname={pathname}
            setIsMobileOpen={setIsMobileOpen}
          />
        </div>
      </aside>
    </>
  );
}