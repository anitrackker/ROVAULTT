import { useLocation } from 'react-router-dom';

const LABELS = {
  '/affiliates':   { title: 'Affiliates',    icon: '🤝' },
  '/rewards':      { title: 'Rewards',        icon: '🎁' },
  '/leaderboards': { title: 'Leaderboards',   icon: '🏆' },
  '/bonus':        { title: 'Daily Bonus',    icon: '📅' },
  '/vip':          { title: 'VIP Club',       icon: '👑' },
};

export const ComingSoon = () => {
  const { pathname } = useLocation();
  const meta = LABELS[pathname] || { title: 'Coming Soon', icon: '🚧' };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60vh',
      gap: 16,
      color: 'rgba(255,255,255,0.6)',
      textAlign: 'center',
    }}>
      <span style={{ fontSize: 64 }}>{meta.icon}</span>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: 'white', margin: 0 }}>{meta.title}</h2>
      <p style={{ fontSize: 15, margin: 0 }}>This feature is coming soon. Stay tuned!</p>
    </div>
  );
};
