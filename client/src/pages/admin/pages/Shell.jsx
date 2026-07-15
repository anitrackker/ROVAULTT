import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Ban, Coins,
  LogOut, Activity,
  ChevronRight, RefreshCw,
  Shield, Wallet, TrendingUp, ShieldAlert, CreditCard
} from 'lucide-react';
import { api } from '../api.js';
import Dashboard from '../panels/Dashboard.jsx';
import UsersPanel from '../panels/UsersPanel.jsx';
import BanPanel from '../panels/BanPanel.jsx';
import BalancePanel from '../panels/BalancePanel.jsx';
import ActivityPanel from '../panels/ActivityPanel.jsx';
import PromoPanel from '../panels/PromoPanel.jsx';
import WalletPanel from '../panels/WalletPanel.jsx';
import PayoutPanel from '../panels/PayoutPanel.jsx';
import LiveBetsPanel from '../panels/LiveBetsPanel.jsx';
import AnalyticsPanel from '../panels/AnalyticsPanel.jsx';
import RiskPanel from '../panels/RiskPanel.jsx';

const NAV = [
  { id: 'dashboard',  label: 'Dashboard',      icon: LayoutDashboard },
  { id: 'users',      label: 'All Users',       icon: Users },
  { id: 'balance',    label: 'Balance Manager', icon: Coins },
  { id: 'bans',       label: 'Ban Manager',     icon: Ban },
  { id: 'activity',   label: 'Activity Log',    icon: Activity },
  { id: 'promos',     label: 'Promo Codes',     icon: Shield },
  { id: 'wallets',    label: 'Wallet Manager',  icon: Wallet },
  { id: 'payouts',    label: 'Payouts Queue',   icon: CreditCard },
  { id: 'livebets',   label: 'Global Live Bets', icon: Activity },
  { id: 'analytics',  label: 'PnL Analytics',   icon: TrendingUp },
  { id: 'risk',       label: 'Risk Radar',      icon: ShieldAlert },
];

export default function Shell({ onLogout }) {
  const [panel, setPanel]   = useState('dashboard');
  const [stats, setStats]   = useState(null);
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [s, u] = await Promise.all([api.stats(), api.users()]);
      setStats(s);
      setUsers(u.users || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setLastRefresh(Date.now());
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // Auto-refresh every 30s
  useEffect(() => {
    const t = setInterval(refresh, 30000);
    return () => clearInterval(t);
  }, [refresh]);

  const panelProps = { users, stats, refresh, loading };

  return (
    <motion.div
      className="shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── SIDEBAR ── */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon"><Shield size={20} color="#a855f7" /></div>
          <div>
            <div className="brand-name">RoVault</div>
            <div className="brand-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${panel === id ? 'active' : ''}`}
              onClick={() => setPanel(id)}
            >
              <Icon size={17} className="nav-icon" />
              <span>{label}</span>
              {panel === id && (
                <motion.div className="nav-active-bg" layoutId="nav-pill"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
              )}
              <ChevronRight size={13} className="nav-chevron" />
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="refresh-info">
            Last refresh: {new Date(lastRefresh).toLocaleTimeString()}
          </div>
          <button className="sidebar-action-btn" onClick={refresh}>
            <RefreshCw size={14} />  Refresh data
          </button>
          <button className="sidebar-action-btn danger" onClick={onLogout}>
            <LogOut size={14} />  Sign out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="shell-main">
        {/* Top bar */}
        <header className="shell-topbar">
          <div className="topbar-breadcrumb">
            <span className="crumb-root">Admin</span>
            <ChevronRight size={13} className="crumb-sep" />
            <span className="crumb-current">{NAV.find(n => n.id === panel)?.label}</span>
          </div>
          <div className="topbar-right">
            <div className={`live-badge ${loading ? 'syncing' : ''}`}>
              <span className="live-dot" />
              {loading ? 'Syncing...' : 'Live'}
            </div>
            <button className="topbar-icon-btn" onClick={refresh} title="Refresh">
              <RefreshCw size={15} className={loading ? 'spin' : ''} />
            </button>
          </div>
        </header>

        {/* Panel content */}
        <div className="shell-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={panel}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{ height: '100%' }}
            >
              {panel === 'dashboard' && <Dashboard {...panelProps} />}
              {panel === 'users'     && <UsersPanel {...panelProps} />}
              {panel === 'balance'   && <BalancePanel {...panelProps} />}
              {panel === 'bans'      && <BanPanel {...panelProps} />}
              {panel === 'activity'  && <ActivityPanel {...panelProps} />}
              {panel === 'promos'    && <PromoPanel {...panelProps} />}
              {panel === 'wallets'   && <WalletPanel {...panelProps} />}
              {panel === 'payouts'   && <PayoutPanel {...panelProps} />}
              {panel === 'livebets'  && <LiveBetsPanel {...panelProps} />}
              {panel === 'analytics' && <AnalyticsPanel {...panelProps} />}
              {panel === 'risk'      && <RiskPanel {...panelProps} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
