import { useEffect, useState } from "react";

const DEFAULT_CATEGORIES = ["Kodlama", "Yazı", "Eğitim", "Tasarım", "İş", "Diğer"];

export default function PromptForm({ onAdd, onUpdate, editingPrompt, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Kodlama");
  const [content, setContent] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingPrompt) {
      setTitle(editingPrompt.title);
      setCategory(editingPrompt.category);
      setContent(editingPrompt.content);
      setTagsText(editingPrompt.tags.join(", "));
      setError("");
    } else {
      setTitle("");
      setCategory("Kodlama");
      setContent("");
      setTagsText("");
      setError("");
    }
  }, [editingPrompt]);

  const parseTags = (text) =>
    text.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 10);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return setError("Başlık zorunludur.");
    if (!content.trim()) return setError("Lütfen bir prompt içeriği girin.");

    const tags = parseTags(tagsText);

    if (editingPrompt) {
      onUpdate({
        ...editingPrompt,
        title: title.trim(),
        category,
        content: content.trim(),
        tags,
        updatedAt: new Date().toISOString(),
      });
    } else {
      onAdd({ title, category, content, tags });
    }

    setTitle("");
    setCategory("Kodlama");
    setContent("");
    setTagsText("");
    setError("");
  };

  return (
    <form className={`pv-form${editingPrompt ? " editing" : ""}`} onSubmit={handleSubmit}>
      
      <div className={`pv-form-header${editingPrompt ? " editing" : ""}`}>
        {editingPrompt ? "PROMPT DÜZENLE" : "+ YENİ PROMPT EKLE"}
      </div>

      <div className="pv-form-row">
        
        <input
          className="pv-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Prompt başlığı girin (örn: 'Hata analiz asistanı')"
          style={{ flex: 2, minWidth: 200 }}
        />

        <select
          className="pv-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {DEFAULT_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          className="pv-input"
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          placeholder="Etiketler (örn: react, sql, cv)"
          style={{ flex: 1.5, minWidth: 180 }}
        />

      </div>

      <textarea
        className="pv-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Prompt içeriğini buraya yazın..."
        rows={5}
      />

      {error && <div className="pv-error">{error}</div>}

      <div className="pv-form-actions">

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" className="btn btn-primary">
            {editingPrompt ? "Değişiklikleri Kaydet" : "+ Prompt Ekle"}
          </button>

          {editingPrompt && (
            <button type="button" className="btn" onClick={onCancelEdit}>
              İptal
            </button>
          )}
        </div>

        <div className="pv-tip">En fazla 10 etiket</div>

      </div>
    </form>
  );
}