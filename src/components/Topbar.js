"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";

import {
  Bell,
  Search,
  Sun,
  Moon,
  Plus,
  Command,
  Menu,
} from "lucide-react";

/* =========================
   DUMMY DATA
========================= */

const notifications = [
  {
    id: 1,
    title: "New order received",
    body: "Order #GF-2041 placed successfully",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "Rider assigned",
    body: "Delivery boy assigned to order",
    time: "10 min ago",
  },
  {
    id: 3,
    title: "Payout completed",
    body: "₹12,400 transferred to shopkeeper",
    time: "35 min ago",
  },
];

/* =========================
   MANUAL COMPONENTS
========================= */

function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(" ");
}

function Input({
  className = "",
  ...props
}) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition-all focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10",
        className
      )}
    />
  );
}

function Button({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
}) {
  const sizeClass =
    size === "icon"
      ? "h-10 w-10"
      : size === "sm"
      ? "h-9 px-4 text-sm"
      : "h-10 px-5";

  const variantClass =
    variant === "ghost"
      ? "bg-transparent hover:bg-gray-100 text-black"
      : "bg-green-600 text-white hover:bg-green-700";

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all",
        sizeClass,
        variantClass,
        className
      )}
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
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}

function Avatar({
  children,
  className = "",
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-full",
        className
      )}
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
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full",
        className
      )}
    >
      {children}
    </div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */

export default function Topbar() {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      // Call logout API
      await authAPI.logout().catch(() => {
        // Ignore logout API errors, still clear local data
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login
      router.push('/login');
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-gray-200 bg-white px-4 backdrop-blur lg:px-6">
      {/* SIDEBAR BUTTON */}
      <Button
        variant="ghost"
        size="icon"
        className="-ml-1 rounded-full lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* SEARCH */}
      <div className="relative hidden w-[340px] md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <Input
          placeholder="Search orders, users, shops..."
          className="pl-9 pr-14"
        />

        <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden h-6 -translate-y-1/2 select-none items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-500 md:inline-flex">
          <Command className="h-3 w-3" />
          K
        </kbd>
      </div>

      {/* RIGHT SIDE */}
      <div className="ml-auto flex items-center gap-1.5">
        {/* QUICK ACTION */}
        <Button className="hidden gap-1.5 bg-green-600 hover:bg-green-700 shadow-lg hover:opacity-90 sm:inline-flex">
          <Plus className="h-4 w-4" />
          Quick Action
        </Button>

        {/* THEME BUTTON */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </Button>

        {/* NOTIFICATIONS */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
          >
            <Bell className="h-[18px] w-[18px]" />

            <span className="absolute right-2 top-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
          </Button>

          {/* NOTIFICATION DROPDOWN */}
          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-[360px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b p-3">
                <span className="font-semibold">
                  Notifications
                </span>

                <Badge className="bg-black/10 text-black">
                  {
                    notifications.length
                  }{" "}
                  new
                </Badge>
              </div>

              <div className="max-h-[360px] overflow-auto">
                {notifications.map(
                  (n) => (
                    <div
                      key={n.id}
                      className="flex cursor-pointer gap-3 border-b border-gray-100 p-3 transition-colors hover:bg-gray-50"
                    >
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-black" />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {n.title}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {n.body}
                        </p>

                        <p className="mt-1 text-[10px] text-gray-400">
                          {n.time}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="relative">
          <button
            onClick={() =>
              setShowProfile(
                !showProfile
              )
            }
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-gray-100"
          >
            <Avatar className="h-8 w-8 ring-2 ring-green-600/20">
              <AvatarFallback className="bg-green-600 text-xs font-semibold text-white">
                {user?.fullname?.substring(0, 2).toUpperCase() || 'AD'}
              </AvatarFallback>
            </Avatar>

            <div className="hidden flex-col items-start leading-tight sm:flex">
              <span className="text-xs font-semibold">
                {user?.fullname || 'Admin'}
              </span>

              <span className="text-[10px] text-gray-500">
                {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
              </span>
            </div>
          </button>

          {/* PROFILE DROPDOWN */}
          {showProfile && (
            <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
              <div className="border-b px-4 py-3 text-sm font-semibold">
                My Account
              </div>

              <div className="p-1">
                <button 
                  onClick={() => router.push('/profile')}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Profile
                </button>

                <button 
                  onClick={() => router.push('/settings')}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Settings
                </button>

                <div className="my-1 border-t border-gray-100" />

                <button 
                  onClick={handleLogout}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}