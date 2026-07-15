import { VaultIcon } from '../../components/VaultIcon';
import { useState, useEffect, useRef } from 'react';
import { useStore, formatPts } from '../../store/useStore';
import { ThemedBackdrop } from './ThemedBackdrop';
import { Volume2, VolumeX, HelpCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { playRoll, playWin, playMine } from '../../utils/SoundEngine';
import confetti from 'canvas-confetti';
import './Games.css';
import './Crash.css';

export const Crash = () => {
  const { balance, updateBalance, user } = useStore();
  const [bet, setBet] = useState(30);
  const [autoCashout, setAutoCashout] = useState('');
  const [gameState, setGameState] = useState('waiting'); // waiting, rising, crashed
  const [currentMult, setCurrentMult] = useState(1.00);
  const [players, setPlayers] = useState([]);
  const [history, setHistory] = useState([1.75, 1.10, 1.12, 1.00, 1.05, 1.94, 1.00]);
  const [isMuted, setIsMuted] = useState(false);
  const [isMyticketCashed, setIsMyticketCashed] = useState(false);
  const [myWin, setMyWin] = useState(0);

  const loopRef = useRef(null);
  const startRef = useRef(0);
  const crashPointRef = useRef(1.00);
  const betRef = useRef(bet);
  const isMutedRef = useRef(isMuted);
  const isMyticketCashedRef = useRef(isMyticketCashed);
  const autoCashoutRef = useRef(autoCashout);
  const gameStateRef = useRef(gameState);

  // Keep refs in sync with state so the rAF loop always reads current values
  useEffect(() => { betRef.current = bet; }, [bet]);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { isMyticketCashedRef.current = isMyticketCashed; }, [isMyticketCashed]);
  useEffect(() => { autoCashoutRef.current = autoCashout; }, [autoCashout]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  const generateCrashPoint = () => {
    const raw = 0.95 / Math.random();
    return Math.max(1.00, Math.floor(raw * 100) / 100);
  };

  const cashOut = (mult) => {
    if (isMyticketCashedRef.current) return;
    isMyticketCashedRef.current = true; // flip the ref immediately so the rAF loop won't double-trigger
    setIsMyticketCashed(true);
    const winAmt = betRef.current * mult;
    setMyWin(winAmt);
    updateBalance(winAmt);
    useStore.getState().logGameResult('Crash', betRef.current, winAmt, `${mult.toFixed(2)}x Cashout`);
    if (!isMutedRef.current) playWin();
    confetti({ particleCount: 80, spread: 60 });
  };

  const runLoop = () => {
    const elapsed = Date.now() - startRef.current;
    // k = 0.0006 creates a smooth but noticeable exponential curve
    const mult = Math.pow(Math.E, 0.00006 * elapsed);

    if (mult >= crashPointRef.current) {
      // Crashed!
      setGameState('crashed');
      gameStateRef.current = 'crashed';
      setCurrentMult(crashPointRef.current);
      if (!isMyticketCashedRef.current) {
        useStore.getState().logGameResult('Crash', betRef.current, 0, 'Busted');
      }
      if (!isMutedRef.current) playMine();
      setHistory(prev => [parseFloat(crashPointRef.current.toFixed(2)), ...prev.slice(0, 6)]);
      cancelAnimationFrame(loopRef.current);
      return;
    }

    setCurrentMult(mult);

    // Update bots
    setPlayers(prev => prev.map(p => {
      if (!p.cashedOut && mult >= p.target) return { ...p, cashedOut: true };
      return p;
    }));

    // Auto cashout — read from ref to avoid stale closure
    const ac = parseFloat(autoCashoutRef.current);
    if (autoCashoutRef.current && ac > 1 && mult >= ac && !isMyticketCashedRef.current) {
      cashOut(mult);
    }

    loopRef.current = requestAnimationFrame(runLoop);
  };

  const startNextGame = () => {
    if (gameStateRef.current === 'rising') return;
    if (balance < bet) return;

    updateBalance(-bet);
    if (!isMutedRef.current) playRoll();
    setGameState('rising');
    gameStateRef.current = 'rising';
    setCurrentMult(1.00);
    setIsMyticketCashed(false);
    isMyticketCashedRef.current = false;
    setMyWin(0);
    crashPointRef.current = generateCrashPoint();
    startRef.current = Date.now();

    // Generate bots
    const names = ["Fahd", "qdqdxm", "joshypoododo", "MangoCleanedYou", "e37m", "Olympian", "Nexus", "HyperActive"];
    const activeBots = names.map(name => ({
      name,
      bet: Math.floor(Math.random() * 150) + 10,
      target: parseFloat((1.01 + Math.random() * 5).toFixed(2)),
      cashedOut: false
    }));
    setPlayers(activeBots);

    cancelAnimationFrame(loopRef.current);
    loopRef.current = requestAnimationFrame(runLoop);
  };

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(loopRef.current);
  }, []);

  return (
    <div className="game-layout">
      
      {/* SIDEBAR */}
      <div className="sidebar-group" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="game-control-panel">
          <div className="panel-tabs">
            <button className="panel-tab active">Manual</button>
            <button className="panel-tab">Auto</button>
          </div>

          <div className="ctrl-input-group">
            <div className="ctrl-label">Bet amount</div>
            <div className="ctrl-input-wrap">
              <span className="currency-symbol" style={{ marginRight: 6 }}><VaultIcon size={15} /></span>
              <input
                type="number"
                value={bet}
                onChange={(e) => setBet(Math.max(1, parseInt(e.target.value) || 0))}
                disabled={gameState === 'rising'}
              />
              <button className="quick-btn" disabled={gameState === 'rising'} onClick={() => setBet(Math.max(1, Math.floor(bet / 2)))}>1/2</button>
              <button className="quick-btn" disabled={gameState === 'rising'} onClick={() => setBet(bet * 2)}>2x</button>
            </div>
          </div>

          <div className="ctrl-input-group">
            <div className="ctrl-label">Auto cashout (multiplier)</div>
            <div className="ctrl-input-wrap">
              <input
                type="number"
                placeholder="2.00"
                value={autoCashout}
                onChange={(e) => setAutoCashout(e.target.value)}
              />
              <button className="quick-btn" onClick={() => setAutoCashout('')}>Disable</button>
              <button className="quick-btn" onClick={() => setAutoCashout('2.00')}>2.00x</button>
              <button className="quick-btn" onClick={() => setAutoCashout('10.00')}>10.00x</button>
            </div>
          </div>

          {gameState === 'rising' && !isMyticketCashed ? (
            <button className="btn-game-submit" onClick={() => cashOut(currentMult)}>
              Cash Out ({formatPts(bet * currentMult)} VAULT)
            </button>
          ) : (
            <button
              className="btn-game-submit"
              onClick={startNextGame}
              disabled={gameState === 'rising'}
            >
              {gameState === 'rising' ? 'In Progress' : 'Join next game'}
            </button>
          )}

          {/* Live stats */}
          <div className="game-stats-grid">
            <div className="game-stat-item">
              <span className="stat-label">Multiplier</span>
              <span className={`stat-value ${gameState === 'crashed' ? 'red' : 'green'}`}>
                {currentMult.toFixed(2)}x
              </span>
            </div>
            <div className="game-stat-item">
              <span className="stat-label">Status</span>
              <span className={`stat-value ${gameState === 'crashed' ? 'red' : gameState === 'rising' ? 'green' : ''}`}>
                {gameState === 'rising' ? 'Live' : gameState === 'crashed' ? 'Crashed' : 'Waiting'}
              </span>
            </div>
            <div className="game-stat-item">
              <span className="stat-label">My bet</span>
              <span className="stat-value gold">{formatPts(bet)}</span>
            </div>
            <div className="game-stat-item">
              <span className="stat-label">My win</span>
              <span className="stat-value green">{isMyticketCashed ? formatPts(myWin) : '—'}</span>
            </div>
          </div>
        </div>

        {/* Players List Table */}
        <div className="players-list-panel">
          <div className="players-header">
            <span>{players.length + (gameState === 'rising' ? 1 : 0)} Players</span>
            <span>{formatPts(players.reduce((sum, p) => sum + p.bet, 0) + (gameState === 'rising' && !isMyticketCashed ? bet : 0))} VAULT</span>
          </div>

          <div className="players-rows">
            {gameState === 'rising' && (
              <div className="player-row my-row">
                <div className="player-left">
                  <img src={user?.avatar} alt="avatar" className="row-avatar" />
                  <span>{user?.name || 'You'} (You)</span>
                </div>
                <div className="player-right">
                  {isMyticketCashed ? (
                    <span className="payout-mult">{(myWin / bet).toFixed(2)}x</span>
                  ) : (
                    <span className="active-dot" />
                  )}
                  <span className={`payout-val ${isMyticketCashed ? 'win' : ''}`}>
                    {isMyticketCashed ? `${formatPts(myWin)} VAULT` : `${formatPts(bet)} VAULT`}
                  </span>
                </div>
              </div>
            )}

            {players.map((p, i) => (
              <div className={`player-row ${p.cashedOut ? 'cashed' : ''}`} key={i}>
                <div className="player-left">
                  <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${p.name}&backgroundColor=transparent`} alt="avatar" className="row-avatar" />
                  <span>{p.name}</span>
                </div>
                <div className="player-right">
                  {p.cashedOut && <span className="payout-mult">{p.target.toFixed(2)}x</span>}
                  <span className={`payout-val ${p.cashedOut ? 'win' : ''}`}>
                    {p.cashedOut ? `${formatPts(p.bet * p.target)} VAULT` : `${formatPts(p.bet)} VAULT`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VIEWPORT */}
      <div className="game-viewport crash-viewport">
        <ThemedBackdrop />

        {/* TOP VIEWPORT BAR */}
        <div className="viewport-top-overlay">
          <div className="history-badges">
            {history.map((mult, idx) => (
              <div className={`history-badge ${mult === 1.00 ? 'instant' : mult >= 2 ? 'high' : 'low'}`} key={idx}>
                {mult.toFixed(2)}x
              </div>
            ))}
          </div>
          <div className="viewport-controls">
            <button className="vp-icon-btn" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button className="vp-icon-btn"><HelpCircle size={18} /></button>
            <button className="vp-badge-btn"><Shield size={14} style={{ marginRight: 6 }} /> Fairness</button>
          </div>
        </div>

        <div className="viewport-content">
          <div className="multiplier-container" style={{ zIndex: 10 }}>
            <motion.h1
              key={currentMult.toFixed(2)}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className={`multiplier-val ${gameState === 'crashed' ? 'crashed-color' : ''}`}
              style={{ 
                color: gameState === 'crashed' ? '#ef4444' : 
                       currentMult >= 10 ? '#ef4444' : 
                       currentMult >= 5 ? '#facc15' : 
                       currentMult >= 2 ? '#00e676' : '#ffffff',
                textShadow: currentMult >= 2 ? `0 0 20px ${currentMult >= 10 ? '#ef4444' : currentMult >= 5 ? '#facc15' : '#00e676'}` : 'none',
                transition: 'color 0.3s ease, text-shadow 0.3s ease'
              }}
            >
              {currentMult.toFixed(2)}x
            </motion.h1>
            <div className="multiplier-label">
              {gameState === 'crashed' ? 'Crashed' : 'Current payout'}
            </div>
          </div>

          {/* ROCKET ANIMATION */}
          {gameState === 'rising' && (
            <motion.div
              className="rocket-wrapper"
              animate={{
                x: [0, 400],
                y: [0, -300],
                rotate: [45, 45, 48, 42, 45]
              }}
              style={{
                position: 'absolute',
                left: '20%',
                bottom: '15%',
                zIndex: 5
              }}
              transition={{
                x: { duration: Math.max(1, (crashPointRef.current - 1) * 3), ease: [0.5, 0, 1, 0.5] },
                y: { duration: Math.max(1, (crashPointRef.current - 1) * 3), ease: [0.5, 0, 1, 0.5] },
                rotate: { repeat: Infinity, duration: 0.2 }
              }}
            >
              {/* High Quality SVG Rocket */}
              <div className="rocket-flame" style={{ position: 'absolute', bottom: '-20px', left: '10px', width: '20px', height: '40px', background: 'linear-gradient(to bottom, #facc15, #ef4444, transparent)', filter: 'blur(4px)', animation: 'flicker 0.1s infinite alternate' }} />
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(45deg)', dropShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
              </svg>
            </motion.div>
          )}

          {gameState === 'crashed' && (
            <motion.div 
              className="explosion-sprite" 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [1, 2, 3], opacity: [1, 0.8, 0] }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', left: '40%', bottom: '40%', fontSize: '100px', filter: 'drop-shadow(0 0 20px #ef4444)' }}
            >
              💥
            </motion.div>
          )}
        </div>

        {/* BOTTOM AXIS */}
        <div className="bottom-axis">
          <span>0s</span><span>2s</span><span>4s</span><span>6s</span><span>8s</span><span>10s</span>
        </div>
      </div>

    </div>
  );
};
