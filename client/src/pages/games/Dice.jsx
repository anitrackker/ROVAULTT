import { VaultIcon } from '../../components/VaultIcon';
import { useState, useRef } from 'react';
import { useStore, formatPts } from '../../store/useStore';
import { ThemedBackdrop } from './ThemedBackdrop';
import { Volume2, VolumeX, HelpCircle, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playRoll, playWin, playLose, playClick } from '../../utils/SoundEngine';
import confetti from 'canvas-confetti';
import './Games.css';
import './Dice.css';

export const Dice = () => {
  const { balance, updateBalance } = useStore();
  const [bet, setBet] = useState(25);
  const [rollOver, setRollOver] = useState(50);
  const [multiplier, setMultiplier] = useState(1.98);
  const [winChance, setWinChance] = useState(49.5);
  const [rollResult, setRollResult] = useState(null);
  const [gameState, setGameState] = useState('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [diceRotation, setDiceRotation] = useState(0);
  const [diceX, setDiceX] = useState(0);
  const rollCountRef = useRef(0);

  const updateRollOver = (val) => {
    const value = Math.min(98, Math.max(2, val));
    setRollOver(value);
    const chance = (100 - value);
    setWinChance(parseFloat(chance.toFixed(2)));
    setMultiplier(parseFloat((99 / chance).toFixed(2)));
  };

  const updateMultiplier = (val) => {
    const mult = Math.max(1.01, parseFloat(val) || 1.01);
    setMultiplier(mult);
    const chance = 99 / mult;
    setWinChance(parseFloat(chance.toFixed(2)));
    setRollOver(parseFloat((100 - chance).toFixed(2)));
  };

  const updateWinChance = (val) => {
    const chance = Math.min(98, Math.max(2, parseFloat(val) || 2));
    setWinChance(chance);
    setRollOver(parseFloat((100 - chance).toFixed(2)));
    setMultiplier(parseFloat((99 / chance).toFixed(2)));
  };

  const handleRoll = () => {
    if (balance < bet) return;
    updateBalance(-bet);
    setGameState('rolling');
    if (!isMuted) playRoll();

    rollCountRef.current += 1;
    const count = rollCountRef.current;

    // Animate dice rolling across the horizontal axis
    setDiceRotation(prev => prev + 720 + Math.random() * 360);
    setDiceX(count % 2 === 0 ? -120 : 120);

    setTimeout(() => {
      const result = parseFloat((Math.random() * 100).toFixed(2));
      setRollResult(result);
      setDiceX(0); // settle back to center

      const didWin = result > rollOver;
      if (didWin) {
        const payout = bet * multiplier;
        updateBalance(payout);
        useStore.getState().logGameResult('Dice', bet, payout, `Rolled ${result.toFixed(2)}`);
        if (!isMuted) playWin();
        confetti({ particleCount: 50, spread: 45 });
      } else {
        useStore.getState().logGameResult('Dice', bet, 0, `Rolled ${result.toFixed(2)}`);
        if (!isMuted) playLose();
      }
      setGameState('ended');
    }, 600);
  };

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
          <div className="ctrl-label">Total Profit ({multiplier.toFixed(2)}x)</div>
          <div className="ctrl-input-wrap" style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
            <span className="currency-symbol" style={{ opacity: 0.5 }}><VaultIcon size={15} /></span>
            <input
              type="text"
              value={formatPts(bet * multiplier)}
              disabled
            />
          </div>
        </div>

        <button
          className="btn-game-submit"
          onClick={handleRoll}
          disabled={gameState === 'rolling'}
        >
          {gameState === 'rolling' ? 'Rolling...' : 'Place bet'}
        </button>

        {/* Live stats */}
        <div className="game-stats-grid">
          <div className="game-stat-item">
            <span className="stat-label">Win chance</span>
            <span className="stat-value green">{winChance.toFixed(1)}%</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Multiplier</span>
            <span className="stat-value gold">{multiplier.toFixed(2)}x</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Profit on win</span>
            <span className="stat-value">{formatPts(bet * multiplier - bet)}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">House edge</span>
            <span className="stat-value red">1.00%</span>
          </div>
        </div>
      </div>

      {/* VIEWPORT */}
      <div className="game-viewport dice-viewport">
        <ThemedBackdrop />

        <div className="viewport-top-overlay">
          <div />
          <div className="viewport-controls">
            <button className="vp-icon-btn" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button className="vp-icon-btn"><HelpCircle size={18} /></button>
            <button className="vp-badge-btn"><History size={14} style={{ marginRight: 6 }} /> History</button>
          </div>
        </div>

        <div className="viewport-content dice-content">

          {/* 3D Rolling Dice */}
          <div className="dice-roll-area">
            <motion.div
              className="dice-3d-cube"
              animate={{
                rotateX: diceRotation,
                x: diceX,
              }}
              transition={{
                rotateX: { duration: 0.6, ease: [0.2, 0.8, 0.3, 1] },
                x: { duration: 0.6, ease: [0.2, 0.8, 0.3, 1] },
              }}
            >
              <div className="dice-face dice-front">🎲</div>
            </motion.div>
          </div>

          {/* Roll Result Display */}
          <AnimatePresence mode="wait">
            {rollResult !== null && (
              <motion.div
                key={rollResult}
                className={`roll-result-display ${rollResult > rollOver ? 'win' : 'lose'}`}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {rollResult.toFixed(2)}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom Colored Slider */}
          <div className="custom-slider-container">
            <div className="slider-track-fill-container">
              <div className="slider-track-fill pink-fill" style={{ width: `${rollOver}%` }} />
              <div className="slider-track-fill orange-fill" style={{ width: `${100 - rollOver}%` }} />
            </div>

            <input
              type="range"
              min="2"
              max="98"
              step="0.01"
              value={rollOver}
              onChange={(e) => updateRollOver(parseFloat(e.target.value))}
              className="dice-slider-input"
            />

            <div className="slider-thumb-overlay" style={{ left: `${rollOver}%` }}>
              <div className="thumb-bar" />
              <div className="thumb-bar" />
              <div className="thumb-bar" />
            </div>

            <div className="slider-labels">
              <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="dice-stats-row">
            <div className="dice-stat-box">
              <label>Multiplier</label>
              <input type="number" step="0.01" value={multiplier} onChange={(e) => updateMultiplier(e.target.value)} />
            </div>
            <div className="dice-stat-box">
              <label>Roll Over</label>
              <input type="number" step="0.01" value={rollOver} onChange={(e) => updateRollOver(parseFloat(e.target.value))} />
            </div>
            <div className="dice-stat-box">
              <label>Win Chance</label>
              <input type="number" step="0.01" value={winChance} onChange={(e) => updateWinChance(e.target.value)} />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
