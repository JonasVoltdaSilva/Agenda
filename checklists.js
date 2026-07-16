/* GERADO AUTOMATICAMENTE a partir de checklists.jsx — não edite à mão. Rode: npm run build */
(function () {
const {
  useState: useStateChk
} = React;
function ChecklistItems({
  items,
  onChange
}) {
  const [draft, setDraft] = useStateChk("");
  function handleAdd(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    onChange(addChecklistItem(items, draft.trim()));
    setDraft("");
  }
  return React.createElement("div", null, items.map(it => React.createElement("div", {
    className: "checklist-item",
    key: it.id
  }, React.createElement("button", {
    className: "checklist-item__box",
    "data-checked": it.isDone,
    onClick: () => onChange(toggleChecklistItem(items, it.id)),
    "aria-label": it.isDone ? "Desmarcar" : "Marcar"
  }, it.isDone && React.createElement(Ic.check, {
    size: 14
  })), React.createElement("span", {
    className: "checklist-item__text",
    "data-checked": it.isDone
  }, it.text), React.createElement("button", {
    className: "btn btn--icon",
    style: {
      width: 32,
      minWidth: 32,
      height: 32,
      boxShadow: "none"
    },
    onClick: () => onChange(removeChecklistItem(items, it.id)),
    "aria-label": "Remover item"
  }, React.createElement(Ic.close, {
    size: 14
  })))), React.createElement("form", {
    className: "checklist-add",
    onSubmit: handleAdd
  }, React.createElement(Ic.plus, {
    size: 16,
    color: "var(--color-text-secondary)"
  }), React.createElement("input", {
    value: draft,
    onChange: e => setDraft(e.target.value),
    placeholder: "Adicionar item\u2026",
    enterKeyHint: "done"
  }), React.createElement("button", {
    type: "submit",
    className: "btn btn--icon",
    style: {
      width: 32,
      minWidth: 32,
      height: 32,
      boxShadow: "none",
      flexShrink: 0
    },
    disabled: !draft.trim(),
    "aria-label": "Confirmar item"
  }, React.createElement(Ic.check, {
    size: 16
  }))));
}
function ChecklistDetail({
  checklist,
  onChangeItems,
  onRename,
  onDelete,
  onClose
}) {
  const [title, setTitle] = useStateChk(checklist.title);
  return React.createElement(Modal, {
    title: "Checklist",
    onClose: onClose
  }, React.createElement("div", {
    className: "field"
  }, React.createElement("input", {
    value: title,
    onChange: e => {
      setTitle(e.target.value);
      onRename(e.target.value);
    },
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "1.3rem",
      fontWeight: 700,
      border: "none",
      background: "transparent",
      padding: "4px 0"
    }
  })), React.createElement(ChecklistItems, {
    items: checklist.items,
    onChange: onChangeItems
  }), React.createElement("button", {
    className: "btn btn--secondary",
    style: {
      marginTop: 16
    },
    onClick: () => onDelete(checklist.id)
  }, React.createElement(Ic.trash, {
    size: 16
  }), " Excluir checklist"));
}
function ChecklistsScreen() {
  const {
    checklists,
    checklistActions
  } = useData();
  const [openId, setOpenId] = useStateChk(null);
  const current = checklists.find(c => c.id === openId) || null;
  function handleCreate() {
    const created = checklistActions.add({
      title: "Nova checklist",
      items: []
    });
    setOpenId(created.id);
  }
  return React.createElement(React.Fragment, null, React.createElement("header", {
    className: "app-header"
  }, React.createElement("h1", {
    className: "app-header__greeting"
  }, "Checklists")), React.createElement("main", {
    className: "app-main"
  }, checklists.length === 0 ? React.createElement(EmptyState, {
    icon: React.createElement(Ic.checklist, {
      size: 40
    }),
    text: "Nenhuma checklist ainda. Toque em + para criar."
  }) : checklists.map(c => {
    const done = c.items.filter(it => it.isDone).length;
    return React.createElement("button", {
      key: c.id,
      className: "card",
      style: {
        width: "100%",
        textAlign: "left"
      },
      onClick: () => setOpenId(c.id)
    }, React.createElement("div", {
      className: "card__title"
    }, c.title), React.createElement("span", {
      style: {
        fontSize: "0.8rem",
        color: "var(--color-text-secondary)"
      }
    }, done, "/", c.items.length, " conclu\xEDdos"));
  })), React.createElement("button", {
    className: "fab",
    onClick: handleCreate,
    "aria-label": "Nova checklist"
  }, React.createElement(Ic.plus, {
    size: 24
  })), current && React.createElement(ChecklistDetail, {
    checklist: current,
    onChangeItems: items => checklistActions.update(current.id, {
      items
    }),
    onRename: title => checklistActions.update(current.id, {
      title
    }),
    onDelete: id => {
      checklistActions.remove(id);
      setOpenId(null);
    },
    onClose: () => setOpenId(null)
  }));
}
window.ChecklistItems = ChecklistItems;
window.ChecklistsScreen = ChecklistsScreen;
})();
