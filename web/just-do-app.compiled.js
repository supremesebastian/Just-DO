(function(){
var useState=React.useState,useEffect=React.useEffect,useRef=React.useRef,
useMemo=React.useMemo,useCallback=React.useCallback;
var lsGet=window.lsGet,lsSet=window.lsSet,lsGetEx=window.lsGet,lsSetEx=window.lsSet;

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
})();