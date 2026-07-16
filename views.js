/* GERADO AUTOMATICAMENTE a partir de views.jsx — não edite à mão. Rode: npm run build */
(function () {
const {
  useState: useStateViews
} = React;
const TABS = [{
  id: "home",
  label: "Início",
  Icon: () => React.createElement(Ic.home, {
    size: 22
  })
}, {
  id: "calendar",
  label: "Agenda",
  Icon: () => React.createElement(Ic.calendar, {
    size: 22
  })
}, {
  id: "checklists",
  label: "Checklists",
  Icon: () => React.createElement(Ic.checklist, {
    size: 22
  })
}, {
  id: "notes",
  label: "Notas",
  Icon: () => React.createElement(Ic.notes, {
    size: 22
  })
}];
const SCREENS = {
  home: HomeScreen,
  calendar: CalendarScreen,
  checklists: ChecklistsScreen,
  notes: NotesScreen
};
function RootViews() {
  const [tab, setTab] = useStateViews("home");
  const ActiveScreen = SCREENS[tab];
  return React.createElement(React.Fragment, null, React.createElement(ThemeSwitcherButton, null), React.createElement(ActiveScreen, {
    onNavigate: setTab
  }), React.createElement("nav", {
    className: "bottom-nav"
  }, TABS.map(({
    id,
    label,
    Icon
  }) => React.createElement("button", {
    key: id,
    className: "bottom-nav__item",
    "data-active": tab === id,
    onClick: () => setTab(id),
    "aria-label": label,
    "aria-current": tab === id ? "page" : undefined
  }, React.createElement(Icon, null), React.createElement("span", null, label)))));
}
window.RootViews = RootViews;
})();
