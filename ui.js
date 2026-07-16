/* GERADO AUTOMATICAMENTE a partir de ui.jsx — não edite à mão. Rode: npm run build */
(function () {
const {
  useEffect: useEffectUi
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
window.Modal = Modal;
window.EmptyState = EmptyState;
})();
