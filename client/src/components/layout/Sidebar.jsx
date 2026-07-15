import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Rocket, Cherry, Spade, 
  Briefcase, Dices, Bomb, Triangle, 
  TowerControl, CircleDot, Users, Gift, 
  Trophy, Calendar, Crown, ShieldCheck
} from 'lucide-react';
import { ProvablyFairModal } from './ProvablyFairModal';
import './Sidebar.css';

const games = [
  { name: 'Sportsbook', path: '/sports', icon: Trophy, color: 'text-yellow-400' },
  { name: 'Crash', path: '/crash', icon: Rocket },
  { name: 'Slots', path: '/slots', icon: Cherry },
  { name: 'Blackjack', path: '/blackjack', icon: Spade },
  { name: 'Cases', path: '/cases', icon: Briefcase },
  { name: 'Dice', path: '/dice', icon: Dices },
  { name: 'Mines', path: '/mines', icon: Bomb },
  { name: 'Plinko', path: '/plinko', icon: Triangle },
  { name: 'Towers', path: '/towers', icon: TowerControl },
  { name: 'Coinflip', path: '/coinflip', icon: CircleDot },
];

const extras = [
  { name: 'Affiliates', path: '/affiliates', icon: Users },
  { name: 'Rewards', path: '/rewards', icon: Gift },
  { name: 'Leaderboards', path: '/leaderboards', icon: Trophy },
  { name: 'Daily Bonus', path: '/bonus', icon: Calendar },
  { name: 'VIP Club', path: '/vip', icon: Crown, color: 'text-yellow-400' },
];

const NavItem = ({ name, path, icon: Icon, color }) => (
  <NavLink 
    to={path} 
    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
  >
    {({ isActive }) => (
      <>
        {isActive && (
          <motion.div 
            layoutId="active-nav-indicator"
            className="nav-active-bg"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <div className="nav-content">
          <Icon className={`nav-icon ${color || ''}`} size={18} />
          <span>{name}</span>
        </div>
      </>
    )}
  </NavLink>
);

export const Sidebar = () => {
  const [showPF, setShowPF] = useState(false);

  return (
    <aside className="sidebar-left">
      <div className="sidebar-brand">
        <h1>RoVault</h1>
      </div>
      <div className="sidebar-scroll">
        
        <NavItem name="Dashboard" path="/" icon={LayoutDashboard} />
        
        <div className="sidebar-section-box">
          <div className="sidebar-section-title">GAMES</div>
          <nav className="sidebar-nav">
            {games.map(game => (
              <NavItem key={game.name} {...game} />
            ))}
          </nav>
        </div>

        <div className="sidebar-section-box">
          <div className="sidebar-section-title">EXTRAS</div>
          <nav className="sidebar-nav">
            {extras.map(extra => (
              <NavItem key={extra.name} {...extra} />
            ))}
          </nav>
        </div>

        <button className="sidebar-pf-btn" onClick={() => setShowPF(true)}>
          <ShieldCheck size={18} className="pf-btn-icon" />
          Provably Fair
        </button>
        
      </div>

      <ProvablyFairModal isOpen={showPF} onClose={() => setShowPF(false)} />
    </aside>
  );
};

