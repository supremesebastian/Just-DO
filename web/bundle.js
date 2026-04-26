const {useState,useEffect,useRef,useMemo,useCallback}=React;

// ── ios-frame.jsx ──────────────────────────
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports: IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});

// ── tweaks-panel.jsx ──────────────────────────
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;width:100%;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;

  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}
function TweakColor({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
    type: "color",
    className: "twk-swatch",
    value: value,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});

// ── just-do-app.jsx ──────────────────────────
// Just Do – AI Study Coach App
// Screens: Splash → Dashboard → Kurse & Fächer → Tagesplaner

/* ── LOCALSTORAGE HELPERS ──────────────────────────────── */

/* ── DATA ─────────────────────────────────────────────── */
const SUBJECTS = [{
  id: 1,
  name: "Mathematik II",
  color: "#4A7CFF",
  progress: 0.68,
  credits: 5,
  exam: "15. Jun",
  daysLeft: 51,
  tasks: 12
}, {
  id: 2,
  name: "Statistik",
  color: "#7C6EFA",
  progress: 0.42,
  credits: 6,
  exam: "22. Jun",
  daysLeft: 58,
  tasks: 9
}, {
  id: 3,
  name: "Wirtschaftsrecht",
  color: "#34C7A0",
  progress: 0.81,
  credits: 4,
  exam: "10. Jun",
  daysLeft: 46,
  tasks: 7
}, {
  id: 4,
  name: "Marketing",
  color: "#FF6B6B",
  progress: 0.29,
  credits: 3,
  exam: "28. Jun",
  daysLeft: 64,
  tasks: 15
}, {
  id: 5,
  name: "BWL Grundlagen",
  color: "#FFB347",
  progress: 0.55,
  credits: 5,
  exam: "18. Jun",
  daysLeft: 54,
  tasks: 10
}, {
  id: 6,
  name: "Makroökonomie",
  color: "#A855F7",
  progress: 0.33,
  credits: 6,
  exam: "5. Jul",
  daysLeft: 71,
  tasks: 11
}];
const TODAY_TASKS = [{
  id: 1,
  time: "08:00",
  dur: 90,
  subj: "Mathematik II",
  label: "Integralrechnung – Kap. 4",
  type: "study",
  done: true
}, {
  id: 2,
  time: "09:30",
  dur: 30,
  subj: null,
  label: "Pause & Bewegung",
  type: "break",
  done: true
}, {
  id: 3,
  time: "10:00",
  dur: 60,
  subj: "Statistik",
  label: "Übungsblatt 7 lösen",
  type: "practice",
  done: false
}, {
  id: 4,
  time: "11:00",
  dur: 45,
  subj: "Wirtschaftsrecht",
  label: "Zusammenfassung lesen",
  type: "review",
  done: false
}, {
  id: 5,
  time: "12:00",
  dur: 60,
  subj: null,
  label: "Mittagspause",
  type: "break",
  done: false
}, {
  id: 6,
  time: "13:00",
  dur: 90,
  subj: "Marketing",
  label: "Fallstudie Analyse",
  type: "study",
  done: false
}, {
  id: 7,
  time: "14:30",
  dur: 25,
  subj: null,
  label: "Pomodoro – Deep Work",
  type: "focus",
  done: false
}, {
  id: 8,
  time: "16:00",
  dur: 60,
  subj: "Statistik",
  label: "Karteikarten wiederholen",
  type: "review",
  done: false
}];

/* ── THEME ─────────────────────────────────────────────── */
const themes = {
  dark: {
    bg: "#09090E",
    surface: "#12121C",
    card: "#16162A",
    cardBorder: "rgba(255,255,255,0.07)",
    pillBg: "#1C1C2E",
    text: "#EEF0FF",
    textSub: "rgba(220,222,255,0.45)",
    textMuted: "rgba(220,222,255,0.25)",
    accent: "#4A7CFF",
    accentSub: "rgba(74,124,255,0.15)",
    divider: "rgba(255,255,255,0.06)",
    navBg: "rgba(12,12,22,0.9)",
    statusBar: "light"
  },
  light: {
    bg: "#EFF1FA",
    surface: "#F7F8FF",
    card: "#FFFFFF",
    cardBorder: "rgba(0,0,0,0.06)",
    pillBg: "#E4E6F5",
    text: "#0D0E1A",
    textSub: "rgba(13,14,26,0.5)",
    textMuted: "rgba(13,14,26,0.3)",
    accent: "#3A6EFF",
    accentSub: "rgba(58,110,255,0.1)",
    divider: "rgba(0,0,0,0.05)",
    navBg: "rgba(239,241,250,0.92)",
    statusBar: "dark"
  }
};

/* ── ICONS ─────────────────────────────────────────────── */
const Icon = ({
  name,
  size = 20,
  color = "currentColor",
  style = {}
}) => {
  const paths = {
    home: "M10 2L2 8v12h6v-6h4v6h6V8L10 2z",
    book: "M4 19V5a2 2 0 012-2h12v14H6a2 2 0 000 4h12v-2H6a0 0 0 010 0",
    cal: "M3 4h18v16H3V4zm0 4h18M8 2v4m8-4v4",
    chat: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    bolt: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    check: "M20 6L9 17l-5-5",
    plus: "M12 5v14M5 12h14",
    dots: "M5 12h.01M12 12h.01M19 12h.01",
    fire: "M12 2c0 5-6 7-6 12a6 6 0 0012 0c0-5-6-7-6-12z",
    clock: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l4 2",
    brain: "M9.5 2a4 4 0 00-4 5.5A4.5 4.5 0 002 12a4 4 0 004 4v2h12v-2a4 4 0 004-4 4.5 4.5 0 00-3.5-4.5A4 4 0 0014.5 2",
    ai: "M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2zm-7 9h2a2 2 0 010 4H5a2 2 0 010-4zm14 0h2a2 2 0 010 4h-2a2 2 0 010-4zM7 17l2-2m6 2l-2-2",
    send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    x: "M18 6L6 18M6 6l12 12",
    arr: "M9 18l6-6-6-6"
  };
  const d = paths[name] || paths.dots;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  }));
};

/* ── PROGRESS RING ─────────────────────────────────────── */
const Ring = ({
  pct,
  size = 48,
  color = "#4A7CFF",
  bg = "rgba(255,255,255,0.08)",
  stroke = 3.5
}) => {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    stroke: bg,
    strokeWidth: stroke,
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    stroke: color,
    strokeWidth: stroke,
    fill: "none",
    strokeDasharray: circ,
    strokeDashoffset: circ * (1 - pct),
    style: {
      transition: "stroke-dashoffset 0.8s ease"
    },
    strokeLinecap: "round"
  }));
};

/* ── DEVICE DETECTION ──────────────────────────────────── */
const useDevice = () => {
  const [info, setInfo] = useState(() => {
    const ua = navigator.userAgent;
    const isIpad = /iPad/.test(ua) || /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    const isIphone = /iPhone/.test(ua);
    const w = window.innerWidth;
    const h = window.innerHeight;
    return {
      isIpad,
      isIphone,
      isMobile: isIpad || isIphone || /Android/.test(ua),
      landscape: w > h,
      w,
      h
    };
  });
  useEffect(() => {
    const update = () => {
      const ua = navigator.userAgent;
      const isIpad = /iPad/.test(ua) || /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
      const isIphone = /iPhone/.test(ua);
      const w = window.innerWidth;
      const h = window.innerHeight;
      setInfo({
        isIpad,
        isIphone,
        isMobile: isIpad || isIphone || /Android/.test(ua),
        landscape: w > h,
        w,
        h
      });
    };
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);
  return info;
};
window.useDevice = useDevice;
const SwipeDeleteItem = ({
  children,
  onDelete,
  t
}) => {
  const DELETE_W = 82;
  const THRESHOLD = 48;
  const [offset, setOffset] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const startX = useRef(null);
  const isDragging = useRef(false);
  const onTouchStart = e => {
    startX.current = e.touches[0].clientX;
    isDragging.current = false;
  };
  const onTouchMove = e => {
    if (startX.current === null) return;
    const dx = e.touches[0].clientX - startX.current;
    if (Math.abs(dx) > 6) isDragging.current = true;
    const base = revealed ? -DELETE_W : 0;
    const raw = base + dx;
    setOffset(Math.min(0, Math.max(raw, -DELETE_W)));
  };
  const onTouchEnd = () => {
    if (offset < -THRESHOLD) {
      setOffset(-DELETE_W);
      setRevealed(true);
    } else {
      setOffset(0);
      setRevealed(false);
    }
    startX.current = null;
  };
  const handleDelete = e => {
    e.stopPropagation();
    if (!confirming) {
      setConfirming(true);
      return;
    }
    onDelete();
  };
  const handleItemClick = () => {
    if (revealed) {
      setOffset(0);
      setRevealed(false);
      setConfirming(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: DELETE_W,
      background: confirming ? "#CC2222" : "#FF6B6B",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background 0.2s",
      gap: 2
    },
    onClick: handleDelete
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6l-1 14H6L5 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 11v6M14 11v6"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#fff",
      fontSize: 11,
      fontWeight: 700
    }
  }, confirming ? "Sicher?" : "Löschen")), /*#__PURE__*/React.createElement("div", {
    onTouchStart: onTouchStart,
    onTouchMove: onTouchMove,
    onTouchEnd: onTouchEnd,
    onClick: handleItemClick,
    style: {
      transform: `translateX(${offset}px)`,
      transition: startX.current !== null ? "none" : "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
      position: "relative",
      zIndex: 1
    }
  }, children));
};

/* ── SWIPE TO DELETE ────────────────────────────────────── */
const PillBar = ({
  screen,
  setScreen,
  theme: t
}) => {
  const tabs = [{
    id: "dashboard",
    icon: "home",
    label: "Home"
  }, {
    id: "kurse",
    icon: "book",
    label: "Kurse"
  }, {
    id: "planer",
    icon: "cal",
    label: "Planer"
  }, {
    id: "chat",
    icon: "brain",
    label: "Coach"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      background: t.navBg,
      borderTop: `1px solid ${t.divider}`,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "10px 0 24px"
    }
  }, tabs.map(tab => {
    const active = screen === tab.id;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      onClick: () => setScreen(tab.id),
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "6px 14px",
        borderRadius: 16,
        color: active ? t.accent : t.textSub,
        transition: "all 0.2s ease"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "6px 8px",
        borderRadius: 12,
        background: active ? t.accentSub : "transparent",
        transition: "all 0.2s ease"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: tab.icon,
      size: 22,
      color: active ? t.accent : t.textSub
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: active ? 600 : 400,
        letterSpacing: 0.2
      }
    }, tab.label));
  }));
};

/* ── SPLASH ────────────────────────────────────────────── */
const SplashScreen = ({
  onDone,
  theme: t
}) => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => onDone(), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: t.bg,
      zIndex: 100,
      transition: "opacity 0.5s ease",
      opacity: phase >= 2 ? 0 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      transform: phase >= 1 ? "translateY(0)" : "translateY(24px)",
      opacity: phase >= 1 ? 1 : 0,
      transition: "all 0.7s cubic-bezier(0.34,1.56,0.64,1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      borderRadius: 20,
      background: `linear-gradient(135deg, ${t.accent}, #7C6EFA)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 20px 60px ${t.accent}55`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bolt",
    size: 36,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 800,
      color: t.text,
      letterSpacing: -1,
      lineHeight: 1
    }
  }, "Just Do"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: t.textSub,
      marginTop: 6,
      fontWeight: 400,
      letterSpacing: 0.5
    }
  }, "AI Study Coach"))));
};

