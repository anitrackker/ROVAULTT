import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ban, CheckCircle, Search, AlertTriangle, ShieldOff, ShieldCheck } from 'lucide-react';
import { api } from '../api.js';

const fmt = n => Math.floor(n ?? 0).toLocaleString();

const BAN_REASONS = [
  'Exploiting / Cheating',
  'Chargebacks / Fraud',
  'Multiple accounts',
  'Underage',
  'Abusive behaviour',
  'Suspicious activity',
  'Terms of Service violation',
];

export default function BanPanel({ users, refresh }) {
  const [q, setQ]           = useState('');
  const [reason, setReason] = useState(BAN_REASONS[0]);
  const [custom, setCustom] = useState('');
  const [busy, setBusy]     = useState('');
  const [toast, setToast]   = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const active = (users || []).filter(u => !u.banned);
  const banned = (users || []).filter(u =>  u.banned);

  const filteredActive = active.filter(u => u.username.toLowerCase().includes(q.toLowerCase()));
  const filteredBanned = banned.filter(u => u.username.toLowerCase().includes(q.toLowerCase()));

  const doBan = async (u) => {
    const r = custom.trim() || reason;
    setBusy('ban-' + u.username);
    await api.ban(u.username, r);
    await refresh();
    showToast(`${u.username} banned`);
    setBusy('');
  };

  const doUnban = async (u) => {
    setBusy('unban-' + u.username);
    await api.unban(u.username);
    await refresh();
    showToast(`${u.username} unbanned`);
    setBusy('');
  };

  return (
    <div className="panel-root">
      <div className="panel-header">
        <h2 className="panel-title">Ban Manager</h2>
        <p className="panel-sub">{banned.length} banned · {active.length} active</p>
      </div>

      {/* Stats strip */}
      <div className="ban-stats-row">
        <div className="ban-stat red">
          <Ban size={18} />
          <div>
            <div className="ban-stat-val">{banned.length}</div>
            <div className="ban-stat-label">Banned</div>
          </div>
        </div>
        <div className="ban-stat green">
          <CheckCircle size={18} />
          <div>
            <div className="ban-stat-val">{active.length}</div>
            <div className="ban-stat-label">Active</div>
          </div>
        </div>
        <div className="ban-stat gold">
          <AlertTriangle size={18} />
          <div>
            <div className="ban-stat-val">
              {(users?.length ?? 0) > 0
                ? `${((banned.length / (users?.length ?? 1)) * 100).toFixed(1)}%`
                : '0%'}
            </div>
            <div className="ban-stat-label">Ban rate</div>
          </div>
        </div>
      </div>

      {/* Reason selector */}
      <motion.div className="reason-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bal-card-title"><AlertTriangle size={14} /> Ban Reason</div>
        <div className="reason-pills">
          {BAN_REASONS.map(r => (
            <button key={r}
              className={`reason-pill ${reason === r && !custom ? 'active' : ''}`}
              onClick={() => { setReason(r); setCustom(''); }}>
              {r}
            </button>
          ))}
        </div>
        <input className="note-input" placeholder="Or type custom reason…"
          value={custom} onChange={e => setCustom(e.target.value)} />
      </motion.div>

      {/* Search */}
      <div className="search-wrap" style={{ marginBottom: 16 }}>
        <Search size={14} className="search-icon" />
        <input className="search-input" placeholder="Filter players…"
          value={q} onChange={e => setQ(e.target.value)} />
      </div>

      <div className="ban-columns">
        {/* Active players — can ban */}
        <div className="ban-col">
          <div className="ban-col-header green-header">
            <ShieldCheck size={14} /> Active Players ({filteredActive.length})
          </div>
          <div className="ban-list">
            <AnimatePresence>
              {filteredActive.map(u => (
                <motion.div key={u.username} className="ban-row"
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}>
                  <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${u.username}&backgroundColor=transparent`}
                    className="user-avatar-sm" alt="" />
                  <div className="ban-info">
                    <span className="uname">{u.username}</span>
                    <span className="ban-bal">{fmt(u.balance)} V</span>
                  </div>
                  <button className="ban-action-btn red"
                    disabled={busy === 'ban-' + u.username}
                    onClick={() => doBan(u)}>
                    {busy === 'ban-' + u.username
                      ? <span className="btn-spinner" />
                      : <><Ban size={12} /> Ban</>
                    }
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredActive.length === 0 && <div className="empty-msg">No active players</div>}
          </div>
        </div>

        {/* Banned players — can unban */}
        <div className="ban-col">
          <div className="ban-col-header red-header">
            <ShieldOff size={14} /> Banned Players ({filteredBanned.length})
          </div>
          <div className="ban-list">
            <AnimatePresence>
              {filteredBanned.map(u => (
                <motion.div key={u.username} className="ban-row banned"
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}>
                  <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${u.username}&backgroundColor=transparent`}
                    className="user-avatar-sm" alt="" />
                  <div className="ban-info">
                    <span className="uname">{u.username}</span>
                    <span className="ban-reason-tag">{u.banReason || 'No reason'}</span>
                  </div>
                  <button className="ban-action-btn green"
                    disabled={busy === 'unban-' + u.username}
                    onClick={() => doUnban(u)}>
                    {busy === 'unban-' + u.username
                      ? <span className="btn-spinner" />
                      : <><CheckCircle size={12} /> Unban</>
                    }
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredBanned.length === 0 && <div className="empty-msg">No banned players</div>}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div className={`admin-toast ${toast.type}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
