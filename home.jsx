/* ============================================================
   Home — resumo do dia + atalhos para os outros módulos.
   ============================================================ */
const { useMemo: useMemoHome } = React;

function greetingFor(date) {
  const h = date.getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

function isSameDay(isoA, dateB) {
  const a = new Date(isoA);
  return a.getFullYear() === dateB.getFullYear()
    && a.getMonth() === dateB.getMonth()
    && a.getDate() === dateB.getDate();
}

function HomeScreen({ onNavigate }) {
  const { events, checklists, profile } = useData();
  const today = useMemoHome(() => new Date(), []);

  const todayEvents = useMemoHome(
    () => events.filter((e) => isSameDay(e.startAt, today)).sort((a, b) => a.startAt.localeCompare(b.startAt)),
    [events, today]
  );

  const pendingItems = useMemoHome(() => {
    let count = 0;
    checklists.forEach((c) => c.items.forEach((it) => { if (!it.isDone) count++; }));
    return count;
  }, [checklists]);

  const dateLabel = today.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <>
      <header className="app-header">
        <h1 className="app-header__greeting">{greetingFor(today)}{profile?.name ? `, ${profile.name}` : ""}</h1>
        <p className="app-header__subtitle" style={{ textTransform: "capitalize" }}>{dateLabel}</p>
      </header>

      <main className="app-main">
        <div className="card card--elevated">
          <div className="card__title">
            <Ic.calendar size={18} /> Hoje
          </div>
          {todayEvents.length === 0 ? (
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>Nenhum evento para hoje.</p>
          ) : (
            todayEvents.map((e) => (
              <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
                <span className="chip">{e.isAllDay ? "Dia todo" : new Date(e.startAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
                <span>{e.title}</span>
              </div>
            ))
          )}
          {pendingItems > 0 && (
            <p style={{ marginTop: 12, fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
              <Ic.checklist size={14} /> {pendingItems} item{pendingItems > 1 ? "s" : ""} pendente{pendingItems > 1 ? "s" : ""} em checklists
            </p>
          )}
        </div>

        <h2 className="section-title">Módulos</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <button className="card" style={{ margin: 0, textAlign: "left" }} onClick={() => onNavigate("calendar")}>
            <Ic.calendar size={24} color="var(--color-primary)" />
            <div className="card__title" style={{ marginTop: 8 }}>Agenda</div>
          </button>
          <button className="card" style={{ margin: 0, textAlign: "left" }} onClick={() => onNavigate("checklists")}>
            <Ic.checklist size={24} color="var(--color-primary)" />
            <div className="card__title" style={{ marginTop: 8 }}>Checklists</div>
          </button>
          <button className="card" style={{ margin: 0, textAlign: "left" }} onClick={() => onNavigate("notes")}>
            <Ic.notes size={24} color="var(--color-primary)" />
            <div className="card__title" style={{ marginTop: 8 }}>Notas</div>
          </button>
        </div>
      </main>
    </>
  );
}

window.HomeScreen = HomeScreen;
