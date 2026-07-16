/* GERADO AUTOMATICAMENTE a partir de icons.jsx — não edite à mão. Rode: npm run build */
(function () {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Ic = {};
const PH = {
  home: {
    n: "house",
    w: "duotone"
  },
  calendar: {
    n: "calendar-blank",
    w: "duotone"
  },
  checklist: {
    n: "check-square",
    w: "duotone"
  },
  notes: {
    n: "notebook",
    w: "duotone"
  },
  plus: {
    n: "plus",
    w: "bold"
  },
  close: {
    n: "x",
    w: "bold"
  },
  check: {
    n: "check",
    w: "bold"
  },
  trash: {
    n: "trash",
    w: "duotone"
  },
  edit: {
    n: "pencil-simple",
    w: "duotone"
  },
  chevronLeft: {
    n: "caret-left",
    w: "bold"
  },
  chevronRight: {
    n: "caret-right",
    w: "bold"
  },
  folder: {
    n: "folder",
    w: "duotone"
  },
  link: {
    n: "link-simple",
    w: "duotone"
  },
  textBlock: {
    n: "text-align-left",
    w: "duotone"
  },
  clock: {
    n: "clock",
    w: "duotone"
  },
  sparkle: {
    n: "sparkle",
    w: "duotone"
  },
  dotsThree: {
    n: "dots-three",
    w: "bold"
  }
};
Object.entries(PH).forEach(([key, {
  n: phName,
  w: weight
}]) => {
  Ic[key] = ({
    size = 20,
    color,
    fill,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    viewBox,
    style: styleProp,
    className: cls = "",
    ...rest
  } = {}) => React.createElement("i", _extends({
    className: `ph-${weight} ph-${phName}${cls ? " " + cls : ""}`,
    style: {
      fontSize: size,
      color: color || "currentColor",
      fontStyle: "normal",
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      ...styleProp
    }
  }, rest));
});
window.Ic = Ic;
})();