/* ── DASHBOARD ─────────────────────────────────────────── */
const DashboardScreen = ({
  theme: t,
  themeKey,
  toggleTheme,
  setScreen,
  user,
  onLogout
}) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [examsOpen, setExamsOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatLog, setChatLog] = useState([{
    role: "ai",
    text: "Guten Morgen! Du hast heute 4h Lernzeit eingeplant. Statistik sollte Priorität haben – Prüfung in 58 Tagen, aber dein Fortschritt liegt erst bei 42%. Soll ich einen Intensivplan erstellen?"
  }]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  const sendMsg = async () => {
    if (!chatMsg.trim()) return;
    const msg = chatMsg.trim();
    setChatMsg("");
    setChatLog(l => [...l, {
      role: "user",
      text: msg
    }]);
    setLoading(true);
    try {
      const reply = await window.claude.complete({
        messages: [{
          role: "user",
          content: `Du bist ein professioneller AI Studiencoach. Antworte kurz und präzise auf Deutsch (max 2 Sätze). Kontext: Student, Fächer: Mathe, Statistik, Wirtschaftsrecht, Marketing. Frage: ${msg}`
        }]
      });
      setChatLog(l => [...l, {
        role: "ai",
        text: reply
      }]);
    } catch (e) {
      setChatLog(l => [...l, {
        role: "ai",
        text: "Entschuldigung, ich kann gerade nicht antworten."
      }]);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatLog, loading]);
  const urgent = SUBJECTS.slice().sort((a, b) => a.daysLeft - b.daysLeft)[0];

  // Load user exams for notification bell
  const userExams = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(`justdo_exams_${user?.uid || "guest"}`) || "[]");
    } catch {
      return [];
    }
  }, [examsOpen]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      paddingBottom: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 20px 12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: t.textSub,
      fontWeight: 500
    }
  }, "Freitag, 25. April"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: t.text,
      letterSpacing: -0.5,
      marginTop: 2
    }
  }, "Hallo, ", user?.name?.split(" ")[0] || "Student", " \uD83D\uDC4B")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, typeof NotificationBell !== "undefined" && /*#__PURE__*/React.createElement(NotificationBell, {
    exams: userExams,
    theme: t,
    onOpenExams: () => setExamsOpen(true)
  }), /*#__PURE__*/React.createElement("button", {
    onClick: toggleTheme,
    style: {
      width: 36,
      height: 36,
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      background: t.pillBg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    title: themeKey === "dark" ? "Light Mode" : "Dark Mode"
  }, themeKey === "dark" ? /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t.textSub,
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "1",
    x2: "12",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "4.22",
    x2: "5.64",
    y2: "5.64"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "18.36",
    x2: "19.78",
    y2: "19.78"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "12",
    x2: "3",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "23",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "19.78",
    x2: "5.64",
    y2: "18.36"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "5.64",
    x2: "19.78",
    y2: "4.22"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t.textSub,
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    style: {
      width: 36,
      height: 36,
      borderRadius: 18,
      border: "none",
      cursor: "pointer",
      background: `linear-gradient(135deg, ${t.accent}, #7C6EFA)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      fontWeight: 700,
      color: "#fff"
    },
    title: "Abmelden"
  }, user?.avatar || "JD"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 16px",
      display: "flex",
      gap: 10
    }
  }, [{
    label: "Streak",
    value: "12 Tage",
    icon: "fire",
    color: "#FF6B6B"
  }, {
    label: "Heute",
    value: "3.5h",
    icon: "clock",
    color: t.accent
  }, {
    label: "Ziel",
    value: "4.0h",
    icon: "bolt",
    color: "#FFB347"
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      flex: 1,
      background: t.card,
      borderRadius: 14,
      border: `1px solid ${t.cardBorder}`,
      padding: "12px 10px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 16,
    color: s.color
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: t.text,
      marginTop: 4
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: t.textSub,
      marginTop: 1
    }
  }, s.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${t.accent}22, #7C6EFA22)`,
      border: `1px solid ${t.accent}33`,
      borderRadius: 18,
      padding: "16px",
      cursor: "pointer"
    },
    onClick: () => setChatOpen(true)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 12,
      flexShrink: 0,
      background: `linear-gradient(135deg, ${t.accent}, #7C6EFA)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "brain",
    size: 18,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: t.accent,
      marginBottom: 4,
      letterSpacing: 0.5,
      textTransform: "uppercase"
    }
  }, "AI Coach \xB7 Heute"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: t.text,
      lineHeight: 1.5,
      fontWeight: 400
    }
  }, chatLog[chatLog.length - 1]?.text.slice(0, 120), "\u2026"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      alignItems: "center",
      gap: 6,
      color: t.accent,
      fontSize: 12,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chat",
    size: 14,
    color: t.accent
  }), "Mit Coach sprechen"))), typeof UpcomingExamsCard !== "undefined" ? /*#__PURE__*/React.createElement(UpcomingExamsCard, {
    exams: userExams,
    theme: t,
    onOpenExams: () => setExamsOpen(true)
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: t.text,
      letterSpacing: -0.2
    }
  }, "Heute geplant"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("planer"),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 12,
      color: t.accent,
      fontWeight: 600
    }
  }, "Alle \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, TODAY_TASKS.slice(0, 4).map(task => /*#__PURE__*/React.createElement("div", {
    key: task.id,
    style: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 14,
      padding: "12px 14px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      opacity: task.done ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      flexShrink: 0,
      background: task.done ? "#34C7A022" : t.accentSub,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, task.done ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14,
    color: "#34C7A0"
  }) : /*#__PURE__*/React.createElement(Icon, {
    name: task.type === "break" ? "dots" : task.type === "focus" ? "bolt" : "book",
    size: 14,
    color: t.accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: t.text,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, task.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.textSub,
      marginTop: 1
    }
  }, task.time, " \xB7 ", task.dur, " min", task.subj ? ` · ${task.subj}` : "")), task.done && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14,
    color: "#34C7A0"
  }))))), examsOpen && typeof ExamsManager !== "undefined" && /*#__PURE__*/React.createElement(ExamsManager, {
    theme: t,
    user: user,
    onClose: () => setExamsOpen(false)
  }), chatOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 200,
      background: t.bg,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      borderBottom: `1px solid ${t.divider}`,
      background: t.surface
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 12,
      background: `linear-gradient(135deg, ${t.accent}, #7C6EFA)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "brain",
    size: 18,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: t.text
    }
  }, "AI Coach"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#34C7A0",
      fontWeight: 500
    }
  }, "\u25CF Online")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setChatOpen(false),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      width: 32,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      background: t.pillBg
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 16,
    color: t.textSub
  }))), /*#__PURE__*/React.createElement("div", {
    ref: chatRef,
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "16px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, chatLog.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: m.role === "user" ? "flex-end" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "80%",
      padding: "10px 14px",
      borderRadius: 16,
      borderBottomLeftRadius: m.role === "ai" ? 4 : 16,
      borderBottomRightRadius: m.role === "user" ? 4 : 16,
      background: m.role === "user" ? t.accent : t.card,
      border: m.role === "ai" ? `1px solid ${t.cardBorder}` : "none",
      fontSize: 13,
      color: m.role === "user" ? "#fff" : t.text,
      lineHeight: 1.5
    }
  }, m.text))), loading && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 16,
      borderBottomLeftRadius: 4,
      padding: "12px 16px",
      display: "flex",
      gap: 4,
      alignItems: "center"
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: t.textSub,
      animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px 32px",
      borderTop: `1px solid ${t.divider}`,
      background: t.surface,
      display: "flex",
      gap: 10,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: chatMsg,
    onChange: e => setChatMsg(e.target.value),
    onKeyDown: e => e.key === "Enter" && sendMsg(),
    placeholder: "Frag deinen Coach\u2026",
    style: {
      flex: 1,
      background: t.pillBg,
      border: "none",
      borderRadius: 14,
      padding: "12px 16px",
      fontSize: 14,
      color: t.text,
      outline: "none",
      fontFamily: "inherit"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: sendMsg,
    style: {
      width: 44,
      height: 44,
      borderRadius: 13,
      flexShrink: 0,
      background: chatMsg.trim() ? t.accent : t.pillBg,
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.2s"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 18,
    color: chatMsg.trim() ? "#fff" : t.textSub
  })))));
};

/* ── KURSE & FÄCHER ────────────────────────────────────── */
const KurseScreen = ({
  theme: t,
  user
}) => {
  const [selected, setSelected] = useState(null);
  const [subjects, setSubjects] = useState(SUBJECTS);
  const deleteSubject = id => setSubjects(ss => ss.filter(s => s.id !== id));
  const totalCredits = SUBJECTS.reduce((s, x) => s + x.credits, 0);
  const earnedCredits = SUBJECTS.reduce((s, x) => s + Math.round(x.credits * x.progress), 0);
  if (selected !== null) {
    const s = SUBJECTS[selected];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto",
        paddingBottom: 90
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 20px 0",
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setSelected(null),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        width: 36,
        height: 36,
        borderRadius: 10,
        background: t.pillBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: t.text,
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 12H5M12 19l-7-7 7-7"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 17,
        fontWeight: 700,
        color: t.text
      }
    }, s.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 20,
        padding: 24,
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: 80,
        height: 80,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Ring, {
      pct: s.progress,
      size: 80,
      color: s.color,
      stroke: 6,
      bg: t.bg === "#09090E" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 800,
        color: t.text
      }
    }, Math.round(s.progress * 100), "%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: t.text,
        letterSpacing: -0.5
      }
    }, s.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: t.textSub,
        marginTop: 4
      }
    }, s.credits, " ECTS \xB7 Pr\xFCfung ", s.exam), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: `${s.color}22`,
        color: s.color,
        borderRadius: 8,
        padding: "4px 10px",
        fontSize: 12,
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 11,
      color: s.color
    }), s.daysLeft, " Tage"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 16
      }
    }, [{
      label: "Aufgaben",
      value: s.tasks
    }, {
      label: "Erledigt",
      value: Math.round(s.tasks * s.progress)
    }, {
      label: "Offen",
      value: s.tasks - Math.round(s.tasks * s.progress)
    }].map(st => /*#__PURE__*/React.createElement("div", {
      key: st.label,
      style: {
        flex: 1,
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 14,
        padding: "14px 10px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: t.text
      }
    }, st.value), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: t.textSub,
        marginTop: 2
      }
    }, st.label)))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: t.text,
        marginBottom: 10
      }
    }, "Materialien"), typeof MaterialsScreen !== "undefined" ? /*#__PURE__*/React.createElement(MaterialsScreen, {
      theme: t,
      user: user,
      subjectId: s.id,
      subjectName: s.name,
      embedded: true
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        color: t.textSub,
        fontSize: 13
      }
    }, "Lade Materialien\u2026")));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      paddingBottom: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 20px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: t.text,
      letterSpacing: -0.5
    }
  }, "Meine Kurse"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: t.textSub,
      marginTop: 2
    }
  }, "Sommersemester 2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${t.accent}33, #7C6EFA22)`,
      border: `1px solid ${t.accent}33`,
      borderRadius: 18,
      padding: 16,
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 64,
      height: 64,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    pct: earnedCredits / totalCredits,
    size: 64,
    color: t.accent,
    stroke: 5,
    bg: "rgba(255,255,255,0.12)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: t.text
    }
  }, earnedCredits), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: t.textSub
    }
  }, "ECTS"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: t.text
    }
  }, "Semester-Fortschritt"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: t.textSub,
      marginTop: 2
    }
  }, earnedCredits, " von ", totalCredits, " ECTS im Plan"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      height: 4,
      borderRadius: 4,
      background: "rgba(255,255,255,0.12)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${earnedCredits / totalCredits * 100}%`,
      background: t.accent,
      borderRadius: 4,
      transition: "width 1s ease"
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, subjects.map((s, i) => /*#__PURE__*/React.createElement(SwipeDeleteItem, {
    key: s.id,
    t: t,
    onDelete: () => deleteSubject(s.id)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setSelected(i),
    style: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 18,
      padding: "14px 16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      flexShrink: 0,
      background: `${s.color}20`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book",
    size: 20,
    color: s.color
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: t.text
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.textSub,
      marginTop: 2
    }
  }, s.credits, " ECTS \xB7 Pr\xFCfung ", s.exam), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      height: 3,
      borderRadius: 3,
      background: t.divider,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${s.progress * 100}%`,
      background: s.color,
      borderRadius: 3,
      transition: "width 1s ease"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: t.text
    }
  }, Math.round(s.progress * 100), "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      marginTop: 4,
      fontWeight: 600,
      color: s.daysLeft < 50 ? "#FF6B6B" : t.textSub
    }
  }, s.daysLeft, "d")))))));
};

/* ── TAGESPLANER ───────────────────────────────────────── */
const PlanerScreen = ({
  theme: t
}) => {
  const [tasks, setTasks] = useState(TODAY_TASKS);
  const [activeSession, setActiveSession] = useState(null);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (activeSession === null) return;
    const id = setInterval(() => setTimer(x => x + 1), 1000);
    return () => clearInterval(id);
  }, [activeSession]);
  const toggleDone = id => setTasks(ts => ts.map(t => t.id === id ? {
    ...t,
    done: !t.done
  } : t));
  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const typeColor = {
    study: t.accent,
    practice: "#7C6EFA",
    review: "#34C7A0",
    break: "#FFB347",
    focus: "#FF6B6B"
  };
  const typeBg = {
    study: t.accentSub,
    practice: "#7C6EFA22",
    review: "#34C7A022",
    break: "#FFB34722",
    focus: "#FF6B6B22"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      paddingBottom: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 20px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: t.text,
      letterSpacing: -0.5
    }
  }, "Tagesplan"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: t.textSub,
      marginTop: 2
    }
  }, "Freitag, 25. April 2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 18,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: t.text
    }
  }, done, " / ", total, " erledigt"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: t.accent,
      fontWeight: 600
    }
  }, Math.round(done / total * 100), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 6,
      background: t.divider,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${done / total * 100}%`,
      background: `linear-gradient(90deg, ${t.accent}, #7C6EFA)`,
      borderRadius: 6,
      transition: "width 0.4s ease"
    }
  })))), activeSession !== null && /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 20px 16px",
      background: `linear-gradient(135deg, #FF6B6B22, #FF6B6B11)`,
      border: "1px solid #FF6B6B44",
      borderRadius: 18,
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#FF6B6B",
      letterSpacing: 0.5,
      textTransform: "uppercase"
    }
  }, "Fokus-Session l\xE4uft"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: t.text,
      marginTop: 4,
      fontVariantNumeric: "tabular-nums"
    }
  }, fmt(timer))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setActiveSession(null);
      setTimer(0);
    },
    style: {
      background: "#FF6B6B",
      border: "none",
      borderRadius: 12,
      color: "#fff",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      padding: "8px 14px"
    }
  }, "Stopp")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: t.text,
      marginBottom: 12
    }
  }, "Zeitplan"), tasks.map((task, i) => /*#__PURE__*/React.createElement("div", {
    key: task.id,
    style: {
      display: "flex",
      gap: 12,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      flexShrink: 0,
      paddingTop: 14,
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.textMuted,
      fontWeight: 500,
      fontVariantNumeric: "tabular-nums"
    }
  }, task.time)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 2,
      background: t.divider,
      borderRadius: 1,
      flexShrink: 0,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      left: -4,
      width: 10,
      height: 10,
      borderRadius: 5,
      background: task.done ? "#34C7A0" : typeColor[task.type] || t.accent,
      transition: "background 0.3s"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      paddingBottom: 4
    }
  }, /*#__PURE__*/React.createElement(SwipeDeleteItem, {
    t: t,
    onDelete: () => setTasks(ts => ts.filter(x => x.id !== task.id))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 14,
      padding: "12px 14px",
      opacity: task.done ? 0.55 : 1,
      transition: "opacity 0.3s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 0.4,
      color: typeColor[task.type] || t.accent,
      background: typeBg[task.type] || t.accentSub,
      borderRadius: 6,
      padding: "2px 7px",
      textTransform: "uppercase"
    }
  }, task.type === "study" ? "Lernen" : task.type === "practice" ? "Üben" : task.type === "review" ? "Wiederholung" : task.type === "break" ? "Pause" : "Fokus"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: t.textMuted
    }
  }, task.dur, " min")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: t.text,
      textDecoration: task.done ? "line-through" : "none"
    }
  }, task.label), task.subj && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.textSub,
      marginTop: 2
    }
  }, task.subj)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleDone(task.id),
    style: {
      width: 26,
      height: 26,
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      background: task.done ? "#34C7A0" : t.pillBg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s"
    }
  }, task.done && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 13,
    color: "#fff"
  })), task.type === "focus" && !task.done && activeSession === null && /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveSession(task.id),
    style: {
      background: t.accent,
      border: "none",
      borderRadius: 8,
      color: "#fff",
      fontSize: 10,
      fontWeight: 600,
      cursor: "pointer",
      padding: "4px 8px"
    }
  }, "Start"))))))))));
};

