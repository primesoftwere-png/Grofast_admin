"use client";
import React, { useState, useEffect, useCallback } from "react";
import { productAPI, categoryAPI } from "@/lib/api";
import { Plus, Search, Package, Trash2, X, RefreshCw } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await productAPI.getList({ page, limit: 20, search: search || undefined });
      setProducts(res.data || []);
      setPagination(res.pagination || {});
    } catch (e) {
      setError("Failed to load products. Check backend connection.");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    categoryAPI.getList({ limit: 100 }).then(r => setCategories(r.data || [])).catch(() => {});
  }, []);

  console.log("response of product : ",products)

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      setDeleting(id);
      await productAPI.delete(id);
      setProducts(p => p.filter(x => x._id !== id));
    } catch (e) {
      alert("Failed to delete product");
    } finally {
      setDeleting(null);
    }
  };

  const STATUS_STYLES = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-red-100 text-red-700",
    draft: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-gray-500">Catalog & inventory · {pagination.total || 0} products</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchProducts} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>
      </div>

      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search products..."
            className="h-10 w-full rounded-xl border border-gray-300 bg-white pl-9 pr-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10" />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-4 animate-pulse">
              <div className="aspect-square rounded-xl bg-gray-200 mb-3"/>
              <div className="h-3 bg-gray-200 rounded mb-2"/>
              <div className="h-3 bg-gray-100 rounded w-2/3"/>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-16 text-center text-gray-400">
          <Package className="mx-auto h-10 w-10 mb-3 opacity-40"/>
          <p className="font-medium">No products found</p>
          <p className="text-sm mt-1">Products added by shopkeepers will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map(p => (
            <div key={p._id} className="group rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="p-4">
                <div className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-black/5 via-gray-100 to-gray-200 text-3xl font-bold text-black/60 relative overflow-hidden">
                  {p.productImage ? (
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/upload/${p.productImage}`} alt={p.productName} className="h-full w-full object-cover" />
                  ) : (
                    <span>{p.productName?.[0]}</span>
                  )}
                  <button onClick={() => handleDelete(p._id, p.productName)} disabled={deleting === p._id}
                    className="absolute top-2 right-2 rounded-lg bg-white/90 p-1.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5"/>
                  </button>
                </div>
                <div className="mt-3">
                  <div className="text-xs text-gray-500">{p.productCategory?.categoryName || "—"}</div>
                  <div className="line-clamp-1 text-sm font-medium">{p.productName}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-lg font-bold">₹{p.productPrice || p.price}</div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[p.productStatus] || "bg-gray-100 text-gray-700"}`}>
                      {p.productStatus || "active"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500">
                    <Package className="h-3 w-3"/>
                    {p.productQuantity ?? p.stock ?? 0} in stock
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Page {pagination.page} of {pagination.pages}</span>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
              className="rounded-xl border px-4 py-2 text-sm disabled:opacity-40 hover:bg-gray-50">Previous</button>
            <button disabled={page >= pagination.pages} onClick={() => setPage(p => p + 1)}
              className="rounded-xl border px-4 py-2 text-sm disabled:opacity-40 hover:bg-gray-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}