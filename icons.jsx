/* ============================================================
   Ícones — Phosphor Icons (phosphoricons.com)
   Peso duotone: fill leve + contorno — combina com o clima de
   caderno do Theme 01. Bold onde a ação precisa de mais peso.
   ============================================================ */
const Ic = {};

const PH = {
  home:       { n: "house",             w: "duotone" },
  calendar:   { n: "calendar-blank",    w: "duotone" },
  checklist:  { n: "check-square",      w: "duotone" },
  notes:      { n: "notebook",          w: "duotone" },
  plus:       { n: "plus",              w: "bold"    },
  close:      { n: "x",                 w: "bold"    },
  check:      { n: "check",             w: "bold"    },
  trash:      { n: "trash",             w: "duotone" },
  edit:       { n: "pencil-simple",     w: "duotone" },
  chevronLeft:{ n: "caret-left",        w: "bold"    },
  chevronRight:{ n: "caret-right",      w: "bold"    },
  folder:     { n: "folder",            w: "duotone" },
  link:       { n: "link-simple",       w: "duotone" },
  textBlock:  { n: "text-align-left",   w: "duotone" },
  clock:      { n: "clock",             w: "duotone" },
  sparkle:    { n: "sparkle",           w: "duotone" },
  dotsThree:  { n: "dots-three",        w: "bold"    },
};

Object.entries(PH).forEach(([key, { n: phName, w: weight }]) => {
  Ic[key] = ({
    size = 20,
    color,
    fill, stroke, strokeWidth, strokeLinecap, strokeLinejoin, viewBox,
    style: styleProp,
    className: cls = "",
    ...rest
  } = {}) => (
    <i
      className={`ph-${weight} ph-${phName}${cls ? " " + cls : ""}`}
      style={{
        fontSize: size,
        color: color || "currentColor",
        fontStyle: "normal",
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        ...styleProp,
      }}
      {...rest}
    />
  );
});

window.Ic = Ic;
