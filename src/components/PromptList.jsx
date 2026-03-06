import PromptItem from "./PromptItem";

export default function PromptList({ prompts, onDelete, onEdit, onToast }) {
  if (!prompts.length) {
    return (
      <div className="pv-empty">
        <div className="pv-empty-text">
          Henüz kayıtlı prompt bulunmuyor. Yukarıdaki formu kullanarak yeni bir prompt ekleyebilirsiniz.
        </div>
      </div>
    );
  }

  return (
    <div className="pv-grid">
      {prompts.map((prompt) => (
        <PromptItem
          key={prompt.id}
          prompt={prompt}
          onDelete={onDelete}
          onEdit={onEdit}
          onToast={onToast}
        />
      ))}
    </div>
  );
}