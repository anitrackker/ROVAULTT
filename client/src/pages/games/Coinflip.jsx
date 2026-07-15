import { useState } from 'react';
import { useStore, formatPts } from '../../store/useStore';
import { ThemedBackdrop } from './ThemedBackdrop';
import { HelpCircle, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { playCoinFlip, playWin, playLose } from '../../utils/SoundEngine';
import { VaultIcon } from '../../components/VaultIcon';
import confetti from 'canvas-confetti';
import './Games.css';
import './Coinflip.css';

export const Coinflip = () => {
  const { balance, updateBalance } = useStore();
  const [bet, setBet] = useState(25);
  const [side, setSide] = useState('heads');
  const [isFlipping, setIsFlipping] = useState(false);
  const [resultText, setResultText] = useState('Choose a side!');
  const [rotation, setRotation] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [streak, setStreak] = useState(0);

  const startFlip = () => {
    if (balance < bet || isFlipping) return;
    updateBalance(-bet);
    setIsFlipping(true);
    setResultText('Flipping...');
    playCoinFlip();

    const isHeads = Math.random() > 0.5;
    const spins = 6;
    setRotation(prev => prev + spins * 360 + (isHeads ? 0 : 180));

    setTimeout(() => {
      setIsFlipping(false);
      const outcome = isHeads ? 'heads' : 'tails';
      const won = side === outcome;
      const outcomeLabel = outcome === 'heads' ? 'Heads' : 'Tails';
      if (won) {
        const payout = bet * 1.95;
        updateBalance(payout);
        useStore.getState().logGameResult('Coinflip', bet, payout, `Won ${outcomeLabel}`);
        setResultText(`${outcomeLabel}! You won ${formatPts(payout)}`);
        setWins(w => w + 1);
        setStreak(s => s >= 0 ? s + 1 : 1);
        playWin();
        confetti({ particleCount: 50, spread: 45 });
      } else {
        useStore.getState().logGameResult('Coinflip', bet, 0, `Lost on ${outcomeLabel}`);
        setResultText(`${outcomeLabel}. Better luck next time!`);
        setLosses(l => l + 1);
        setStreak(s => s <= 0 ? s - 1 : -1);
        playLose();
      }
    }, 2000);
  };

  const total = wins + losses;

  return (
    <div className="game-layout">
      <div className="game-control-panel">
        <div className="ctrl-input-group">
          <div className="ctrl-label">Bet amount</div>
          <div className="ctrl-input-wrap">
            <span className="currency-symbol"><VaultIcon size={15} /></span>
            <input type="number" value={bet}
              onChange={(e) => setBet(Math.max(1, parseInt(e.target.value) || 0))} />
            <button className="quick-btn" onClick={() => setBet(Math.max(1, Math.floor(bet / 2)))} disabled={isFlipping}>1/2</button>
            <button className="quick-btn" onClick={() => setBet(bet * 2)} disabled={isFlipping}>2x</button>
          </div>
        </div>

        <div className="ctrl-input-group">
          <div className="ctrl-label">Pick your side</div>
          <div className="coin-picker">
            <button className={`coin-pick-btn ${side === 'heads' ? 'active' : ''}`}
              onClick={() => setSide('heads')} disabled={isFlipping}>Heads</button>
            <button className={`coin-pick-btn ${side === 'tails' ? 'active' : ''}`}
              onClick={() => setSide('tails')} disabled={isFlipping}>Tails</button>
          </div>
        </div>

        <button className="btn-game-submit" onClick={startFlip} disabled={isFlipping}>
          {isFlipping ? 'Flipping...' : 'Flip Coin'}
        </button>

        {/* Stats */}
        <div className="game-stats-grid">
          <div className="game-stat-item">
            <span className="stat-label">Wins</span>
            <span className="stat-value green">{wins}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Losses</span>
            <span className="stat-value red">{losses}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Win rate</span>
            <span className="stat-value">{total > 0 ? `${Math.round(wins / total * 100)}%` : '—'}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Streak</span>
            <span className={`stat-value ${streak > 0 ? 'green' : streak < 0 ? 'red' : ''}`}>
              {streak > 0 ? `+${streak}` : streak === 0 ? '—' : streak}
            </span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Payout</span>
            <span className="stat-value gold">1.95x</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">House edge</span>
            <span className="stat-value red">2.5%</span>
          </div>
        </div>
      </div>

      <div className="game-viewport coinflip-viewport">
        <ThemedBackdrop />
        <div className="viewport-top-overlay">
          <div />
          <div className="viewport-controls">
            <button className="vp-icon-btn"><HelpCircle size={18} /></button>
            <button className="vp-badge-btn"><History size={14} style={{ marginRight: 6 }} /> History</button>
          </div>
        </div>

        <div className="viewport-content coinflip-content">
          <div className="coin-scene">
            <motion.div className="coin"
              animate={{ rotateY: rotation }}
              transition={{ duration: 2, ease: [0.1, 0.8, 0.2, 1] }}>
              <div className="coin-face front">H</div>
              <div className="coin-face back">T</div>
            </motion.div>
          </div>
          <div className="result-text">{resultText}</div>
        </div>
      </div>
    </div>
  );
};
