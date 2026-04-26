(function(){
var useState=React.useState,useEffect=React.useEffect,useRef=React.useRef,
useMemo=React.useMemo,useCallback=React.useCallback;
var lsGet=window.lsGet,lsSet=window.lsSet,lsGetEx=window.lsGet,lsSetEx=window.lsSet;

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
})();