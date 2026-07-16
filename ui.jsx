/* ============================================================
   Primitivos de UI compartilhados entre módulos (equivalente aos
   "Themed*" widgets do plano original) — Modal, EmptyState.
   Carregado antes de home/calendar/checklists/notes para reuso.
   ============================================================ */
const { useEffect: useEffectUi, useState: useStateUi } = React;

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

/* Seletor de tema — prova visível de que o Theme Engine é
   plugável: qualquer tema registrado em theme.jsx aparece aqui
   sem nenhuma mudança neste componente. */
function ThemeSwitcherButton() {
  const { themeId, theme, setTheme, availableThemes } = useTheme();
  const [open, setOpen] = useStateUi(false);

  return (
    <>
      <button className="theme-switch-btn" onClick={() => setOpen(true)} aria-label="Trocar tema">
        <Ic.sparkle size={18} />
      </button>
      {open && (
        <Modal title="Escolher tema" onClose={() => setOpen(false)}>
          {availableThemes.map((t) => (
            <button
              key={t.id}
              className="card"
              style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              onClick={() => { setTheme(t.id); setOpen(false); }}
            >
              <span className="card__title" style={{ marginBottom: 0 }}>{t.label}</span>
              {t.id === themeId && <Ic.check size={18} color="var(--color-primary)" />}
            </button>
          ))}
        </Modal>
      )}
    </>
  );
}

window.Modal = Modal;
window.EmptyState = EmptyState;
window.ThemeSwitcherButton = ThemeSwitcherButton;
