/* GERADO AUTOMATICAMENTE a partir de home.jsx — não edite à mão. Rode: npm run build */
(function () {
const {
  useMemo: useMemoHome
} = React;
function greetingFor(date) {
  const h = date.getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}
function isSameDay(isoA, dateB) {
  const a = new Date(isoA);
  return a.getFullYear() === dateB.getFullYear() && a.getMonth() === dateB.getMonth() && a.getDate() === dateB.getDate();
}
function HomeScreen({
  onNavigate
}) {
  const {
    events,
    checklists
  } = useData();
  const today = useMemoHome(() => new Date(), []);
  const todayEvents = useMemoHome(() => events.filter(e => isSameDay(e.startAt, today)).sort((a, b) => a.startAt.localeCompare(b.startAt)), [events, today]);
  const pendingItems = useMemoHome(() => {
    let count = 0;
    checklists.forEach(c => c.items.forEach(it => {
      if (!it.isDone) count++;
    }));
    return count;
  }, [checklists]);
  const dateLabel = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
  return React.createElement(React.Fragment, null, React.createElement("header", {
    className: "app-header"
  }, React.createElement("h1", {
    className: "app-header__greeting"
  }, greetingFor(today)), React.createElement("p", {
    className: "app-header__subtitle",
    style: {
      textTransform: "capitalize"
    }
  }, dateLabel)), React.createElement("main", {
    className: "app-main"
  }, React.createElement("div", {
    className: "card card--elevated"
  }, React.createElement("div", {
    className: "card__title"
  }, React.createElement(Ic.calendar, {
    size: 18
  }), " Hoje"), todayEvents.length === 0 ? React.createElement("p", {
    style: {
      color: "var(--color-text-secondary)",
      fontSize: "0.9rem"
    }
  }, "Nenhum evento para hoje.") : todayEvents.map(e => React.createElement("div", {
    key: e.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 0"
    }
  }, React.createElement("span", {
    className: "chip"
  }, e.isAllDay ? "Dia todo" : new Date(e.startAt).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  })), React.createElement("span", null, e.title))), pendingItems > 0 && React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: "0.85rem",
      color: "var(--color-text-secondary)"
    }
  }, React.createElement(Ic.checklist, {
    size: 14
  }), " ", pendingItems, " item", pendingItems > 1 ? "s" : "", " pendente", pendingItems > 1 ? "s" : "", " em checklists")), React.createElement("h2", {
    className: "section-title"
  }, "M\xF3dulos"), React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, React.createElement("button", {
    className: "card",
    style: {
      margin: 0,
      textAlign: "left"
    },
    onClick: () => onNavigate("calendar")
  }, React.createElement(Ic.calendar, {
    size: 24,
    color: "var(--color-primary)"
  }), React.createElement("div", {
    className: "card__title",
    style: {
      marginTop: 8
    }
  }, "Agenda")), React.createElement("button", {
    className: "card",
    style: {
      margin: 0,
      textAlign: "left"
    },
    onClick: () => onNavigate("checklists")
  }, React.createElement(Ic.checklist, {
    size: 24,
    color: "var(--color-primary)"
  }), React.createElement("div", {
    className: "card__title",
    style: {
      marginTop: 8
    }
  }, "Checklists")), React.createElement("button", {
    className: "card",
    style: {
      margin: 0,
      textAlign: "left"
    },
    onClick: () => onNavigate("notes")
  }, React.createElement(Ic.notes, {
    size: 24,
    color: "var(--color-primary)"
  }), React.createElement("div", {
    className: "card__title",
    style: {
      marginTop: 8
    }
  }, "Notas")))));
}
window.HomeScreen = HomeScreen;
})();
