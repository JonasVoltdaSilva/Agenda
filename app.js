/* GERADO AUTOMATICAMENTE a partir de app.jsx — não edite à mão. Rode: npm run build */
(function () {
function AppGate() {
  const {
    profile,
    setProfile
  } = useData();
  if (!profile || !profile.name) {
    return React.createElement(OnboardingScreen, {
      onComplete: setProfile
    });
  }
  return React.createElement(RootViews, null);
}
function App() {
  return React.createElement(ThemeProvider, null, React.createElement(DataProvider, null, React.createElement(AppGate, null)));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App, null));
})();
