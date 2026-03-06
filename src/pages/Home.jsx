import { useEffect, useMemo, useState, useCallback } from "react";
import Header from "../components/Header";
import PromptForm from "../components/PromptForm";
import PromptList from "../components/PromptList";

const STORAGE_KEY = "promptvault_v1";

function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="pv-toast">✓ {message}</div>;
}

export default function Home() {
  const [prompts, setPrompts] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  const [editingPrompt, setEditingPrompt] = useState(null);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts)); } catch {}
  }, [prompts]);

  const addPrompt = (payload) => {
    const now = new Date().toISOString();
    setPrompts((prev) => [{
      id: crypto.randomUUID(),
      title: payload.title.trim(),
      category: payload.category,
      content: payload.content.trim(),
      tags: payload.tags,
      createdAt: now,
      updatedAt: now,
    }, ...prev]);
  };

  const deletePrompt = (id) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id));
    if (editingPrompt?.id === id) setEditingPrompt(null);
  };

  const updatePrompt = (updated) => {
    setPrompts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditingPrompt(null);
  };

  const showToast = useCallback((msg) => setToast(msg), []);

  const categories = useMemo(() => {
    const set = new Set(prompts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prompts.filter((p) => {
      const matchCat = categoryFilter === "All" || p.category === categoryFilter;
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.tags.join(" ").toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [prompts, query, categoryFilter]);

  return (
    <div className="pv-root">
      <Header count={prompts.length} />

      <div className="pv-searchbar">
        <input className="pv-input" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Başlık, içerik veya etiket ile arama yapın…" />
        <select className="pv-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <PromptForm onAdd={addPrompt} onUpdate={updatePrompt} editingPrompt={editingPrompt} onCancelEdit={() => setEditingPrompt(null)} />

      <div className="pv-countbar">
        <div className="pv-count">
          {filteredPrompts.length} / {prompts.length} prompts
          {query || categoryFilter !== "All" ? " (filtered)" : ""}
        </div>
      </div>

      <PromptList prompts={filteredPrompts} onDelete={deletePrompt} onEdit={setEditingPrompt} onToast={showToast} />

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}