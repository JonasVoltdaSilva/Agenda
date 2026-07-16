/* ============================================================
   Notas/Projetos — Projeto (pasta) → Documento (nota) → Blocos
   (texto, checklist, link). Checklist de bloco reusa ChecklistItems.
   ============================================================ */
const { useState: useStateNotes } = React;

const PROJECT_COLORS = ["#C1673B", "#6B7050", "#A94438", "#78716A", "#5B7052"];

function newBlock(type) {
  const base = { id: uid() };
  if (type === "text") return { ...base, type, content: "" };
  if (type === "checklist") return { ...base, type, items: [] };
  if (type === "link") return { ...base, type, url: "", title: "" };
  return base;
}

function BlockEditor({ block, onChange, onRemove }) {
  if (block.type === "text") {
    return (
      <div className="block block--text-wrap card" style={{ padding: 8 }}>
        <textarea
          className="block--text"
          style={{ width: "100%", border: "none", background: "transparent", minHeight: 80 }}
          value={block.content}
          placeholder="Escreva algo…"
          onChange={(e) => onChange({ ...block, content: e.target.value })}
        />
      </div>
    );
  }
  if (block.type === "checklist") {
    return (
      <div className="block card" style={{ padding: 8 }}>
        <ChecklistItems items={block.items} onChange={(items) => onChange({ ...block, items })} />
      </div>
    );
  }
  if (block.type === "link") {
    return (
      <div className="block card" style={{ padding: 8, display: "flex", gap: 8, alignItems: "center" }}>
        <Ic.link size={18} color="var(--color-secondary)" />
        <input
          placeholder="Título (opcional)"
          value={block.title}
          onChange={(e) => onChange({ ...block, title: e.target.value })}
          style={{ border: "none", background: "transparent", flex: 1 }}
        />
        <input
          placeholder="https://…"
          value={block.url}
          onChange={(e) => onChange({ ...block, url: e.target.value })}
          style={{ border: "none", background: "transparent", flex: 1 }}
        />
      </div>
    );
  }
  return null;
}

function DocumentEditor({ document, onUpdateBlocks, onRenameTitle, onDelete, onClose }) {
  const [title, setTitle] = useStateNotes(document.title);
  const [menuOpen, setMenuOpen] = useStateNotes(false);

  function updateBlock(index, block) {
    const blocks = document.blocks.slice();
    blocks[index] = block;
    onUpdateBlocks(blocks);
  }

  function removeBlock(index) {
    onUpdateBlocks(document.blocks.filter((_, i) => i !== index));
  }

  function addBlock(type) {
    onUpdateBlocks([...document.blocks, newBlock(type)]);
    setMenuOpen(false);
  }

  return (
    <Modal title="Documento" onClose={onClose}>
      <input
        value={title}
        onChange={(e) => { setTitle(e.target.value); onRenameTitle(e.target.value); }}
        placeholder="Título do documento"
        style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, border: "none", background: "transparent", width: "100%", marginBottom: 16 }}
      />

      {document.blocks.map((b, i) => (
        <div key={b.id} style={{ position: "relative" }}>
          <BlockEditor block={b} onChange={(nb) => updateBlock(i, nb)} onRemove={() => removeBlock(i)} />
          <button
            className="btn btn--icon"
            style={{ position: "absolute", top: 12, right: 12, width: 28, minWidth: 28, height: 28, boxShadow: "none", background: "transparent" }}
            onClick={() => removeBlock(i)}
            aria-label="Remover bloco"
          >
            <Ic.close size={14} />
          </button>
        </div>
      ))}

      <div style={{ position: "relative", marginTop: 8 }}>
        <button className="btn btn--secondary" onClick={() => setMenuOpen((v) => !v)} style={{ width: "100%" }}>
          <Ic.plus size={16} /> Adicionar bloco
        </button>
        {menuOpen && (
          <div className="card" style={{ marginTop: 8 }}>
            <div className="block-toolbar">
              <button className="chip" onClick={() => addBlock("text")}><Ic.textBlock size={14} /> Texto</button>
              <button className="chip" onClick={() => addBlock("checklist")}><Ic.checklist size={14} /> Checklist</button>
              <button className="chip" onClick={() => addBlock("link")}><Ic.link size={14} /> Link</button>
            </div>
          </div>
        )}
      </div>

      <button className="btn btn--secondary" style={{ marginTop: 24 }} onClick={() => onDelete(document.id)}>
        <Ic.trash size={16} /> Excluir documento
      </button>
    </Modal>
  );
}

