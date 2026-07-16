/* ============================================================
   Navegação — bottom nav fixo + troca de tela via estado local
   (sem lib de router, consistente com o padrão single-file).
   ============================================================ */
const { useState: useStateViews } = React;

const TABS = [
  { id: "home", label: "Início", Icon: () => <Ic.home size={22} /> },
  { id: "calendar", label: "Agenda", Icon: () => <Ic.calendar size={22} /> },
  { id: "checklists", label: "Checklists", Icon: () => <Ic.checklist size={22} /> },
  { id: "notes", label: "Notas", Icon: () => <Ic.notes size={22} /> },
];

const SCREENS = {
  home: HomeScreen,
  calendar: CalendarScreen,
  checklists: ChecklistsScreen,
  notes: NotesScreen,
};

function RootViews() {
  const [tab, setTab] = useStateViews("home");
  const ActiveScreen = SCREENS[tab];

  return (
    <>
      <ThemeSwitcherButton />
      <ActiveScreen onNavigate={setTab} />
      <nav className="bottom-nav">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className="bottom-nav__item"
            data-active={tab === id}
            onClick={() => setTab(id)}
            aria-label={label}
            aria-current={tab === id ? "page" : undefined}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}

window.RootViews = RootViews;
