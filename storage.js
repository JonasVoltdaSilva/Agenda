/* GERADO AUTOMATICAMENTE a partir de storage.jsx — não edite à mão. Rode: npm run build */
(function () {
const {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext
} = React;
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
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (e) {}
}
function usePersistedList(storageKey) {
  const [items, setItems] = useState(() => loadList(storageKey));
  useEffect(() => {
    saveList(storageKey, items);
  }, [items]);
  const add = useCallback(item => {
    const full = {
      id: uid(),
      createdAt: nowIso(),
      updatedAt: nowIso(),
      ...item
    };
    setItems(prev => [...prev, full]);
    return full;
  }, []);
  const update = useCallback((id, changes) => {
    setItems(prev => prev.map(it => it.id === id ? {
      ...it,
      ...changes,
      updatedAt: nowIso()
    } : it));
  }, []);
  const remove = useCallback(id => {
    setItems(prev => prev.filter(it => it.id !== id));
  }, []);
  return [items, {
    add,
    update,
    remove,
    setItems
  }];
}
const DataContext = createContext(null);
function DataProvider({
  children
}) {
  const [projects, projectActions] = usePersistedList("agenda_projects");
  const [documents, documentActions] = usePersistedList("agenda_documents");
  const [checklists, checklistActions] = usePersistedList("agenda_checklists");
  const [events, eventActions] = usePersistedList("agenda_events");
  const value = {
    projects,
    projectActions,
    documents,
    documentActions,
    checklists,
    checklistActions,
    events,
    eventActions
  };
  return React.createElement(DataContext.Provider, {
    value: value
  }, children);
}
function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData deve ser usado dentro de DataProvider");
  return ctx;
}
function toggleChecklistItem(items, itemId) {
  return items.map(it => it.id === itemId ? {
    ...it,
    isDone: !it.isDone
  } : it);
}
function addChecklistItem(items, text) {
  return [...items, {
    id: uid(),
    text,
    isDone: false,
    sortOrder: items.length
  }];
}
function removeChecklistItem(items, itemId) {
  return items.filter(it => it.id !== itemId);
}
window.uid = uid;
window.nowIso = nowIso;
window.DataProvider = DataProvider;
window.useData = useData;
window.toggleChecklistItem = toggleChecklistItem;
window.addChecklistItem = addChecklistItem;
window.removeChecklistItem = removeChecklistItem;
})();
