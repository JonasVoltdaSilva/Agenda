/* GERADO AUTOMATICAMENTE a partir de notes.jsx — não edite à mão. Rode: npm run build */
(function () {
const {
  useState: useStateNotes
} = React;
const PROJECT_COLORS = ["#C1673B", "#6B7050", "#A94438", "#78716A", "#5B7052"];
function newBlock(type) {
  const base = {
    id: uid()
  };
  if (type === "text") return {
    ...base,
    type,
    content: ""
  };
  if (type === "checklist") return {
    ...base,
    type,
    items: []
  };
  if (type === "link") return {
    ...base,
    type,
    url: "",
    title: ""
  };
  return base;
}
function BlockEditor({
  block,
  onChange,
  onRemove
}) {
  if (block.type === "text") {
    return React.createElement("div", {
      className: "block block--text-wrap card",
      style: {
        padding: 8
      }
    }, React.createElement("textarea", {
      className: "block--text",
      style: {
        width: "100%",
        border: "none",
        background: "transparent",
        minHeight: 80
      },
      value: block.content,
      placeholder: "Escreva algo\u2026",
      onChange: e => onChange({
        ...block,
        content: e.target.value
      })
    }));
  }
  if (block.type === "checklist") {
    return React.createElement("div", {
      className: "block card",
      style: {
        padding: 8
      }
    }, React.createElement(ChecklistItems, {
      items: block.items,
      onChange: items => onChange({
        ...block,
        items
      })
    }));
  }
  if (block.type === "link") {
    return React.createElement("div", {
      className: "block card",
      style: {
        padding: 8,
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, React.createElement(Ic.link, {
      size: 18,
      color: "var(--color-secondary)"
    }), React.createElement("input", {
      placeholder: "T\xEDtulo (opcional)",
      value: block.title,
      onChange: e => onChange({
        ...block,
        title: e.target.value
      }),
      style: {
        border: "none",
        background: "transparent",
        flex: 1
      }
    }), React.createElement("input", {
      placeholder: "https://\u2026",
      value: block.url,
      onChange: e => onChange({
        ...block,
        url: e.target.value
      }),
      style: {
        border: "none",
        background: "transparent",
        flex: 1
      }
    }));
  }
  return null;
}
function DocumentEditor({
  document,
  onUpdateBlocks,
  onRenameTitle,
  onDelete,
  onClose
}) {
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
  return React.createElement(Modal, {
    title: "Documento",
    onClose: onClose
  }, React.createElement("input", {
    value: title,
    onChange: e => {
      setTitle(e.target.value);
      onRenameTitle(e.target.value);
    },
    placeholder: "T\xEDtulo do documento",
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "1.5rem",
      fontWeight: 700,
      border: "none",
      background: "transparent",
      width: "100%",
      marginBottom: 16
    }
  }), document.blocks.map((b, i) => React.createElement("div", {
    key: b.id,
    style: {
      position: "relative"
    }
  }, React.createElement(BlockEditor, {
    block: b,
    onChange: nb => updateBlock(i, nb),
    onRemove: () => removeBlock(i)
  }), React.createElement("button", {
    className: "btn btn--icon",
    style: {
      position: "absolute",
      top: 12,
      right: 12,
      width: 28,
      minWidth: 28,
      height: 28,
      boxShadow: "none",
      background: "transparent"
    },
    onClick: () => removeBlock(i),
    "aria-label": "Remover bloco"
  }, React.createElement(Ic.close, {
    size: 14
  })))), React.createElement("div", {
    style: {
      position: "relative",
      marginTop: 8
    }
  }, React.createElement("button", {
    className: "btn btn--secondary",
    onClick: () => setMenuOpen(v => !v),
    style: {
      width: "100%"
    }
  }, React.createElement(Ic.plus, {
    size: 16
  }), " Adicionar bloco"), menuOpen && React.createElement("div", {
    className: "card",
    style: {
      marginTop: 8
    }
  }, React.createElement("div", {
    className: "block-toolbar"
  }, React.createElement("button", {
    className: "chip",
    onClick: () => addBlock("text")
  }, React.createElement(Ic.textBlock, {
    size: 14
  }), " Texto"), React.createElement("button", {
    className: "chip",
    onClick: () => addBlock("checklist")
  }, React.createElement(Ic.checklist, {
    size: 14
  }), " Checklist"), React.createElement("button", {
    className: "chip",
    onClick: () => addBlock("link")
  }, React.createElement(Ic.link, {
    size: 14
  }), " Link")))), React.createElement("button", {
    className: "btn btn--secondary",
    style: {
      marginTop: 24
    },
    onClick: () => onDelete(document.id)
  }, React.createElement(Ic.trash, {
    size: 16
  }), " Excluir documento"));
}
function ProjectDetail({
  project,
  documents,
  documentActions,
  onClose
}) {
  const [openDocId, setOpenDocId] = useStateNotes(null);
  const projectDocs = documents.filter(d => d.projectId === project.id);
  const openDoc = projectDocs.find(d => d.id === openDocId) || null;
  function handleCreateDoc() {
    const created = documentActions.add({
      projectId: project.id,
      title: "Novo documento",
      blocks: []
    });
    setOpenDocId(created.id);
  }
  return React.createElement(Modal, {
    title: project.name,
    onClose: onClose
  }, projectDocs.length === 0 ? React.createElement(EmptyState, {
    icon: React.createElement(Ic.notes, {
      size: 32
    }),
    text: "Nenhum documento ainda."
  }) : projectDocs.map(d => React.createElement("button", {
    key: d.id,
    className: "card",
    style: {
      width: "100%",
      textAlign: "left"
    },
    onClick: () => setOpenDocId(d.id)
  }, React.createElement("div", {
    className: "card__title"
  }, d.title), React.createElement("span", {
    style: {
      fontSize: "0.8rem",
      color: "var(--color-text-secondary)"
    }
  }, d.blocks.length, " bloco", d.blocks.length !== 1 ? "s" : ""))), React.createElement("button", {
    className: "btn",
    style: {
      marginTop: 8
    },
    onClick: handleCreateDoc
  }, React.createElement(Ic.plus, {
    size: 16
  }), " Novo documento"), openDoc && React.createElement(DocumentEditor, {
    document: openDoc,
    onUpdateBlocks: blocks => documentActions.update(openDoc.id, {
      blocks
    }),
    onRenameTitle: title => documentActions.update(openDoc.id, {
      title
    }),
    onDelete: id => {
      documentActions.remove(id);
      setOpenDocId(null);
    },
    onClose: () => setOpenDocId(null)
  }));
}
function NotesScreen() {
  const {
    projects,
    projectActions,
    documents,
    documentActions
  } = useData();
  const [openProjectId, setOpenProjectId] = useStateNotes(null);
  const [creating, setCreating] = useStateNotes(false);
  const [draftName, setDraftName] = useStateNotes("");
  const openProject = projects.find(p => p.id === openProjectId) || null;
  function docCount(projectId) {
    return documents.filter(d => d.projectId === projectId).length;
  }
  function handleCreateProject(e) {
    e.preventDefault();
    if (!draftName.trim()) return;
    const color = PROJECT_COLORS[projects.length % PROJECT_COLORS.length];
    projectActions.add({
      name: draftName.trim(),
      colorTag: color,
      sortOrder: projects.length
    });
    setDraftName("");
    setCreating(false);
  }
  return React.createElement(React.Fragment, null, React.createElement("header", {
    className: "app-header"
  }, React.createElement("h1", {
    className: "app-header__greeting"
  }, "Notas")), React.createElement("main", {
    className: "app-main"
  }, projects.length === 0 ? React.createElement(EmptyState, {
    icon: React.createElement(Ic.folder, {
      size: 40
    }),
    text: "Nenhum projeto ainda. Toque em + para criar uma pasta."
  }) : React.createElement("div", {
    className: "project-grid"
  }, projects.map(p => React.createElement("button", {
    key: p.id,
    className: "project-card",
    style: {
      borderTopColor: p.colorTag,
      textAlign: "left"
    },
    onClick: () => setOpenProjectId(p.id)
  }, React.createElement(Ic.folder, {
    size: 20,
    color: p.colorTag
  }), React.createElement("div", {
    className: "project-card__name"
  }, p.name), React.createElement("div", {
    className: "project-card__count"
  }, docCount(p.id), " documento", docCount(p.id) !== 1 ? "s" : ""))))), React.createElement("button", {
    className: "fab",
    onClick: () => setCreating(true),
    "aria-label": "Novo projeto"
  }, React.createElement(Ic.plus, {
    size: 24
  })), creating && React.createElement(Modal, {
    title: "Novo projeto",
    onClose: () => setCreating(false)
  }, React.createElement("form", {
    onSubmit: handleCreateProject
  }, React.createElement("div", {
    className: "field"
  }, React.createElement("label", {
    htmlFor: "proj-name"
  }, "Nome"), React.createElement("input", {
    id: "proj-name",
    value: draftName,
    onChange: e => setDraftName(e.target.value),
    placeholder: "Ex.: Faculdade",
    autoFocus: true
  })), React.createElement("button", {
    type: "submit",
    className: "btn"
  }, "Criar"))), openProject && React.createElement(ProjectDetail, {
    project: openProject,
    documents: documents,
    documentActions: documentActions,
    onClose: () => setOpenProjectId(null)
  }));
}
window.NotesScreen = NotesScreen;
})();