function ProjectDetail({ project, documents, documentActions, onClose }) {
  const [openDocId, setOpenDocId] = useStateNotes(null);
  const projectDocs = documents.filter((d) => d.projectId === project.id);
  const openDoc = projectDocs.find((d) => d.id === openDocId) || null;

  function handleCreateDoc() {
    const created = documentActions.add({ projectId: project.id, title: "Novo documento", blocks: [] });
    setOpenDocId(created.id);
  }

  return (
    <Modal title={project.name} onClose={onClose}>
      {projectDocs.length === 0 ? (
        <EmptyState icon={<Ic.notes size={32} />} text="Nenhum documento ainda." />
      ) : (
        projectDocs.map((d) => (
          <button key={d.id} className="card" style={{ width: "100%", textAlign: "left" }} onClick={() => setOpenDocId(d.id)}>
            <div className="card__title">{d.title}</div>
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>{d.blocks.length} bloco{d.blocks.length !== 1 ? "s" : ""}</span>
          </button>
        ))
      )}
      <button className="btn" style={{ marginTop: 8 }} onClick={handleCreateDoc}>
        <Ic.plus size={16} /> Novo documento
      </button>

      {openDoc && (
        <DocumentEditor
          document={openDoc}
          onUpdateBlocks={(blocks) => documentActions.update(openDoc.id, { blocks })}
          onRenameTitle={(title) => documentActions.update(openDoc.id, { title })}
          onDelete={(id) => { documentActions.remove(id); setOpenDocId(null); }}
          onClose={() => setOpenDocId(null)}
        />
      )}
    </Modal>
  );
}

function NotesScreen() {
  const { projects, projectActions, documents, documentActions } = useData();
  const [openProjectId, setOpenProjectId] = useStateNotes(null);
  const [creating, setCreating] = useStateNotes(false);
  const [draftName, setDraftName] = useStateNotes("");

  const openProject = projects.find((p) => p.id === openProjectId) || null;

  function docCount(projectId) {
    return documents.filter((d) => d.projectId === projectId).length;
  }

  function handleCreateProject(e) {
    e.preventDefault();
    if (!draftName.trim()) return;
    const color = PROJECT_COLORS[projects.length % PROJECT_COLORS.length];
    projectActions.add({ name: draftName.trim(), colorTag: color, sortOrder: projects.length });
    setDraftName("");
    setCreating(false);
  }

  return (
    <>
      <header className="app-header">
        <h1 className="app-header__greeting">Notas</h1>
      </header>
      <main className="app-main">
        {projects.length === 0 ? (
          <EmptyState icon={<Ic.folder size={40} />} text="Nenhum projeto ainda. Toque em + para criar uma pasta." />
        ) : (
          <div className="project-grid">
            {projects.map((p) => (
              <button key={p.id} className="project-card" style={{ borderTopColor: p.colorTag, textAlign: "left" }} onClick={() => setOpenProjectId(p.id)}>
                <Ic.folder size={20} color={p.colorTag} />
                <div className="project-card__name">{p.name}</div>
                <div className="project-card__count">{docCount(p.id)} documento{docCount(p.id) !== 1 ? "s" : ""}</div>
              </button>
            ))}
          </div>
        )}
      </main>

      <button className="fab" onClick={() => setCreating(true)} aria-label="Novo projeto">
        <Ic.plus size={24} />
      </button>

      {creating && (
        <Modal title="Novo projeto" onClose={() => setCreating(false)}>
          <form onSubmit={handleCreateProject}>
            <div className="field">
              <label htmlFor="proj-name">Nome</label>
              <input id="proj-name" value={draftName} onChange={(e) => setDraftName(e.target.value)} placeholder="Ex.: Faculdade" autoFocus />
            </div>
            <button type="submit" className="btn">Criar</button>
          </form>
        </Modal>
      )}

      {openProject && (
        <ProjectDetail
          project={openProject}
          documents={documents}
          documentActions={documentActions}
          onClose={() => setOpenProjectId(null)}
        />
      )}
    </>
  );
}

window.NotesScreen = NotesScreen;
