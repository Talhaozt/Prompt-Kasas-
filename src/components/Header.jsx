export default function Header({ count }) {
  return (
    <div className="pv-header">
      <div className="pv-logo">

        <div className="pv-logo-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 3a4 4 0 0 0-4 4v2a3 3 0 0 0 0 6v1a4 4 0 0 0 4 4" />
            <path d="M15 3a4 4 0 0 1 4 4v2a3 3 0 0 1 0 6v1a4 4 0 0 1-4 4" />
            <path d="M9 7h6" />
            <path d="M9 11h6" />
            <path d="M9 15h6" />
          </svg>
        </div>

        <div>
          <div className="pv-title">Prompt Kasası</div>
          <div className="pv-subtitle">Kaydet · Düzenle · Yeniden Kullan</div>
        </div>

      </div>

      <div className="pv-badge">
        {count} prompt{count !== 1 ? "s" : ""}
      </div>
    </div>
  );
}