/* ── CHAT SCREEN ───────────────────────────────────────── */
const ChatScreen = ({
  theme: t
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
      textAlign: "center",
      paddingBottom: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      borderRadius: 24,
      background: `linear-gradient(135deg, ${t.accent}, #7C6EFA)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      boxShadow: `0 16px 48px ${t.accent}44`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "brain",
    size: 34,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: t.text,
      letterSpacing: -0.5,
      marginBottom: 8
    }
  }, "AI Coach"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: t.textSub,
      lineHeight: 1.6,
      maxWidth: 260
    }
  }, "Dein pers\xF6nlicher Studiencoach \u2013 direkt auf dem Dashboard erreichbar"));
};

/* ── APP ────────────────────────────────────────────────── */
window.JustDoApp = function JustDoApp({
  initialTheme = "dark",
  user,
  onLogout
}) {
  const [screen, setScreen] = useState("splash");
  const [themeKey, setThemeKey] = useState(() => lsGet("justdo_theme", initialTheme));
  const t = themes[themeKey];
  const device = useDevice();
  const toggleTheme = () => {
    const next = themeKey === "dark" ? "light" : "dark";
    setThemeKey(next);
    lsSet("justdo_theme", next);
  };
  const navigate = s => setScreen(s);
  const screenMap = {
    dashboard: /*#__PURE__*/React.createElement(DashboardScreen, {
      theme: t,
      themeKey: themeKey,
      toggleTheme: toggleTheme,
      setScreen: navigate,
      user: user,
      onLogout: onLogout,
      isIpad: device.isIpad
    }),
    kurse: /*#__PURE__*/React.createElement(KurseScreen, {
      theme: t,
      user: user,
      isIpad: device.isIpad
    }),
    planer: /*#__PURE__*/React.createElement(PlanerScreen, {
      theme: t,
      isIpad: device.isIpad
    }),
    chat: /*#__PURE__*/React.createElement(ChatScreen, {
      theme: t
    })
  };

  // iPad layout — sidebar + content
  if (device.isIpad && screen !== "splash") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        height: "100%",
        background: t.bg,
        display: "flex",
        flexDirection: "row",
        fontFamily: "'DM Sans', sans-serif",
        color: t.text,
        transition: "background 0.3s ease"
      }
    }, /*#__PURE__*/React.createElement(IPadSidebar, {
      screen: screen,
      setScreen: navigate,
      theme: t,
      user: user,
      toggleTheme: toggleTheme,
      themeKey: themeKey,
      onLogout: onLogout,
      landscape: device.landscape
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto",
        maxWidth: device.landscape ? 900 : "100%"
      }
    }, screenMap[screen]), /*#__PURE__*/React.createElement("style", null, `
          @keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}
          *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
          ::-webkit-scrollbar{display:none}
          button:active{opacity:0.7}
          input::placeholder{color:${t.textMuted}}
        `));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      background: t.bg,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
      color: t.text,
      transition: "background 0.3s ease"
    }
  }, screen === "splash" && /*#__PURE__*/React.createElement(SplashScreen, {
    onDone: () => setScreen("dashboard"),
    theme: t
  }), screen !== "splash" && /*#__PURE__*/React.createElement(React.Fragment, null, screenMap[screen], /*#__PURE__*/React.createElement(PillBar, {
    screen: screen,
    setScreen: navigate,
    theme: t
  })), /*#__PURE__*/React.createElement("style", null, `
        @keyframes pulse {
          0%,100%{opacity:0.3;transform:scale(0.8)}
          50%{opacity:1;transform:scale(1)}
        }
        * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
        ::-webkit-scrollbar { display:none; }
        button:active { opacity:0.7; }
        input::placeholder { color:${t.textMuted}; }
      `));
};

// ── auth-screen.jsx ──────────────────────────
// auth-screen.jsx – Just Do (v10 clean)

const decodeJwt = token => {
  try {
    const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(b64));
  } catch {
    return null;
  }
};
const AuthScreen = ({
  onLogin,
  themeKey
}) => {
  const t = themes[themeKey] || themes.dark;
  const [loading, setLoading] = useState(false);
  const clientId = (window.JUST_DO_CONFIG || {}).GOOGLE_CLIENT_ID || "";
  const hasClientId = clientId.length > 10;
  const handleGoogleClick = async () => {
    setLoading(true);
    if (window.FB?.signInWithGoogle) {
      try {
        await window.FB.signInWithGoogle();
        // signInWithRedirect: page reloads, onAuthStateChanged handles the rest
        return;
      } catch (e) {
        console.warn("[Auth] Firebase login failed:", e.message);
        setLoading(false);
        return;
      }
    }
    // No Firebase: demo fallback
    mockLogin();
  };
  const mockLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const user = {
      name: "Demo Nutzer",
      email: "demo@justdo.app",
      avatar: "DN",
      provider: "demo",
      uid: "demo_" + Math.random().toString(36).slice(2),
      joinedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem("justdo_user", JSON.stringify(user));
    } catch (e) {}
    onLogin(user);
    setLoading(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: t.bg,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      padding: "32px 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -80,
      left: -80,
      width: 300,
      height: 300,
      borderRadius: "50%",
      opacity: 0.1,
      pointerEvents: "none",
      background: `radial-gradient(circle, ${t.accent}, transparent)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 80,
      height: 80,
      borderRadius: 24,
      marginBottom: 24,
      background: `linear-gradient(135deg, ${t.accent}, #7C6EFA)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 24px 64px ${t.accent}55`
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "40",
    height: "40",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 800,
      color: t.text,
      letterSpacing: -1,
      marginBottom: 8,
      textAlign: "center"
    }
  }, "Just Do"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: t.textSub,
      textAlign: "center",
      lineHeight: 1.6,
      maxWidth: 240,
      marginBottom: 40
    }
  }, "Dein KI-Studiencoach f\xFCr Lernplanung und Pr\xFCfungsvorbereitung."), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 300,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleGoogleClick,
    disabled: loading,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      background: "#fff",
      border: "1px solid rgba(0,0,0,0.12)",
      borderRadius: 14,
      padding: "14px 20px",
      width: "100%",
      cursor: loading ? "default" : "pointer",
      fontSize: 15,
      fontWeight: 600,
      color: "#1a1a1a",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      opacity: loading ? 0.7 : 1,
      transition: "opacity 0.2s"
    }
  }, loading ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 10,
      border: "2px solid rgba(0,0,0,0.15)",
      borderTopColor: "#4A7CFF",
      animation: "spin 0.8s linear infinite"
    }
  }) : /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 48 48"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#4285F4",
    d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#34A853",
    d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FBBC05",
    d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#EA4335",
    d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
  })), loading ? "Verbinde mit Google…" : "Mit Google anmelden"), /*#__PURE__*/React.createElement("button", {
    onClick: mockLogin,
    disabled: loading,
    style: {
      background: "none",
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 14,
      padding: "12px",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 500,
      color: t.textSub,
      width: "100%"
    }
  }, "Im Demo-Modus fortfahren")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      fontSize: 11,
      color: t.textMuted,
      textAlign: "center",
      maxWidth: 240
    }
  }, "Mit der Anmeldung stimmst du den Nutzungsbedingungen zu."), /*#__PURE__*/React.createElement("style", null, `@keyframes spin{to{transform:rotate(360deg)}}`));
};
Object.assign(window, {
  AuthScreen
});

// ── onboarding-screen.jsx ──────────────────────────
// onboarding-screen.jsx – Just Do
// Multi-step onboarding wizard: Typ → Fächer → Ziele → Fertig
// Shown once after first login; skipped on return visits.

