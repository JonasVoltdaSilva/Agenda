/* ============================================================
   Checklists — listas avulsas. O componente ChecklistItems é
   reutilizado dentro de blocos de documento (notes.jsx).
   ============================================================ */
const { useState: useStateChk } = React;

/* Reutilizável: renderiza itens + campo de adicionar. Recebe a
   lista de itens e um onChange(newItems) — quem chama decide onde
   persistir (checklist avulsa vs. bloco de documento). */
function ChecklistItems({ items, onChange }) {
  const [draft, setDraft] = useStateChk("");

  function handleAdd(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    onChange(addChecklistItem(items, draft.trim()));
    setDraft("");
  }

  return (
    <div>
      {items.map((it) => (
        <div className="checklist-item" key={it.id}>
          <button
            className="checklist-item__box"
            data-checked={it.isDone}
            onClick={() => onChange(toggleChecklistItem(items, it.id))}
            aria-label={it.isDone ? "Desmarcar" : "Marcar"}
          >
            {it.isDone && <Ic.check size={14} />}
          </button>
          <span className="checklist-item__text" data-checked={it.isDone}>{it.text}</span>
          <button className="btn btn--icon" style={{ width: 32, minWidth: 32, height: 32, boxShadow: "none" }} onClick={() => onChange(removeChecklistItem(items, it.id))} aria-label="Remover item">
            <Ic.close size={14} />
          </button>
        </div>
      ))}
      <form className="checklist-add" onSubmit={handleAdd}>
        <Ic.plus size={16} color="var(--color-text-secondary)" />
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Adicionar item…" />
      </form>
    </div>
  );
}

function ChecklistDetail({ checklist, onChangeItems, onRename, onDelete, onClose }) {
  const [title, setTitle] = useStateChk(checklist.title);

  return (
    <Modal title="Checklist" onClose={onClose}>
      <div className="field">
        <input
          value={title}
          onChange={(e) => { setTitle(e.target.value); onRename(e.target.value); }}
          style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, border: "none", background: "transparent", padding: "4px 0" }}
        />
      </div>
      <ChecklistItems items={checklist.items} onChange={onChangeItems} />
      <button className="btn btn--secondary" style={{ marginTop: 16 }} onClick={() => onDelete(checklist.id)}>
        <Ic.trash size={16} /> Excluir checklist
      </button>
    </Modal>
  );
}

function ChecklistsScreen() {
  const { checklists, checklistActions } = useData();
  const [openId, setOpenId] = useStateChk(null);

  const current = checklists.find((c) => c.id === openId) || null;

  function handleCreate() {
    const created = checklistActions.add({ title: "Nova checklist", items: [] });
    setOpenId(created.id);
  }

  return (
    <>
      <header className="app-header">
        <h1 className="app-header__greeting">Checklists</h1>
      </header>
      <main className="app-main">
        {checklists.length === 0 ? (
          <EmptyState icon={<Ic.checklist size={40} />} text="Nenhuma checklist ainda. Toque em + para criar." />
        ) : (
          checklists.map((c) => {
            const done = c.items.filter((it) => it.isDone).length;
            return (
              <button key={c.id} className="card" style={{ width: "100%", textAlign: "left" }} onClick={() => setOpenId(c.id)}>
                <div className="card__title">{c.title}</div>
                <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                  {done}/{c.items.length} concluídos
                </span>
              </button>
            );
          })
        )}
      </main>

      <button className="fab" onClick={handleCreate} aria-label="Nova checklist">
        <Ic.plus size={24} />
      </button>

      {current && (
        <ChecklistDetail
          checklist={current}
          onChangeItems={(items) => checklistActions.update(current.id, { items })}
          onRename={(title) => checklistActions.update(current.id, { title })}
          onDelete={(id) => { checklistActions.remove(id); setOpenId(null); }}
          onClose={() => setOpenId(null)}
        />
      )}
    </>
  );
}

window.ChecklistItems = ChecklistItems;
window.ChecklistsScreen = ChecklistsScreen;
