"use client";

import React from "react";

/* =========================
   HELPER FUNCTION
========================= */

function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(" ");
}

/* =========================
   STATUS STYLE MAP
========================= */

const statusMap = {
  Pending:
    "bg-yellow-100 text-yellow-700 border-yellow-300",

  Packed:
    "bg-blue-100 text-blue-700 border-blue-300",

  "Out for Delivery":
    "bg-black/10 text-black border-black/20",

  Delivered:
    "bg-green-100 text-green-700 border-green-300",

  Cancelled:
    "bg-red-100 text-red-700 border-red-300",

  Active:
    "bg-green-100 text-green-700 border-green-300",

  Online:
    "bg-green-100 text-green-700 border-green-300",

  Offline:
    "bg-gray-100 text-gray-600 border-gray-300",

  Banned:
    "bg-red-100 text-red-700 border-red-300",

  Verified:
    "bg-green-100 text-green-700 border-green-300",

  "In Stock":
    "bg-green-100 text-green-700 border-green-300",

  Low:
    "bg-yellow-100 text-yellow-700 border-yellow-300",

  Success:
    "bg-green-100 text-green-700 border-green-300",
};

/* =========================
   STATUS BADGE COMPONENT
========================= */

export default function StatusBadge({
  status,
}) {
  const cls =
    statusMap[status] ||
    "bg-gray-100 text-gray-600 border-gray-300";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        cls
      )}
    >
      {/* DOT */}
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />

      {/* TEXT */}
      {status}
    </span>
  );
}