import { useState } from 'react';
import { useStore, formatPts } from '../../store/useStore';
import { ThemedBackdrop } from './ThemedBackdrop';
import { HelpCircle, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { playTick, playWin, playLose } from '../../utils/SoundEngine';
import { VaultIcon } from '../../components/VaultIcon';
import confetti from 'canvas-confetti';
import './Games.css';
import './Cases.css';

const CASE_ITEMS = [
  { name: 'Brown Hair',       val: 2,    tier: 'gray',   color: '#6b7280', image: 'https://tr.rbxcdn.com/393246ebc636f3dbcbcfd26c11b1bf05/420/420/Hat/Png' },
  { name: 'Shaggy',           val: 5,    tier: 'gray',   color: '#6b7280', image: 'https://tr.rbxcdn.com/3bd912643a6d716d10db9f18ddf0b6e1/420/420/Hat/Png' },
  { name: 'Roblox Visor',     val: 10,   tier: 'gray',   color: '#6b7280', image: 'https://tr.rbxcdn.com/b09ecb7858c82ab0868f0edfa3db44de/420/420/Hat/Png' },
  { name: 'Playful Vampire',  val: 25,   tier: 'blue',   color: '#3b82f6', image: 'https://tr.rbxcdn.com/5f9df2593b4a242f2ed8ddafcf87eeb6/420/420/Hat/Png' },
  { name: 'Valkyrie Helm',    val: 100,  tier: 'purple', color: '#a855f7', image: 'https://tr.rbxcdn.com/f0449d03158c8a14b531dc1b4c9597bb/420/420/Hat/Png' },
  { name: 'Violet Valkyrie',  val: 150,  tier: 'purple', color: '#a855f7', image: 'https://tr.rbxcdn.com/f9a531e21b066cfbe422cfb41199320e/420/420/Hat/Png' },
  { name: 'Dominus Infernus', val: 500,  tier: 'gold',   color: '#eab308', image: 'https://tr.rbxcdn.com/2b34a6552a44bb4e3c35b80a184e9c73/420/420/Hat/Png' },
  { name: 'Domino Crown',     val: 1000, tier: 'gold',   color: '#eab308', image: 'https://tr.rbxcdn.com/f73e72dc8ec17dcc0a4f5f8b9ec6c8e3/420/420/Hat/Png' },
  { name: 'Korblox Leg',      val: 5000, tier: 'red',    color: '#ef4444', image: 'https://tr.rbxcdn.com/5bd42bcead3b0f5be508e682e3c01c05/420/420/Avatar/Png' },
];

const ITEM_W = 120;
const TICKER_INDEX = 45;

const pickItem = () => {
  const r = Math.random();
  if (r > 0.995) return CASE_ITEMS[8]; // Korblox (0.5%)
  if (r > 0.98) return CASE_ITEMS[7]; // Domino Crown (1.5%)
  if (r > 0.94) return CASE_ITEMS[6]; // Dominus (4%)
  if (r > 0.88) return CASE_ITEMS[5]; // Violet Valkyrie (6%)
  if (r > 0.78) return CASE_ITEMS[4]; // Valkyrie Helm (10%)
  if (r > 0.58) return CASE_ITEMS[3]; // Playful Vampire (20%)
  if (r > 0.38) return CASE_ITEMS[2]; // Visor (20%)
  if (r > 0.18) return CASE_ITEMS[1]; // Shaggy (20%)
  return CASE_ITEMS[0]; // Brown Hair (18%)
};

export const Cases = () => {
  const { balance, updateBalance } = useStore();
  const [bet, setBet] = useState(50);
  const [isOpening, setIsOpening] = useState(false);
  const [items, setItems] = useState([]);
  const [wonItem, setWonItem] = useState(null);
  const [trackX, setTrackX] = useState(0);
  const [totalOpens, setTotalOpens] = useState(0);
  const [bestWin, setBestWin] = useState(0);

  const openCase = () => {
    if (balance < bet || isOpening) return;
    updateBalance(-bet);
    setIsOpening(true);
    setWonItem(null);
    playTick();

    const winner = pickItem();
    const newItems = Array.from({ length: 60 }, (_, i) => i === TICKER_INDEX ? winner : pickItem());
    setItems(newItems);

    const targetX = -(TICKER_INDEX * ITEM_W) + 240;
    setTrackX(0);

    let ticks = 0;
    const tickInterval = setInterval(() => {
      ticks++;
      if (ticks < 20) playTick(); else clearInterval(tickInterval);
    }, 150);

    setTimeout(() => {
      setIsOpening(false);
      setWonItem(winner);
      updateBalance(winner.val);
      setTotalOpens(n => n + 1);
      if (winner.val > bestWin) setBestWin(winner.val);
      if (winner.tier === 'purple' || winner.tier === 'gold') {
        playWin();
        confetti({ particleCount: 80 });
      } else {
        if (winner.val >= bet) playWin(); else playLose();
      }
    }, 4000);

    requestAnimationFrame(() => setTrackX(targetX));
  };

  return (
    <div className="game-layout">
      <div className="game-control-panel">
        <div className="ctrl-input-group">
          <div className="ctrl-label">Bet amount</div>
          <div className="ctrl-input-wrap">
            <span className="currency-symbol"><VaultIcon size={15} /></span>
            <input type="number" value={bet}
              onChange={(e) => setBet(Math.max(1, parseInt(e.target.value) || 0))} />
            <button className="quick-btn" onClick={() => setBet(Math.max(1, Math.floor(bet / 2)))} disabled={isOpening}>1/2</button>
            <button className="quick-btn" onClick={() => setBet(bet * 2)} disabled={isOpening}>2x</button>
          </div>
        </div>

        <button className="btn-game-submit" onClick={openCase} disabled={isOpening}>
          {isOpening ? 'Opening...' : 'Open Case'}
        </button>

        {/* Paytable */}
        <div className="ctrl-label">Paytable</div>
        <div className="paytable">
          {CASE_ITEMS.slice().reverse().map(item => (
            <div className="paytable-row" key={item.name} style={{ borderLeft: `3px solid ${item.color}` }}>
              <span className="paytable-symbols" style={{ color: item.color }}>{item.name}</span>
              <span className="paytable-payout">{formatPts(item.val)}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="game-stats-grid">
          <div className="game-stat-item">
            <span className="stat-label">Opens</span>
            <span className="stat-value">{totalOpens}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Best win</span>
            <span className="stat-value gold">{bestWin > 0 ? formatPts(bestWin) : '—'}</span>
          </div>
        </div>
      </div>

      <div className="game-viewport cases-viewport">
        <ThemedBackdrop />
        <div className="viewport-top-overlay">
          <div />
          <div className="viewport-controls">
            <button className="vp-icon-btn"><HelpCircle size={18} /></button>
            <button className="vp-badge-btn"><History size={14} style={{ marginRight: 6 }} /> History</button>
          </div>
        </div>

        <div className="viewport-content cases-content">
          <div className="roulette-wrapper">
            <div className="ticker" />
            <motion.div className="items-track"
              animate={{ x: isOpening ? trackX : 0 }}
              transition={isOpening ? { duration: 4, ease: [0.1, 0.8, 0.1, 1] } : { duration: 0 }}>
              {items.map((item, idx) => (
                <div key={idx} className={`case-item tier-${item.tier}`} style={{ borderColor: item.color, boxShadow: `inset 0 0 20px ${item.color}22` }}>
                  <img src={item.image} alt={item.name} className="item-icon" style={{ width: '80px', height: '80px', objectFit: 'contain', filter: `drop-shadow(0 0 10px ${item.color}88)` }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                  <span className="item-icon-fallback" style={{ display: 'none', fontSize: '32px' }}>📦</span>
                  <span className="item-name" style={{ textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '95%', fontSize: '12px', marginTop: '4px' }}>{item.name}</span>
                  <span className="item-val" style={{ color: item.color, fontWeight: 'bold' }}>{formatPts(item.val)}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {wonItem && (
            <div className="win-display" style={{ color: wonItem.color }}>
              You won: {wonItem.name} ({formatPts(wonItem.val)} VAULT)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
