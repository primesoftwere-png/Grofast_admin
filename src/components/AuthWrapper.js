import { Loader2 } from 'lucide-react';
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    // If on login page
    if (pathname === "/login") {
      if (token) {
        // Has token, redirect to dashboard
        router.push("/dashboard");
      } else {
        setIsLoading(false);
      }
      return;
    }

    // For all other pages, check authentication
    if (!token) {
      // No token, redirect to login
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [pathname, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg"><div className="flex items-center justify-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> Loading...</div></div>
      </div>
    );
  }

  // If not authenticated and not on login page, don't render
  if (!isAuthenticated && pathname !== "/login") {
    return null;
  }

  // If on login page, show without layout
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // For all other authenticated pages, wrap with AdminLayout
  return <AdminLayout>{children}</AdminLayout>;
}