const OnboardingScreen = ({
  user,
  onComplete,
  themeKey
}) => {
  const t = themes[themeKey] || themes.dark;
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1); // 1=forward, -1=back
  const [animating, setAnimating] = useState(false);

  // Collected data
  const [studyType, setStudyType] = useState(null); // "schule" | "uni"
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [customSubject, setCustomSubject] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [startTime, setStartTime] = useState("08:00");
  const TOTAL_STEPS = 4;
  const UNI_SUBJECTS = [{
    name: "Mathematik",
    color: "#4A7CFF"
  }, {
    name: "Statistik",
    color: "#7C6EFA"
  }, {
    name: "Wirtschaftsrecht",
    color: "#34C7A0"
  }, {
    name: "Marketing",
    color: "#FF6B6B"
  }, {
    name: "BWL",
    color: "#FFB347"
  }, {
    name: "Makroökonomie",
    color: "#A855F7"
  }, {
    name: "Informatik",
    color: "#06B6D4"
  }, {
    name: "Psychologie",
    color: "#F97316"
  }, {
    name: "Soziologie",
    color: "#84CC16"
  }, {
    name: "Englisch",
    color: "#EC4899"
  }];
  const SCHULE_SUBJECTS = [{
    name: "Mathematik",
    color: "#4A7CFF"
  }, {
    name: "Deutsch",
    color: "#7C6EFA"
  }, {
    name: "Englisch",
    color: "#34C7A0"
  }, {
    name: "Physik",
    color: "#FF6B6B"
  }, {
    name: "Chemie",
    color: "#FFB347"
  }, {
    name: "Biologie",
    color: "#A855F7"
  }, {
    name: "Geschichte",
    color: "#06B6D4"
  }, {
    name: "Geographie",
    color: "#F97316"
  }, {
    name: "Kunst",
    color: "#EC4899"
  }, {
    name: "Sport",
    color: "#84CC16"
  }];
  const SUBJECTS = studyType === "schule" ? SCHULE_SUBJECTS : UNI_SUBJECTS;
  const toggleSubject = name => {
    setSelectedSubjects(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]);
  };
  const addCustom = () => {
    const s = customSubject.trim();
    if (s && !selectedSubjects.includes(s)) {
      setSelectedSubjects(prev => [...prev, s]);
    }
    setCustomSubject("");
  };
  const goNext = () => {
    if (animating) return;
    setDir(1);
    setAnimating(true);
    setTimeout(() => {
      setStep(s => s + 1);
      setAnimating(false);
    }, 220);
  };
  const goBack = () => {
    if (animating || step === 0) return;
    setDir(-1);
    setAnimating(true);
    setTimeout(() => {
      setStep(s => s - 1);
      setAnimating(false);
    }, 220);
  };
  const finish = () => {
    const profile = {
      studyType,
      subjects: selectedSubjects.map((name, i) => ({
        id: i + 1,
        name,
        color: (SUBJECTS.find(s => s.name === name) || {}).color || "#4A7CFF",
        progress: 0,
        credits: studyType === "uni" ? 5 : null,
        exam: null,
        daysLeft: null,
        tasks: 0
      })),
      hoursPerDay,
      startTime
    };
    const profileKey = `justdo_profile_${user.uid}`;
    const onboardedKey = `justdo_onboarded_${user.uid}`;
    try {
      localStorage.setItem(profileKey, JSON.stringify(profile));
      localStorage.setItem(onboardedKey, "1");
    } catch (e) {}
    if (window.justDoSync) {
      window.justDoSync(user.uid, profileKey, profile);
      window.justDoSync(user.uid, onboardedKey, "1");
    }
    onComplete(profile);
  };
  const canContinue = [true, !!studyType, selectedSubjects.length >= 1, true];
  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px 28px 0",
    opacity: animating ? 0 : 1,
    transform: animating ? `translateX(${dir * 24}px)` : "translateX(0)",
    transition: "opacity 0.22s ease, transform 0.22s ease"
  };
  const renderStep = () => {
    if (step === 0) return /*#__PURE__*/React.createElement("div", {
      style: contentStyle
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 72,
        height: 72,
        borderRadius: 22,
        marginBottom: 24,
        marginTop: 20,
        background: `linear-gradient(135deg, ${t.accent}, #7C6EFA)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 20px 48px ${t.accent}44`
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "34",
      height: "34",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        fontWeight: 800,
        color: t.text,
        letterSpacing: -0.8,
        marginBottom: 8,
        textAlign: "center"
      }
    }, "Hey ", user?.name?.split(" ")[0] || "", "! \uD83D\uDC4B"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: t.textSub,
        textAlign: "center",
        lineHeight: 1.7,
        maxWidth: 260,
        marginBottom: 32
      }
    }, "Lass uns ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: t.text
      }
    }, "Just Do"), " einrichten."), [{
      icon: "📚",
      label: "Fächer & Module organisieren"
    }, {
      icon: "🧠",
      label: "Personalisierte Lernpläne"
    }, {
      icon: "⚡",
      label: "KI-Chat zu deinen Materialien"
    }].map(f => /*#__PURE__*/React.createElement("div", {
      key: f.label,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 14,
        padding: "12px 16px",
        marginBottom: 10,
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20
      }
    }, f.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: t.text,
        fontWeight: 500
      }
    }, f.label))));
    if (step === 1) return /*#__PURE__*/React.createElement("div", {
      style: contentStyle
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: t.text,
        letterSpacing: -0.5,
        marginBottom: 6,
        textAlign: "center",
        marginTop: 20
      }
    }, "Was bist du?"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: t.textSub,
        textAlign: "center",
        marginBottom: 28
      }
    }, "Damit wir die richtigen Inhalte vorbereiten."), [{
      id: "uni",
      emoji: "🎓",
      title: "Student:in",
      sub: "Universität / FH / Hochschule"
    }, {
      id: "schule",
      emoji: "📖",
      title: "Schüler:in",
      sub: "Gymnasium / Realschule / Berufsschule"
    }].map(opt => /*#__PURE__*/React.createElement("button", {
      key: opt.id,
      onClick: () => setStudyType(opt.id),
      style: {
        width: "100%",
        border: `2px solid ${studyType === opt.id ? t.accent : t.cardBorder}`,
        background: studyType === opt.id ? t.accentSub : t.card,
        borderRadius: 18,
        padding: "20px",
        cursor: "pointer",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 14,
        transition: "all 0.2s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 52,
        height: 52,
        borderRadius: 16,
        flexShrink: 0,
        fontSize: 24,
        background: studyType === opt.id ? t.accent : t.pillBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s"
      }
    }, opt.emoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        fontWeight: 700,
        color: t.text
      }
    }, opt.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: t.textSub,
        marginTop: 2
      }
    }, opt.sub)), studyType === opt.id && /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: "auto",
        width: 24,
        height: 24,
        borderRadius: 12,
        background: t.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "3",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5"
    }))))));
    if (step === 2) return /*#__PURE__*/React.createElement("div", {
      style: {
        ...contentStyle,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: t.text,
        marginBottom: 6,
        marginTop: 20
      }
    }, "Deine F\xE4cher"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: t.textSub,
        marginBottom: 20
      }
    }, "W\xE4hle deine F\xE4cher aus oder f\xFCge eigene hinzu."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 16,
        width: "100%"
      }
    }, SUBJECTS.map(s => {
      const active = selectedSubjects.includes(s.name);
      return /*#__PURE__*/React.createElement("button", {
        key: s.name,
        onClick: () => toggleSubject(s.name),
        style: {
          border: `1.5px solid ${active ? s.color : t.cardBorder}`,
          background: active ? `${s.color}22` : t.card,
          borderRadius: 10,
          padding: "8px 14px",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 600,
          color: active ? s.color : t.textSub,
          transition: "all 0.15s"
        }
      }, s.name);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: customSubject,
      onChange: e => setCustomSubject(e.target.value),
      onKeyDown: e => e.key === "Enter" && addCustom(),
      placeholder: "Eigenes Fach hinzuf\xFCgen\u2026",
      style: {
        flex: 1,
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 12,
        padding: "10px 14px",
        fontSize: 13,
        color: t.text,
        outline: "none",
        fontFamily: "'DM Sans', sans-serif"
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: addCustom,
      style: {
        background: t.accent,
        border: "none",
        borderRadius: 12,
        width: 40,
        cursor: "pointer",
        color: "#fff",
        fontSize: 18,
        fontWeight: 700
      }
    }, "+")), selectedSubjects.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        fontSize: 12,
        color: t.accent,
        fontWeight: 600
      }
    }, selectedSubjects.length, " Fach/F\xE4cher gew\xE4hlt"));
    if (step === 3) return /*#__PURE__*/React.createElement("div", {
      style: contentStyle
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: t.text,
        letterSpacing: -0.5,
        marginBottom: 6,
        textAlign: "center",
        marginTop: 20
      }
    }, "Deine Lernziele"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: t.textSub,
        textAlign: "center",
        marginBottom: 24
      }
    }, "Der KI-Coach passt deinen Tagesplan automatisch an."), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 18,
        padding: 20,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: t.text
      }
    }, "Lernzeit pro Tag"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 28,
        fontWeight: 800,
        color: t.accent
      }
    }, hoursPerDay, "h")), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: 1,
      max: 10,
      step: 0.5,
      value: hoursPerDay,
      onChange: e => setHoursPerDay(parseFloat(e.target.value)),
      style: {
        width: "100%",
        accentColor: t.accent,
        cursor: "pointer"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: t.textMuted
      }
    }, "1h"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: t.textMuted
      }
    }, "10h"))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 18,
        padding: 20,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: t.text
      }
    }, "Lernstart"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: t.textSub,
        marginTop: 2
      }
    }, "Erste Einheit des Tages")), /*#__PURE__*/React.createElement("input", {
      type: "time",
      value: startTime,
      onChange: e => setStartTime(e.target.value),
      style: {
        background: t.pillBg,
        border: "none",
        borderRadius: 10,
        padding: "8px 12px",
        fontSize: 16,
        fontWeight: 700,
        color: t.accent,
        fontFamily: "'DM Mono', monospace",
        cursor: "pointer",
        outline: "none"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        padding: "12px 16px",
        background: t.accentSub,
        borderRadius: 14,
        fontSize: 13,
        color: t.accent,
        fontWeight: 500,
        lineHeight: 1.5
      }
    }, "\uD83D\uDCA1 ", hoursPerDay, "h t\xE4glich ab ", startTime, " Uhr \u2013 automatisch geplant."));
    return null;
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: t.bg,
      display: "flex",
      flexDirection: "column",
      fontFamily: "'DM Sans', sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 28px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 20
    }
  }, step > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: goBack,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: t.textSub,
      fontSize: 13,
      padding: "4px 0",
      marginRight: 4
    }
  }, "\u2190"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 3,
      borderRadius: 3,
      background: t.divider,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 3,
      background: `linear-gradient(90deg, ${t.accent}, #7C6EFA)`,
      width: `${(step + 1) / TOTAL_STEPS * 100}%`,
      transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: t.textMuted,
      fontWeight: 600,
      minWidth: 28,
      textAlign: "right"
    }
  }, step + 1, "/", TOTAL_STEPS))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto"
    }
  }, renderStep())), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 28px 36px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: step < TOTAL_STEPS - 1 ? goNext : finish,
    disabled: !canContinue[step],
    style: {
      width: "100%",
      borderRadius: 16,
      background: canContinue[step] ? `linear-gradient(135deg, ${t.accent}, #7C6EFA)` : t.pillBg,
      border: "none",
      color: canContinue[step] ? "#fff" : t.textMuted,
      fontSize: 16,
      fontWeight: 700,
      padding: "16px",
      cursor: canContinue[step] ? "pointer" : "default",
      transition: "all 0.25s",
      boxShadow: canContinue[step] ? `0 8px 32px ${t.accent}44` : "none"
    }
  }, step === 0 ? "Los geht's →" : step === TOTAL_STEPS - 1 ? "Just Do! 🚀" : "Weiter →")));
};
Object.assign(window, {
  OnboardingScreen
});

// ── materials-screen.jsx ──────────────────────────
// materials-screen.jsx – Just Do
// PDF / Dokument Upload + KI-Analyse
// ─────────────────────────────────────────────────────────
// Real PDF parsing: benötigt pdf.js oder server-side extraction
// Prototype: Dateiname + Kontext wird an Claude übergeben
// ─────────────────────────────────────────────────────────

const MaterialsScreen = ({
  theme: t,
  user,
  subjectId = null,
  subjectName = null,
  embedded = false
}) => {
  // Per-subject storage when subjectId provided, else global (legacy fallback)
  const storageKey = subjectId ? `justdo_materials_${user?.uid || "guest"}_subj_${subjectId}` : `justdo_materials_${user?.uid || "guest"}`;
  const loadMaterials = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  };
  const [materials, setMaterials] = useState(loadMaterials);
  const [analyzing, setAnalyzing] = useState(null);
  const [selected, setSelected] = useState(null);
  const [flashcardMaterial, setFlashcardMaterial] = useState(null);
  const fileRef = React.useRef(null);
  const saveMaterials = list => {
    setMaterials(list);
    try {
      localStorage.setItem(storageKey, JSON.stringify(list));
    } catch (e) {}
    if (window.justDoSync && user?.uid) window.justDoSync(user.uid, storageKey, list);
  };
  const handleFileChange = async e => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    e.target.value = "";
    for (const file of files) {
      const id = Date.now() + Math.random();
      const ext = file.name.split(".").pop().toLowerCase();
      const typeLabel = ext === "pdf" ? "PDF" : ["jpg", "jpeg", "png", "webp"].includes(ext) ? "Bild" : "Notiz";

      // Add placeholder entry immediately
      const entry = {
        id,
        name: file.name,
        type: typeLabel,
        size: file.size,
        subject: subjectName || guessSubject(file.name),
        subjectId: subjectId,
        uploadedAt: new Date().toISOString(),
        status: "analyzing",
        summary: null,
        topics: [],
        flashcards: []
      };
      setMaterials(prev => {
        const next = [entry, ...prev];
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch (e) {}
        return next;
      });
      setAnalyzing(file.name);

      // AI Analysis via Claude
      try {
        const prompt = `Du bist ein Studiencoach-KI. Analysiere folgendes Dokument (nur Dateiname bekannt im Prototype): "${file.name}"${subjectName ? ` für das Fach "${subjectName}"` : ""}. 
Erstelle auf Deutsch:
1. Eine kurze Zusammenfassung (2 Sätze) was das Dokument wahrscheinlich enthält
2. Genau 4 Lernthemen als JSON-Array
3. Genau 3 Karteikarten als JSON-Array mit "frage" und "antwort"

Antworte NUR mit diesem JSON (kein anderer Text):
{"summary":"...","topics":["...","...","...","..."],"flashcards":[{"frage":"...","antwort":"..."}]}`;
        const raw = await window.claude.complete({
          messages: [{
            role: "user",
            content: prompt
          }]
        });
        let parsed;
        try {
          const jsonMatch = raw.match(/\{[\s\S]*\}/);
          parsed = JSON.parse(jsonMatch?.[0] || "{}");
        } catch {
          parsed = {};
        }
        setMaterials(prev => {
          const next = prev.map(m => m.id === id ? {
            ...m,
            status: "done",
            summary: parsed.summary || "Analyse abgeschlossen.",
            topics: parsed.topics || [],
            flashcards: parsed.flashcards || []
          } : m);
          try {
            localStorage.setItem(storageKey, JSON.stringify(next));
          } catch (e) {}
          return next;
        });
      } catch (err) {
        setMaterials(prev => {
          const next = prev.map(m => m.id === id ? {
            ...m,
            status: "error"
          } : m);
          try {
            localStorage.setItem(storageKey, JSON.stringify(next));
          } catch (e) {}
          return next;
        });
      }
      setAnalyzing(null);
    }
  };
  const guessSubject = name => {
    const n = name.toLowerCase();
    if (n.includes("math") || n.includes("mathe") || n.includes("integral")) return "Mathematik II";
    if (n.includes("stat")) return "Statistik";
    if (n.includes("recht") || n.includes("law")) return "Wirtschaftsrecht";
    if (n.includes("market")) return "Marketing";
    if (n.includes("bwl") || n.includes("betriebs")) return "BWL Grundlagen";
    if (n.includes("makro") || n.includes("vwl")) return "Makroökonomie";
    return "Allgemein";
  };
  const deleteMaterial = id => {
    saveMaterials(materials.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };
  const typeColor = {
    PDF: "#FF6B6B",
    Bild: "#4A7CFF",
    Notiz: "#34C7A0"
  };
  const typeIcon = {
    PDF: /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "14 2 14 8 20 8"
    })),
    Bild: /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "8.5",
      cy: "8.5",
      r: "1.5"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "21 15 16 10 5 21"
    })),
    Notiz: /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
    }))
  };

  // Detail view
  if (selected) {
    const [fcIndex, setFcIndex] = React.useState(0);
    const [flipped, setFlipped] = React.useState(false);
    const fc = selected.flashcards || [];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto",
        paddingBottom: 90
      }
    }, flashcardMaterial && typeof FlashcardsScreen !== "undefined" && /*#__PURE__*/React.createElement(FlashcardsScreen, {
      flashcards: flashcardMaterial.flashcards || [],
      materialName: flashcardMaterial.name,
      materialId: flashcardMaterial.id,
      subjectName: subjectName || flashcardMaterial.subject,
      user: user,
      theme: t,
      onClose: () => setFlashcardMaterial(null)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 20px 0",
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setSelected(null),
      style: {
        background: t.pillBg,
        border: "none",
        cursor: "pointer",
        width: 36,
        height: 36,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: t.text,
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 12H5M12 19l-7-7 7-7"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: t.text,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, selected.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: t.textSub
      }
    }, selected.subject))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 16,
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: t.accent,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 8
      }
    }, "KI-Zusammenfassung"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: t.text,
        lineHeight: 1.6
      }
    }, selected.summary)), selected.topics?.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 16,
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: t.accent,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 10
      }
    }, "Erkannte Themen"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 8
      }
    }, selected.topics.map((tp, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        background: t.accentSub,
        color: t.accent,
        borderRadius: 8,
        padding: "5px 10px",
        fontSize: 12,
        fontWeight: 600
      }
    }, tp)))), fc.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 16,
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: t.accent,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 12
      }
    }, "Karteikarten \xB7 ", fc.length, " Karten"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setFlashcardMaterial(selected),
      style: {
        flex: 1,
        background: `linear-gradient(135deg,${t.accent},#7C6EFA)`,
        border: "none",
        borderRadius: 12,
        padding: "12px",
        cursor: "pointer",
        color: "#fff",
        fontSize: 13,
        fontWeight: 700
      }
    }, "\uD83C\uDCCF Karteikarten"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setFlashcardMaterial(selected),
      style: {
        flex: 1,
        background: "#7C6EFA22",
        border: "1px solid #7C6EFA44",
        borderRadius: 12,
        padding: "12px",
        cursor: "pointer",
        color: "#7C6EFA",
        fontSize: 13,
        fontWeight: 700
      }
    }, "\u26A1 Quiz")))));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: embedded ? undefined : 1,
      overflowY: embedded ? undefined : "auto",
      paddingBottom: embedded ? 0 : 90
    }
  }, !embedded && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 20px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      color: t.text,
      letterSpacing: -0.5
    }
  }, "Materialien"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: t.textSub,
      marginTop: 2
    }
  }, materials.length, " Dokument", materials.length !== 1 ? "e" : "", " hochgeladen")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: embedded ? "0 0 14px" : "0 20px 20px"
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    multiple: true,
    accept: ".pdf,.png,.jpg,.jpeg,.txt,.md",
    onChange: handleFileChange,
    style: {
      display: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => fileRef.current?.click(),
    style: {
      width: "100%",
      background: `linear-gradient(135deg, ${t.accent}22, #7C6EFA22)`,
      border: `2px dashed ${t.accent}55`,
      borderRadius: 16,
      padding: embedded ? "14px" : "20px",
      cursor: "pointer",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: embedded ? 20 : 28,
      marginBottom: 6
    }
  }, "\uD83D\uDCCE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: t.text,
      marginBottom: 2
    }
  }, embedded ? `Datei für ${subjectName} hochladen` : "Dateien hochladen"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.textSub
    }
  }, "PDF, Bilder, Notizen \xB7 KI analysiert automatisch"))), materials.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 0",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      marginBottom: 10
    }
  }, "\uD83D\uDCDA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: t.text,
      marginBottom: 4
    }
  }, "Noch keine Materialien"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: t.textSub,
      lineHeight: 1.5
    }
  }, "Lade PDFs, Notizen oder Bilder hoch \u2013", "\n", "die KI erstellt Zusammenfassungen und Karteikarten.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, materials.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    style: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 16,
      padding: "14px 16px",
      cursor: m.status === "done" ? "pointer" : "default",
      opacity: m.status === "error" ? 0.6 : 1
    },
    onClick: () => m.status === "done" && setSelected(m)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      flexShrink: 0,
      background: `${typeColor[m.type] || t.accent}22`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: typeColor[m.type] || t.accent
    }
  }, typeIcon[m.type]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: t.text,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.textSub,
      marginTop: 2
    }
  }, m.subject, " \xB7 ", m.type), m.status === "analyzing" && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.accent,
      marginTop: 6,
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 4,
      background: t.accent,
      animation: "pulse 1s ease infinite"
    }
  }), "KI analysiert\u2026"), m.status === "done" && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#34C7A0",
      marginTop: 4
    }
  }, "\u2713 ", m.topics?.length || 0, " Themen \xB7 ", m.flashcards?.length || 0, " Karten"), m.status === "error" && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#FF6B6B",
      marginTop: 4
    }
  }, "Analyse fehlgeschlagen")), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      deleteMaterial(m.id);
    },
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: t.textMuted,
      padding: 4,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12"
  }))))))));
};
Object.assign(window, {
  MaterialsScreen
});

