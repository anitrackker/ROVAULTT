import { motion } from 'framer-motion';
import { Activity, Ban, Coins, Trash2, RotateCcw, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const fmt = n => Math.floor(n ?? 0).toLocaleString();

const ACTION_META = {
  ban:      { icon: Ban,          color: 'red',    label: 'Banned' },
  unban:    { icon: CheckCircle,  color: 'green',  label: 'Unbanned' },
  balance:  { icon: Coins,        color: 'gold',   label: 'Balance changed' },
  reset:    { icon: RotateCcw,    color: 'orange', label: 'Balance reset' },
  delete:   { icon: Trash2,       color: 'gray',   label: 'User deleted' },
};

export default function ActivityPanel({ users }) {
  const [filterType, setFilterType] = useState('all');

  // Collect all admin actions from user records
  const events = (users || [])
    .filter(u => u.lastAdminAction)
    .map(u => ({ ...u.lastAdminAction, username: u.username, banReason: u.banReason }))
    .sort((a, b) => (b.ts || 0) - (a.ts || 0));

  const filtered = filterType === 'all' ? events : events.filter(e => e.type === filterType);

  return (
    <div className="panel-root">
      <div className="panel-header">
        <h2 className="panel-title">Activity Log</h2>
        <p className="panel-sub">{events.length} recorded admin actions</p>
      </div>

      {/* Filter */}
      <div className="filter-tabs" style={{ marginBottom: 20 }}>
        <button className={`filter-tab ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}>All</button>
        {Object.keys(ACTION_META).map(t => (
          <button key={t} className={`filter-tab ${filterType === t ? 'active' : ''}`}
            onClick={() => setFilterType(t)}>
            {ACTION_META[t].label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="timeline">
        {filtered.map((ev, i) => {
          const meta = ACTION_META[ev.type] || ACTION_META.balance;
          const Icon = meta.icon;
          return (
            <motion.div key={`${ev.username}-${ev.ts}-${i}`}
              className="timeline-item"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}>
              <div className={`tl-icon-wrap color-${meta.color}`}>
                <Icon size={14} />
              </div>
              <div className="tl-connector" />
              <div className="tl-card">
                <div className="tl-top">
                  <span className={`tl-type color-${meta.color}`}>{meta.label}</span>
                  <span className="tl-user">@{ev.username}</span>
                  <span className="tl-time">{ev.ts ? new Date(ev.ts).toLocaleString() : '—'}</span>
                </div>
                {ev.type === 'balance' && (
                  <div className="tl-detail">
                    {fmt(ev.prev)} → <strong>{fmt(ev.next)}</strong> VAULT
                    {ev.note && <span className="tl-note">"{ev.note}"</span>}
                  </div>
                )}
                {ev.type === 'ban' && ev.reason && (
                  <div className="tl-detail">Reason: {ev.reason}</div>
                )}
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="empty-msg" style={{ padding: '40px 0', textAlign: 'center' }}>
            No activity recorded yet
          </div>
        )}
      </div>
    </div>
  );
}
