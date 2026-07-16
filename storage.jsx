/* ============================================================
   Camada de dados — localStorage, offline-first.
   Um único DataProvider carrega/persiste cada entidade uma vez;
   telas consomem via useData() — evita cópias de estado
   dessincronizadas entre Home/Agenda/Checklists/Notas.
   Entidades: Project (pasta), Document (nota com blocos),
   Checklist (avulsa), Event (agenda).
   ============================================================ */
const { useState, useEffect, useCallback, createContext, useContext } = React;

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function nowIso() {
  return new Date().toISOString();
}

function loadList(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

function saveList(key, list) {
  try { localStorage.setItem(key, JSON.stringify(list)); } catch (e) {}
}

/* Hook genérico de lista persistida — evita duplicar o mesmo
   padrão load/save/add/update/remove em cada entidade. */
function usePersistedList(storageKey) {
  const [items, setItems] = useState(() => loadList(storageKey));

  useEffect(() => { saveList(storageKey, items); }, [items]);

  const add = useCallback((item) => {
    const full = { id: uid(), createdAt: nowIso(), updatedAt: nowIso(), ...item };
    setItems((prev) => [...prev, full]);
    return full;
  }, []);

  const update = useCallback((id, changes) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...changes, updatedAt: nowIso() } : it)));
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  return [items, { add, update, remove, setItems }];
}

/* Contexto único de dados — evita que duas telas que usam a
   mesma entidade (ex.: Home mostra eventos, Agenda edita eventos)
   fiquem com cópias de estado dessincronizadas. Cada entidade só
   é lida/persistida uma vez aqui; as telas consomem via useData(). */
const DataContext = createContext(null);

function DataProvider({ children }) {
  const [projects, projectActions] = usePersistedList("agenda_projects");
  const [documents, documentActions] = usePersistedList("agenda_documents");
  const [checklists, checklistActions] = usePersistedList("agenda_checklists");
  const [events, eventActions] = usePersistedList("agenda_events");

  const value = {
    projects, projectActions,
    documents, documentActions,
    checklists, checklistActions,
    events, eventActions,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData deve ser usado dentro de DataProvider");
  return ctx;
}

/* Helpers de checklist de itens — reusados tanto pela tela de
   checklist avulsa quanto pelo bloco de checklist em documentos. */
function toggleChecklistItem(items, itemId) {
  return items.map((it) => (it.id === itemId ? { ...it, isDone: !it.isDone } : it));
}

function addChecklistItem(items, text) {
  return [...items, { id: uid(), text, isDone: false, sortOrder: items.length }];
}

function removeChecklistItem(items, itemId) {
  return items.filter((it) => it.id !== itemId);
}

window.uid = uid;
window.nowIso = nowIso;
window.DataProvider = DataProvider;
window.useData = useData;
window.toggleChecklistItem = toggleChecklistItem;
window.addChecklistItem = addChecklistItem;
window.removeChecklistItem = removeChecklistItem;
