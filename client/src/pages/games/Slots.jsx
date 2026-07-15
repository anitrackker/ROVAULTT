import { useState, useEffect, useRef, useCallback } from 'react';
import { useStore, formatPts } from '../../store/useStore';
import { ThemedBackdrop } from './ThemedBackdrop';
import { HelpCircle, History, Volume2, VolumeX, Play, Square, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playRoll, playWin, playLose, playTick, playClick } from '../../utils/SoundEngine';
import { VaultIcon } from '../../components/VaultIcon';
import confetti from 'canvas-confetti';
import { SLOT_GAMES, THEME_SYMBOLS } from './SlotData';
import './Games.css';
import './Slots.css';

/* ═══════════════════════════════
   GAME MODES
═══════════════════════════════ */
const MODES = {
  Classic: {
    label: 'Classic',
    desc: '3 reels · standard payouts',
    reelLength: 20,
    spinDuration: [1200, 1600, 2000],
    weights: [30, 22, 18, 12, 8, 5, 3, 2],
  },
  Turbo: {
    label: 'Turbo',
    desc: '3 reels · fast · 0.5x payouts',
    reelLength: 20,
    spinDuration: [400, 600, 800],
    weights: [28, 22, 18, 12, 8, 6, 4, 2],
    payoutMult: 0.5,
  },
  Mega: {
    label: 'Mega',
    desc: '3 reels · slow · 2x payouts',
    reelLength: 20,
    spinDuration: [2000, 2800, 3600],
    weights: [20, 18, 16, 14, 12, 9, 7, 4],
    payoutMult: 2,
  },
};

function buildStrip(weights, length, symbols) {
  const pool = [];
  weights.forEach((w, i) => { for (let j = 0; j < w; j++) pool.push(i); });
  return Array.from({ length }, () => symbols[pool[Math.floor(Math.random() * pool.length)]]);
}

function evaluate(syms, bet, mode) {
  const mult = MODES[mode].payoutMult ?? 1;
  const [a, b, c] = syms;

  if (a.id === b.id && b.id === c.id) {
    const base = a.payout3 * bet * mult;
    return { type: 'jackpot', payout: base, label: `JACKPOT! ${a.char}${a.char}${a.char} — ${a.label}!` };
  }
  const pairs = [
    [a, b], [b, c], [a, c]
  ].filter(([x, y]) => x.id === y.id && x.payout2 > 0);
  if (pairs.length > 0) {
    const sym = pairs[0][0];
    const base = sym.payout2 * bet * mult;
    return { type: 'pair', payout: base, label: `Pair of ${sym.label}s! +${formatPts(base)}` };
  }
  return { type: 'lose', payout: 0, label: 'No match. Try again!' };
}

