/* ============================================================
   Onboarding — primeira tela ao abrir o app pela primeira vez.
   Pede o nome (usado na saudação da Home) e deixa escolher um
   tema, com pré-visualização ao vivo (prova o Theme Engine já
   na primeira experiência do app).
   ============================================================ */
const { useState: useStateOnb } = React;

function OnboardingScreen({ onComplete }) {
  const { themeId, setTheme, availableThemes } = useTheme();
  const [name, setName] = useStateOnb("");
  const [error, setError] = useStateOnb("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) { setError("Digite seu nome para continuar."); return; }
    onComplete({ name: name.trim() });
  }

  return (
    <div className="onboarding-screen">
      <div>
        <h1 className="onboarding-screen__title">Bem-vindo(a)</h1>
        <p className="onboarding-screen__subtitle">Como podemos te chamar?</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            placeholder="Seu nome"
            autoFocus
          />
        </div>
        {error && (
          <p style={{ color: "var(--color-error)", fontSize: "0.85rem", marginTop: -12, marginBottom: 16 }}>{error}</p>
        )}

        <p className="onboarding-screen__subtitle" style={{ marginBottom: 8 }}>Escolha um tema (dá pra trocar depois)</p>
        <div className="onboarding-theme-row">
          {availableThemes.map((t) => (
            <button
              type="button"
              key={t.id}
              className="onboarding-theme-option"
              data-selected={themeId === t.id}
              onClick={() => setTheme(t.id)}
            >
              {t.label}
              {themeId === t.id && <Ic.check size={16} color="var(--color-primary)" />}
            </button>
          ))}
        </div>

        <button type="submit" className="btn" style={{ width: "100%", marginTop: 24 }}>Continuar</button>
      </form>
    </div>
  );
}

window.OnboardingScreen = OnboardingScreen;