// ── flashcards-screen.jsx ──────────────────────────
// flashcards-screen.jsx – Just Do
// Anki/Quizlet-inspired full flashcard + quiz engine
// Props: flashcards [{frage, antwort}], materialName, materialId, subjectName, user, theme, onClose

const FlashcardsScreen = ({
  flashcards = [],
  materialName,
  materialId,
  subjectName,
  user,
  theme: t,
  onClose
}) => {
  const [mode, setMode] = useState("select"); // select | cards | quiz | results
  const [quizResults, setQuizResults] = useState(null);
  const progressKey = `justdo_fc_progress_${user?.uid || "guest"}`;
  const loadProgress = () => {
    try {
      return JSON.parse(localStorage.getItem(progressKey) || "{}");
    } catch {
      return {};
    }
  };
  const saveProgress = prog => {
    try {
      localStorage.setItem(progressKey, JSON.stringify(prog));
    } catch (e) {}
    if (window.justDoSync && user?.uid) window.justDoSync(user.uid, progressKey, prog);
  };
  const cardKey = idx => `${materialId}_${idx}`;
  if (!flashcards.length) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: t.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        fontFamily: "'DM Sans',sans-serif"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        marginBottom: 16
      }
    }, "\uD83C\uDCCF"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: t.text,
        marginBottom: 8
      }
    }, "Keine Karteikarten"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: t.textSub,
        textAlign: "center",
        marginBottom: 24
      }
    }, "F\xFCr dieses Material wurden noch keine Karteikarten generiert."), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: {
        background: t.accent,
        border: "none",
        borderRadius: 14,
        color: "#fff",
        fontSize: 14,
        fontWeight: 700,
        padding: "12px 24px",
        cursor: "pointer"
      }
    }, "Zur\xFCck"));
  }

  /* ── MODE SELECT ──────────────────────────────────────── */
  if (mode === "select") {
    const prog = loadProgress();
    const studied = flashcards.filter((_, i) => prog[cardKey(i)]?.timesReviewed > 0).length;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: t.bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans',sans-serif"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 20px 0",
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: {
        background: t.pillBg,
        border: "none",
        borderRadius: 10,
        width: 36,
        height: 36,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: t.text,
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 12H5M12 19l-7-7 7-7"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: t.text
      }
    }, materialName), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: t.textSub
      }
    }, subjectName, " \xB7 ", flashcards.length, " Karten"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 28px",
        gap: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 18,
        padding: 18,
        marginBottom: 28,
        display: "flex",
        gap: 0
      }
    }, [{
      label: "Karten gesamt",
      value: flashcards.length
    }, {
      label: "Gelernt",
      value: studied
    }, {
      label: "Noch offen",
      value: flashcards.length - studied
    }].map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: s.label,
      style: {
        flex: 1,
        textAlign: "center",
        borderRight: i < 2 ? `1px solid ${t.divider}` : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: i === 0 ? t.text : i === 1 ? "#34C7A0" : "#FF6B6B"
      }
    }, s.value), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: t.textSub,
        marginTop: 2
      }
    }, s.label)))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setMode("cards"),
      style: {
        width: "100%",
        background: t.card,
        border: `2px solid ${t.accent}44`,
        borderRadius: 20,
        padding: "20px 20px",
        cursor: "pointer",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 52,
        height: 52,
        borderRadius: 16,
        background: t.accentSub,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        flexShrink: 0
      }
    }, "\uD83C\uDCCF"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: t.text,
        marginBottom: 3
      }
    }, "Karteikarten lernen"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: t.textSub,
        lineHeight: 1.5
      }
    }, "Karte umdrehen \xB7 Sicherheit bewerten \xB7 Spaced Repetition"))), /*#__PURE__*/React.createElement("button", {
      onClick: () => setMode("quiz"),
      style: {
        width: "100%",
        background: t.card,
        border: `2px solid #7C6EFA44`,
        borderRadius: 20,
        padding: "20px 20px",
        cursor: "pointer",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 52,
        height: 52,
        borderRadius: 16,
        background: "#7C6EFA22",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        flexShrink: 0
      }
    }, "\u26A1"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: t.text,
        marginBottom: 3
      }
    }, "Quiz starten"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: t.textSub,
        lineHeight: 1.5
      }
    }, "Multiple Choice \xB7 Sofortfeedback \xB7 Auswertung"))))));
  }

  /* ── RESULTS ─────────────────────────────────────────── */
  if (mode === "results" && quizResults) {
    const {
      correct,
      wrong,
      total,
      wrongCards
    } = quizResults;
    const pct = Math.round(correct / total * 100);
    const grade = pct >= 90 ? "🏆 Ausgezeichnet!" : pct >= 70 ? "✅ Gut gemacht!" : pct >= 50 ? "📈 Weiter so!" : "💪 Nochmal üben!";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: t.bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans',sans-serif"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto",
        padding: "28px 24px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        marginBottom: 28
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 56,
        marginBottom: 12
      }
    }, pct >= 90 ? "🏆" : pct >= 70 ? "🎯" : pct >= 50 ? "📊" : "🔄"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        fontWeight: 800,
        color: t.text,
        marginBottom: 6
      }
    }, grade), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 48,
        fontWeight: 800,
        color: t.accent,
        marginBottom: 4
      }
    }, pct, "%"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: t.textSub
      }
    }, correct, " von ", total, " richtig")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8,
        borderRadius: 8,
        background: t.divider,
        overflow: "hidden",
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: `${pct}%`,
        borderRadius: 8,
        background: `linear-gradient(90deg,${t.accent},#34C7A0)`,
        transition: "width 1s ease"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 24
      }
    }, [{
      label: "Richtig",
      v: correct,
      c: "#34C7A0"
    }, {
      label: "Falsch",
      v: wrong,
      c: "#FF6B6B"
    }, {
      label: "Gesamt",
      v: total,
      c: t.accent
    }].map(s => /*#__PURE__*/React.createElement("div", {
      key: s.label,
      style: {
        flex: 1,
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 14,
        padding: "14px 10px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: s.c
      }
    }, s.v), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: t.textSub,
        marginTop: 2
      }
    }, s.label)))), wrongCards?.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: t.text,
        marginBottom: 10
      }
    }, "Falsch beantwortet"), wrongCards.map((wc, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: t.card,
        border: `1px solid #FF6B6B33`,
        borderRadius: 14,
        padding: "12px 14px",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#FF6B6B",
        fontWeight: 600,
        marginBottom: 4
      }
    }, "Frage"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: t.text,
        marginBottom: 6
      }
    }, wc.frage), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#34C7A0",
        fontWeight: 600,
        marginBottom: 2
      }
    }, "Richtige Antwort"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: t.text
      }
    }, wc.antwort))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 24px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setMode("quiz");
        setQuizResults(null);
      },
      style: {
        width: "100%",
        background: `linear-gradient(135deg,${t.accent},#7C6EFA)`,
        border: "none",
        borderRadius: 14,
        color: "#fff",
        fontSize: 15,
        fontWeight: 700,
        padding: "14px",
        cursor: "pointer"
      }
    }, "Nochmal versuchen"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setMode("select");
        setQuizResults(null);
      },
      style: {
        width: "100%",
        background: t.card,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: 14,
        color: t.text,
        fontSize: 14,
        fontWeight: 600,
        padding: "13px",
        cursor: "pointer"
      }
    }, "Zur\xFCck zur Auswahl")));
  }

  /* ── CARD MODE ────────────────────────────────────────── */
  if (mode === "cards") return /*#__PURE__*/React.createElement(CardMode, {
    flashcards: flashcards,
    theme: t,
    cardKey: cardKey,
    loadProgress: loadProgress,
    saveProgress: saveProgress,
    onBack: () => setMode("select"),
    materialName: materialName
  });

  /* ── QUIZ MODE ────────────────────────────────────────── */
  if (mode === "quiz") return /*#__PURE__*/React.createElement(QuizMode, {
    flashcards: flashcards,
    theme: t,
    cardKey: cardKey,
    loadProgress: loadProgress,
    saveProgress: saveProgress,
    onBack: () => setMode("select"),
    onDone: results => {
      setQuizResults(results);
      setMode("results");
    },
    materialName: materialName
  });
  return null;
};

