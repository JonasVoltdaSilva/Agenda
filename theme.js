/* GERADO AUTOMATICAMENTE a partir de theme.jsx — não edite à mão. Rode: npm run build */
(function () {
const {
  createContext,
  useContext,
  useState,
  useEffect
} = React;
const THEMES = {
  "bullet-journal": {
    id: "bullet-journal",
    label: "Bullet Journal",
    icon: "notebook"
  },
  "windows-xp": {
    id: "windows-xp",
    label: "Windows XP",
    icon: "sparkle"
  }
};
const THEME_STORAGE_KEY = "agenda_theme";
const DEFAULT_THEME = "bullet-journal";
const ThemeContext = createContext(null);
function ThemeProvider({
  children
}) {
  const [themeId, setThemeIdState] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && THEMES[saved]) return saved;
    } catch (e) {}
    return DEFAULT_THEME;
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeId);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch (e) {}
  }, [themeId]);
  const setTheme = id => {
    if (THEMES[id]) setThemeIdState(id);
  };
  const value = {
    themeId,
    theme: THEMES[themeId],
    setTheme,
    availableThemes: Object.values(THEMES)
  };
  return React.createElement(ThemeContext.Provider, {
    value: value
  }, children);
}
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  return ctx;
}
window.THEMES = THEMES;
window.ThemeProvider = ThemeProvider;
window.useTheme = useTheme;
})();
