import { useState, useEffect, useCallback } from 'react';
import { useStore, formatPts } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, Wallet, RefreshCw, Crown } from 'lucide-react';
import './Leaderboard.css';

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://rovault.onrender.com/api';

const TABS = [
  { key: 'wagered', label: 'All-Time Wagered', icon: TrendingUp },
  { key: 'weekly',  label: 'Weekly Wagered',   icon: Trophy },
  { key: 'balance', label: 'Top Balance',       icon: Wallet },
];

const RANK_COLORS = ['#ffd700', '#c0c0c0', '#cd7f32'];
const RANK_GLOW   = ['rgba(255,215,0,0.35)', 'rgba(192,192,192,0.25)', 'rgba(205,127,50,0.25)'];

function getRankIcon(rank) {
  if (rank === 1) return <Crown size={16} style={{ color: '#ffd700', filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.7))' }} />;
  if (rank === 2) return <Crown size={14} style={{ color: '#c0c0c0' }} />;
  if (rank === 3) return <Crown size={14} style={{ color: '#cd7f32' }} />;
  return <span className="lb-rank-num">{rank}</span>;
}

function getStatValue(entry, tab) {
  if (tab === 'balance') return entry.balance;
  if (tab === 'weekly')  return entry.weeklyWagered;
  return entry.totalWagered;
}

function getAvatar(entry) {
  return entry.avatarUrl ||
    `https://api.dicebear.com/9.x/avataaars/svg?seed=${entry.username}&backgroundColor=transparent`;
}

