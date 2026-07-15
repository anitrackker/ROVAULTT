import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Plus, Minus, RotateCcw, Search, Check, AlertCircle } from 'lucide-react';
import { api } from '../api.js';

const fmt = n => Math.floor(n ?? 0).toLocaleString();

export default function BalancePanel({ users, refresh }) {
  const [q, setQ]         = useState('');
  const [target, setTarget] = useState(null);
  const [mode, setMode]   = useState('set');   // set | add | subtract
  const [amount, setAmount] = useState('');
  const [note, setNote]   = useState('');
  const [busy, setBusy]   = useState(false);
  const [result, setResult] = useState(null);  // { type:'success'|'error', msg }

  const matched = (users || []).filter(u =>
    q.length >= 1 && u.username.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 8);

  const selectUser = (u) => { setTarget(u); setQ(u.username); setResult(null); };

  const execute = async () => {
    if (!target || !amount) return;
    setBusy(true);
    setResult(null);
    try {
      let newBal = Number(target.balance || 0);
      const amt  = Number(amount);
      if (mode === 'set')      newBal = amt;
      if (mode === 'add')      newBal = newBal + amt;
      if (mode === 'subtract') newBal = Math.max(0, newBal - amt);
      const r = await api.setBalance(target.username, newBal, note);
      await refresh();
      setResult({ type: 'success', msg: `${target.username} balance → ${fmt(newBal)} VAULT` });
      setAmount('');
      setNote('');
      // update local target
      setTarget(prev => prev ? { ...prev, balance: newBal } : null);
    } catch (e) {
      setResult({ type: 'error', msg: 'Failed to update balance' });
    }
    setBusy(false);
  };

  const PRESETS = [100, 500, 1000, 5000, 10000, 50000];

  return (
    <div className="panel-root">
      <div className="panel-header">
        <h2 className="panel-title">Balance Manager</h2>
        <p className="panel-sub">Add, deduct, or set VAULT balances for any player</p>
      </div>

      <div className="bal-layout">
        {/* Left: user picker */}
        <motion.div className="bal-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bal-card-title"><Search size={14} /> Select Player</div>
          <div className="search-wrap" style={{ marginBottom: 10 }}>
            <Search size={14} className="search-icon" />
            <input className="search-input" placeholder="Search username…"
              value={q} onChange={e => { setQ(e.target.value); setTarget(null); }} />
          </div>
          <AnimatePresence>
            {matched.length > 0 && !target && (
              <motion.div className="user-suggestions"
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {matched.map(u => (
                  <div key={u.username} className="suggestion-row" onClick={() => selectUser(u)}>
                    <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${u.username}&backgroundColor=transparent`}
                      className="user-avatar-sm" alt="" />
                    <span className="uname">{u.username}</span>
                    <span className="bal-chip">{fmt(u.balance)} V</span>
                    {u.banned && <span className="ban-flag">banned</span>}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {target && (
            <motion.div className="selected-user-card"
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
              <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${target.username}&backgroundColor=transparent`}
                className="sel-avatar" alt="" />
              <div>
                <div className="sel-name">{target.username}</div>
                <div className="sel-bal">Current: <strong>{fmt(target.balance)} VAULT</strong></div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right: operation */}
        <motion.div className="bal-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <div className="bal-card-title"><Coins size={14} /> Operation</div>

          {/* Mode picker */}
          <div className="mode-picker">
            {[
              { id: 'set',      icon: Coins,    label: 'Set' },
              { id: 'add',      icon: Plus,     label: 'Add' },
              { id: 'subtract', icon: Minus,    label: 'Deduct' },
            ].map(({ id, icon: Icon, label }) => (
              <button key={id} className={`mode-btn ${mode === id ? 'active' : ''}`}
                onClick={() => setMode(id)}>
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>

          {/* Presets */}
          <div className="preset-row">
            {PRESETS.map(p => (
              <button key={p} className="preset-btn" onClick={() => setAmount(String(p))}>
                {p.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Amount input */}
          <div className="amount-row">
            <div className="amount-symbol">V</div>
            <input className="amount-input" type="number" placeholder="Enter amount…"
              value={amount} onChange={e => setAmount(e.target.value)} />
          </div>

          <input className="note-input" placeholder="Admin note (optional)…"
            value={note} onChange={e => setNote(e.target.value)} />

          {/* Preview */}
          {target && amount && (
            <div className="balance-preview">
              <span>{fmt(target.balance)}</span>
              <span className={`preview-arrow ${mode}`}>
                {mode === 'add' ? '+' : mode === 'subtract' ? '-' : '→'}
              </span>
              <span className="preview-new">
                {mode === 'set'      ? fmt(Number(amount)) :
                 mode === 'add'      ? fmt((target.balance || 0) + Number(amount)) :
                 fmt(Math.max(0, (target.balance || 0) - Number(amount)))} V
              </span>
            </div>
          )}

          <button className="save-btn wide" onClick={execute}
            disabled={busy || !target || !amount}>
            {busy ? 'Applying…' : `Apply ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
          </button>

          <AnimatePresence>
            {result && (
              <motion.div className={`op-result ${result.type}`}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {result.type === 'success' ? <Check size={13} /> : <AlertCircle size={13} />}
                {result.msg}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Recent high-balance users */}
        <motion.div className="bal-card wide" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
          <div className="bal-card-title"><Coins size={14} /> All Player Balances</div>
          <div className="mini-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Player</th><th>Balance</th><th>Wagered</th><th>Status</th></tr></thead>
              <tbody>
                {[...(users || [])].sort((a,b) => (b.balance||0)-(a.balance||0)).map((u, i) => (
                  <tr key={u.username} className="trow" onClick={() => selectUser(u)} style={{ cursor:'pointer' }}>
                    <td className="td-name">
                      <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${u.username}&backgroundColor=transparent`}
                        className="user-avatar-sm" alt="" style={{ marginRight: 8 }} />
                      {u.username}
                    </td>
                    <td><span className="bal-chip">{fmt(u.balance)} V</span></td>
                    <td>{fmt(u.totalWagered)}</td>
                    <td><span className={`status-chip ${u.banned ? 'banned' : 'active'}`}>{u.banned ? '🔴' : '🟢'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
