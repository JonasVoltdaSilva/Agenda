/* ============================================================
   Agenda/Calendário — grid mensal, lista do dia, criar/editar evento.
   Sem lib externa de calendário — grid próprio via Date nativo.
   ============================================================ */
const { useState: useStateCal, useMemo: useMemoCal } = React;

const WEEKDAYS_PT = ["D", "S", "T", "Q", "Q", "S", "S"];

function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function addMonths(d, n) { return new Date(d.getFullYear(), d.getMonth() + n, 1); }
function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function isSameDate(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function toDateInputValue(d) {
  const pad = (n) => String(n).padStart(2, "0");
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

function EventEditorModal({ initialDate, event, onSave, onDelete, onClose }) {
  const [title, setTitle] = useStateCal(event ? event.title : "");
  const [date, setDate] = useStateCal(toDateInputValue(event ? new Date(event.startAt) : initialDate));
  const [time, setTime] = useStateCal(event && !event.isAllDay ? new Date(event.startAt).toTimeString().slice(0, 5) : "09:00");
  const [isAllDay, setIsAllDay] = useStateCal(event ? event.isAllDay : false);
  const [description, setDescription] = useStateCal(event ? (event.description || "") : "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const startAt = isAllDay ? new Date(`${date}T00:00:00`).toISOString() : new Date(`${date}T${time}:00`).toISOString();
    onSave({ title: title.trim(), description: description.trim(), startAt, isAllDay });
  }

  return (
    <Modal title={event ? "Editar evento" : "Novo evento"} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="ev-title">Título</label>
          <input id="ev-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex.: Reunião de projeto" autoFocus />
        </div>
        <div className="field">
          <label htmlFor="ev-date">Data</label>
          <input id="ev-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        {!isAllDay && (
          <div className="field">
            <label htmlFor="ev-time">Hora</label>
            <input id="ev-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        )}
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: "0.9rem" }}>
          <input type="checkbox" checked={isAllDay} onChange={(e) => setIsAllDay(e.target.checked)} />
          Dia todo
        </label>
        <div className="field">
          <label htmlFor="ev-desc">Notas</label>
          <textarea id="ev-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opcional" />
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
          {event ? (
            <button type="button" className="btn btn--secondary" onClick={() => onDelete(event.id)}>
              <Ic.trash size={16} /> Excluir
            </button>
          ) : <span />}
          <button type="submit" className="btn">Salvar</button>
        </div>
      </form>
    </Modal>
  );
}

function CalendarScreen() {
  const { events, eventActions } = useData();
  const [visibleMonth, setVisibleMonth] = useStateCal(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useStateCal(() => new Date());
  const [editing, setEditing] = useStateCal(null); // null | { isNew, event? }

  const cells = useMemoCal(() => buildMonthGrid(visibleMonth), [visibleMonth]);
  const today = useMemoCal(() => new Date(), []);

  const eventsByDay = useMemoCal(() => {
    const map = {};
    events.forEach((e) => {
      const key = toDateInputValue(new Date(e.startAt));
      (map[key] = map[key] || []).push(e);
    });
    return map;
  }, [events]);

  const selectedEvents = (eventsByDay[toDateInputValue(selectedDate)] || [])
    .sort((a, b) => a.startAt.localeCompare(b.startAt));

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

  const monthLabel = visibleMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  return (
    <>
      <header className="app-header">
        <h1 className="app-header__greeting">Agenda</h1>
      </header>
      <main className="app-main">
        <div className="card">
          <div className="calendar-month-header">
            <button className="btn btn--icon" onClick={() => setVisibleMonth((m) => addMonths(m, -1))} aria-label="Mês anterior">
              <Ic.chevronLeft size={18} />
            </button>
            <span className="calendar-month-header__label" style={{ textTransform: "capitalize" }}>{monthLabel}</span>
            <button className="btn btn--icon" onClick={() => setVisibleMonth((m) => addMonths(m, 1))} aria-label="Próximo mês">
              <Ic.chevronRight size={18} />
            </button>
          </div>
          <div className="calendar-grid">
            {WEEKDAYS_PT.map((w, i) => <div className="calendar-weekday" key={i}>{w}</div>)}
            {cells.map((d, i) => {
              const key = toDateInputValue(d);
              const hasEvents = (eventsByDay[key] || []).length > 0;
              return (
                <button
                  key={i}
                  className="calendar-cell"
                  data-outside={d.getMonth() !== visibleMonth.getMonth()}
                  data-today={isSameDate(d, today)}
                  data-selected={isSameDate(d, selectedDate)}
                  onClick={() => setSelectedDate(d)}
                  aria-label={d.toLocaleDateString("pt-BR", { day: "numeric", month: "long" })}
                >
                  {d.getDate()}
                  {hasEvents && <span className="calendar-cell__dot" />}
                </button>
              );
            })}
          </div>
        </div>

        <h2 className="section-title" style={{ textTransform: "capitalize" }}>
          {selectedDate.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
        </h2>
        {selectedEvents.length === 0 ? (
          <EmptyState icon={<Ic.calendar size={40} />} text="Nenhum evento neste dia." />
        ) : (
          selectedEvents.map((e) => (
            <button key={e.id} className="card" style={{ width: "100%", textAlign: "left", display: "flex", gap: 12, alignItems: "center" }} onClick={() => setEditing({ event: e })}>
              <span className="chip">{e.isAllDay ? "Dia todo" : new Date(e.startAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
              <span>{e.title}</span>
            </button>
          ))
        )}
      </main>

      <button className="fab" onClick={() => setEditing({ isNew: true })} aria-label="Novo evento">
        <Ic.plus size={24} />
      </button>

      {editing && (
        <EventEditorModal
          initialDate={selectedDate}
          event={editing.event}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

window.CalendarScreen = CalendarScreen;
