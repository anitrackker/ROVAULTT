import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, Cherry, Spade, Briefcase, 
  Dices, Bomb, Triangle, Crown 
} from 'lucide-react';
import { VaultIcon } from '../components/VaultIcon';
import './Dashboard.css';

const GameCard = ({ title, desc, icon: Icon, color, path }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="game-card"
      onClick={() => navigate(path)}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="gc-icon-wrapper" style={{ color: color || 'var(--text-main)' }}>
        <Icon size={48} strokeWidth={1.5} />
      </div>
      <div className="gc-title">{title}</div>
      <div className="gc-desc">{desc}</div>
      <motion.button 
        className="btn btn-outline-green w-full"
        whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-green)', color: '#000' }}
        whileTap={{ scale: 0.95 }}
      >
        Play Now
      </motion.button>
      
      {/* Hover glow effect */}
      <div className="gc-glow" />
    </motion.div>
  );
};

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      
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
        <GameCard title="Crash" desc="Cash out before you crash." icon={Rocket} path="/crash" />
        <GameCard title="Slots" desc="Spin and win big prizes." icon={Cherry} path="/slots" />
        <GameCard title="Blackjack" desc="Classic game, skill meets luck." icon={Spade} path="/blackjack" />
        <GameCard title="Cases" desc="Open cases, win rewards." icon={Briefcase} path="/cases" />
        
        <GameCard title="Dice" desc="Roll the dice, win big." icon={Dices} path="/dice" />
        <GameCard title="Mines" desc="Avoid the mines, win big." icon={Bomb} path="/mines" />
        <GameCard title="Plinko" desc="Drop, bounce, and multiply." icon={Triangle} path="/plinko" />
        <GameCard title="VIP Club" desc="Exclusive rewards & benefits." icon={Crown} color="#facc15" path="/vip" />
      </motion.div>

    </div>
  );
};
