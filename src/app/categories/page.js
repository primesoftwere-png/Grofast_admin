import toast from 'react-hot-toast';
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { categoryAPI } from "@/lib/api";
import { Plus, Tag, Pencil, Trash2, X, Check, RefreshCw, Image as ImageIcon } from "lucide-react";

const COLORS = [
  "from-green-400/30 to-green-100/10","from-blue-400/30 to-blue-100/10",
  "from-yellow-400/30 to-yellow-100/10","from-pink-400/30 to-pink-100/10",
  "from-purple-400/30 to-purple-100/10","from-red-400/30 to-red-100/10",
  "from-cyan-400/30 to-cyan-100/10","from-indigo-400/30 to-indigo-100/10",
  "from-orange-400/30 to-orange-100/10","from-teal-400/30 to-teal-100/10",
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ categoryName: "", description: "", categoryType: "parent", parentCategoryId: "", status: "active", categoryImage: null });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [activeTab, setActiveTab] = useState("parent"); // "parent" or "child"

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await categoryAPI.getList({ limit: 100 });
      let cats = res.data?.categories || res.data?.data?.categories || res.data || [];
      if (!Array.isArray(cats)) cats = [];
      setCategories(cats);
    } catch (e) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const parentCategories = categories.filter(c => c.categoryType === "parent" || !c.categoryType);
  const childCategories = categories.filter(c => c.categoryType === "child");

  const openCreate = () => { 
    setEditItem(null); 
    setForm({ categoryName: "", description: "", categoryType: "parent", parentCategoryId: "", status: "active", categoryImage: null }); 
    setShowForm(true); 
  };
  
  const openEdit = (cat) => { 
    setEditItem(cat); 
    setForm({ 
      categoryName: cat.categoryName || cat.name || "", 
      description: cat.description || "",
      categoryType: cat.categoryType || "parent",
      parentCategoryId: cat.parentCategoryId?._id || cat.parentCategoryId || "",
      status: cat.status || "active",
      categoryImage: null
    }); 
    setShowForm(true); 
  };

  const handleSave = async () => {
    if (!form.categoryName.trim()) return toast.error("Category name is required");
    if (form.categoryType === "child" && !form.parentCategoryId) return toast.error("Parent category is required when creating a child category");
    
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("categoryName", form.categoryName);
      formData.append("description", form.description);
      formData.append("categoryType", form.categoryType);
      formData.append("status", form.status);
      
      if (form.categoryType === "child") {
        formData.append("parentCategoryId", form.parentCategoryId);
      } else if (form.categoryImage) {
        formData.append("categoryImage", form.categoryImage);
      }

      if (editItem) {
        await categoryAPI.update(editItem._id, formData);
      } else {
        await categoryAPI.create(formData);
      }
      setShowForm(false);
      fetchCategories();
    } catch (e) {
      const msg = e.response?.data?.message || "Failed to save category";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    try {
      setDeleting(id);
      await categoryAPI.delete(id);
      fetchCategories();
    } catch (e) {
      const msg = e.response?.data?.message || "Failed to delete category";
      toast.error(msg);
    } finally {
      setDeleting(null);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setForm(f => ({ ...f, categoryImage: e.target.files[0] }));
    }
  };

  const displayedCategories = activeTab === "parent" ? parentCategories : childCategories;

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">{categories.length} categories total</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchCategories} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
            <RefreshCw className="h-4 w-4"/>
          </button>
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90">
            <Plus className="h-4 w-4"/>New category
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab("parent")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "parent" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Parent Categories ({parentCategories.length})
        </button>
        <button 
          onClick={() => setActiveTab("child")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "child" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Child Categories ({childCategories.length})
        </button>
      </div>

      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array(8).fill(0).map((_, i) => <div key={i} className="h-32 rounded-2xl bg-gray-100 animate-pulse"/>)}
        </div>
      ) : displayedCategories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-16 text-center text-gray-400">
          <Tag className="mx-auto h-10 w-10 mb-3 opacity-40"/>
          <p className="font-medium">No {activeTab} categories yet</p>
          <button onClick={openCreate} className="mt-4 inline-flex items-center gap-1 rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-black/90">
            <Plus className="h-4 w-4"/>Create first {activeTab} category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {displayedCategories.map((c, i) => (
            <div key={c._id} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className={`bg-gradient-to-br p-5 ${COLORS[i % COLORS.length]}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 backdrop-blur overflow-hidden">
                  <Tag className="h-5 w-5"/>
                </div>
                <div className="mt-4 font-semibold text-gray-900">{c.categoryName || c.name}</div>
                {c.categoryType === 'child' && c.parentCategoryId && (
                  <div className="text-xs text-gray-700 font-medium mt-1">Parent: {c.parentCategoryId.categoryName || 'Unknown'}</div>
                )}
                <div className="text-xs text-gray-500 mt-1">{c.productCount ?? 0} products</div>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(c)} className="rounded-lg bg-white/90 p-1.5 shadow-sm hover:bg-white">
                  <Pencil className="h-3.5 w-3.5 text-gray-600"/>
                </button>
                <button onClick={() => handleDelete(c._id, c.categoryName || c.name)} disabled={deleting === c._id}
                  className="rounded-lg bg-white/90 p-1.5 shadow-sm hover:bg-red-50">
                  <Trash2 className={`h-3.5 w-3.5 ${deleting === c._id ? "text-gray-300" : "text-red-500"}`}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{editItem ? "Edit Category" : "New Category"}</h2>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-2 hover:bg-gray-100"><X className="h-4 w-4"/></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Category Type *</label>
                <div className="mt-2 flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" value="parent" checked={form.categoryType === "parent"} onChange={(e) => setForm(f => ({ ...f, categoryType: e.target.value, parentCategoryId: "" }))} className="accent-black"/>
                    <span className="text-sm">Parent</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" value="child" checked={form.categoryType === "child"} onChange={(e) => setForm(f => ({ ...f, categoryType: e.target.value }))} className="accent-black"/>
                    <span className="text-sm">Child</span>
                  </label>
                </div>
              </div>
              
              {form.categoryType === "child" && (
                <div>
                  <label className="text-sm font-medium">Select Parent Category *</label>
                  <select 
                    value={form.parentCategoryId} 
                    onChange={e => setForm(f => ({ ...f, parentCategoryId: e.target.value }))}
                    className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                  >
                    <option value="">-- Select Parent --</option>
                    {parentCategories.map(p => (
                      <option key={p._id} value={p._id}>{p.categoryName || p.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Category Name *</label>
                <input value={form.categoryName} onChange={e => setForm(f => ({ ...f, categoryName: e.target.value }))}
                  placeholder="e.g. Fruits & Vegetables"
                  className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Optional description..." rows={3}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10 resize-none"/>
              </div>

              {form.categoryType === "parent" && (
                <div>
                  <label className="text-sm font-medium">Category Image (Optional)</label>
                  <div className="mt-1 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
                      {form.categoryImage ? (
                        <ImageIcon className="h-5 w-5 text-gray-500" />
                      ) : editItem && editItem.categoryImage ? (
                        <ImageIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <label className="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                      Upload Image
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                    {form.categoryImage && <span className="text-xs text-gray-500 truncate max-w-[120px]">{form.categoryImage.name}</span>}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Status</label>
                <select 
                  value={form.status} 
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 rounded-xl bg-black py-2 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50">
                  {saving ? "Saving..." : editItem ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}