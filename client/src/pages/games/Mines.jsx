import { VaultIcon } from '../../components/VaultIcon';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useStore, formatPts } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, History } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Games.css';
import './Mines.css';

/* ─── Sound Engine ─── */
const Sound = {
  _ctx: null,
  ctx() {
    if (!this._ctx) this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  },
  gem() {
    const c = this.ctx(), now = c.currentTime;
    [523.25, 659.25, 783.99].forEach((f, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0, now + i * 0.07);
      g.gain.linearRampToValueAtTime(0.15, now + i * 0.07 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35);
      o.connect(g); g.connect(c.destination);
      o.start(now + i * 0.07); o.stop(now + i * 0.07 + 0.35);
    });
  },
  mine() {
    const c = this.ctx(), now = c.currentTime;
    // Layer 1: deep rumble
    const o1 = c.createOscillator(), g1 = c.createGain();
    o1.type = 'sawtooth';
    o1.frequency.setValueAtTime(150, now);
    o1.frequency.exponentialRampToValueAtTime(25, now + 0.6);
    g1.gain.setValueAtTime(0.25, now);
    g1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    o1.connect(g1); g1.connect(c.destination);
    o1.start(now); o1.stop(now + 0.6);
    // Layer 2: crackle
    const o2 = c.createOscillator(), g2 = c.createGain();
    o2.type = 'square';
    o2.frequency.setValueAtTime(90, now);
    o2.frequency.exponentialRampToValueAtTime(15, now + 0.4);
    g2.gain.setValueAtTime(0.08, now);
    g2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    o2.connect(g2); g2.connect(c.destination);
    o2.start(now); o2.stop(now + 0.4);
  },
  win() {
    const c = this.ctx(), now = c.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0, now + i * 0.1);
      g.gain.linearRampToValueAtTime(0.12, now + i * 0.1 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.6);
      o.connect(g); g.connect(c.destination);
      o.start(now + i * 0.1); o.stop(now + i * 0.1 + 0.6);
    });
  },
  click() {
    const c = this.ctx(), now = c.currentTime;
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine'; o.frequency.value = 1200;
    g.gain.setValueAtTime(0.04, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    o.connect(g); g.connect(c.destination);
    o.start(now); o.stop(now + 0.06);
  }
};

