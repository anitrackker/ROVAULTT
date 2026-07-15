import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ChevronUp, ChevronDown, X, Ban, CheckCircle,
  Trash2, Coins, RotateCcw, User
} from 'lucide-react';
import { api } from '../api.js';

const fmt = (n) => Math.floor(n ?? 0).toLocaleString();

export default function UsersPanel({ users, refresh }) {
  const [q, setQ]             = useState('');
  const [sort, setSort]       = useState({ col: 'balance', dir: 'desc' });
  const [filter, setFilter]   = useState('all'); // all | active | banned
  const [selected, setSelected] = useState(null);
  const [busy, setBusy]       = useState('');
  const [toast, setToast]     = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = (users || [])
    .filter(u => {
      if (filter === 'active') return !u.banned;
      if (filter === 'banned') return u.banned;
      return true;
    })
    .filter(u => u.username?.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => {
      let av = a[sort.col] ?? 0, bv = b[sort.col] ?? 0;
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return sort.dir === 'asc' ? -1 : 1;
      if (av > bv) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });

  const toggleSort = (col) => setSort(s =>
    s.col === col ? { col, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { col, dir: 'desc' }
  );

  const doAction = async (action, u) => {
    setBusy(u.username + action);
    try {
      if (action === 'ban')    await api.ban(u.username, 'Banned by admin');
      if (action === 'unban')  await api.unban(u.username);
      if (action === 'delete') { if (!confirm(`Delete ${u.username}?`)) { setBusy(''); return; } await api.deleteUser(u.username); setSelected(null); }
      if (action === 'reset')  { if (!confirm(`Reset ${u.username} balance to 0?`)) { setBusy(''); return; } await api.reset(u.username); }
      await refresh();
      showToast(`${action} applied to ${u.username}`);
    } catch (e) {
      showToast('Action failed', 'error');
    }
    setBusy('');
  };

  const SortIcon = ({ col }) => {
    if (sort.col !== col) return <ChevronUp size={11} style={{ opacity: 0.3 }} />;
    return sort.dir === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />;
  };

  return (
    <div className="panel-root">
      <div className="panel-header">
        <h2 className="panel-title">All Users</h2>
        <p className="panel-sub">{filtered.length} of {users?.length ?? 0} users</p>
      </div>

      {/* Controls */}
      <div className="table-controls">
        <div className="search-wrap">
          <Search size={14} className="search-icon" />
          <input className="search-input" placeholder="Search username…"
            value={q} onChange={e => setQ(e.target.value)} />
          {q && <button className="search-clear" onClick={() => setQ('')}><X size={12} /></button>}
        </div>
        <div className="filter-tabs">
          {['all', 'active', 'banned'].map(f => (
            <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="th-avatar" />
              <th onClick={() => toggleSort('username')} className="th-sort">
                Username <SortIcon col="username" />
              </th>
              <th onClick={() => toggleSort('balance')} className="th-sort">
                Balance <SortIcon col="balance" />
              </th>
              <th onClick={() => toggleSort('totalWagered')} className="th-sort">
                Wagered <SortIcon col="totalWagered" />
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((u, i) => (
                <motion.tr key={u.username}
                  className={`trow ${selected?.username === u.username ? 'selected' : ''}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => setSelected(u)}
                >
                  <td className="td-avatar">
                    <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${u.username}&backgroundColor=transparent`}
                      className="user-avatar-sm" alt="" />
                  </td>
                  <td className="td-name">
                    <span className="uname">{u.username}</span>
                  </td>
                  <td className="td-bal">
                    <span className="bal-chip">{fmt(u.balance)} V</span>
                  </td>
                  <td className="td-wager">{fmt(u.totalWagered)}</td>
                  <td>
                    <span className={`status-chip ${u.banned ? 'banned' : 'active'}`}>
                      {u.banned ? '🔴 banned' : '🟢 active'}
                    </span>
                  </td>
                  <td className="td-actions" onClick={e => e.stopPropagation()}>
                    {u.banned
                      ? <ActionBtn icon={CheckCircle} label="Unban"  color="green"  loading={busy === u.username+'unban'}  onClick={() => doAction('unban', u)} />
                      : <ActionBtn icon={Ban}         label="Ban"    color="red"    loading={busy === u.username+'ban'}    onClick={() => doAction('ban', u)} />
                    }
                    <ActionBtn icon={RotateCcw} label="Reset" color="orange" loading={busy === u.username+'reset'}  onClick={() => doAction('reset', u)} />
                    <ActionBtn icon={Trash2}    label="Del"   color="gray"   loading={busy === u.username+'delete'} onClick={() => doAction('delete', u)} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="empty-row">No users found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User detail drawer */}
      <AnimatePresence>
        {selected && (
          <UserDrawer user={selected} onClose={() => setSelected(null)} refresh={refresh} showToast={showToast} />
        )}
      </AnimatePresence>

      {/* Toast */}
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

function ActionBtn({ icon: Icon, label, color, loading, onClick }) {
  return (
    <button className={`action-btn action-${color} ${loading ? 'loading' : ''}`}
      onClick={onClick} disabled={loading} title={label}>
      {loading ? <span className="btn-spinner" /> : <Icon size={12} />}
      {label}
    </button>
  );
}

function UserDrawer({ user, onClose, refresh, showToast }) {
  const [newBal, setNewBal] = useState(String(Math.floor(user.balance || 0)));
  const [note, setNote]     = useState('');
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState('');

  const copy = (val, key) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(''), 1500);
  };

  const saveBalance = async () => {
    setSaving(true);
    await api.setBalance(user.username, Number(newBal), note);
    await refresh();
    showToast(`Balance updated to ${Number(newBal).toLocaleString()}`);
    setSaving(false);
  };

  return (
    <motion.div className="drawer-overlay" onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="drawer"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        onClick={e => e.stopPropagation()}>

        <div className="drawer-header">
          <div className="drawer-avatar-wrap">
            <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.username}&backgroundColor=transparent`}
              className="drawer-avatar" alt="" />
            <div>
              <div className="drawer-username">{user.username}</div>
              <div className={`drawer-status ${user.banned ? 'banned' : 'active'}`}>
                {user.banned ? '🔴 Banned' : '🟢 Active'}
              </div>
            </div>
          </div>
          <button className="drawer-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="drawer-body">
          {/* Stats row */}
          <div className="drawer-stats">
            <div className="d-stat">
              <div className="d-stat-val">{Math.floor(user.balance || 0).toLocaleString()}</div>
              <div className="d-stat-label">Balance</div>
            </div>
            <div className="d-stat">
              <div className="d-stat-val">{Math.floor(user.totalWagered || 0).toLocaleString()}</div>
              <div className="d-stat-label">Wagered</div>
            </div>
            <div className="d-stat">
              <div className="d-stat-val">{user.signupBonusMet ? 'Yes' : 'No'}</div>
              <div className="d-stat-label">Bonus Met</div>
            </div>
          </div>

          {/* Balance editor */}
          <div className="drawer-section">
            <div className="drawer-section-title"><Coins size={13} /> Edit Balance</div>
            <div className="balance-edit-row">
              <input className="bal-input" type="number" value={newBal}
                onChange={e => setNewBal(e.target.value)} />
              <button className="quick-add" onClick={() => setNewBal(String(Math.max(0, Number(newBal) - 1000)))}>-1K</button>
              <button className="quick-add" onClick={() => setNewBal(String(Number(newBal) + 1000))}>+1K</button>
              <button className="quick-add" onClick={() => setNewBal(String(Number(newBal) + 5000))}>+5K</button>
            </div>
            <input className="note-input" placeholder="Admin note (optional)…"
              value={note} onChange={e => setNote(e.target.value)} />
            <button className="save-btn" onClick={saveBalance} disabled={saving}>
              {saving ? 'Saving…' : 'Save Balance'}
            </button>
          </div>

          {/* Last admin action */}
          {user.lastAdminAction && (
            <div className="drawer-section">
              <div className="drawer-section-title"><User size={13} /> Last Admin Action</div>
              <div className="last-action">
                <span className={`action-tag ${user.lastAdminAction.type}`}>{user.lastAdminAction.type}</span>
                {user.lastAdminAction.note && <span className="action-note">"{user.lastAdminAction.note}"</span>}
                <span className="action-ts">{new Date(user.lastAdminAction.ts).toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Ban info */}
          {user.banned && (
            <div className="drawer-section ban-info">
              <div className="drawer-section-title"><Ban size={13} /> Ban Info</div>
              <p>Reason: <strong>{user.banReason || 'None'}</strong></p>
              <p>Banned at: {user.bannedAt ? new Date(user.bannedAt).toLocaleString() : '—'}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
