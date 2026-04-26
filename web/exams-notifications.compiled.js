(function(){
const {useState,useEffect,useRef,useMemo,useCallback,useContext,createContext}=React;
const lsGet=window.lsGet;const lsSet=window.lsSet;
const lsGetEx=window.lsGet;const lsSetEx=window.lsSet;

// exams-notifications.jsx – Just Do
// Prüfungsverwaltung + Browser Notifications + Smart Reminders
// ─────────────────────────────────────────────────────────
// Browser Notification API: funktioniert während Tab offen ist.
// Echte Push Notifications (Tab geschlossen): benötigt Service Worker + Push API + Backend.
// ─────────────────────────────────────────────────────────

/* ── HELPERS ──────────────────────────────────────────── */
const lsGetEx = (k, fb) => {
  try {
    const v = localStorage.getItem(k);
    return v != null ? JSON.parse(v) : fb;
  } catch {
    return fb;
  }
};
const lsSetEx = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch (e) {}
};
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
})();