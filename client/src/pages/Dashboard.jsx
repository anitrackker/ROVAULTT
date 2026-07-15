import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { VaultIcon } from '../components/VaultIcon';
import './Dashboard.css';

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://rovault.onrender.com/api';

const GameCard = ({ title, badge, bgImage, path }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="game-card-image"
      onClick={() => navigate(path)}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="gc-title-overlay">{title.toUpperCase()}</div>
      
      {badge && (
        <div className="gc-badge">
          {badge}
        </div>
      )}
      
      {/* Hover glow effect */}
      <div className="gc-glow" />
    </motion.div>
  );
};

const LiveTicker = () => {
  // Mock data for recent winnings
  const recentWins = [
    { user: 'Player123', amount: 500, game: 'Crash' },
    { user: 'LuckyDog', amount: 1250, game: 'Slots' },
    { user: 'HighRoller', amount: 50, game: 'Mines' },
    { user: 'NoobMaster', amount: 300, game: 'Dice' },
    { user: 'VaultKing', amount: 888, game: 'Plinko' },
    { user: 'Sniper007', amount: 2100, game: 'Blackjack' },
  ];

  return (
    <div className="live-ticker-wrapper">
      <div className="live-ticker-track">
        {/* Render twice for seamless loop */}
        {[...recentWins, ...recentWins, ...recentWins].map((win, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-user">{win.user}</span> won{' '}
            <span className="ticker-amount">
              <VaultIcon size={14} color="#facc15" /> {win.amount}
            </span>{' '}
            in <span className="ticker-game">{win.game}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatTime = (dateStr) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '--:--';
  }
};

const formatAmount = (val) => {
  if (val == null || isNaN(val)) return '0';
  return Math.floor(val).toLocaleString();
};

const LiveBetsTable = () => {
  const [bets, setBets] = useState([]);
  const [newIds, setNewIds] = useState(new Set());
  const prevIdsRef = useRef(new Set());

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const res = await fetch(`${API_URL}/live-feed`);
        const data = await res.json();
        if (data.bets) {
          const currentIds = new Set(data.bets.map(b => b.id));
          const freshIds = new Set();
          currentIds.forEach(id => {
            if (!prevIdsRef.current.has(id)) freshIds.add(id);
          });
          
          setNewIds(freshIds);
          setBets(data.bets.slice(0, 15));
          prevIdsRef.current = currentIds;

          // Clear highlight after animation
          if (freshIds.size > 0) {
            setTimeout(() => setNewIds(new Set()), 2500);
          }
        }
      } catch (e) { /* silent */ }
    };

    fetchBets();
    const interval = setInterval(fetchBets, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-bets-section">
      <div className="section-header">
        <h2>
          <span className="lb-dot" />
          Live Bets
        </h2>
      </div>

      <div className="live-bets-table-wrapper">
        <table className="live-bets-table">
          <thead>
            <tr>
              <th>Game</th>
              <th>Username</th>
              <th>Amount</th>
              <th>Multiplier</th>
              <th>Payout</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {bets.length === 0 ? (
                <tr className="lb-empty-row">
                  <td colSpan="6">No bets yet — be the first!</td>
                </tr>
              ) : (
                bets.map((bet) => {
                  const multiplier = bet.amount > 0 ? (bet.potentialPayout / bet.amount) : 0;
                  const isWin = bet.potentialPayout > 0;
                  const isNew = newIds.has(bet.id);

                  return (
                    <motion.tr
                      key={bet.id}
                      className={`lb-row${isNew ? ' lb-row-new' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="lb-game">
                        <div className="lb-flex-cell">
                          <span className="lb-game-icon">{getGameIcon(bet.game)}</span>
                          {bet.game}
                        </div>
                      </td>
                      <td className="lb-username">
                        <div className="lb-flex-cell">
                          <img 
                            src={bet.avatarUrl || `https://api.dicebear.com/9.x/avataaars/svg?seed=${bet.username}&backgroundColor=transparent`} 
                            alt="avatar" 
                            className="lb-avatar" 
                          />
                          <span className="lb-truncate">{bet.username}</span>
                        </div>
                      </td>
                      <td className="lb-amount">
                        <div className="lb-flex-cell">
                          <VaultIcon size={14} color="#818ebb" />
                          <span>{formatAmount(bet.amount)}</span>
                        </div>
                      </td>
                      <td className="lb-multiplier">
                        <span className={multiplier >= 2 ? 'lb-mult-high' : ''}>
                          x{multiplier.toFixed(2)}
                        </span>
                      </td>
                      <td className={`lb-payout ${isWin ? 'lb-payout-win' : 'lb-payout-loss'}`}>
                        <div className="lb-flex-cell">
                          <VaultIcon size={14} color={isWin ? '#05d3dd' : 'rgba(255,255,255,0.4)'} />
                          <span>
                            {isWin ? '+' : ''}{formatAmount(bet.potentialPayout)}
                          </span>
                        </div>
                      </td>
                      <td className="lb-time">{formatTime(bet.time)}</td>
                    </motion.tr>
                  );
                })
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

function getGameIcon(game) {
  const g = (game || '').toLowerCase();
  if (g.includes('crash')) return '🚀';
  if (g.includes('dice')) return '🎲';
  if (g.includes('mine')) return '💎';
  if (g.includes('plinko')) return '📍';
  if (g.includes('blackjack')) return '🃏';
  if (g.includes('slot') || g.includes('roulette')) return '🎰';
  if (g.includes('case')) return '📦';
  if (g.includes('coinflip') || g.includes('coin')) return '🪙';
  return '🎮';
}

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      
      {/* LIVE TICKER */}
      <LiveTicker />

      {/* HERO BANNER */}
      <motion.div 
        className="hero-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="hero-text">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            PLAY. WIN. <span className="text-gradient">REPEAT.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your favorite games.<br/>
            Real rewards.<br/>
            Instant withdrawals.
          </motion.p>
          <motion.button 
            className="btn btn-primary btn-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Play Now
          </motion.button>
        </div>
        
        {/* Rendered Graphics Placeholder */}
        <div className="hero-visual" style={{ position: 'relative' }}>
          <motion.div 
            className="hero-3d-element"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            style={{ position: 'relative', zIndex: 5, filter: 'drop-shadow(0 20px 30px rgba(59, 130, 246, 0.4))' }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '150px', height: '150px', filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))' }}>
              <rect x="5" y="5" width="90" height="90" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="4" />
              <rect x="15" y="15" width="70" height="70" rx="5" fill="#1e2433" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="3" />
              <circle cx="22" cy="22" r="3" fill="#3b82f6" />
              <circle cx="78" cy="22" r="3" fill="#3b82f6" />
              <circle cx="22" cy="78" r="3" fill="#3b82f6" />
              <circle cx="78" cy="78" r="3" fill="#3b82f6" />
              <rect x="8" y="30" width="8" height="12" rx="2" fill="#3b82f6" />
              <rect x="8" y="58" width="8" height="12" rx="2" fill="#3b82f6" />
              <circle cx="50" cy="50" r="22" fill="#0f172a" stroke="#facc15" strokeWidth="3" />
              <line x1="50" y1="28" x2="50" y2="72" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
              <line x1="28" y1="50" x2="72" y2="50" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
              <line x1="34" y1="34" x2="66" y2="66" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
              <line x1="34" y1="66" x2="66" y2="34" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="50" r="10" fill="#facc15" />
              {/* V Logo on cap */}
              <line x1="48" y1="45" x2="48" y2="55" stroke="#000" strokeWidth="1" />
              <line x1="52" y1="45" x2="52" y2="55" stroke="#000" strokeWidth="1" />
              <polyline points="45,46 50,54 55,46" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </motion.div>
          
          {/* Spilling Coins */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              style={{ position: 'absolute', color: '#facc15', zIndex: 4, bottom: '-20px', left: '50%' }}
              animate={{
                y: [0, Math.random() * 50 + 50],
                x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 150],
                rotate: [0, Math.random() * 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
            >
              <VaultIcon size={24} />
            </motion.div>
          ))}
          <div className="hero-glow-orb" />
        </div>
      </motion.div>

      {/* POPULAR GAMES */}
      <div className="section-header">
        <h2>Popular Games</h2>
        <a href="#" className="view-all">View All {'>'}</a>
      </div>

      <motion.div 
        className="games-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, staggerChildren: 0.1 }}
      >
        <GameCard title="Crash" badge="Popular" bgImage="/games/Crash.png" path="/crash" />
        <GameCard title="Slots" badge="Popular" bgImage="/games/Roulette.png" path="/slots" />
        <GameCard title="Blackjack" badge="New Release" bgImage="/games/BlackJack.png" path="/blackjack" />
        <GameCard title="Cases" badge="Popular" bgImage="/games/Cases.png" path="/cases" />
        <GameCard title="Dice" badge="Popular" bgImage="/games/Dies.png" path="/dice" />
        <GameCard title="Mines" badge="New Release" bgImage="/games/Mines.png" path="/mines" />
      </motion.div>

      {/* LIVE BETS TABLE */}
      <LiveBetsTable />

    </div>
  );
};
