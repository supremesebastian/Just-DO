(function(){
const {useState,useEffect,useRef,useMemo,useCallback,useContext,createContext}=React;
const lsGet=window.lsGet;const lsSet=window.lsSet;
const lsGetEx=window.lsGet;const lsSetEx=window.lsSet;

const {
  useState,
  useEffect
} = React;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showBothVariants": false,
  "activeVariant": "dark"
} /*EDITMODE-END*/;

/* ── Helpers ─────────────────────────────────────────── */
const lsGet = (k, fb) => {
  try {
    const v = localStorage.getItem(k);
    return v !== null ? JSON.parse(v) : fb;
  } catch {
    return fb;
  }
};
const lsSet = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch (e) {}
};

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
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Root, null));
})();