/* GERADO AUTOMATICAMENTE a partir de ui.jsx — não edite à mão. Rode: npm run build */
(function () {
const {
  useEffect: useEffectUi,
  useState: useStateUi
} = React;
function Modal({
  title,
  onClose,
  children
}) {
  useEffectUi(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  useEffectUi(() => {
    const count = parseInt(document.body.dataset.modalCount || "0", 10) + 1;
    document.body.dataset.modalCount = String(count);
    document.body.classList.add("modal-open");
    return () => {
      const remaining = Math.max(0, parseInt(document.body.dataset.modalCount || "1", 10) - 1);
      document.body.dataset.modalCount = String(remaining);
      if (remaining === 0) document.body.classList.remove("modal-open");
    };
  }, []);
  const [viewportHeight, setViewportHeight] = useStateUi(() => window.visualViewport ? window.visualViewport.height : window.innerHeight);
  useEffectUi(() => {
    if (!window.visualViewport) return;
    function onResize() {
      setViewportHeight(window.visualViewport.height);
    }
    window.visualViewport.addEventListener("resize", onResize);
    onResize();
    return () => window.visualViewport.removeEventListener("resize", onResize);
  }, []);
  return React.createElement("div", {
    className: "modal-backdrop",
    style: {
      height: viewportHeight
    },
    onClick: onClose
  }, React.createElement("div", {
    className: "modal-sheet",
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title
  }, React.createElement("div", {
    className: "modal-header"
  }, React.createElement("h2", {
    className: "modal-header__title"
  }, title), React.createElement("button", {
    className: "btn btn--icon",
    onClick: onClose,
    "aria-label": "Fechar"
  }, React.createElement(Ic.close, {
    size: 18
  }))), children));
}
function EmptyState({
  icon,
  text
}) {
  return React.createElement("div", {
    className: "empty-state"
  }, React.createElement("div", {
    className: "empty-state__icon"
  }, icon), React.createElement("p", null, text));
}
function ThemeSwitcherButton() {
  const {
    themeId,
    setTheme,
    availableThemes
  } = useTheme();
  const {
    profile,
    setProfile
  } = useData();
  const [open, setOpen] = useStateUi(false);
  const [name, setName] = useStateUi(profile?.name || "");
  function saveName() {
    const trimmed = name.trim();
    if (trimmed && trimmed !== profile?.name) setProfile({
      ...profile,
      name: trimmed
    });
  }
  return React.createElement(React.Fragment, null, React.createElement("button", {
    className: "theme-switch-btn",
    onClick: () => setOpen(true),
    "aria-label": "Configura\xE7\xF5es"
  }, React.createElement(Ic.sparkle, {
    size: 18
  })), open && React.createElement(Modal, {
    title: "Perfil e tema",
    onClose: () => {
      saveName();
      setOpen(false);
    }
  }, React.createElement("div", {
    className: "field"
  }, React.createElement("label", {
    htmlFor: "profile-name"
  }, "Seu nome"), React.createElement("input", {
    id: "profile-name",
    value: name,
    onChange: e => setName(e.target.value),
    onBlur: saveName
  })), React.createElement("p", {
    className: "section-title",
    style: {
      marginTop: 0,
      fontSize: "1.15rem"
    }
  }, "Tema"), availableThemes.map(t => React.createElement("button", {
    key: t.id,
    className: "card",
    style: {
      width: "100%",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    onClick: () => setTheme(t.id)
  }, React.createElement("span", {
    className: "card__title",
    style: {
      marginBottom: 0
    }
  }, t.label), t.id === themeId && React.createElement(Ic.check, {
    size: 18,
    color: "var(--color-primary)"
  })))));
}
window.Modal = Modal;
window.EmptyState = EmptyState;
window.ThemeSwitcherButton = ThemeSwitcherButton;
})();
