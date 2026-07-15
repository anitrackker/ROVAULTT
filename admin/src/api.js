const BASE = '/api/admin';
const KEY  = 'ROVAULTADMIN';

const h = () => ({ 'Content-Type': 'application/json', 'x-admin-key': KEY });

export const api = {
  stats:     ()               => fetch(`${BASE}/stats`,           { headers: h() }).then(r => r.json()),
  users:     ()               => fetch(`${BASE}/users`,           { headers: h() }).then(r => r.json()),
  setBalance:(username, balance, note) =>
    fetch(`${BASE}/balance`, { method:'POST', headers: h(),
      body: JSON.stringify({ username, balance, note }) }).then(r => r.json()),
  ban:       (username, reason) =>
    fetch(`${BASE}/ban`,     { method:'POST', headers: h(),
      body: JSON.stringify({ username, reason }) }).then(r => r.json()),
  unban:     (username) =>
    fetch(`${BASE}/unban`,   { method:'POST', headers: h(),
      body: JSON.stringify({ username }) }).then(r => r.json()),
  deleteUser:(username) =>
    fetch(`${BASE}/user/${encodeURIComponent(username)}`,
      { method:'DELETE', headers: h() }).then(r => r.json()),
  reset:     (username) =>
    fetch(`${BASE}/reset`,   { method:'POST', headers: h(),
      body: JSON.stringify({ username }) }).then(r => r.json()),
};
