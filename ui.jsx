/* ============================================================
   Primitivos de UI compartilhados entre módulos (equivalente aos
   "Themed*" widgets do plano original) — Modal, EmptyState.
   Carregado antes de home/calendar/checklists/notes para reuso.
   ============================================================ */
const { useEffect: useEffectUi } = React;

function Modal({ title, onClose, children }) {
  useEffectUi(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header">
          <h2 className="modal-header__title">{title}</h2>
          <button className="btn btn--icon" onClick={onClose} aria-label="Fechar">
            <Ic.close size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">{icon}</div>
      <p>{text}</p>
    </div>
  );
}

window.Modal = Modal;
window.EmptyState = EmptyState;
