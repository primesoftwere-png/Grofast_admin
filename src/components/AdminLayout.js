"use client";

import AppSidebar from "@/components/AppSidebar";
import Topbar from "@/components/Topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Topbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
