
// auth-screen.jsx – Just Do (v10 clean)

const decodeJwt = (token) => {
  try {
    const b64 = token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
    return JSON.parse(atob(b64));
  } catch { return null; }
};

const AuthScreen = ({ onLogin, themeKey }) => {
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
      } catch(e) {
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
      joinedAt: new Date().toISOString(),
    };
    try { localStorage.setItem("justdo_user", JSON.stringify(user)); } catch(e) {}
    onLogin(user);
    setLoading(false);
  };

  return (
    <div style={{
      position:"absolute", inset:0, background:t.bg,
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      fontFamily:"'DM Sans', sans-serif", padding:"32px 28px",
    }}>
      {/* Blob */}
      <div style={{
        position:"absolute", top:-80, left:-80, width:300, height:300,
        borderRadius:"50%", opacity:0.1, pointerEvents:"none",
        background:`radial-gradient(circle, ${t.accent}, transparent)`,
      }}/>

      {/* Logo */}
      <div style={{
        width:80, height:80, borderRadius:24, marginBottom:24,
        background:`linear-gradient(135deg, ${t.accent}, #7C6EFA)`,
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:`0 24px 64px ${t.accent}55`,
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      </div>

      <div style={{fontSize:32, fontWeight:800, color:t.text, letterSpacing:-1, marginBottom:8, textAlign:"center"}}>
        Just Do
      </div>
      <div style={{fontSize:14, color:t.textSub, textAlign:"center", lineHeight:1.6, maxWidth:240, marginBottom:40}}>
        Dein KI-Studiencoach für Lernplanung und Prüfungsvorbereitung.
      </div>

      <div style={{width:"100%", maxWidth:300, display:"flex", flexDirection:"column", gap:12}}>
        {/* Google Button */}
        <button onClick={handleGoogleClick} disabled={loading} style={{
          display:"flex", alignItems:"center", justifyContent:"center", gap:12,
          background:"#fff", border:"1px solid rgba(0,0,0,0.12)",
          borderRadius:14, padding:"14px 20px", width:"100%",
          cursor: loading ? "default" : "pointer",
          fontSize:15, fontWeight:600, color:"#1a1a1a",
          boxShadow:"0 2px 12px rgba(0,0,0,0.08)",
          opacity: loading ? 0.7 : 1,
          transition:"opacity 0.2s",
        }}>
          {loading
            ? <div style={{width:20,height:20,borderRadius:10,border:"2px solid rgba(0,0,0,0.15)",borderTopColor:"#4A7CFF",animation:"spin 0.8s linear infinite"}}/>
            : <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              </svg>
          }
          {loading ? "Verbinde mit Google…" : "Mit Google anmelden"}
        </button>

        {/* Demo */}
        <button onClick={mockLogin} disabled={loading} style={{
          background:"none", border:`1px solid ${t.cardBorder}`,
          borderRadius:14, padding:"12px", cursor:"pointer",
          fontSize:13, fontWeight:500, color:t.textSub, width:"100%",
        }}>
          Im Demo-Modus fortfahren
        </button>
      </div>

      <div style={{marginTop:24, fontSize:11, color:t.textMuted, textAlign:"center", maxWidth:240}}>
        Mit der Anmeldung stimmst du den Nutzungsbedingungen zu.
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

Object.assign(window, { AuthScreen });
