/* GERADO AUTOMATICAMENTE a partir de onboarding.jsx — não edite à mão. Rode: npm run build */
(function () {
const {
  useState: useStateOnb
} = React;
function OnboardingScreen({
  onComplete
}) {
  const {
    themeId,
    setTheme,
    availableThemes
  } = useTheme();
  const [name, setName] = useStateOnb("");
  const [error, setError] = useStateOnb("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Digite seu nome para continuar.");
      return;
    }
    onComplete({
      name: name.trim()
    });
  }
  return React.createElement("div", {
    className: "onboarding-screen"
  }, React.createElement("div", null, React.createElement("h1", {
    className: "onboarding-screen__title"
  }, "Bem-vindo(a)"), React.createElement("p", {
    className: "onboarding-screen__subtitle"
  }, "Como podemos te chamar?")), React.createElement("form", {
    onSubmit: handleSubmit
  }, React.createElement("div", {
    className: "field"
  }, React.createElement("input", {
    value: name,
    onChange: e => {
      setName(e.target.value);
      setError("");
    },
    placeholder: "Seu nome",
    autoFocus: true
  })), error && React.createElement("p", {
    style: {
      color: "var(--color-error)",
      fontSize: "0.85rem",
      marginTop: -12,
      marginBottom: 16
    }
  }, error), React.createElement("p", {
    className: "onboarding-screen__subtitle",
    style: {
      marginBottom: 8
    }
  }, "Escolha um tema (d\xE1 pra trocar depois)"), React.createElement("div", {
    className: "onboarding-theme-row"
  }, availableThemes.map(t => React.createElement("button", {
    type: "button",
    key: t.id,
    className: "onboarding-theme-option",
    "data-selected": themeId === t.id,
    onClick: () => setTheme(t.id)
  }, t.label, themeId === t.id && React.createElement(Ic.check, {
    size: 16,
    color: "var(--color-primary)"
  })))), React.createElement("button", {
    type: "submit",
    className: "btn",
    style: {
      width: "100%",
      marginTop: 24
    }
  }, "Continuar")));
}
window.OnboardingScreen = OnboardingScreen;
})();