/* ─── Component ─── */
export const Mines = () => {
  const { balance, updateBalance } = useStore();
  const [bet, setBet] = useState(25);
  const [minesCount, setMinesCount] = useState(3);
  const [gridSize, setGridSize] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [pickCount, setPickCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1.00);
  const [revealOrder, setRevealOrder] = useState(0);

  const initGrid = useCallback(() => {
    const total = gridSize * gridSize;
    setTiles(Array.from({ length: total }, (_, i) => ({
      id: i, isMine: false, revealed: false, status: 'idle'
    })));
    setPickCount(0);
    setMultiplier(1.00);
    setRevealOrder(0);
  }, [gridSize]);

  useEffect(() => {
    // Cap mines count when grid shrinks
    const maxMines = gridSize * gridSize - 1;
    if (minesCount > maxMines) setMinesCount(Math.min(3, maxMines));
    initGrid();
  }, [gridSize, initGrid]);

  const startGame = () => {
    if (balance < bet) return;
    updateBalance(-bet);
    setIsPlaying(true);
    Sound.click();

    setTiles(prev => prev.map(t => ({
      ...t, isMine: false, revealed: false, status: 'idle'
    })));
    setPickCount(0);
    setMultiplier(1.00);
    setRevealOrder(0);
  };

  const handleTileClick = (idx) => {
    if (!isPlaying || tiles[idx].revealed) return;

    const total = gridSize * gridSize;
    const remainingUnrevealed = total - pickCount;
    // Calculate probability dynamically with a 5% house edge rigging
    const trueProb = minesCount / remainingUnrevealed;
    const riggedProb = Math.min(1.0, trueProb * 1.05); // Rigged to favor house slightly
    const isBust = Math.random() < riggedProb;

    let updated = [...tiles];
    const nextOrder = revealOrder + 1;

    if (isBust) {
      // BUST — dynamically generate mines including the clicked one
      const availableIds = updated.filter(t => !t.revealed && t.id !== idx).map(t => t.id);
      const mineLocs = [idx];
      while (mineLocs.length < minesCount && availableIds.length > 0) {
        const randIdx = Math.floor(Math.random() * availableIds.length);
        mineLocs.push(availableIds[randIdx]);
        availableIds.splice(randIdx, 1);
      }

      updated = updated.map((t) => {
        if (mineLocs.includes(t.id)) {
          return { ...t, isMine: true, revealed: true, status: 'mine', order: nextOrder };
        }
        return { ...t, isMine: false, revealed: true, status: t.status === 'gem' ? 'gem' : 'idle', order: nextOrder };
      });
      setTiles(updated);
      setIsPlaying(false);
      setRevealOrder(nextOrder);
      useStore.getState().logGameResult('Mines', bet, 0, `Hit bomb on pick ${pickCount + 1}`);
      Sound.mine();
    } else {
      // GEM found
      updated[idx] = { ...updated[idx], isMine: false, revealed: true, status: 'gem', order: nextOrder };
      const newPicks = pickCount + 1;
      setPickCount(newPicks);
      setTiles(updated);
      setRevealOrder(nextOrder);
      Sound.gem();

      const mult = calcMultiplier(newPicks);
      setMultiplier(mult);

      if (newPicks === total - minesCount) cashOut(mult, updated);
    }
  };

  const calcMultiplier = (picks) => {
    const total = gridSize * gridSize;
    let m = 0.98;
    for (let i = 0; i < picks; i++) m *= (total - i) / (total - minesCount - i);
    return parseFloat(m.toFixed(2));
  };

  const cashOut = (mult = multiplier, currentTiles = tiles) => {
    if (!isPlaying) return;
    setIsPlaying(false);
    const winAmt = bet * mult;
    updateBalance(winAmt);
    useStore.getState().logGameResult('Mines', bet, winAmt, `${mult.toFixed(2)}x Cashout`);
    Sound.win();
    confetti({ particleCount: 80, spread: 60 });

    // Generate mines on remaining unrevealed tiles to show them
    const availableIds = currentTiles.filter(t => !t.revealed).map(t => t.id);
    const mineLocs = [];
    while (mineLocs.length < minesCount && availableIds.length > 0) {
      const randIdx = Math.floor(Math.random() * availableIds.length);
      mineLocs.push(availableIds[randIdx]);
      availableIds.splice(randIdx, 1);
    }

    setTiles(currentTiles.map(t => ({
      ...t, 
      revealed: true,
      isMine: mineLocs.includes(t.id),
      status: mineLocs.includes(t.id) ? 'mine' : (t.status === 'gem' ? 'gem' : 'idle')
    })));
  };

  const maxMines = gridSize * gridSize - 1;

  return (
    <div className="game-layout">

      {/* SIDEBAR */}
      <div className="game-control-panel">
        <div className="panel-tabs">
          <button className="panel-tab active">Manual</button>
        </div>

        <div className="ctrl-input-group">
          <div className="ctrl-label">Bet amount</div>
          <div className="ctrl-input-wrap">
            <span className="currency-symbol"><VaultIcon size={15} /></span>
            <input
              type="number"
              value={bet}
              onChange={(e) => setBet(Math.max(1, parseInt(e.target.value) || 0))}
            />
            <button className="quick-btn" onClick={() => setBet(Math.max(1, Math.floor(bet / 2)))}>1/2</button>
            <button className="quick-btn" onClick={() => setBet(bet * 2)}>2x</button>
          </div>
        </div>

        <div className="ctrl-input-group">
          <div className="ctrl-label">Mines</div>
          <div className="mines-select-row">
            {[1, 3, 5, 10, 15, 20].filter(c => c <= maxMines).map(cnt => (
              <button
                key={cnt}
                className={`mines-btn ${minesCount === cnt ? 'active' : ''}`}
                onClick={() => setMinesCount(cnt)}
                disabled={isPlaying}
              >
                {cnt}
              </button>
            ))}
          </div>
        </div>

        <div className="ctrl-input-group">
          <div className="ctrl-label">Grid Size: {gridSize}x{gridSize}</div>
          <input
            type="range"
            min="3"
            max="8"
            step="1"
            value={gridSize}
            onChange={(e) => {
              if (!isPlaying) setGridSize(parseInt(e.target.value));
            }}
            className="grid-size-slider"
            disabled={isPlaying}
          />
          <div className="slider-limits">
            <span>3x3</span>
            <span>8x8</span>
          </div>
        </div>

        {isPlaying && pickCount > 0 ? (
          <button className="btn-game-submit btn-cashout" onClick={() => cashOut()}>
            Cash Out ({formatPts(bet * multiplier)} VAULT)
          </button>
        ) : (
          <button
            className="btn-game-submit"
            onClick={startGame}
            disabled={isPlaying}
          >
            Start new game
          </button>
        )}

        {isPlaying && (
          <div className="mines-multiplier-display">
            <span className="mult-label">Multiplier</span>
            <span className="mult-value">{multiplier.toFixed(2)}x</span>
          </div>
        )}

        {/* Live stats */}
        <div className="game-stats-grid">
          <div className="game-stat-item">
            <span className="stat-label">Mines</span>
            <span className="stat-value red">{minesCount}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Safe tiles</span>
            <span className="stat-value green">{gridSize * gridSize - minesCount}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Gems found</span>
            <span className="stat-value gold">{pickCount}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Next cashout</span>
            <span className="stat-value">
              {pickCount > 0 ? `${formatPts(bet * multiplier)}` : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* VIEWPORT */}
      <div className="game-viewport mines-viewport">
        {/* Backdrop */}
        <svg className="viewport-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0c0e1a" />
              <stop offset="100%" stopColor="#1a1d35" />
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#sky)" />
          <ellipse cx="400" cy="300" rx="400" ry="300" fill="url(#glow)" />
        </svg>

        <div className="viewport-top-overlay">
          <div className="grid-label">{gridSize}x{gridSize} Grid</div>
          <div className="viewport-controls">
            <button className="vp-icon-btn"><HelpCircle size={18} /></button>
            <button className="vp-badge-btn"><History size={14} style={{ marginRight: 6 }} /> History</button>
          </div>
        </div>

        <div className="viewport-content">
          <motion.div
            key={gridSize}
            className="mines-tile-grid"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              maxWidth: gridSize > 5 ? '560px' : '440px'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence>
              {tiles.map((t, i) => (
                <motion.div
                  key={`${gridSize}-${t.id}`}
                  className={`mines-tile ${t.revealed ? 'revealed' : ''} ${t.status}`}
                  onClick={() => handleTileClick(t.id)}
                  initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateY: t.revealed ? 180 : 0,
                  }}
                  transition={{
                    opacity: { duration: 0.2, delay: i * 0.015 },
                    scale: { duration: 0.25, delay: i * 0.015, type: 'spring', stiffness: 400 },
                    rotateY: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                  }}
                  whileHover={!t.revealed && isPlaying ? { scale: 1.08, y: -2 } : {}}
                  whileTap={!t.revealed && isPlaying ? { scale: 0.95 } : {}}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front face (unrevealed) */}
                  <div className="tile-face tile-front" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <VaultIcon size={28} color="rgba(255,255,255,0.7)" />
                  </div>

                  {/* Back face (revealed) */}
                  <div className="tile-face tile-back">
                    {t.status === 'mine' ? '💣' : t.status === 'gem' ? '💎' : ''}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

    </div>
  );
};
