"use client";
import React, { useState, useEffect, useCallback } from "react";
import { supportAPI } from "@/lib/api";
import { MessageCircle, Send, X, RefreshCw, Plus } from "lucide-react";

const PRIORITY_STYLES = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};
const STATUS_STYLES = {
  open: "bg-blue-100 text-blue-700",
  in_progress: "bg-purple-100 text-purple-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-600",
};

export default function SupportPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("open");
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: "", description: "", priority: "Medium" });
  const [creating, setCreating] = useState(false);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true); setError("");
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      const res = await supportAPI.getList(params);
      setTickets(res.data || []);
    } catch { setError("Failed to load tickets"); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  const handleReply = async () => {
    if (!reply.trim()) return;
    try {
      setSending(true);
      const res = await supportAPI.reply(selected._id, { message: reply });
      setSelected(res.data);
      setReply("");
      fetchTickets();
    } catch { alert("Failed to send reply"); }
    finally { setSending(false); }
  };

  const handleClose = async (id) => {
    if (!confirm("Close this ticket?")) return;
    try {
      setClosing(true);
      const res = await supportAPI.close(id);
      if (selected?._id === id) setSelected(res.data);
      fetchTickets();
    } catch { alert("Failed to close ticket"); }
    finally { setClosing(false); }
  };

  const handleCreate = async () => {
    if (!newTicket.subject.trim()) return alert("Subject is required");
    try {
      setCreating(true);
      await supportAPI.create(newTicket);
      setShowCreate(false);
      setNewTicket({ subject: "", description: "", priority: "Medium" });
      fetchTickets();
    } catch { alert("Failed to create ticket"); }
    finally { setCreating(false); }
  };

  const openCount = tickets.filter(t => t.status === "open").length;
  const inProgressCount = tickets.filter(t => t.status === "in_progress").length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support</h1>
          <p className="mt-1 text-sm text-gray-500">{openCount} open · {inProgressCount} in progress</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchTickets} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
            <RefreshCw className="h-4 w-4"/>
          </button>
          <button onClick={() => setShowCreate(true)} className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90">
            <Plus className="h-4 w-4"/>New Ticket
          </button>
        </div>
      </div>

      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["all", "open", "in_progress", "resolved", "closed"].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${statusFilter === s ? "bg-black text-white" : "border border-gray-200 hover:bg-gray-50"}`}>
            {s === "all" ? "All" : s.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Tickets List */}
        <div className="lg:col-span-1 space-y-3">
          {loading ? (
            Array(3).fill(0).map((_, i) => <div key={i} className="h-24 rounded-2xl bg-gray-100 animate-pulse"/>)
          ) : tickets.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-400">
              <MessageCircle className="mx-auto h-8 w-8 mb-2 opacity-40"/>
              <p className="text-sm">No {statusFilter !== "all" ? statusFilter : ""} tickets</p>
            </div>
          ) : tickets.map(t => (
            <div key={t._id} onClick={() => setSelected(t)}
              className={`cursor-pointer rounded-2xl border p-4 transition-all hover:shadow-md ${selected?._id === t._id ? "border-black bg-black/5" : "border-gray-200 bg-white"}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{t.subject}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.ticketNumber || t._id?.toString().slice(-8)}</div>
                  <div className="text-xs text-gray-400 mt-1">{t.userId?.fullname || "Admin"}</div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${PRIORITY_STYLES[t.priority] || "bg-gray-100 text-gray-600"}`}>{t.priority}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_STYLES[t.status] || "bg-gray-100 text-gray-600"}`}>{t.status.replace("_"," ")}</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">{new Date(t.createdAt).toLocaleDateString("en-IN")}</div>
            </div>
          ))}
        </div>

        {/* Ticket Detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm h-full flex flex-col">
              <div className="flex items-center justify-between border-b px-5 py-4">
                <div>
                  <h2 className="font-semibold">{selected.subject}</h2>
                  <p className="text-xs text-gray-500 mt-0.5">{selected.ticketNumber || selected._id?.toString().slice(-8)} · {selected.userId?.fullname || "—"}</p>
                </div>
                <div className="flex gap-2">
                  {selected.status !== "closed" && (
                    <button onClick={() => handleClose(selected._id)} disabled={closing}
                      className="rounded-xl border px-3 py-1.5 text-xs font-medium hover:bg-gray-50 disabled:opacity-50">
                      {closing ? "Closing..." : "Close Ticket"}
                    </button>
                  )}
                  <button onClick={() => setSelected(null)} className="rounded-lg p-2 hover:bg-gray-100">
                    <X className="h-4 w-4"/>
                  </button>
                </div>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-96">
                {selected.description && (
                  <div className="rounded-xl bg-gray-50 border p-4">
                    <div className="text-xs font-medium text-gray-400 mb-1">Original Message</div>
                    <div className="text-sm">{selected.description}</div>
                  </div>
                )}
                {(selected.messages || []).map((m, i) => (
                  <div key={i} className={`flex ${m.from === "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs rounded-2xl px-4 py-3 text-sm ${m.from === "admin" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}>
                      <div>{m.message}</div>
                      <div className={`mt-1 text-[10px] ${m.from === "admin" ? "text-white/60" : "text-gray-400"}`}>
                        {m.from === "admin" ? "You" : "User"} · {new Date(m.sentAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}
                {(!selected.messages || selected.messages.length === 0) && !selected.description && (
                  <div className="text-center text-sm text-gray-400 py-8">No messages yet</div>
                )}
              </div>
              {/* Reply Box */}
              {selected.status !== "closed" && (
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <input value={reply} onChange={e => setReply(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleReply()}
                      placeholder="Type a reply..."
                      className="flex-1 h-10 rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
                    <button onClick={handleReply} disabled={sending || !reply.trim()}
                      className="inline-flex items-center gap-1 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50">
                      <Send className="h-4 w-4"/>{sending ? "..." : "Send"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MessageCircle className="mx-auto h-10 w-10 mb-2 opacity-40"/>
                <p className="text-sm">Select a ticket to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Create Support Ticket</h2>
              <button onClick={() => setShowCreate(false)} className="rounded-lg p-2 hover:bg-gray-100"><X className="h-4 w-4"/></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Subject *</label>
                <input value={newTicket.subject} onChange={e => setNewTicket(t => ({ ...t, subject: e.target.value }))} placeholder="Describe the issue briefly"
                  className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/10"/>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea value={newTicket.description} onChange={e => setNewTicket(t => ({ ...t, description: e.target.value }))} placeholder="Provide more context..." rows={3}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-black resize-none"/>
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <select value={newTicket.priority} onChange={e => setNewTicket(t => ({ ...t, priority: e.target.value }))}
                  className="mt-1 h-10 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none focus:border-black">
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setShowCreate(false)} className="flex-1 rounded-xl border py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button onClick={handleCreate} disabled={creating}
                  className="flex-1 rounded-xl bg-black py-2 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50">
                  {creating ? "Creating..." : "Create Ticket"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}