/* ── CARD MODE COMPONENT ──────────────────────────────── */
const CardMode = ({
  flashcards,
  theme: t,
  cardKey,
  loadProgress,
  saveProgress,
  onBack,
  materialName
}) => {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [done, setDone] = useState(false);
  const card = flashcards[idx];
  const total = flashcards.length;
  const rate = level => {
    const prog = loadProgress();
    const k = cardKey(idx);
    const existing = prog[k] || {
      timesReviewed: 0,
      correctCount: 0,
      wrongCount: 0
    };
    prog[k] = {
      ...existing,
      frage: card.frage,
      antwort: card.antwort,
      confidenceLevel: level,
      lastReviewedAt: new Date().toISOString(),
      timesReviewed: existing.timesReviewed + 1,
      correctCount: existing.correctCount + (level >= 2 ? 1 : 0),
      wrongCount: existing.wrongCount + (level < 2 ? 1 : 0)
    };
    saveProgress(prog);
    if (idx < total - 1) {
      setIdx(i => i + 1);
      setFlipped(false);
      setShowRating(false);
    } else setDone(true);
  };
  if (done) return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: t.bg,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
      fontFamily: "'DM Sans',sans-serif",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 56
    }
  }, "\uD83C\uDF89"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: t.text,
      textAlign: "center"
    }
  }, "Alle Karten gelernt!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: t.textSub,
      textAlign: "center"
    }
  }, "Du hast alle ", total, " Karten durchgearbeitet."), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setIdx(0);
      setFlipped(false);
      setShowRating(false);
      setDone(false);
    },
    style: {
      background: t.accent,
      border: "none",
      borderRadius: 14,
      color: "#fff",
      fontSize: 15,
      fontWeight: 700,
      padding: "14px 32px",
      cursor: "pointer",
      marginTop: 8
    }
  }, "Nochmal"), /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 14,
      color: t.text,
      fontSize: 14,
      fontWeight: 600,
      padding: "12px 28px",
      cursor: "pointer"
    }
  }, "Zur \xDCbersicht"));
  const ratings = [{
    level: 0,
    label: "Nochmal",
    color: "#FF6B6B",
    bg: "#FF6B6B22"
  }, {
    level: 1,
    label: "Unsicher",
    color: "#FFB347",
    bg: "#FFB34722"
  }, {
    level: 2,
    label: "Sicher",
    color: "#4A7CFF",
    bg: t.accentSub
  }, {
    level: 3,
    label: "Perfekt",
    color: "#34C7A0",
    bg: "#34C7A022"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: t.bg,
      display: "flex",
      flexDirection: "column",
      fontFamily: "'DM Sans',sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 0",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: t.pillBg,
      border: "none",
      borderRadius: 10,
      width: 34,
      height: 34,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t.text,
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5M12 19l-7-7 7-7"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 4,
      borderRadius: 4,
      background: t.divider,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${(idx + 1) / total * 100}%`,
      background: `linear-gradient(90deg,${t.accent},#7C6EFA)`,
      borderRadius: 4,
      transition: "width 0.4s ease"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: t.textSub,
      flexShrink: 0
    }
  }, idx + 1, "/", total)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px 24px",
      perspective: 1200
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      if (!showRating) {
        setFlipped(f => !f);
        if (!flipped) setShowRating(true);
      }
    },
    style: {
      width: "100%",
      maxWidth: 340,
      minHeight: 220,
      position: "relative",
      cursor: showRating ? "default" : "pointer",
      transformStyle: "preserve-3d",
      transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      transition: "transform 0.5s cubic-bezier(0.4,0.2,0.2,1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 24,
      padding: 28,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 20px 60px rgba(0,0,0,${t.bg === "#09090E" ? 0.5 : 0.12})`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: t.accent,
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 16
    }
  }, "Frage"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: t.text,
      textAlign: "center",
      lineHeight: 1.5
    }
  }, card.frage), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      fontSize: 11,
      color: t.textMuted,
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
  })), "Tippen zum Umdrehen")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
      transform: "rotateY(180deg)",
      background: `linear-gradient(145deg, ${t.card}, ${t.surface})`,
      border: `1px solid ${t.accent}44`,
      borderRadius: 24,
      padding: 28,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 20px 60px rgba(0,0,0,${t.bg === "#09090E" ? 0.5 : 0.12})`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#34C7A0",
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 16
    }
  }, "Antwort"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      color: t.text,
      textAlign: "center",
      lineHeight: 1.6
    }
  }, card.antwort)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px 36px"
    }
  }, showRating ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: t.textSub,
      textAlign: "center",
      marginBottom: 12,
      fontWeight: 500
    }
  }, "Wie sicher warst du?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, ratings.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.level,
    onClick: () => rate(r.level),
    style: {
      border: `1.5px solid ${r.color}44`,
      background: r.bg,
      borderRadius: 14,
      padding: "12px",
      cursor: "pointer",
      color: r.color,
      fontSize: 13,
      fontWeight: 700,
      transition: "all 0.15s"
    }
  }, r.label)))) : /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setFlipped(true);
      setShowRating(true);
    },
    style: {
      width: "100%",
      background: `linear-gradient(135deg,${t.accent},#7C6EFA)`,
      border: "none",
      borderRadius: 16,
      color: "#fff",
      fontSize: 15,
      fontWeight: 700,
      padding: "15px",
      cursor: "pointer"
    }
  }, "Antwort zeigen")));
};

/* ── QUIZ MODE COMPONENT ──────────────────────────────── */
const QuizMode = ({
  flashcards,
  theme: t,
  cardKey,
  loadProgress,
  saveProgress,
  onBack,
  onDone,
  materialName
}) => {
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  const buildOptions = (correct, all) => {
    const distractors = shuffle(all.filter(c => c.antwort !== correct.antwort)).slice(0, 3).map(c => c.antwort);
    return shuffle([correct.antwort, ...distractors]);
  };
  const [questions] = useState(() => shuffle(flashcards).map(card => ({
    ...card,
    options: buildOptions(card, flashcards)
  })));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongCards, setWrongCards] = useState([]);
  const q = questions[idx];
  const total = questions.length;
  const isCorrect = selected === q?.antwort;
  const pick = opt => {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    const correct = opt === q.antwort;
    if (correct) setScore(s => s + 1);else setWrongCards(w => [...w, q]);
    // Save to progress
    const prog = loadProgress();
    const k = cardKey(idx);
    const ex = prog[k] || {
      timesReviewed: 0,
      correctCount: 0,
      wrongCount: 0
    };
    prog[k] = {
      ...ex,
      frage: q.frage,
      antwort: q.antwort,
      lastReviewedAt: new Date().toISOString(),
      timesReviewed: ex.timesReviewed + 1,
      correctCount: ex.correctCount + (correct ? 1 : 0),
      wrongCount: ex.wrongCount + (correct ? 0 : 1),
      confidenceLevel: correct ? 2 : 0
    };
    saveProgress(prog);
  };
  const next = () => {
    if (idx < total - 1) {
      setIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
    } else onDone({
      correct: score + (isCorrect ? 0 : 0),
      wrong: wrongCards.length,
      total,
      wrongCards
    });
  };

  // Fix score timing issue
  const finalScore = score + (answered && isCorrect && idx === total - 1 ? 0 : 0);
  const optColor = opt => {
    if (!answered) return {
      bg: t.card,
      border: t.cardBorder,
      color: t.text
    };
    if (opt === q.antwort) return {
      bg: "#34C7A022",
      border: "#34C7A0",
      color: "#34C7A0"
    };
    if (opt === selected && !isCorrect) return {
      bg: "#FF6B6B22",
      border: "#FF6B6B",
      color: "#FF6B6B"
    };
    return {
      bg: t.card,
      border: t.cardBorder,
      color: t.textSub
    };
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: t.bg,
      display: "flex",
      flexDirection: "column",
      fontFamily: "'DM Sans',sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 0",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: t.pillBg,
      border: "none",
      borderRadius: 10,
      width: 34,
      height: 34,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t.text,
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5M12 19l-7-7 7-7"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 4,
      borderRadius: 4,
      background: t.divider,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${(idx + 1) / total * 100}%`,
      background: `linear-gradient(90deg,#7C6EFA,${t.accent})`,
      borderRadius: 4,
      transition: "width 0.4s ease"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: t.textSub,
      flexShrink: 0
    }
  }, idx + 1, "/", total)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "20px 20px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.accentSub,
      borderRadius: 10,
      padding: "5px 14px",
      fontSize: 12,
      fontWeight: 700,
      color: t.accent
    }
  }, score, " richtig \xB7 ", idx - score - (answered && !isCorrect ? 1 : 0) < 0 ? 0 : idx - score - (answered && !isCorrect ? 1 : 0), " falsch")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 20,
      padding: 22,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: "#7C6EFA",
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 10
    }
  }, "Frage ", idx + 1), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: t.text,
      lineHeight: 1.5
    }
  }, q?.frage)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 16
    }
  }, q?.options.map((opt, i) => {
    const c = optColor(opt);
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => pick(opt),
      style: {
        width: "100%",
        background: c.bg,
        border: `2px solid ${c.border}`,
        borderRadius: 16,
        padding: "14px 16px",
        cursor: answered ? "default" : "pointer",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 12,
        transition: "all 0.2s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 28,
        height: 28,
        borderRadius: 8,
        flexShrink: 0,
        background: answered && opt === q.antwort ? "#34C7A0" : answered && opt === selected && !isCorrect ? "#FF6B6B" : t.pillBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 800,
        color: answered && (opt === q.antwort || opt === selected && !isCorrect) ? "#fff" : t.textSub,
        transition: "all 0.2s"
      }
    }, answered && opt === q.antwort ? "✓" : answered && opt === selected && !isCorrect ? "✗" : String.fromCharCode(65 + i)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: c.color,
        lineHeight: 1.4
      }
    }, opt));
  })), answered && /*#__PURE__*/React.createElement("div", {
    style: {
      background: isCorrect ? "#34C7A022" : "#FF6B6B22",
      border: `1px solid ${isCorrect ? "#34C7A044" : "#FF6B6B44"}`,
      borderRadius: 14,
      padding: "12px 16px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: isCorrect ? "#34C7A0" : "#FF6B6B",
      marginBottom: isCorrect ? 0 : 4
    }
  }, isCorrect ? "✓ Richtig!" : "✗ Falsch"), !isCorrect && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: t.text
    }
  }, "Richtige Antwort: ", /*#__PURE__*/React.createElement("strong", null, q.antwort)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px 36px"
    }
  }, answered ? /*#__PURE__*/React.createElement("button", {
    onClick: next,
    style: {
      width: "100%",
      background: `linear-gradient(135deg,${t.accent},#7C6EFA)`,
      border: "none",
      borderRadius: 16,
      color: "#fff",
      fontSize: 15,
      fontWeight: 700,
      padding: "15px",
      cursor: "pointer"
    }
  }, idx < total - 1 ? "Nächste Frage →" : "Auswertung anzeigen 🏁") : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50,
      borderRadius: 16,
      background: t.pillBg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: t.textMuted
    }
  }, "Antwort ausw\xE4hlen"))));
};
Object.assign(window, {
  FlashcardsScreen,
  CardMode,
  QuizMode
});

// ── exams-notifications.jsx ──────────────────────────
// exams-notifications.jsx – Just Do
// Prüfungsverwaltung + Browser Notifications + Smart Reminders
// ─────────────────────────────────────────────────────────
// Browser Notification API: funktioniert während Tab offen ist.
// Echte Push Notifications (Tab geschlossen): benötigt Service Worker + Push API + Backend.
// ─────────────────────────────────────────────────────────

/* ── HELPERS ──────────────────────────────────────────── */
const REMINDER_TYPES = [{
  id: "7d",
  label: "7 Tage vorher",
  offsetDays: 7,
  icon: "📅"
}, {
  id: "3d",
  label: "3 Tage vorher",
  offsetDays: 3,
  icon: "⏰"
}, {
  id: "1d",
  label: "1 Tag vorher",
  offsetDays: 1,
  icon: "🔔"
}, {
  id: "day",
  label: "Am Prüfungstag",
  offsetDays: 0,
  icon: "🚨"
}, {
  id: "1h",
  label: "1 Stunde vorher",
  offsetDays: 0,
  offsetHours: 1,
  icon: "⚡"
}];
const calcDaysLeft = dateStr => {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
const formatDate = dateStr => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};
const getStudyScore = (subjectId, userId) => {
  // Returns 0-1 score based on flashcard progress for this subject
  try {
    const prog = lsGetEx(`justdo_fc_progress_${userId || "guest"}`, {});
    const keys = Object.keys(prog).filter(k => k.startsWith(`${subjectId}_`));
    if (!keys.length) return 0;
    const total = keys.reduce((s, k) => s + (prog[k].timesReviewed || 0), 0);
    const correct = keys.reduce((s, k) => s + (prog[k].correctCount || 0), 0);
    return total ? correct / total : 0;
  } catch {
    return 0;
  }
};
const suggestReminders = (exam, userId) => {
  const daysLeft = calcDaysLeft(exam.date);
  const score = getStudyScore(exam.subjectId, userId);
  const lowProgress = score < 0.4;
  const suggested = [];
  if (daysLeft > 7) suggested.push("7d");
  if (daysLeft > 3) suggested.push("3d");
  if (daysLeft > 1) suggested.push("1d");
  if (daysLeft >= 0) suggested.push("day", "1h");
  // Smart: add extra if low progress
  const priority = lowProgress && daysLeft > 3 ? ["3d", "1d"] : [];
  return {
    suggested,
    priority,
    score,
    lowProgress
  };
};