export const Leaderboard = () => {
  const { user } = useStore();
  const [tab,       setTab]       = useState('wagered');
  const [data,      setData]      = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [lastFetch, setLastFetch] = useState(null);
  const [myRank,    setMyRank]    = useState(null);

  const fetchBoard = useCallback(async (t) => {
    setLoading(true);
    try {
      const res  = await fetch(`${API_URL}/leaderboard?tab=${t}`);
      const json = await res.json();
      const list = json.leaderboard || [];
      setData(list);
      setLastFetch(new Date());
      if (user) {
        const idx = list.findIndex(e => e.username.toLowerCase() === user.name.toLowerCase());
        setMyRank(idx >= 0 ? idx + 1 : null);
      }
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchBoard(tab); }, [tab, fetchBoard]);

  // Auto-refresh every 30s
  useEffect(() => {
    const id = setInterval(() => fetchBoard(tab), 30000);
    return () => clearInterval(id);
  }, [tab, fetchBoard]);

  return (
    <div className="lb-page">

      {/* Header */}
      <div className="lb-header">
        <div className="lb-header-left">
          <Trophy size={28} className="lb-header-icon" />
          <div>
            <h1 className="lb-title">Leaderboard</h1>
            <p className="lb-subtitle">Top players on RoVault</p>
          </div>
        </div>
        <button className="lb-refresh-btn" onClick={() => fetchBoard(tab)} disabled={loading}>
          <RefreshCw size={14} className={loading ? 'lb-spin' : ''} />
          {lastFetch ? `Updated ${lastFetch.toLocaleTimeString()}` : 'Refresh'}
        </button>
      </div>

      {/* My rank */}
      {user && myRank && (
        <motion.div className="lb-my-rank" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <span>Your rank:</span>
          <span className="lb-my-rank-val">#{myRank}</span>
          <span style={{ color: '#4a6080' }}>·</span>
          <span style={{ color: '#7090b0' }}>{user.name}</span>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="lb-tabs">
        {TABS.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              className={`lb-tab${tab === t.key ? ' active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              <Icon size={14} />{t.label}
            </button>
          );
        })}
      </div>

      {/* Podium top 3 */}
      {!loading && data.length >= 3 && (
        <div className="lb-podium">
          {/* 2nd */}
          <motion.div className="lb-podium-card rank-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="lb-podium-avatar">
              <img src={getAvatar(data[1])} alt={data[1].username} onError={e => { e.target.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${data[1].username}&backgroundColor=transparent`; }} />
            </div>
            <Crown size={18} style={{ color: '#c0c0c0' }} />
            <div className="lb-podium-name">{data[1].username}</div>
            <div className="lb-podium-val">🪙 {formatPts(getStatValue(data[1], tab))}</div>
            <div className="lb-podium-rank" style={{ background: '#c0c0c0' }}>2</div>
          </motion.div>

          {/* 1st */}
          <motion.div className="lb-podium-card rank-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="lb-podium-avatar big">
              <img src={getAvatar(data[0])} alt={data[0].username} onError={e => { e.target.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${data[0].username}&backgroundColor=transparent`; }} />
            </div>
            <Crown size={22} style={{ color: '#ffd700', filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.6))' }} />
            <div className="lb-podium-name gold">{data[0].username}</div>
            <div className="lb-podium-val gold">🪙 {formatPts(getStatValue(data[0], tab))}</div>
            <div className="lb-podium-rank gold-rank">1</div>
          </motion.div>

          {/* 3rd */}
          <motion.div className="lb-podium-card rank-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="lb-podium-avatar">
              <img src={getAvatar(data[2])} alt={data[2].username} onError={e => { e.target.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${data[2].username}&backgroundColor=transparent`; }} />
            </div>
            <Crown size={16} style={{ color: '#cd7f32' }} />
            <div className="lb-podium-name">{data[2].username}</div>
            <div className="lb-podium-val">🪙 {formatPts(getStatValue(data[2], tab))}</div>
            <div className="lb-podium-rank" style={{ background: '#cd7f32' }}>3</div>
          </motion.div>
        </div>
      )}

      {/* Table */}
      <div className="lb-table-wrap">
        <div className={`lb-table-header ${tab === 'balance' ? 'no-extra' : ''}`}>
          <span className="lb-th rank">Rank</span>
          <span className="lb-th player">Player</span>
          <span className="lb-th stat">
            {tab === 'balance' ? 'Balance' : tab === 'weekly' ? 'Weekly Wagered' : 'Total Wagered'}
          </span>
          {tab !== 'balance' && <span className="lb-th extra">Balance</span>}
        </div>

        {loading ? (
          <div className="lb-loading">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="lb-skeleton-row">
                <div className="lb-skeleton" style={{ width: 32 }} />
                <div className="lb-skeleton" style={{ width: 160 }} />
                <div className="lb-skeleton" style={{ width: 100 }} />
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="lb-empty">
            <Trophy size={40} style={{ opacity: 0.15 }} />
            <p>No data yet — start playing to appear here!</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
              {data.map((entry, idx) => {
                const rank  = idx + 1;
                const isMe  = user && entry.username.toLowerCase() === user.name.toLowerCase();
                const isTop3 = rank <= 3;
                const statVal = getStatValue(entry, tab);
                return (
                  <motion.div
                    key={entry.username}
                    className={`lb-row${isTop3 ? ' top3' : ''}${isMe ? ' is-me' : ''}${tab === 'balance' ? ' no-extra' : ''}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(idx * 0.03, 0.3) }}
                    style={isTop3 ? { borderColor: RANK_COLORS[rank-1] + '44', boxShadow: `0 0 16px ${RANK_GLOW[rank-1]}` } : {}}
                  >
                    <div className="lb-cell rank">{getRankIcon(rank)}</div>
                    <div className="lb-cell player">
                      <img
                        className="lb-avatar"
                        src={getAvatar(entry)}
                        alt={entry.username}
                        loading="lazy"
                        onError={e => { e.target.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${entry.username}&backgroundColor=transparent`; }}
                      />
                      <div className="lb-player-info">
                        <span className={`lb-username${isMe ? ' me' : ''}${rank === 1 ? ' gold' : ''}`}>
                          {entry.username}
                          {isMe && <span className="lb-you-tag">YOU</span>}
                        </span>
                      </div>
                    </div>
                    <div className="lb-cell stat">
                      <span className={`lb-stat-val${rank === 1 ? ' gold' : rank <= 3 ? ' silver' : ''}`}>
                        🪙 {formatPts(statVal)}
                      </span>
                    </div>
                    {tab !== 'balance' && (
                      <div className="lb-cell extra">
                        <span className="lb-extra-val">🪙 {formatPts(entry.balance)}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <p className="lb-footer-note">Updates every 30 seconds · Top 50 players shown</p>
    </div>
  );
};
