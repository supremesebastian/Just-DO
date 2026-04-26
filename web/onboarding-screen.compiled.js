(function(){
var useState=React.useState,useEffect=React.useEffect,useRef=React.useRef,
useMemo=React.useMemo,useCallback=React.useCallback;
var lsGet=window.lsGet,lsSet=window.lsSet,lsGetEx=window.lsGet,lsSetEx=window.lsSet;

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
})();