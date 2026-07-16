/* ============================================================
   Componente raiz — injeta ThemeProvider + DataProvider e monta.
   ============================================================ */
function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <RootViews />
      </DataProvider>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
