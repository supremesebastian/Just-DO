// shared-helpers.js — global helpers exposed on window
window.lsGet = function(k, fb) { try { var v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : fb; } catch(e) { return fb; } };
window.lsSet = function(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} };
window.lsGetEx = window.lsGet;
window.lsSetEx = window.lsSet;
