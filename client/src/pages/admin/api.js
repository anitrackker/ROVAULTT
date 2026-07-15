const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://rovault.onrender.com/api';
const BASE = `${API_URL}/admin`;
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
  promos:    () => fetch(`${BASE}/promos`, { headers: h() }).then(r => r.json()),
  createPromo: (code, vault, description) => fetch(`${BASE}/promos`, { method: 'POST', headers: h(), body: JSON.stringify({ code, vault, description }) }).then(r => r.json()),
  deletePromo: (code) => fetch(`${BASE}/promos/${encodeURIComponent(code)}`, { method: 'DELETE', headers: h() }).then(r => r.json()),
  wallet:    (username) => fetch(`${BASE}/wallet/${encodeURIComponent(username)}`, { headers: h() }).then(r => r.json()),
  wallets:   () => fetch(`${BASE}/wallets`, { headers: h() }).then(r => r.json()),
  withdrawals: () => fetch(`${BASE}/withdrawals`, { headers: h() }).then(r => r.json()),
  approveWithdrawal: (id) => fetch(`${BASE}/withdrawals/${id}/approve`, { method: 'POST', headers: h() }).then(r => r.json()),
  liveBets:  () => fetch(`${BASE}/live-bets`, { headers: h() }).then(r => r.json()),
  analytics: () => fetch(`${BASE}/analytics`, { headers: h() }).then(r => r.json()),
  risk:      () => fetch(`${BASE}/risk`, { headers: h() }).then(r => r.json()),
};