/* ── useExams HOOK ────────────────────────────────────── */
function useExams(userId) {
  const key = `justdo_exams_${userId || "guest"}`;
  const [exams, setExams] = useState(() => lsGetEx(key, []));
  const save = list => {
    setExams(list);
    lsSetEx(key, list);
    if (window.justDoSync) window.justDoSync(userId, key, list);
  };
  const add = ex => save([...exams, {
    ...ex,
    id: Date.now(),
    createdAt: new Date().toISOString()
  }]);
  const update = (id, patch) => save(exams.map(e => e.id === id ? {
    ...e,
    ...patch
  } : e));
  const remove = id => save(exams.filter(e => e.id !== id));
  return {
    exams,
    add,
    update,
    remove
  };
}

/* ── useNotifications HOOK ────────────────────────────── */
function useNotifications(userId, exams) {
  const logKey = `justdo_notif_log_${userId || "guest"}`;
  const timersRef = React.useRef([]);
  const getLog = () => lsGetEx(logKey, []);
  const wasSent = (examId, type) => getLog().some(e => e.examId === examId && e.type === type);
  const markSent = (examId, type) => lsSetEx(logKey, [...getLog(), {
    examId,
    type,
    sentAt: new Date().toISOString()
  }]);
  const requestPermission = async () => {
    if (!("Notification" in window)) return "unsupported";
    if (Notification.permission === "granted") return "granted";
    return await Notification.requestPermission();
  };
  const sendNotification = (title, body, icon = "🎓") => {
    if (Notification.permission === "granted") {
      new Notification(`${icon} ${title}`, {
        body,
        icon: "/favicon.ico",
        tag: "justdo-exam"
      });
    }
  };
  const scheduleReminders = React.useCallback(() => {
    // Clear old timers
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
    if (Notification.permission !== "granted") return;
    exams.forEach(exam => {
      const examDate = new Date(`${exam.date}T${exam.time || "09:00"}`);
      (exam.reminders || []).filter(r => r.enabled).forEach(r => {
        const rt = REMINDER_TYPES.find(t => t.id === r.id);
        if (!rt) return;
        const fireAt = new Date(examDate);
        if (rt.offsetDays) fireAt.setDate(fireAt.getDate() - rt.offsetDays);
        if (rt.offsetHours) fireAt.setHours(fireAt.getHours() - rt.offsetHours);
        const delay = fireAt - Date.now();
        if (delay <= 0) return; // already past
        if (wasSent(exam.id, r.id)) return; // already sent this session
        const timer = setTimeout(() => {
          const score = getStudyScore(exam.subjectId, userId);
          const tip = score < 0.4 ? ` Dein Lernfortschritt ist noch gering – jetzt üben!` : "";
          sendNotification(`${exam.subjectName}: ${exam.name}`, `${rt.label} – ${formatDate(exam.date)} um ${exam.time || "09:00"}.${tip}`, rt.icon);
          markSent(exam.id, r.id);
        }, delay);
        timersRef.current.push(timer);
      });
    });
  }, [exams, userId]);
  useEffect(() => {
    scheduleReminders();
    return () => timersRef.current.forEach(t => clearTimeout(t));
  }, [scheduleReminders]);
  return {
    requestPermission,
    sendNotification
  };
}

/* ── NOTIFICATION BELL ────────────────────────────────── */
window.NotificationBell = function NotificationBell({
  exams,
  theme: t,
  onOpenExams
}) {
  const [open, setOpen] = useState(false);
  const now = new Date();
  const upcoming = exams.map(e => ({
    ...e,
    daysLeft: calcDaysLeft(e.date)
  })).filter(e => e.daysLeft >= 0).sort((a, b) => a.daysLeft - b.daysLeft).slice(0, 5);
  const urgent = upcoming.filter(e => e.daysLeft <= 3).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      width: 36,
      height: 36,
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      background: t.pillBg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: urgent > 0 ? "#FF6B6B" : t.textSub,
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
  })), urgent > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 4,
      right: 4,
      width: 8,
      height: 8,
      borderRadius: 4,
      background: "#FF6B6B",
      boxShadow: `0 0 0 2px ${t.bg}`
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 44,
      right: 0,
      width: 260,
      zIndex: 300,
      background: t.surface,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 18,
      boxShadow: `0 20px 60px rgba(0,0,0,0.3)`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 16px 10px",
      borderBottom: `1px solid ${t.divider}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: t.text
    }
  }, "Pr\xFCfungs-Reminder"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setOpen(false);
      onOpenExams();
    },
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 11,
      color: t.accent,
      fontWeight: 600
    }
  }, "Verwalten")), upcoming.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 16px",
      textAlign: "center",
      fontSize: 12,
      color: t.textSub
    }
  }, "Keine bevorstehenden Pr\xFCfungen") : upcoming.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.id,
    style: {
      padding: "10px 16px",
      borderBottom: `1px solid ${t.divider}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 4,
      background: e.subjectColor || t.accent,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: t.text,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, e.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: t.textSub
    }
  }, e.subjectName, " \xB7 ", formatDate(e.date))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      flexShrink: 0,
      color: e.daysLeft <= 1 ? "#FF6B6B" : e.daysLeft <= 3 ? "#FFB347" : t.accent,
      background: e.daysLeft <= 1 ? "#FF6B6B22" : e.daysLeft <= 3 ? "#FFB34722" : t.accentSub,
      borderRadius: 6,
      padding: "2px 6px"
    }
  }, e.daysLeft === 0 ? "Heute" : `${e.daysLeft}d`)))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(false),
    style: {
      width: "100%",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "10px",
      fontSize: 11,
      color: t.textMuted
    }
  }, "Schlie\xDFen")));
};

/* ── UPCOMING EXAMS CARD (for Dashboard) ──────────────── */
window.UpcomingExamsCard = function UpcomingExamsCard({
  exams,
  theme: t,
  onOpenExams
}) {
  const sorted = exams.map(e => ({
    ...e,
    daysLeft: calcDaysLeft(e.date)
  })).filter(e => e.daysLeft >= 0).sort((a, b) => a.daysLeft - b.daysLeft).slice(0, 3);
  if (!sorted.length) return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: t.text
    }
  }, "Pr\xFCfungen"), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenExams,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 12,
      color: t.accent,
      fontWeight: 600
    }
  }, "+ Hinzuf\xFCgen")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 16,
      padding: "16px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.textSub
    }
  }, "Keine Pr\xFCfungen eingetragen"), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenExams,
    style: {
      marginTop: 8,
      background: t.accentSub,
      border: "none",
      borderRadius: 8,
      color: t.accent,
      fontSize: 12,
      fontWeight: 600,
      padding: "6px 14px",
      cursor: "pointer"
    }
  }, "Pr\xFCfung hinzuf\xFCgen")));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: t.text
    }
  }, "N\xE4chste Pr\xFCfungen"), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenExams,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 12,
      color: t.accent,
      fontWeight: 600
    }
  }, "Alle \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, sorted.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.id,
    style: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 16,
      padding: "12px 14px",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: `${e.subjectColor || t.accent}22`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: e.daysLeft <= 3 ? "#FF6B6B" : e.subjectColor || t.accent
    }
  }, e.daysLeft === 0 ? "!" : `${e.daysLeft}`), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: t.textSub,
      fontWeight: 600
    }
  }, e.daysLeft === 0 ? "HEUTE" : "TAGE")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: t.text,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, e.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.textSub,
      marginTop: 1
    }
  }, e.subjectName, e.location ? ` · ${e.location}` : "", " \xB7 ", e.time || "09:00"))))));
};

/* ── EXAMS MANAGER ────────────────────────────────────── */
window.ExamsManager = function ExamsManager({
  theme: t,
  user,
  onClose
}) {
  const {
    exams,
    add,
    update,
    remove
  } = useExams(user?.uid);
  const {
    requestPermission
  } = useNotifications(user?.uid, exams);
  const [view, setView] = useState("list"); // list | add | detail
  const [editing, setEditing] = useState(null);
  const [notifPerm, setNotifPerm] = useState(typeof Notification !== "undefined" ? Notification.permission : "unsupported");

  // Form state
  const blank = {
    name: "",
    subjectName: "",
    subjectColor: "#4A7CFF",
    date: "",
    time: "09:00",
    location: "",
    reminders: REMINDER_TYPES.map(r => ({
      id: r.id,
      enabled: r.id === "1d" || r.id === "day"
    }))
  };
  const [form, setForm] = useState(blank);
  const setF = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const COLORS = ["#4A7CFF", "#7C6EFA", "#34C7A0", "#FF6B6B", "#FFB347", "#A855F7", "#06B6D4", "#EC4899"];
  const askPermission = async () => {
    const result = await requestPermission();
    setNotifPerm(result);
    if (result === "granted") {
      new Notification("🎓 Just Do", {
        body: "Prüfungs-Benachrichtigungen aktiviert!"
      });
    }
  };
  const handleSave = () => {
    if (!form.name.trim() || !form.date) return;
    const suggestion = suggestReminders({
      ...form,
      subjectId: 0
    }, user?.uid);
    if (editing) {
      update(editing.id, {
        ...form
      });
    } else {
      add({
        ...form,
        reminders: form.reminders
      });
    }
    setView("list");
    setForm(blank);
    setEditing(null);
  };
  const openEdit = exam => {
    setEditing(exam);
    setForm({
      ...blank,
      ...exam
    });
    setView("add");
  };
  const toggleReminder = rid => {
    setF("reminders", form.reminders.map(r => r.id === rid ? {
      ...r,
      enabled: !r.enabled
    } : r));
  };

  /* LIST VIEW */
  if (view === "list") {
    const sorted = [...exams].map(e => ({
      ...e,
      daysLeft: calcDaysLeft(e.date)
    })).sort((a, b) => (a.daysLeft || 999) - (b.daysLeft || 999));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: t.bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans',sans-serif",
        zIndex: 200
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 20px 0",
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: {
        background: t.pillBg,
        border: "none",
        borderRadius: 10,
        width: 36,
        height: 36,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: t.text,
      strokeWidth: "2",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 12H5M12 19l-7-7 7-7"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 18,
        fontWeight: 800,
        color: t.text
      }
    }, "Pr\xFCfungen"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setEditing(null);
        setForm(blank);
        setView("add");
      },
      style: {
        background: t.accent,
        border: "none",
        borderRadius: 10,
        color: "#fff",
        fontSize: 13,
        fontWeight: 700,
        padding: "7px 14px",
        cursor: "pointer"
      }
    }, "+ Neu")), notifPerm !== "granted" && /*#__PURE__*/React.createElement("div", {
      style: {
        margin: "16px 20px 0",
        background: t.accentSub,
        border: `1px solid ${t.accent}44`,
        borderRadius: 14,
        padding: "12px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: t.accent,
        marginBottom: 4
      }
    }, "\uD83D\uDD14 Benachrichtigungen aktivieren"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: t.textSub,
        marginBottom: 10,
        lineHeight: 1.5
      }
    }, notifPerm === "denied" ? "Benachrichtigungen wurden blockiert. Bitte in den Browser-Einstellungen erlauben." : "Aktiviere Benachrichtigungen für automatische Prüfungs-Erinnerungen."), notifPerm !== "denied" && /*#__PURE__*/React.createElement("button", {
      onClick: askPermission,
      style: {
        background: t.accent,
        border: "none",
        borderRadius: 8,
        color: "#fff",
        fontSize: 12,
        fontWeight: 700,
        padding: "7px 14px",
        cursor: "pointer"
      }
    }, "Jetzt aktivieren")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: "auto",
        padding: "16px 20px 90px"
      }
    }, sorted.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "48px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        marginBottom: 12
      }
    }, "\uD83D\uDCC5"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: t.text,
        marginBottom: 6
      }
    }, "Keine Pr\xFCfungen"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: t.textSub
      }
    }, "F\xFCge deine erste Pr\xFCfung hinzu, um smarte Erinnerungen zu erhalten.")) : sorted.map(e => {
      const smart = suggestReminders(e, user?.uid);
      return /*#__PURE__*/React.createElement("div", {
        key: e.id,
        style: {
          background: t.card,
          border: `1px solid ${t.cardBorder}`,
          borderRadius: 18,
          padding: 16,
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${e.subjectColor || t.accent}22`,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 800,
          color: e.subjectColor || t.accent
        }
      }, e.daysLeft === 0 ? "!" : e.daysLeft), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 7,
          color: t.textSub,
          fontWeight: 700,
          letterSpacing: 0.5,
          textTransform: "uppercase"
        }
      }, e.daysLeft === 0 ? "Heute" : "Tage")), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: t.text
        }
      }, e.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: t.textSub,
          marginTop: 2
        }
      }, e.subjectName, " \xB7 ", formatDate(e.date), " \xB7 ", e.time || "09:00"), e.location && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: t.textSub
        }
      }, "\uD83D\uDCCD ", e.location)), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => openEdit(e),
        style: {
          background: t.pillBg,
          border: "none",
          borderRadius: 8,
          width: 30,
          height: 30,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement("svg", {
        width: "13",
        height: "13",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: t.textSub,
        strokeWidth: "2",
        strokeLinecap: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
      }))), /*#__PURE__*/React.createElement("button", {
        onClick: () => remove(e.id),
        style: {
          background: "#FF6B6B22",
          border: "none",
          borderRadius: 8,
          width: 30,
          height: 30,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement("svg", {
        width: "13",
        height: "13",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "#FF6B6B",
        strokeWidth: "2",
        strokeLinecap: "round"
      }, /*#__PURE__*/React.createElement("polyline", {
        points: "3 6 5 6 21 6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M19 6l-1 14H6L5 6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M10 11v6M14 11v6"
      }))))), smart.lowProgress && /*#__PURE__*/React.createElement("div", {
        style: {
          background: "#FFB34722",
          border: "1px solid #FFB34744",
          borderRadius: 10,
          padding: "6px 10px",
          fontSize: 11,
          color: "#FFB347",
          fontWeight: 600
        }
      }, "\u26A1 Wenig Lernfortschritt \u2013 mehr Erinnerungen empfohlen"), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 10,
          display: "flex",
          flexWrap: "wrap",
          gap: 6
        }
      }, (e.reminders || []).filter(r => r.enabled).map(r => {
        const rt = REMINDER_TYPES.find(x => x.id === r.id);
        return rt ? /*#__PURE__*/React.createElement("span", {
          key: r.id,
          style: {
            background: t.accentSub,
            color: t.accent,
            borderRadius: 8,
            padding: "3px 8px",
            fontSize: 10,
            fontWeight: 600
          }
        }, rt.icon, " ", rt.label) : null;
      })));
    })));
  }

  /* ADD / EDIT VIEW */
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: t.bg,
      display: "flex",
      flexDirection: "column",
      fontFamily: "'DM Sans',sans-serif",
      zIndex: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 20px 0",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setView("list");
      setForm(blank);
      setEditing(null);
    },
    style: {
      background: t.pillBg,
      border: "none",
      borderRadius: 10,
      width: 36,
      height: 36,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t.text,
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5M12 19l-7-7 7-7"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 17,
      fontWeight: 800,
      color: t.text
    }
  }, editing ? "Prüfung bearbeiten" : "Neue Prüfung")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: t.textSub,
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Name der Pr\xFCfung"), /*#__PURE__*/React.createElement("input", {
    value: form.name,
    onChange: e => setF("name", e.target.value),
    placeholder: "z.B. Klausur Analysis I",
    style: {
      width: "100%",
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 12,
      padding: "12px 14px",
      fontSize: 14,
      color: t.text,
      outline: "none",
      fontFamily: "inherit"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: t.textSub,
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Fach / Modul"), /*#__PURE__*/React.createElement("input", {
    value: form.subjectName,
    onChange: e => setF("subjectName", e.target.value),
    placeholder: "z.B. Mathematik II",
    style: {
      width: "100%",
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 12,
      padding: "12px 14px",
      fontSize: 14,
      color: t.text,
      outline: "none",
      fontFamily: "inherit"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: t.textSub,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Farbe"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    }
  }, COLORS.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setF("subjectColor", c),
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      background: c,
      border: `3px solid ${form.subjectColor === c ? t.text : "transparent"}`,
      cursor: "pointer",
      transition: "border 0.15s"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: t.textSub,
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Datum"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.date,
    onChange: e => setF("date", e.target.value),
    style: {
      width: "100%",
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 12,
      padding: "12px 14px",
      fontSize: 14,
      color: t.text,
      outline: "none",
      fontFamily: "inherit"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: t.textSub,
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Uhrzeit"), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: form.time,
    onChange: e => setF("time", e.target.value),
    style: {
      width: "100%",
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 12,
      padding: "12px 14px",
      fontSize: 14,
      color: t.text,
      outline: "none",
      fontFamily: "inherit"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: t.textSub,
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Ort (optional)"), /*#__PURE__*/React.createElement("input", {
    value: form.location,
    onChange: e => setF("location", e.target.value),
    placeholder: "z.B. H\xF6rsaal A, Raum 201",
    style: {
      width: "100%",
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 12,
      padding: "12px 14px",
      fontSize: 14,
      color: t.text,
      outline: "none",
      fontFamily: "inherit"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: t.textSub,
      marginBottom: 10,
      textTransform: "uppercase",
      letterSpacing: 0.5
    }
  }, "Erinnerungen"), REMINDER_TYPES.map(rt => {
    const r = form.reminders.find(x => x.id === rt.id) || {
      id: rt.id,
      enabled: false
    };
    return /*#__PURE__*/React.createElement("div", {
      key: rt.id,
      onClick: () => toggleReminder(rt.id),
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: t.card,
        border: `1px solid ${r.enabled ? t.accent + "44" : t.cardBorder}`,
        borderRadius: 12,
        padding: "12px 14px",
        marginBottom: 8,
        cursor: "pointer",
        transition: "border 0.15s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, rt.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: t.text
      }
    }, rt.label)), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 22,
        borderRadius: 11,
        transition: "background 0.2s",
        background: r.enabled ? t.accent : t.pillBg,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 3,
        left: r.enabled ? 20 : 3,
        width: 16,
        height: 16,
        borderRadius: 8,
        background: "#fff",
        transition: "left 0.2s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
      }
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px 36px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleSave,
    disabled: !form.name.trim() || !form.date,
    style: {
      width: "100%",
      background: form.name.trim() && form.date ? `linear-gradient(135deg,${t.accent},#7C6EFA)` : t.pillBg,
      border: "none",
      borderRadius: 16,
      color: form.name.trim() && form.date ? "#fff" : t.textMuted,
      fontSize: 15,
      fontWeight: 700,
      padding: "15px",
      cursor: "pointer",
      transition: "all 0.2s"
    }
  }, editing ? "Änderungen speichern" : "Prüfung hinzufügen")));
};

