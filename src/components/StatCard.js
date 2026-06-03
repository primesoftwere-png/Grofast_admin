"use client";

import React from "react";

import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";

/* =========================
   HELPER FUNCTION
========================= */

function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(" ");
}

/* =========================
   TONE STYLES
========================= */

const toneMap = {
  primary:
    "from-black/20 to-black/5 text-black",
  info: "from-blue-200/40 to-blue-100 text-blue-700",
  warning:
    "from-yellow-200/40 to-yellow-100 text-yellow-700",
  destructive:
    "from-red-200/40 to-red-100 text-red-700",
};

/* =========================
   STAT CARD COMPONENT
========================= */

export default function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
  hint,
}) {
  const positive =
    (delta ?? 0) >= 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl">
      {/* BACKGROUND GLOW */}
      <div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition-opacity group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.15), rgba(0,0,0,0.03))",
        }}
      />

      {/* CONTENT */}
      <div className="relative flex items-start justify-between">
        {/* LEFT */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight">
            {value}
          </p>

          {hint && (
            <p className="mt-1 text-xs text-gray-500">
              {hint}
            </p>
          )}
        </div>

        {/* ICON */}
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br",
            toneMap[tone]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* DELTA */}
      {delta !== undefined && (
        <div className="relative mt-4 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium",
              positive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {positive ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}

            {Math.abs(delta)}%
          </span>

          <span className="text-gray-500">
            vs last week
          </span>
        </div>
      )}
    </div>
  );
}