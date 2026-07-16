/* ============================================================
   Componente raiz — injeta ThemeProvider + DataProvider e monta.
   Antes de mostrar o app, exige um perfil (nome) salvo; sem isso
   mostra o Onboarding.
   ============================================================ */
function AppGate() {
  const { profile, setProfile } = useData();

  if (!profile || !profile.name) {
    return <OnboardingScreen onComplete={setProfile} />;
  }

  return <RootViews />;
}

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <AppGate />
      </DataProvider>
    </ThemeProvider>
  );
}

/* No Safari em aba normal, o próprio navegador já reserva espaço
   para o home indicator — se a gente TAMBÉM somar
   env(safe-area-inset-bottom), o respiro fica dobrado e a barra
   inferior parece "flutuar" longe do fundo. Só reservamos esse
   espaço quando o app está de fato instalado (standalone/fullscreen),
   onde o conteúdo vai até a borda física da tela. */
if (window.navigator.standalone === true) {
  document.documentElement.classList.add("pwa-standalone");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
