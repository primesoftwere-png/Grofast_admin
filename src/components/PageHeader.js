"use client";

import React from "react";

/* =========================
   PAGE HEADER COMPONENT
========================= */

export default function PageHeader({
  title,
  subtitle,
  actions,
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      {/* LEFT SIDE */}
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* RIGHT SIDE ACTIONS */}
      {actions && (
        <div className="flex flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}