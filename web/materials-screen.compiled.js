(function(){
var useState=React.useState,useEffect=React.useEffect,useRef=React.useRef,
useMemo=React.useMemo,useCallback=React.useCallback;
var lsGet=window.lsGet,lsSet=window.lsSet,lsGetEx=window.lsGet,lsSetEx=window.lsSet;

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
})();