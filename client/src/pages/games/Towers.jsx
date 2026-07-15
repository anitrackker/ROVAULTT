import { useState } from 'react';
import { useStore, formatPts } from '../../store/useStore';
import { ThemedBackdrop } from './ThemedBackdrop';
import { HelpCircle, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { playStep, playMine, playWin, playClick } from '../../utils/SoundEngine';
import { VaultIcon } from '../../components/VaultIcon';
import confetti from 'canvas-confetti';
import './Games.css';
import './Towers.css';

export const Towers = () => {
  const { balance, updateBalance } = useStore();
  const [bet, setBet] = useState(25);
  const [difficulty, setDifficulty] = useState('Easy');
  const [gameState, setGameState] = useState('idle');
  const [currentRow, setCurrentRow] = useState(0);
  const [rows, setRows] = useState([]);
  const [multiplier, setMultiplier] = useState(1.00);

  const getBombsCount = () => {
    if (difficulty === 'Easy') return 1;
    if (difficulty === 'Normal') return 2;
    return 3;
  };
  const getStepMult = () => difficulty === 'Easy' ? 1.45 : difficulty === 'Normal' ? 2.20 : 2.90;

  const startTowerGame = () => {
    if (balance < bet) return;
    updateBalance(-bet);
    setGameState('playing');
    setCurrentRow(0);
    setMultiplier(1.00);
    playClick();

    const bombsPerRow = getBombsCount();
    const newRows = Array.from({ length: 8 }, (_, rIdx) => {
      const bombIndices = [];
      while (bombIndices.length < bombsPerRow) {
        const idx = Math.floor(Math.random() * 3);
        if (!bombIndices.includes(idx)) bombIndices.push(idx);
      }
      return {
        id: rIdx,
        tiles: Array.from({ length: 3 }, (_, tIdx) => ({
          id: tIdx, isBomb: bombIndices.includes(tIdx), status: 'idle',
        }))
      };
    });
    setRows(newRows);
  };

  const handleTileClick = (rIdx, tIdx) => {
    if (gameState !== 'playing' || rIdx !== currentRow) return;
    const tile = rows[rIdx].tiles[tIdx];
    const updatedRows = [...rows];

    if (tile.isBomb) {
      updatedRows[rIdx].tiles[tIdx].status = 'bomb';
      setRows(updatedRows.map(r => ({
        ...r, tiles: r.tiles.map(t => ({ ...t, status: t.isBomb ? 'bomb' : 'gem' }))
      })));
      setGameState('ended');
      playMine();
    } else {
      updatedRows[rIdx].tiles[tIdx].status = 'gem';
      setRows(updatedRows);
      const nextMult = parseFloat((multiplier * getStepMult()).toFixed(2));
      setMultiplier(nextMult);
      playStep(currentRow);
      if (currentRow === 7) {
        cashOut(nextMult);
      } else {
        setCurrentRow(currentRow + 1);
      }
    }
  };

  const cashOut = (mult = multiplier) => {
    if (gameState !== 'playing') return;
    setGameState('ended');
    updateBalance(bet * mult);
    playWin();
    confetti({ particleCount: 80, spread: 60 });
  };

  const stepMult = getStepMult();

  return (
    <div className="game-layout">
      <div className="game-control-panel">
        <div className="panel-tabs">
          <button className="panel-tab active">Manual</button>
        </div>

        <div className="ctrl-input-group">
          <div className="ctrl-label">Bet amount</div>
          <div className="ctrl-input-wrap">
            <span className="currency-symbol"><VaultIcon size={15} /></span>
            <input type="number" value={bet} onChange={(e) => setBet(Math.max(1, parseInt(e.target.value) || 0))} disabled={gameState === 'playing'} />
            <button className="quick-btn" onClick={() => setBet(Math.max(1, Math.floor(bet / 2)))} disabled={gameState === 'playing'}>1/2</button>
            <button className="quick-btn" onClick={() => setBet(bet * 2)} disabled={gameState === 'playing'}>2x</button>
          </div>
        </div>

        <div className="ctrl-input-group">
          <div className="ctrl-label">Difficulty</div>
          <div className="difficulty-select-row">
            {['Easy', 'Normal', 'Hard'].map(diff => (
              <button key={diff} className={`diff-btn ${difficulty === diff ? 'active' : ''}`}
                onClick={() => setDifficulty(diff)} disabled={gameState === 'playing'}>{diff}</button>
            ))}
          </div>
        </div>

        {gameState === 'playing' && currentRow > 0 ? (
          <button className="btn-game-submit btn-cashout" onClick={() => cashOut()}>
            Cash Out ({formatPts(bet * multiplier)})
          </button>
        ) : (
          <button className="btn-game-submit" onClick={startTowerGame} disabled={gameState === 'playing'}>
            Start new game
          </button>
        )}

        {/* Live stats */}
        <div className="game-stats-grid">
          <div className="game-stat-item">
            <span className="stat-label">Floor</span>
            <span className="stat-value gold">{gameState === 'playing' ? `${currentRow + 1} / 8` : '—'}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Multiplier</span>
            <span className="stat-value green">{multiplier.toFixed(2)}x</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Per floor</span>
            <span className="stat-value">{stepMult.toFixed(2)}x</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Bombs / row</span>
            <span className="stat-value red">{getBombsCount()}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Safe tiles</span>
            <span className="stat-value green">{3 - getBombsCount()}</span>
          </div>
          <div className="game-stat-item">
            <span className="stat-label">Max payout</span>
            <span className="stat-value gold">{formatPts(bet * Math.pow(stepMult, 8))}</span>
          </div>
        </div>
      </div>

      <div className="game-viewport towers-viewport">
        <ThemedBackdrop />
        <div className="viewport-top-overlay">
          <div />
          <div className="viewport-controls">
            <button className="vp-icon-btn"><HelpCircle size={18} /></button>
            <button className="vp-badge-btn"><History size={14} style={{ marginRight: 6 }} /> History</button>
          </div>
        </div>

        <div className="viewport-content">
          <div className="towers-grid-container">
            {rows.map((row) => (
              <div key={row.id} className={`tower-row ${row.id === currentRow ? 'active' : ''} ${row.id < currentRow ? 'passed' : ''}`}>
                {row.tiles.map((tile) => (
                  <motion.div key={tile.id} className={`tower-tile ${tile.status}`}
                    onClick={() => handleTileClick(row.id, tile.id)}
                    whileHover={tile.status === 'idle' && row.id === currentRow ? { scale: 1.08, y: -2 } : {}}
                    whileTap={tile.status === 'idle' ? { scale: 0.95 } : {}}
                    animate={tile.status !== 'idle' ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 0.3 }}>
                    {tile.status === 'bomb' ? '💣' : tile.status === 'gem' ? '💎' : ''}
                    {tile.status === 'idle' && (
                      <span className="mult-label">{Math.pow(stepMult, row.id + 1).toFixed(2)}x</span>
                    )}
                  </motion.div>
                ))}
              </div>
            ))}

            {rows.length === 0 && (
              <div className="tower-placeholder-grid">
                {Array.from({ length: 8 }).map((_, rIdx) => (
                  <div className="tower-row-placeholder" key={rIdx}>
                    {[0,1,2].map(c => <div className="placeholder-tile" key={c}>{Math.pow(stepMult, rIdx + 1).toFixed(2)}x</div>)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
