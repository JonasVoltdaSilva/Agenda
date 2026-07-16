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

  /* Esconde o FAB/botão de config enquanto QUALQUER modal estiver
     aberto — um overlay semi-transparente sozinho ainda deixa esses
     botões "vazarem" visualmente por baixo dele. Contador em vez de
     boolean: cobre o caso de modais aninhados (Notas → Documento). */
  useEffectUi(() => {
    const count = (parseInt(document.body.dataset.modalCount || "0", 10)) + 1;
    document.body.dataset.modalCount = String(count);
    document.body.classList.add("modal-open");
    return () => {
      const remaining = Math.max(0, parseInt(document.body.dataset.modalCount || "1", 10) - 1);
      document.body.dataset.modalCount = String(remaining);
      if (remaining === 0) document.body.classList.remove("modal-open");
    };
  }, []);

  /* No mobile, o teclado virtual encolhe a "visual viewport" mas
     não a viewport de layout — um backdrop com inset:0 fixo não
     percebe isso e o campo focado fica escondido atrás do teclado.
     Acompanhamos a visualViewport e encolhemos o backdrop junto,
     empurrando a folha para cima do teclado. */
  const [viewportHeight, setViewportHeight] = useStateUi(
    () => (window.visualViewport ? window.visualViewport.height : window.innerHeight)
  );

  useEffectUi(() => {
    if (!window.visualViewport) return;
    function onResize() { setViewportHeight(window.visualViewport.height); }
    window.visualViewport.addEventListener("resize", onResize);
    onResize();
    return () => window.visualViewport.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="modal-backdrop" style={{ height: viewportHeight }} onClick={onClose}>
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

/* Botão de configurações — troca de tema (prova visível de que o
   Theme Engine é plugável: qualquer tema registrado em theme.jsx
   aparece aqui sem nenhuma mudança neste componente) + edição do
   nome capturado no onboarding. */
function ThemeSwitcherButton() {
  const { themeId, setTheme, availableThemes } = useTheme();
  const { profile, setProfile } = useData();
  const [open, setOpen] = useStateUi(false);
  const [name, setName] = useStateUi(profile?.name || "");

  function saveName() {
    const trimmed = name.trim();
    if (trimmed && trimmed !== profile?.name) setProfile({ ...profile, name: trimmed });
  }

  return (
    <>
      <button className="theme-switch-btn" onClick={() => setOpen(true)} aria-label="Configurações">
        <Ic.sparkle size={18} />
      </button>
      {open && (
        <Modal title="Perfil e tema" onClose={() => { saveName(); setOpen(false); }}>
          <div className="field">
            <label htmlFor="profile-name">Seu nome</label>
            <input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} onBlur={saveName} />
          </div>

          <p className="section-title" style={{ marginTop: 0, fontSize: "1.15rem" }}>Tema</p>
          {availableThemes.map((t) => (
            <button
              key={t.id}
              className="card"
              style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              onClick={() => setTheme(t.id)}
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
