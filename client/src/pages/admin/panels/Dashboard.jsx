import { motion } from 'framer-motion';
import { Users, Coins, Ban, TrendingUp, Activity, ShieldAlert, Star, Zap } from 'lucide-react';

const fmt = (n) => Math.floor(n ?? 0).toLocaleString();

function StatCard({ icon: Icon, label, value, color, sub, delay = 0 }) {
  return (
    <motion.div
      className={`stat-card color-${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 240, damping: 22 }}
    >
      <div className="stat-icon-wrap">
        <Icon size={20} />
      </div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {sub && <div className="stat-sub">{sub}</div>}
      </div>
    </motion.div>
  );
}

export default function Dashboard({ stats, users, loading }) {
  const topUsers = [...(users || [])]
    .sort((a, b) => (b.balance || 0) - (a.balance || 0))
    .slice(0, 8);

  return (
    <div className="panel-root">
      <div className="panel-header">
        <h2 className="panel-title">Dashboard</h2>
        <p className="panel-sub">Platform overview — real-time statistics</p>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <StatCard icon={Users}       label="Total Users"      value={fmt(stats?.totalUsers)}    color="blue"   delay={0.00} />
        <StatCard icon={Activity}    label="Active Players"   value={fmt(stats?.activeCount)}   color="green"  delay={0.06} />
        <StatCard icon={Ban}         label="Banned"           value={fmt(stats?.bannedCount)}   color="red"    delay={0.12} />
        <StatCard icon={Coins}       label="VAULT in Play"    value={fmt(stats?.totalBalance)}  color="gold"   delay={0.18}
          sub={`≈ $${((stats?.totalBalance || 0) / 600).toFixed(2)} USD`} />
        <StatCard icon={TrendingUp}  label="Total Wagered"    value={fmt(stats?.totalWagered)}  color="purple" delay={0.24} />
        <StatCard icon={Zap}         label="Avg Balance"
          value={stats?.totalUsers ? fmt((stats.totalBalance || 0) / stats.totalUsers) : '—'}
          color="cyan" delay={0.30} />
      </div>

      {/* Two-column lower section */}
      <div className="dash-lower">
        {/* Top balances */}
        <motion.div className="dash-card"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}>
          <div className="dash-card-header">
            <Star size={15} /> Top Balances
          </div>
          <div className="leaderboard">
            {topUsers.map((u, i) => (
              <div className="lb-row" key={u.username}>
                <span className={`lb-rank ${i < 3 ? `top${i+1}` : ''}`}>#{i + 1}</span>
                <img
                  src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${u.username}&backgroundColor=transparent`}
                  className="lb-avatar" alt=""
                />
                <span className="lb-name">{u.username}</span>
                <span className="lb-badge">{u.banned ? '🔴 banned' : '🟢'}</span>
                <span className="lb-bal">{fmt(u.balance)} V</span>
              </div>
            ))}
            {topUsers.length === 0 && <div className="empty-msg">No users yet</div>}
          </div>
        </motion.div>

        {/* Platform health */}
        <motion.div className="dash-card"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.40 }}>
          <div className="dash-card-header">
            <ShieldAlert size={15} /> Platform Health
          </div>
          <div className="health-list">
            <HealthRow label="Backend API" status="online" value="Render Server" />
            <HealthRow label="Users DB" status={stats ? 'online' : 'checking'} value={`${fmt(stats?.totalUsers)} records`} />
            <HealthRow label="Ban rate"
              status={stats?.totalUsers && stats.bannedCount / stats.totalUsers > 0.1 ? 'warn' : 'online'}
              value={stats?.totalUsers ? `${((stats.bannedCount / stats.totalUsers) * 100).toFixed(1)}%` : '—'} />
            <HealthRow label="Total VAULT issued" status="online" value={fmt(stats?.totalBalance)} />
            <HealthRow label="Wagered / Issued"
              status="online"
              value={stats?.totalBalance ? `${((stats.totalWagered / (stats.totalBalance + stats.totalWagered || 1)) * 100).toFixed(1)}%` : '—'} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function HealthRow({ label, status, value }) {
  const dot = status === 'online' ? 'green' : status === 'warn' ? 'gold' : 'gray';
  return (
    <div className="health-row">
      <span className={`health-dot ${dot}`} />
      <span className="health-label">{label}</span>
      <span className="health-value">{value}</span>
    </div>
  );
}