export const Slots = () => {
  const { balance, updateBalance } = useStore();
  const [activeGameId, setActiveGameId] = useState(null); // null = lobby
  
  const [bet, setBet] = useState(25);
  const [mode, setMode] = useState('Classic');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [autoSpins, setAutoSpins] = useState(0);
  const [autoLeft, setAutoLeft] = useState(0);
  const [outcome, setOutcome] = useState(null);
  const [paytableOpen, setPaytableOpen] = useState(false);

  const activeSymbols = activeGameId ? THEME_SYMBOLS[activeGameId] : THEME_SYMBOLS.classic;

  const [reelStrips, setReelStrips] = useState(() => [
    buildStrip(MODES.Classic.weights, 20, activeSymbols),
    buildStrip(MODES.Classic.weights, 20, activeSymbols),
    buildStrip(MODES.Classic.weights, 20, activeSymbols),
  ]);
  const [reelOffsets, setReelOffsets] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState([false, false, false]);

  const [totalSpins, setTotalSpins] = useState(0);
  const [totalWon, setTotalWon] = useState(0);
  const [biggestWin, setBiggestWin] = useState(0);

  const autoRef = useRef(autoLeft);
  autoRef.current = autoLeft;
  const isMutedRef = useRef(isMuted);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  // When game changes, rebuild strips so new symbols load
  useEffect(() => {
    if (activeGameId) {
      setReelStrips([
        buildStrip(MODES.Classic.weights, 20, THEME_SYMBOLS[activeGameId]),
        buildStrip(MODES.Classic.weights, 20, THEME_SYMBOLS[activeGameId]),
        buildStrip(MODES.Classic.weights, 20, THEME_SYMBOLS[activeGameId]),
      ]);
      setReelOffsets([0,0,0]);
      setOutcome(null);
    }
  }, [activeGameId]);

  const doSpin = useCallback(() => {
    if (balance < bet) return;
    updateBalance(-bet);
    setIsSpinning(true);
    setOutcome(null);
    setSpinning([true, true, true]);
    if (!isMutedRef.current) playRoll();

    const cfg = MODES[mode];
    const newStrips = [
      buildStrip(cfg.weights, cfg.reelLength, activeSymbols),
      buildStrip(cfg.weights, cfg.reelLength, activeSymbols),
      buildStrip(cfg.weights, cfg.reelLength, activeSymbols),
    ];
    const lands = newStrips.map(strip => Math.floor(Math.random() * strip.length));

    setReelStrips(newStrips);
    setReelOffsets([0, 0, 0]);

    cfg.spinDuration.forEach((delay, i) => {
      setTimeout(() => {
        if (!isMutedRef.current) playTick();
        setSpinning(prev => { const n = [...prev]; n[i] = false; return n; });
        setReelOffsets(prev => { const n = [...prev]; n[i] = lands[i]; return n; });

        if (i === 2) {
          const visible = lands.map((off, ri) => newStrips[ri][off]);
          const result = evaluate(visible, bet, mode);
          setOutcome(result);
          setTotalSpins(s => s + 1);

          if (result.payout > 0) {
            updateBalance(result.payout);
            useStore.getState().logGameResult(`Slots (${mode})`, bet, result.payout, result.label);
            setTotalWon(w => w + result.payout);
            setBiggestWin(w => Math.max(w, result.payout));
            if (!isMutedRef.current) playWin();
            if (result.type === 'jackpot') confetti({ particleCount: 120, spread: 80 });
          } else {
            useStore.getState().logGameResult(`Slots (${mode})`, bet, 0, result.label);
            if (!isMutedRef.current) playLose();
          }
          setIsSpinning(false);
        }
      }, delay);
    });
  }, [balance, bet, mode, updateBalance, activeSymbols]);

  useEffect(() => {
    if (autoLeft <= 0 || isSpinning) return;
    const t = setTimeout(() => {
      if (autoRef.current > 0) {
        setAutoLeft(n => n - 1);
        doSpin();
      }
    }, 300);
    return () => clearTimeout(t);
  }, [autoLeft, isSpinning, doSpin]);

  const startAuto = (count) => {
    setAutoSpins(count);
    setAutoLeft(count);
  };
  const stopAuto = () => { setAutoLeft(0); setAutoSpins(0); };

  const handleSpin = () => {
    if (isSpinning || balance < bet) return;
    doSpin();
  };

  const cfg = MODES[mode];
  const activeGameInfo = SLOT_GAMES.find(g => g.id === activeGameId);

  // Render Lobby if no game selected
  if (!activeGameId) {
    return (
      <div className="slots-lobby">
        <div className="lobby-header">
          <h2>Slot Machines</h2>
          <p>Select a machine to start playing.</p>
        </div>
        <div className="slots-lobby-grid">
          {SLOT_GAMES.map(game => (
            <motion.div 
              key={game.id} 
              className="slot-machine-card"
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => { playClick(); setActiveGameId(game.id); }}
              style={{ borderColor: game.color, boxShadow: `0 10px 30px ${game.color}33` }}
            >
              <div className="sm-card-icon" style={{ color: game.color, filter: `drop-shadow(0 0 15px ${game.color})` }}>
                {THEME_SYMBOLS[game.id][THEME_SYMBOLS[game.id].length - 1].char}
              </div>
              <h3>{game.title}</h3>
              <p>{game.desc}</p>
              <button className="btn btn-primary" style={{ marginTop: 15, background: game.color, color: '#111' }}>Play Now</button>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Render active game
  return (
    <div className="game-layout">
      {/* ── SIDEBAR ── */}
      <div className="game-control-panel">
        <button className="slots-back-btn" onClick={() => setActiveGameId(null)} disabled={isSpinning}>
          <ChevronLeft size={16} /> Back to Lobby
        </button>

        <div className="ctrl-input-group">
          <div className="ctrl-label">Bet amount</div>
          <div className="ctrl-input-wrap">
            <span className="currency-symbol"><VaultIcon size={15} /></span>
            <input type="number" value={bet}
              onChange={(e) => setBet(Math.max(1, parseInt(e.target.value) || 0))}
              disabled={isSpinning} />
            <button className="quick-btn" onClick={() => setBet(Math.max(1, Math.floor(bet / 2)))} disabled={isSpinning}>1/2</button>
            <button className="quick-btn" onClick={() => setBet(bet * 2)} disabled={isSpinning}>2x</button>
          </div>
        </div>

        <div className="ctrl-input-group">
          <div className="ctrl-label">Mode</div>
          <div className="slots-mode-row">
            {Object.keys(MODES).map(m => (
              <button key={m}
                className={`slots-mode-btn ${mode === m ? 'active' : ''}`}
                onClick={() => { if (!isSpinning) setMode(m); }}
                disabled={isSpinning}>
                {m}
              </button>
            ))}
          </div>
          <div className="slots-mode-desc">{cfg.desc}</div>
        </div>

        {autoLeft > 0 ? (
          <button className="btn-game-submit btn-cashout" onClick={stopAuto}>
            Stop Auto ({autoLeft} left)
          </button>
        ) : (
          <button className="btn-game-submit" onClick={handleSpin} disabled={isSpinning || balance < bet}>
            {isSpinning ? 'Spinning...' : 'Spin'}
          </button>
        )}

        <div className="ctrl-input-group">
          <div className="ctrl-label">Auto Spin</div>
          <div className="slots-auto-row">
            {[5, 10, 25, 50].map(n => (
              <button key={n} className="quick-btn"
                onClick={() => startAuto(n)} disabled={isSpinning || autoLeft > 0}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="paytable-dropdown-wrap">
          <button className="paytable-toggle" onClick={() => setPaytableOpen(!paytableOpen)}>
            <span className="ctrl-label" style={{ margin: 0 }}>Paytable ({mode})</span>
            <span className="ctrl-label">{paytableOpen ? '▲' : '▼'}</span>
          </button>
          <AnimatePresence>
            {paytableOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="paytable">
                  {activeSymbols.filter(s => s.payout3 > 0).slice().reverse().map(s => (
                    <div className="paytable-row" key={s.id}>
                      <span className="paytable-symbols">{s.char}{s.char}{s.char}</span>
                      <span className="paytable-payout">{(s.payout3 * (MODES[mode].payoutMult ?? 1)).toFixed(1)}x</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="game-stats-grid">
          <div className="game-stat-item">
            <span className="stat-label">Spins</span>
            <span className="stat-value">{totalSpins}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Total won</span>
            <span className="stat-value green">{totalWon > 0 ? formatPts(totalWon) : '—'}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Biggest win</span>
            <span className="stat-value gold">{biggestWin > 0 ? formatPts(biggestWin) : '—'}</span>
          </div>
        </div>
      </div>

      {/* ── VIEWPORT ── */}
      <div className="game-viewport slots-viewport" style={{ border: `1px solid ${activeGameInfo.color}33` }}>
        <ThemedBackdrop />

        <div className="viewport-top-overlay">
          <div className="slots-title" style={{ color: activeGameInfo.color }}>
            <span className="slots-title-icon">
              {THEME_SYMBOLS[activeGameId][THEME_SYMBOLS[activeGameId].length - 1].char}
            </span> 
            {activeGameInfo.title}
          </div>
          <div className="viewport-controls">
            <button className="vp-icon-btn" onClick={() => setIsMuted(m => !m)}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button className="vp-icon-btn"><HelpCircle size={18} /></button>
          </div>
        </div>

        <div className="viewport-content slots-content">
          <div className="slot-machine-cabinet" style={{ borderColor: `${activeGameInfo.color}55`, boxShadow: `inset 0 0 50px ${activeGameInfo.color}11, 0 20px 60px rgba(0,0,0,0.5)` }}>
            <div className="cabinet-top-bar" style={{ background: `linear-gradient(90deg, transparent, ${activeGameInfo.color}33, transparent)` }}>
              <span className="cabinet-logo" style={{ color: activeGameInfo.color }}>✦ {activeGameInfo.title.toUpperCase()} ✦</span>
            </div>

            <div className="reels-window">
              <div className="reels-shine" />
              <div className="win-line-bar top" />
              <div className="win-line-bar center" style={{ background: activeGameInfo.color, opacity: 0.8, boxShadow: `0 0 10px ${activeGameInfo.color}` }} />
              <div className="win-line-bar bottom" />

              {reelStrips.map((strip, ri) => (
                <div key={ri} className={`reel-column ${spinning[ri] ? 'spinning' : ''}`}>
                  {[-1, 0, 1].map(offset => {
                    const idx = ((reelOffsets[ri] + offset) % strip.length + strip.length) % strip.length;
                    const sym = strip[idx];
                    return (
                      <div key={offset}
                        className={`reel-cell ${offset === 0 ? 'center-cell' : 'edge-cell'} ${!spinning[ri] && offset === 0 ? 'landed' : ''}`}>
                        <span className="reel-sym" style={{ filter: spinning[ri] ? 'blur(1px)' : 'none' }}>{sym.char}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="outcome-area">
              <AnimatePresence mode="wait">
                {outcome && (
                  <motion.div
                    key={outcome.label}
                    className={`slots-outcome ${outcome.type}`}
                    initial={{ opacity: 0, y: 14, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{ color: outcome.type === 'lose' ? '#8b9cc7' : activeGameInfo.color, textShadow: outcome.type !== 'lose' ? `0 0 15px ${activeGameInfo.color}88` : 'none' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
                    {outcome.label}
                    {outcome.payout > 0 && (
                      <span className="outcome-payout"> +{formatPts(outcome.payout)}</span>
                    )}
                  </motion.div>
                )}
                {!outcome && !isSpinning && (
                  <motion.div className="slots-outcome idle"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Place your bet and spin!
                  </motion.div>
                )}
                {isSpinning && (
                  <motion.div className="slots-outcome spinning-msg"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    ⠿ Spinning…
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="cabinet-bottom">
              <button
                className={`spin-btn-big ${isSpinning ? 'active' : ''}`}
                onClick={handleSpin}
                style={{ background: activeGameInfo.color, color: '#111' }}
                disabled={isSpinning || balance < bet || autoLeft > 0}>
                {isSpinning ? '◉ SPINNING' : '▶ SPIN'}
              </button>
            </div>

            <div className={`neon-strip ${isSpinning ? 'glow' : ''}`} style={{ background: activeGameInfo.color, boxShadow: isSpinning ? `0 0 20px ${activeGameInfo.color}` : 'none' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
