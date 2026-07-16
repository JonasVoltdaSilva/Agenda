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
  return React.createElement("div", {
    className: "modal-backdrop",
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
    theme,
    setTheme,
    availableThemes
  } = useTheme();
  const [open, setOpen] = useStateUi(false);
  return React.createElement(React.Fragment, null, React.createElement("button", {
    className: "theme-switch-btn",
    onClick: () => setOpen(true),
    "aria-label": "Trocar tema"
  }, React.createElement(Ic.sparkle, {
    size: 18
  })), open && React.createElement(Modal, {
    title: "Escolher tema",
    onClose: () => setOpen(false)
  }, availableThemes.map(t => React.createElement("button", {
    key: t.id,
    className: "card",
    style: {
      width: "100%",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    onClick: () => {
      setTheme(t.id);
      setOpen(false);
    }
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
