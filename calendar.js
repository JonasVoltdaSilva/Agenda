/* GERADO AUTOMATICAMENTE a partir de calendar.jsx — não edite à mão. Rode: npm run build */
(function () {
const {
  useState: useStateCal,
  useMemo: useMemoCal
} = React;
const WEEKDAYS_PT = ["D", "S", "T", "Q", "Q", "S", "S"];
function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d, n) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function isSameDate(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function toDateInputValue(d) {
  const pad = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function buildMonthGrid(monthDate) {
  const first = startOfMonth(monthDate);
  const firstWeekday = first.getDay();
  const gridStart = addDays(first, -firstWeekday);
  const cells = [];
  for (let i = 0; i < 42; i++) cells.push(addDays(gridStart, i));
  return cells;
}
function EventEditorModal({
  initialDate,
  event,
  onSave,
  onDelete,
  onClose
}) {
  const [title, setTitle] = useStateCal(event ? event.title : "");
  const [date, setDate] = useStateCal(toDateInputValue(event ? new Date(event.startAt) : initialDate));
  const [time, setTime] = useStateCal(event && !event.isAllDay ? new Date(event.startAt).toTimeString().slice(0, 5) : "09:00");
  const [isAllDay, setIsAllDay] = useStateCal(event ? event.isAllDay : false);
  const [description, setDescription] = useStateCal(event ? event.description || "" : "");
  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const startAt = isAllDay ? new Date(`${date}T00:00:00`).toISOString() : new Date(`${date}T${time}:00`).toISOString();
    onSave({
      title: title.trim(),
      description: description.trim(),
      startAt,
      isAllDay
    });
  }
  return React.createElement(Modal, {
    title: event ? "Editar evento" : "Novo evento",
    onClose: onClose
  }, React.createElement("form", {
    onSubmit: handleSubmit
  }, React.createElement("div", {
    className: "field"
  }, React.createElement("label", {
    htmlFor: "ev-title"
  }, "T\xEDtulo"), React.createElement("input", {
    id: "ev-title",
    value: title,
    onChange: e => setTitle(e.target.value),
    placeholder: "Ex.: Reuni\xE3o de projeto",
    autoFocus: true
  })), React.createElement("div", {
    className: "field"
  }, React.createElement("label", {
    htmlFor: "ev-date"
  }, "Data"), React.createElement("input", {
    id: "ev-date",
    type: "date",
    value: date,
    onChange: e => setDate(e.target.value)
  })), !isAllDay && React.createElement("div", {
    className: "field"
  }, React.createElement("label", {
    htmlFor: "ev-time"
  }, "Hora"), React.createElement("input", {
    id: "ev-time",
    type: "time",
    value: time,
    onChange: e => setTime(e.target.value)
  })), React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
      fontSize: "0.9rem"
    }
  }, React.createElement("input", {
    type: "checkbox",
    checked: isAllDay,
    onChange: e => setIsAllDay(e.target.checked)
  }), "Dia todo"), React.createElement("div", {
    className: "field"
  }, React.createElement("label", {
    htmlFor: "ev-desc"
  }, "Notas"), React.createElement("textarea", {
    id: "ev-desc",
    value: description,
    onChange: e => setDescription(e.target.value),
    placeholder: "Opcional"
  })), React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      justifyContent: "space-between"
    }
  }, event ? React.createElement("button", {
    type: "button",
    className: "btn btn--secondary",
    onClick: () => onDelete(event.id)
  }, React.createElement(Ic.trash, {
    size: 16
  }), " Excluir") : React.createElement("span", null), React.createElement("button", {
    type: "submit",
    className: "btn"
  }, "Salvar"))));
}
function CalendarScreen() {
  const {
    events,
    eventActions
  } = useData();
  const [visibleMonth, setVisibleMonth] = useStateCal(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useStateCal(() => new Date());
  const [editing, setEditing] = useStateCal(null);
  const cells = useMemoCal(() => buildMonthGrid(visibleMonth), [visibleMonth]);
  const today = useMemoCal(() => new Date(), []);
  const eventsByDay = useMemoCal(() => {
    const map = {};
    events.forEach(e => {
      const key = toDateInputValue(new Date(e.startAt));
      (map[key] = map[key] || []).push(e);
    });
    return map;
  }, [events]);
  const selectedEvents = (eventsByDay[toDateInputValue(selectedDate)] || []).sort((a, b) => a.startAt.localeCompare(b.startAt));
  function handleSave(data) {
    if (editing && editing.event) {
      eventActions.update(editing.event.id, data);
    } else {
      eventActions.add(data);
    }
    setEditing(null);
  }
  function handleDelete(id) {
    eventActions.remove(id);
    setEditing(null);
  }
  const monthLabel = visibleMonth.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric"
  });
  return React.createElement(React.Fragment, null, React.createElement("header", {
    className: "app-header"
  }, React.createElement("h1", {
    className: "app-header__greeting"
  }, "Agenda")), React.createElement("main", {
    className: "app-main"
  }, React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "calendar-month-header"
  }, React.createElement("button", {
    className: "btn btn--icon",
    onClick: () => setVisibleMonth(m => addMonths(m, -1)),
    "aria-label": "M\xEAs anterior"
  }, React.createElement(Ic.chevronLeft, {
    size: 18
  })), React.createElement("span", {
    className: "calendar-month-header__label",
    style: {
      textTransform: "capitalize"
    }
  }, monthLabel), React.createElement("button", {
    className: "btn btn--icon",
    onClick: () => setVisibleMonth(m => addMonths(m, 1)),
    "aria-label": "Pr\xF3ximo m\xEAs"
  }, React.createElement(Ic.chevronRight, {
    size: 18
  }))), React.createElement("div", {
    className: "calendar-grid"
  }, WEEKDAYS_PT.map((w, i) => React.createElement("div", {
    className: "calendar-weekday",
    key: i
  }, w)), cells.map((d, i) => {
    const key = toDateInputValue(d);
    const hasEvents = (eventsByDay[key] || []).length > 0;
    return React.createElement("button", {
      key: i,
      className: "calendar-cell",
      "data-outside": d.getMonth() !== visibleMonth.getMonth(),
      "data-today": isSameDate(d, today),
      "data-selected": isSameDate(d, selectedDate),
      onClick: () => setSelectedDate(d),
      "aria-label": d.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long"
      })
    }, d.getDate(), hasEvents && React.createElement("span", {
      className: "calendar-cell__dot"
    }));
  }))), React.createElement("h2", {
    className: "section-title",
    style: {
      textTransform: "capitalize"
    }
  }, selectedDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  })), selectedEvents.length === 0 ? React.createElement(EmptyState, {
    icon: React.createElement(Ic.calendar, {
      size: 40
    }),
    text: "Nenhum evento neste dia."
  }) : selectedEvents.map(e => React.createElement("button", {
    key: e.id,
    className: "card",
    style: {
      width: "100%",
      textAlign: "left",
      display: "flex",
      gap: 12,
      alignItems: "center"
    },
    onClick: () => setEditing({
      event: e
    })
  }, React.createElement("span", {
    className: "chip"
  }, e.isAllDay ? "Dia todo" : new Date(e.startAt).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  })), React.createElement("span", null, e.title)))), React.createElement("button", {
    className: "fab",
    onClick: () => setEditing({
      isNew: true
    }),
    "aria-label": "Novo evento"
  }, React.createElement(Ic.plus, {
    size: 24
  })), editing && React.createElement(EventEditorModal, {
    initialDate: selectedDate,
    event: editing.event,
    onSave: handleSave,
    onDelete: handleDelete,
    onClose: () => setEditing(null)
  }));
}
window.CalendarScreen = CalendarScreen;
})();
