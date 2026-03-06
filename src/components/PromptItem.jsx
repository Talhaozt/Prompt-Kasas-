import { useState } from "react";

const CATEGORY_COLORS = {
  Kodlama: { bg: "#0d2137", border: "#1e5799", text: "#60b4ff" },
  Yazı:    { bg: "#1a1229", border: "#6b3fa0", text: "#c084fc" },
  Eğitim:  { bg: "#0e2118", border: "#166534", text: "#4ade80" },
  Tasarım: { bg: "#1a1008", border: "#92400e", text: "#fb923c" },
  İş:      { bg: "#150d1f", border: "#7c3aed", text: "#a78bfa" },
  Diğer:   { bg: "#1a1a1a", border: "#525252", text: "#a3a3a3" },
};

export default function PromptItem({ prompt, onDelete, onEdit, onToast }) {
  const [expanded, setExpanded] = useState(false);
  const colors = CATEGORY_COLORS[prompt.category] || CATEGORY_COLORS.Diğer;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      onToast("Panoya kopyalandı!");
    } catch {
      onToast("Kopyalama başarısız.");
    }
  };

  const updatedStr = prompt.updatedAt
    ? new Date(prompt.updatedAt).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : prompt.createdAt
    ? new Date(prompt.createdAt).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="pv-card">
      <div className="pv-card-body">

        <div className="pv-card-title">{prompt.title}</div>

        <div className={`pv-card-content${expanded ? " expanded" : ""}`}>
          {prompt.content}
        </div>

        {prompt.content.length > 150 && (
          <button
            className="btn btn-icon"
            style={{ marginTop: 6, fontSize: 11, color: "#444", padding: "4px 0" }}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Daralt" : "Devamını Göster"}
          </button>
        )}

        <div className="pv-card-tags">

          <span
            className="pv-tag"
            style={{
              background: colors.bg,
              borderColor: colors.border,
              color: colors.text,
            }}
          >
            {prompt.category}
          </span>

          {prompt.tags.map((t) => (
            <span
              key={t}
              className="pv-tag"
              style={{
                background: "#111",
                borderColor: "#2a2a2a",
                color: "#555",
              }}
            >
              #{t}
            </span>
          ))}

        </div>

        <div className="pv-card-meta">
          Güncellendi: {updatedStr}
        </div>

      </div>

      <div className="pv-card-actions">

        <button
          className="btn btn-icon"
          onClick={handleCopy}
          title="Kopyala"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <rect x="9" y="9" width="13" height="13" rx="2"/>
  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
</svg>
        </button>

        <button
          className="btn btn-icon"
          onClick={() => onEdit(prompt)}
          title="Düzenle"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <path d="M12 20h9"/>
  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
</svg>
        </button>

        <button
          className="btn btn-danger"
          onClick={() => onDelete(prompt.id)}
          title="Sil"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <line x1="18" y1="6" x2="6" y2="18"/>
  <line x1="6" y1="6" x2="18" y2="18"/>
</svg>
        </button>

      </div>
    </div>
  );
}