// ── main-app (inline) ──────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showBothVariants": false,
  "activeVariant": "dark"
} /*EDITMODE-END*/;

/* ── Helpers ─────────────────────────────────────────── */

/* ── Phone Frame Wrapper ──────────────────────────────── */
function PhoneApp({
  variant,
  user,
  onLogin,
  onLogout,
  onOnboarded
}) {
  const themeKey = lsGet("justdo_theme", variant);
  const isDark = themeKey === "dark" || themeKey !== "light" && variant === "dark";
  // Re-check onboarding status on every render (user._ts changes after onboarding)
  const needsOnboarding = user && !lsGet(`justdo_onboarded_${user.uid}`, false);
  const ua = navigator.userAgent;
  const isIpad = /iPad/.test(ua) || /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  const isIphone = /iPhone/.test(ua);
  const isMobile = isIpad || isIphone || /Android/.test(ua);
  const content = !user ? /*#__PURE__*/React.createElement(AuthScreen, {
    themeKey: variant,
    onLogin: onLogin
  }) : needsOnboarding ? /*#__PURE__*/React.createElement(OnboardingScreen, {
    user: user,
    themeKey: variant,
    onComplete: profile => {
      // Ensure flag is set before triggering re-render
      try {
        localStorage.setItem(`justdo_onboarded_${user.uid}`, JSON.stringify("1"));
      } catch (e) {}
      onOnboarded(profile);
    }
  }) : /*#__PURE__*/React.createElement(JustDoApp, {
    initialTheme: variant,
    user: user,
    onLogout: onLogout
  });

  // iPad: full screen, no device frame
  if (isIpad) return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      overflow: "hidden",
      background: isDark ? "#09090E" : "#EFF1FA"
    }
  }, content);

  // iPhone: full screen, no device frame
  if (isIphone || /Android/.test(ua)) return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      overflow: "hidden"
    }
  }, content);

  // Desktop: show iOS device frame
  return /*#__PURE__*/React.createElement(IOSDevice, {
    statusBarStyle: isDark ? "light" : "dark"
  }, content);
}

/* ── Root ─────────────────────────────────────────────── */
function Root() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [user, setUser] = useState(() => lsGet("justdo_user", null));
  const [fbChecked, setFbChecked] = useState(false);

  // Detect if running inside the design sandbox iframe
  const inSandbox = window.self !== window.top;
  useEffect(() => {
    document.body.style.background = "#09090E";
    document.body.style.display = "block";
    document.body.style.padding = "0";
  }, []);
  const dbg = msg => {
    console.log(msg);
    const el = document.getElementById('debug-log');
    if (el) el.textContent += msg + '\n';
  };
  useEffect(() => {
    dbg('App starting...');
    dbg('FB: ' + (window.FB ? 'ok' : 'missing'));
    if (!window.FB?.onAuthStateChanged) {
      dbg('No FB auth, setting fbChecked');
      setFbChecked(true);
      return;
    }
    dbg('Waiting for auth state...');
    const unsub = window.FB.onAuthStateChanged(async fbUser => {
      try {
        dbg('Auth state: ' + (fbUser ? fbUser.email : 'null'));
        if (fbUser) {
          const nameParts = (fbUser.displayName || "").split(" ");
          const u = {
            name: fbUser.displayName || fbUser.email,
            email: fbUser.email,
            avatar: nameParts.map(w => w[0] || "").join("").toUpperCase().slice(0, 2) || "JD",
            picture: fbUser.photoURL || null,
            provider: "google",
            uid: fbUser.uid,
            joinedAt: new Date().toISOString()
          };
          try {
            await window.FB.hydrateFromCloud(fbUser.uid);
            dbg('Hydrated');
          } catch (e) {
            dbg('Hydrate err: ' + e.message);
          }
          lsSet("justdo_user", u);
          setUser(u);
          dbg('User set: ' + u.name);
        }
      } catch (e) {
        dbg('Error: ' + e.message);
      } finally {
        dbg('fbChecked = true');
        setFbChecked(true);
      }
    });
    return () => unsub();
  }, []);
  useEffect(() => {
    if (!inSandbox) return;
    const handler = e => {
      if (e.data?.type === '__activate_edit_mode') {
        const el = document.getElementById('tweaks-root');
        if (el) el.style.display = 'block';
      }
      if (e.data?.type === '__deactivate_edit_mode') {
        const el = document.getElementById('tweaks-root');
        if (el) el.style.display = 'none';
      }
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', handler);
  }, [inSandbox]);
  const handleLogin = u => {
    lsSet("justdo_user", u);
    setUser(u);
  };
  const handleLogout = async () => {
    if (window.FB?.signOut) await window.FB.signOut();else {
      try {
        localStorage.removeItem("justdo_user");
      } catch (e) {}
    }
    setUser(null);
  };
  const handleOnboarded = () => {
    setUser(u => u ? {
      ...u,
      onboarded: true,
      _ts: Date.now()
    } : u);
  };
  if (!fbChecked) return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#09090E",
      padding: 32,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 20,
      border: "3px solid rgba(74,124,255,0.3)",
      borderTopColor: "#4A7CFF",
      animation: "spin 0.8s linear infinite"
    }
  }), /*#__PURE__*/React.createElement("div", {
    id: "debug-log",
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.4)",
      textAlign: "center",
      maxWidth: 320,
      lineHeight: 1.6,
      fontFamily: "monospace"
    }
  }), /*#__PURE__*/React.createElement("style", null, "@keyframes spin{to{transform:rotate(360deg)}}"));
  const themeVariant = tweaks.activeVariant || "dark";
  const needsOnboarding = user && !lsGet(`justdo_onboarded_${user.uid}`, false);
  const makeContent = v => !user ? /*#__PURE__*/React.createElement(AuthScreen, {
    themeKey: v,
    onLogin: handleLogin
  }) : needsOnboarding ? /*#__PURE__*/React.createElement(OnboardingScreen, {
    user: user,
    themeKey: v,
    onComplete: () => {
      try {
        localStorage.setItem(`justdo_onboarded_${user.uid}`, JSON.stringify("1"));
      } catch (e) {}
      handleOnboarded();
    }
  }) : /*#__PURE__*/React.createElement(JustDoApp, {
    initialTheme: v,
    user: user,
    onLogout: handleLogout
  });

  // Outside sandbox (Netlify, real device): always fullscreen
  if (!inSandbox) return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      overflow: "hidden"
    }
  }, makeContent(themeVariant));

  // Inside sandbox (design tool): show canvas with device frames
  const variants = tweaks.showBothVariants ? ["dark", "light"] : [themeVariant];
  const labelColor = v => v === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "canvas",
    style: {
      background: "radial-gradient(ellipse at 30% 50%, #1a1030 0%, #09090E 60%)",
      minHeight: "100vh"
    }
  }, variants.map(v => /*#__PURE__*/React.createElement("div", {
    key: v,
    className: "frame-col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "frame-label",
    style: {
      color: labelColor(v)
    }
  }, v === "dark" ? "Dark Mode" : "Light Mode"), /*#__PURE__*/React.createElement(IOSDevice, {
    statusBarStyle: v === "dark" ? "light" : "dark"
  }, makeContent(v))))), /*#__PURE__*/React.createElement("div", {
    id: "tweaks-root",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement(TweaksPanel, {
    onClose: () => {
      document.getElementById('tweaks-root').style.display = 'none';
      window.parent.postMessage({
        type: '__edit_mode_dismissed'
      }, '*');
    }
  }, /*#__PURE__*/React.createElement(TweakSection, {
    title: "Darstellung"
  }, /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Beide Varianten",
    value: tweaks.showBothVariants,
    onChange: v => setTweak('showBothVariants', v)
  }), !tweaks.showBothVariants && /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Variante",
    options: ["dark", "light"],
    value: tweaks.activeVariant,
    onChange: v => setTweak('activeVariant', v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    title: "Session"
  }, /*#__PURE__*/React.createElement(TweakButton, {
    label: user ? `Abmelden (${user.name})` : "Nicht eingeloggt",
    onClick: user ? handleLogout : undefined
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Onboarding reset",
    onClick: () => {
      if (user) {
        try {
          localStorage.removeItem(`justdo_onboarded_${user.uid}`);
        } catch (e) {}
      }
      setUser(u => u ? {
        ...u,
        _ts: Date.now()
      } : u);
    }
  })))));
}
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Root, null));
});
