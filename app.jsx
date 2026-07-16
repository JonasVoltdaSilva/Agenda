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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
