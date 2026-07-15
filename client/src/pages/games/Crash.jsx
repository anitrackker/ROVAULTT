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
  
  // Animation Engine Refs
  const canvasRef = useRef(null);
  const rocketRef = useRef(null);
  const pathRef = useRef([]);
  const particlesRef = useRef([]);

  // Keep refs in sync with state
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
    isMyticketCashedRef.current = true;
    setIsMyticketCashed(true);
    const winAmt = betRef.current * mult;
    setMyWin(winAmt);
    updateBalance(winAmt);
    useStore.getState().logGameResult('Crash', betRef.current, winAmt, `${mult.toFixed(2)}x Cashout`);
    if (!isMutedRef.current) playWin();
    confetti({ particleCount: 80, spread: 60 });
  };

  const drawGraph = (elapsed, mult, isCrashed) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);

    // Coordinate Math
    const x = elapsed * 0.05;
    const y = (mult - 1) * 100;
    
    // Push to path if rising
    if (!isCrashed) {
      pathRef.current.push({ x, y });
    }

    // Dynamic Camera Panning (Keep rocket between 60%-80%)
    const targetX = cw * 0.75;
    const targetY = ch * 0.70;
    
    // Scale down if we exceed target bounds
    const scaleX = Math.min(1, targetX / Math.max(1, x));
    const scaleY = Math.min(1, targetY / Math.max(1, y));

    const paddingX = 40;
    const paddingY = 40;

    // Draw the glowing curve
    if (pathRef.current.length > 0) {
      ctx.beginPath();
      ctx.moveTo(paddingX, ch - paddingY);
      for (const pt of pathRef.current) {
        ctx.lineTo(paddingX + (pt.x * scaleX), ch - paddingY - (pt.y * scaleY));
      }
      ctx.strokeStyle = isCrashed ? '#ef4444' : '#ffffff';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = isCrashed ? '#ef4444' : (mult >= 10 ? '#ef4444' : mult >= 5 ? '#facc15' : '#00e676');
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    }

    // Calculate current pixel position for rocket
    const rx = paddingX + (x * scaleX);
    const ry = ch - paddingY - (y * scaleY);

    // Calculate Tangent Angle for Rocket Rotation
    let angle = 0;
    if (!isCrashed && pathRef.current.length > 1) {
      const prev = pathRef.current[pathRef.current.length - 2];
      const prevRx = paddingX + (prev.x * scaleX);
      const prevRy = ch - paddingY - (prev.y * scaleY);
      const dx = rx - prevRx;
      const dy = prevRy - ry; // flipped Y
      angle = Math.atan2(dy, dx) * (180 / Math.PI);
    }

    const clampedAngle = Math.max(0, Math.min(45, angle)); // Nose always points in direction of travel

    // Particle Exhaust System
    if (!isCrashed && elapsed > 100) {
      // Add 2-3 particles per frame based on speed
      const speed = mult > 10 ? 3 : mult > 5 ? 2 : 1;
      for (let i = 0; i < speed; i++) {
        particlesRef.current.push({
          x: rx - Math.cos(clampedAngle * Math.PI / 180) * 20, // Emit from back of rocket
          y: ry + Math.sin(clampedAngle * Math.PI / 180) * 20,
          vx: (Math.random() - 0.5) * 2 - (Math.cos(clampedAngle * Math.PI / 180) * 2), // Fire backwards
          vy: (Math.random() - 0.5) * 2 + (Math.sin(clampedAngle * Math.PI / 180) * 2),
          life: 1.0,
          size: Math.random() * 8 + 4
        });
      }
    }

    // Draw Particles
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.03;
      
      if (p.life <= 0) {
        particlesRef.current.splice(i, 1);
      } else {
        // Color gradient: White -> Yellow -> Orange -> Dark Orange based on life
        let color = `rgba(255, 255, 255, ${p.life})`;
        if (p.life < 0.8) color = `rgba(250, 204, 21, ${p.life})`;
        if (p.life < 0.5) color = `rgba(239, 68, 68, ${p.life})`;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Update DOM Rocket via Transform (GPU Accelerated, bypasses React)
    if (rocketRef.current) {
      if (isCrashed) {
        rocketRef.current.style.display = 'none'; // Hide rocket on crash
      } else {
        rocketRef.current.style.display = 'block';
        // -50% -50% to center it on the coordinates
        rocketRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) rotate(${-clampedAngle}deg)`;
        
        // Add dynamic glow to the rocket wrapper
        const glowColor = mult >= 10 ? 'rgba(239, 68, 68, 0.6)' : mult >= 5 ? 'rgba(250, 204, 21, 0.6)' : 'rgba(0, 230, 118, 0.4)';
        rocketRef.current.style.filter = `drop-shadow(0 0 ${10 + (mult * 2)}px ${glowColor})`;
      }
    }

    return { rx, ry };
  };

  const runLoop = () => {
    const elapsed = Date.now() - startRef.current;
    // k = 0.00006 creates a smooth but noticeable exponential curve
    const mult = Math.pow(Math.E, 0.00006 * Math.max(0, elapsed));

    if (mult >= crashPointRef.current) {
      // Crashed!
      setGameState('crashed');
      gameStateRef.current = 'crashed';
      setCurrentMult(crashPointRef.current);
      
      drawGraph(elapsed, crashPointRef.current, true); // Final draw call

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

    // Auto cashout
    const ac = parseFloat(autoCashoutRef.current);
    if (autoCashoutRef.current && ac > 1 && mult >= ac && !isMyticketCashedRef.current) {
      cashOut(mult);
    }

    drawGraph(elapsed, mult, false);

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
    
    // Reset engine state
    pathRef.current = [];
    particlesRef.current = [];
    
    // Size canvas properly
    if (canvasRef.current) {
      const parent = canvasRef.current.parentElement;
      canvasRef.current.width = parent.clientWidth;
      canvasRef.current.height = parent.clientHeight;
    }

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

  // Resize listener for canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        canvasRef.current.width = parent.clientWidth;
        canvasRef.current.height = parent.clientHeight;
        if (gameStateRef.current !== 'rising') {
           drawGraph(0, 1.00, false); // Draw initial state
        }
      }
    };
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100); // Initial sizing
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(loopRef.current);
    };
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
      <div className={`game-viewport crash-viewport ${gameState === 'crashed' ? 'screen-shake' : ''}`}>
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

        <div className="viewport-content" style={{ position: 'relative', overflow: 'hidden' }}>
          
          {/* HTML5 CANVAS FOR CURVE & EXHAUST */}
          <canvas 
            ref={canvasRef} 
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
          />

          <div className="multiplier-container" style={{ zIndex: 10 }}>
            <h1
              className={`multiplier-val ${gameState === 'crashed' ? 'crashed-color' : ''}`}
              style={{ 
                color: gameState === 'crashed' ? '#ef4444' : 
                       currentMult >= 10 ? '#ef4444' : 
                       currentMult >= 5 ? '#facc15' : 
                       currentMult >= 2 ? '#00e676' : '#ffffff',
                textShadow: currentMult >= 2 ? `0 0 20px ${currentMult >= 10 ? '#ef4444' : currentMult >= 5 ? '#facc15' : '#00e676'}` : 'none',
                transition: 'color 0.3s ease, text-shadow 0.3s ease',
                transform: gameState === 'crashed' ? 'scale(1)' : `scale(${1 + (currentMult * 0.01)})`
              }}
            >
              {currentMult.toFixed(2)}x
            </h1>
            <div className="multiplier-label">
              {gameState === 'crashed' ? 'Crashed' : 'Current payout'}
            </div>
          </div>

          {/* ROCKET DOM ELEMENT */}
          <div 
            ref={rocketRef}
            className={`premium-rocket ${gameState === 'waiting' ? 'idle-bob' : ''}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '120px', // 300% increase from old small size
              height: '120px',
              zIndex: 5,
              display: gameState === 'crashed' ? 'none' : 'block',
              transform: 'translate3d(40px, calc(100% - 40px), 0) translate(-50%, -50%) rotate(45deg)' // Default wait position
            }}
          >
            <img 
               src="/rocket.png" 
               alt="Rocket" 
               style={{ width: '100%', height: '100%', objectFit: 'contain' }}
               onError={(e) => {
                 // Fallback if image not uploaded yet
                 e.target.style.display = 'none';
                 e.target.nextSibling.style.display = 'block';
               }}
            />
            {/* Fallback SVG if image is missing */}
            <svg style={{ display: 'none', width: '100%', height: '100%' }} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
            </svg>
          </div>

          {gameState === 'crashed' && (
            <motion.div 
              className="explosion-sprite" 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [1, 3, 5], opacity: [1, 0.8, 0] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', fontSize: '140px', filter: 'drop-shadow(0 0 40px #ef4444)' }}
            >
              💥
            </motion.div>
          )}
        </div>

      </div>

    </div>
  );
};

