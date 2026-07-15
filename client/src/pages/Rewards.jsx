import { useState, useEffect } from 'react';
import { useStore, formatPts } from '../store/useStore';
import { VaultIcon } from '../components/VaultIcon';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Zap, Shield } from 'lucide-react';
import { playWin, playTick } from '../utils/SoundEngine';
import confetti from 'canvas-confetti';
import './Rewards.css';

const REWARD_AMOUNTS = [
  { val: 100, weight: 50 },
  { val: 250, weight: 30 },
  { val: 500, weight: 12 },
  { val: 1000, weight: 5 },
  { val: 5000, weight: 2 },
  { val: 30000, weight: 1 }
];

export const Rewards = () => {
  const { user, updateBalance } = useStore();
  const [lastClaim, setLastClaim] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isOpening, setIsOpening] = useState(false);
  const [wonAmount, setWonAmount] = useState(null);
  const [spinItems, setSpinItems] = useState([]);
  const [trackX, setTrackX] = useState(0);

  useEffect(() => {
    if (!user) return;
    
    // Fetch user's claim data directly from DB to be accurate
    const fetchClaim = async () => {
      const { data } = await supabase.from('users').select('last_reward_claim').eq('username', user.name).single();
      if (data) {
        setLastClaim(data.last_reward_claim || 0);
      }
    };
    fetchClaim();
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!lastClaim) return;
      
      const now = Date.now();
      const nextClaim = lastClaim + (24 * 60 * 60 * 1000); // 24 hours
      
      if (now >= nextClaim) {
        setTimeLeft(null);
      } else {
        const diff = nextClaim - now;
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lastClaim]);

  const openVault = async () => {
    if (timeLeft || isOpening) return;
    setIsOpening(true);
    setWonAmount(null);
    playTick();

    // Pick random reward based on weights
    const totalWeight = REWARD_AMOUNTS.reduce((sum, item) => sum + item.weight, 0);
    let rand = Math.random() * totalWeight;
    let prize = REWARD_AMOUNTS[0].val;
    for (let item of REWARD_AMOUNTS) {
      if (rand < item.weight) {
        prize = item.val;
        break;
      }
      rand -= item.weight;
    }

    // Generate wheel items (40 items, prize at index 35)
    const items = Array.from({ length: 45 }, (_, i) => {
      if (i === 38) return prize;
      const r = Math.random() * totalWeight;
      let fake = REWARD_AMOUNTS[0].val;
      let rr = r;
      for (let item of REWARD_AMOUNTS) {
        if (rr < item.weight) { fake = item.val; break; }
        rr -= item.weight;
      }
      return fake;
    });
    setSpinItems(items);
    setTrackX(0);

    // Start spin animation
    requestAnimationFrame(() => {
      setTrackX(-(38 * 120) + 120); // 120px width per item
    });

    let ticks = 0;
    const tickInterval = setInterval(() => {
      ticks++;
      if (ticks < 20) playTick(); else clearInterval(tickInterval);
    }, 200);

    // Wait for spin to finish
    setTimeout(async () => {
      const now = Date.now();
      
      // Update local state
      setWonAmount(prize);
      setLastClaim(now);
      setIsOpening(false);
      updateBalance(prize);
      playWin();
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });

      // Persist to DB
      if (user) {
        await supabase.rpc('increment_balance', { u_name: user.name, amt: prize });
        await supabase.from('users').update({ last_reward_claim: now }).eq('username', user.name);
      }
    }, 4500);
  };

  return (
    <div className="rewards-page">
      <div className="rewards-header">
        <h1>Daily Rewards</h1>
        <p>Unlock your vault every 24 hours for massive Vault Bucks payouts.</p>
      </div>

      <div className="vault-section">
        <div className="vault-glow" />
        
        <motion.div 
          className={`vault-graphic ${timeLeft ? 'disabled' : ''}`}
          onClick={openVault}
          animate={isOpening ? {
            scale: [1, 1.03, 1],
          } : {}}
          transition={{ duration: 0.5, repeat: isOpening ? Infinity : 0 }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '180px', height: '180px', filter: timeLeft ? 'grayscale(1) opacity(0.5)' : 'drop-shadow(0 20px 40px rgba(59, 130, 246, 0.4))', transition: '0.3s' }}>
            <rect x="5" y="5" width="90" height="90" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="4" />
            <rect x="15" y="15" width="70" height="70" rx="5" fill="#1e2433" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="3" />
            <circle cx="22" cy="22" r="3" fill="#3b82f6" />
            <circle cx="78" cy="22" r="3" fill="#3b82f6" />
            <circle cx="22" cy="78" r="3" fill="#3b82f6" />
            <circle cx="78" cy="78" r="3" fill="#3b82f6" />
            <rect x="8" y="30" width="8" height="12" rx="2" fill="#3b82f6" />
            <rect x="8" y="58" width="8" height="12" rx="2" fill="#3b82f6" />
            
            {/* Spinning Wheel Mechanism */}
            <motion.g
              animate={isOpening ? { rotate: [0, 1080] } : {}}
              transition={{ duration: 4.5, ease: [0.1, 0.8, 0.1, 1] }}
              style={{ transformOrigin: '50px 50px' }}
            >
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
            </motion.g>
          </svg>
        </motion.div>

        <div className="vault-status">
          <AnimatePresence mode="wait">
            {wonAmount ? (
              <motion.div
                key="won"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#facc15' }}
              >
                <h2>+{formatPts(wonAmount)} VAULT</h2>
                <p>Come back tomorrow for more!</p>
              </motion.div>
            ) : isOpening ? (
              <motion.div key="spinning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                <div style={{ position: 'relative', height: '80px', overflow: 'hidden', background: '#0a0c16', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '4px', background: '#ef4444', transform: 'translateX(-50%)', zIndex: 10, boxShadow: '0 0 10px #ef4444' }} />
                  <motion.div 
                    style={{ display: 'flex', height: '100%', alignItems: 'center' }}
                    animate={{ x: trackX }}
                    transition={{ duration: 4.5, ease: [0.1, 0.8, 0.1, 1] }}
                  >
                    {spinItems.map((amt, idx) => (
                      <div key={idx} style={{ minWidth: '120px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: amt >= 5000 ? '#facc15' : '#fff', fontSize: amt >= 5000 ? '20px' : '16px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                        {formatPts(amt)}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ) : timeLeft ? (
              <motion.div key="timer" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2>Vault Locked</h2>
                <div className="vault-timer">{timeLeft}</div>
              </motion.div>
            ) : (
              <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2>Ready to Unlock!</h2>
                <p>Click the vault to claim your daily reward.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="rewards-grid">
        <div className="reward-card">
          <div className="rc-icon"><Zap /></div>
          <div className="rc-title">Playtime Bonus</div>
          <div className="rc-desc">Play 10 games to unlock a special bonus case.</div>
          <div className="rc-progress">
            <div className="rc-fill" style={{ width: '40%' }} />
          </div>
          <button className="rc-btn" disabled>4 / 10 Games</button>
        </div>

        <div className="reward-card">
          <div className="rc-icon" style={{ color: '#a855f7' }}><Shield /></div>
          <div className="rc-title">Weekly Challenge</div>
          <div className="rc-desc">Wager 50,000 Vault Bucks this week.</div>
          <div className="rc-progress">
            <div className="rc-fill" style={{ width: '15%', background: '#a855f7' }} />
          </div>
          <button className="rc-btn" disabled>In Progress</button>
        </div>

        <div className="reward-card">
          <div className="rc-icon" style={{ color: '#ef4444' }}><Gift /></div>
          <div className="rc-title">Promo Code</div>
          <div className="rc-desc">Have a special promo code from our Twitter?</div>
          <input type="text" placeholder="Enter code..." style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', color: '#fff', marginBottom: '15px' }} />
          <button className="rc-btn">Redeem Code</button>
        </div>
      </div>

    </div>
  );
};
