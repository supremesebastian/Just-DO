// firebase-service.js – Just Do
// Firebase Auth + Firestore integration
// ─────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: "AIzaSyC5PK-AkdayCixOAg-se3zDmzYme6PrwU4",
  authDomain: "just-do-69.firebaseapp.com",
  projectId: "just-do-69",
  storageBucket: "just-do-69.firebasestorage.app",
  messagingSenderId: "212428476978",
  appId: "1:212428476978:web:c1077d288548809b45a22b",
  measurementId: "G-8FY1FVXJPK"
};

// Initialize Firebase (guard against double-init)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db   = firebase.firestore();

// Enable offline persistence
db.enablePersistence({ synchronizeTabs: true }).catch(() => {});

// Handle redirect result on page load
auth.getRedirectResult().then(result => {
  if (result?.user) {
    console.log("[FB] Redirect login success:", result.user.email);
  }
}).catch(e => {
  console.warn("[FB] getRedirectResult error:", e.message);
});

/* ── FIRESTORE HELPERS ────────────────────────────────── */
const dataRef = (uid, key) =>
  db.collection("users").doc(uid).collection("data").doc(key);

async function saveData(uid, key, data) {
  if (!uid) return;
  try {
    await dataRef(uid, key).set({ data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
  } catch(e) { console.warn("[FB] saveData failed:", e.message); }
}

async function loadData(uid, key) {
  if (!uid) return null;
  try {
    const snap = await dataRef(uid, key).get();
    return snap.exists ? snap.data().data : null;
  } catch(e) { console.warn("[FB] loadData failed:", e.message); return null; }
}

async function loadAllData(uid) {
  if (!uid) return {};
  try {
    const snap = await db.collection("users").doc(uid).collection("data").get();
    const result = {};
    snap.forEach(doc => { result[doc.id] = doc.data().data; });
    return result;
  } catch(e) { console.warn("[FB] loadAllData failed:", e.message); return {}; }
}

/* ── AUTH HELPERS ─────────────────────────────────────── */
async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  // Use redirect (more reliable on mobile/Safari/Netlify)
  try {
    await auth.signInWithRedirect(provider);
    return null; // page will reload after redirect
  } catch(e) {
    console.warn("[FB] signInWithRedirect failed:", e.message);
    // Fallback to popup
    try {
      const result = await auth.signInWithPopup(provider);
      return result.user;
    } catch(e2) {
      throw e2;
    }
  }
}

async function signOut() {
  await auth.signOut();
  try { localStorage.removeItem("justdo_user"); } catch(e) {}
}

function onAuthStateChanged(cb) {
  return auth.onAuthStateChanged(cb);
}

/* ── SYNC UTILITY ─────────────────────────────────────── */
// Called after any localStorage write to also persist to Firestore
// Key mapping: "justdo_exams_{uid}" → Firestore key "exams"
function syncToFirestore(uid, lsKey, data) {
  if (!uid || !lsKey) return;
  // Derive a clean Firestore document key from the localStorage key
  let fsKey = lsKey
    .replace(`justdo_`, "")
    .replace(`_${uid}`, "")
    .replace(/[^a-z0-9_]/gi, "_");
  saveData(uid, fsKey, data);
}

/* ── POPULATE localStorage FROM FIRESTORE ─────────────── */
async function hydrateFromCloud(uid) {
  const allData = await loadAllData(uid);
  const keyMap = {
    profile:     `justdo_profile_${uid}`,
    onboarded:   `justdo_onboarded_${uid}`,
    exams:       `justdo_exams_${uid}`,
    fc_progress: `justdo_fc_progress_${uid}`,
    theme:       `justdo_theme`,
  };
  let hydrated = 0;
  for (const [fsKey, lsKey] of Object.entries(keyMap)) {
    if (allData[fsKey] !== undefined && allData[fsKey] !== null) {
      try { localStorage.setItem(lsKey, JSON.stringify(allData[fsKey])); hydrated++; } catch(e) {}
    }
  }
  // Materials per subject (keys like "materials_subj_1")
  for (const [fsKey, val] of Object.entries(allData)) {
    if (fsKey.startsWith("materials_subj_")) {
      const subjectId = fsKey.replace("materials_subj_", "");
      try { localStorage.setItem(`justdo_materials_${uid}_subj_${subjectId}`, JSON.stringify(val)); hydrated++; } catch(e) {}
    }
  }
  console.log(`[FB] Hydrated ${hydrated} keys from Firestore`);
  return allData;
}

/* ── EXPORT ───────────────────────────────────────────── */
window.FB = {
  auth, db,
  signInWithGoogle,
  signOut,
  onAuthStateChanged,
  saveData,
  loadData,
  loadAllData,
  hydrateFromCloud,
  syncToFirestore,
};

// Global shorthand used by all components
window.justDoSync = (uid, lsKey, data) => {
  window.FB.syncToFirestore(uid, lsKey, data);
};

console.log("[FB] Firebase initialized → project: just-do-69");
