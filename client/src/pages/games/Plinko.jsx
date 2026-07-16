import { VaultIcon } from '../../components/VaultIcon';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useStore, formatPts } from '../../store/useStore';
import { ThemedBackdrop } from './ThemedBackdrop';
import { HelpCircle, History, Volume2, VolumeX } from 'lucide-react';
import { playWin, playClick, playTick } from '../../utils/SoundEngine';
import './Games.css';
import './Plinko.css';

const MULTIPLIER_TABLES = {
  Easy: {
    8:  [2.5, 1.2, 0.8, 0.4, 0.2, 0.4, 0.8, 1.2, 2.5],
    10: [3.0, 1.5, 1.0, 0.5, 0.3, 0.2, 0.3, 0.5, 1.0, 1.5, 3.0],
    12: [4.0, 2.0, 1.2, 0.7, 0.4, 0.3, 0.2, 0.3, 0.4, 0.7, 1.2, 2.0, 4.0],
    14: [5.0, 2.5, 1.5, 0.8, 0.5, 0.3, 0.2, 0.1, 0.2, 0.3, 0.5, 0.8, 1.5, 2.5, 5.0],
    16: [6.0, 3.0, 1.8, 1.0, 0.6, 0.4, 0.3, 0.2, 0.1, 0.2, 0.3, 0.4, 0.6, 1.0, 1.8, 3.0, 6.0],
  },
  Normal: {
    8:  [4.0, 1.8, 0.8, 0.4, 0.2, 0.4, 0.8, 1.8, 4.0],
    10: [5.0, 2.5, 1.0, 0.5, 0.3, 0.2, 0.3, 0.5, 1.0, 2.5, 5.0],
    12: [7.0, 3.5, 1.5, 0.8, 0.4, 0.3, 0.1, 0.3, 0.4, 0.8, 1.5, 3.5, 7.0],
    14: [10, 5.0, 2.0, 1.0, 0.5, 0.3, 0.2, 0.1, 0.2, 0.3, 0.5, 1.0, 2.0, 5.0, 10],
    16: [15, 7.5, 3.0, 1.5, 0.8, 0.4, 0.2, 0.1, 0.1, 0.1, 0.2, 0.4, 0.8, 1.5, 3.0, 7.5, 15],
  },
  Hard: {
    8:  [8.0, 3.0, 0.8, 0.2, 0.1, 0.2, 0.8, 3.0, 8.0],
    10: [15, 5.0, 1.2, 0.3, 0.1, 0.0, 0.1, 0.3, 1.2, 5.0, 15],
    12: [25, 8.0, 2.0, 0.5, 0.1, 0.0, 0.0, 0.0, 0.1, 0.5, 2.0, 8.0, 25],
    14: [40, 12, 3.5, 0.8, 0.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.8, 3.5, 12, 40],
    16: [70, 20, 5.0, 1.2, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 1.2, 5.0, 20, 70],
  },
};

const getMultColor = (mult) => {
  if (mult >= 50) return '#ff1744';
  if (mult >= 20) return '#ff3d00';
  if (mult >= 10) return '#ff6d00';
  if (mult >= 5)  return '#ff9100';
  if (mult >= 2)  return '#ffab00';
  if (mult >= 1)  return '#ffd600';
  if (mult >= 0.5) return '#aeea00';
  return '#00c853';
};

export const Plinko = () => {
  const { balance, updateBalance } = useStore();
  const [bet, setBet] = useState(25);
  const [rows, setRows] = useState(12);
  const [difficulty, setDifficulty] = useState('Normal');
  const [isMuted, setIsMuted] = useState(false);
  const [lastMult, setLastMult] = useState(null);
  const [history, setHistory] = useState([]);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const ballsRef = useRef([]);
  const pegsRef = useRef([]);
  const bucketsRef = useRef([]);
  const layoutRef = useRef({ width: 0, height: 0, pegRadius: 0, ballRadius: 0, startX: 0, startY: 0, spacingX: 0, spacingY: 0 });
  // Keep a ref to isMuted so the physics loop always reads the current value
  const isMutedRef = useRef(isMuted);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  const getMultipliers = useCallback(() => {
    return MULTIPLIER_TABLES[difficulty]?.[rows] || MULTIPLIER_TABLES.Normal[12];
  }, [difficulty, rows]);

  /* ── Resize canvas to fill its CSS container ── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;
    const w = container.clientWidth || 640;
    const h = container.clientHeight || 520;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }, []);

  /* ── Compute peg & bucket layout ── */
  const computeLayout = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    resizeCanvas();
    const W = canvas.width;
    const H = canvas.height;
    const mults = getMultipliers();
    const pegR = Math.max(3, Math.min(5, W / (rows * 12)));
    const ballR = pegR * 2.2;
    const padTop = 40;
    const padBot = 50;
    const usableH = H - padTop - padBot;
    const spacingY = usableH / rows;
    const bottomPegs = rows + 2;
    const spacingX = (W - 80) / (bottomPegs - 1);

    const pegs = [];
    for (let r = 0; r < rows; r++) {
      const numPegsInRow = r + 3;
      const rowWidth = (numPegsInRow - 1) * spacingX;
      const startX = (W - rowWidth) / 2;
      const y = padTop + r * spacingY;
      for (let c = 0; c < numPegsInRow; c++) {
        pegs.push({ x: startX + c * spacingX, y, r: pegR, hit: 0 });
      }
    }

    const bucketY = padTop + rows * spacingY;
    const buckets = mults.map((mult, i) => {
      const numPegsLastRow = rows + 2;
      const rowWidth = (numPegsLastRow - 1) * spacingX;
      const startX = (W - rowWidth) / 2;
      const bx = startX + (i + 0.5) * spacingX; // Align perfectly in the gaps between pegs
      const bw = spacingX;
      return { x: bx - bw / 2, y: bucketY, w: bw, h: padBot - 10, mult, color: getMultColor(mult) };
    });

    pegsRef.current = pegs;
    bucketsRef.current = buckets;
    layoutRef.current = {
      width: W, height: H, pegRadius: pegR, ballRadius: ballR,
      startX: W / 2, startY: 8, spacingX, spacingY, padTop, padBot,
    };
  }, [rows, getMultipliers, resizeCanvas]);

  /* ── Drop a ball ── */
  const handleDrop = useCallback(() => {
    if (balance < bet) return;
    updateBalance(-bet);
    if (!isMutedRef.current) playClick();

    const layout = layoutRef.current;
    const jitter = (Math.random() - 0.5) * 6;
    ballsRef.current.push({
      x: layout.startX + jitter,
      y: layout.startY,
      vx: 0,
      vy: 0,
      r: layout.ballRadius,
      bet,
      settled: false,
      glow: 1,
      trail: [],
      isProcessed: false,
    });
  }, [balance, bet, updateBalance]);

  /* ── Physics tick ── */
  const physicsTick = useCallback((dt) => {
    const GRAVITY = 550;
    const DAMPING = 0.6;
    const BOUNCE = 0.45;
    const layout = layoutRef.current;
    const pegs = pegsRef.current;
    const buckets = bucketsRef.current;

    ballsRef.current.forEach(ball => {
      ball.vy += GRAVITY * dt;
      ball.vx *= (1 - DAMPING * dt);
      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      ball.trail.push({ x: ball.x, y: ball.y });
      if (ball.trail.length > 12) ball.trail.shift();

      for (const peg of pegs) {
        const dx = ball.x - peg.x;
        const dy = ball.y - peg.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = ball.r + peg.r;
        if (dist < minDist && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = minDist - dist;
          ball.x += nx * overlap;
          ball.y += ny * overlap;

          const dotVN = ball.vx * nx + ball.vy * ny;
          ball.vx -= (1 + BOUNCE) * dotVN * nx;
          ball.vy -= (1 + BOUNCE) * dotVN * ny;

          const distFromCenter = layout.width / 2 - ball.x;
          // Heavy center bias to ensure the house edge. Balls are physically pulled to the center.
          const centerPull = distFromCenter * 0.95; 
          ball.vx += (Math.random() - 0.5) * 18 + centerPull;

          peg.hit = 1;
          setTimeout(() => { peg.hit = 0; }, 150);
          // Use the ref — never a stale closure here
          if (!isMutedRef.current) playTick();
          break;
        }
      }

      if (ball.x < ball.r) { ball.x = ball.r; ball.vx = Math.abs(ball.vx) * 0.5; }
      if (ball.x > layout.width - ball.r) { ball.x = layout.width - ball.r; ball.vx = -Math.abs(ball.vx) * 0.5; }

      const bucketYThreshold = buckets[0]?.y || (layout.height - 50);
      if (ball.y >= bucketYThreshold && !ball.isProcessed) {
        ball.isProcessed = true;
        let bestIdx = 0;
        let bestDist = Infinity;
        buckets.forEach((b, i) => {
          const cx = b.x + b.w / 2;
          const d = Math.abs(ball.x - cx);
          if (d < bestDist) { bestDist = d; bestIdx = i; }
        });
        const mult = buckets[bestIdx].mult;
        const payout = ball.bet * mult;
        updateBalance(payout);
        useStore.getState().logGameResult('Plinko', ball.bet, payout, `${mult}x Multiplier`);
        setLastMult(mult);
        setHistory(prev => [{ mult, payout, time: Date.now() }, ...prev].slice(0, 20));

        buckets[bestIdx].flash = 1;
        setTimeout(() => { buckets[bestIdx].flash = 0; }, 400);
      }
    });

    ballsRef.current = ballsRef.current.filter(ball => ball.y <= layout.height + 20);
  }, [updateBalance]);

  /* ── Render frame ── */
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const pegs = pegsRef.current;
    const buckets = bucketsRef.current;

    ctx.clearRect(0, 0, W, H);

    pegs.forEach(peg => {
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, peg.r, 0, Math.PI * 2);
      if (peg.hit) {
        ctx.fillStyle = '#60a5fa';
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 12;
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    buckets.forEach(bucket => {
      const flash = bucket.flash || 0;
      ctx.fillStyle = bucket.color;
      ctx.globalAlpha = flash ? 1 : 0.85;
      const radius = 4;
      const bx = bucket.x + 2;
      const by = bucket.y + 4;
      const bw = bucket.w - 4;
      const bh = bucket.h - 8;
      ctx.beginPath();
      ctx.moveTo(bx + radius, by);
      ctx.lineTo(bx + bw - radius, by);
      ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + radius);
      ctx.lineTo(bx + bw, by + bh - radius);
      ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - radius, by + bh);
      ctx.lineTo(bx + radius, by + bh);
      ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - radius);
      ctx.lineTo(bx, by + radius);
      ctx.quadraticCurveTo(bx, by, bx + radius, by);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;

      if (flash) {
        ctx.shadowColor = bucket.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = '#fff';
      ctx.font = `bold ${bw > 30 ? 11 : 9}px Inter, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${bucket.mult}x`, bx + bw / 2, by + bh / 2);
    });

    ballsRef.current.forEach(ball => {
      ball.trail.forEach((p, i) => {
        const alpha = (i / ball.trail.length) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, ball.r * (i / ball.trail.length), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.fill();
      });

      const gradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.r * 2.5);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      const ballGrad = ctx.createRadialGradient(ball.x - ball.r * 0.3, ball.y - ball.r * 0.3, ball.r * 0.1, ball.x, ball.y, ball.r);
      ballGrad.addColorStop(0, '#93c5fd');
      ballGrad.addColorStop(1, '#3b82f6');
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fillStyle = ballGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(ball.x - ball.r * 0.25, ball.y - ball.r * 0.25, ball.r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fill();
    });
  }, []);

  /* ── Main game loop ── */
  useEffect(() => {
    computeLayout();

    let lastTime = performance.now();
    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      physicsTick(dt);
      renderFrame();
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    // Handle window resize — recompute layout so balls stay in bounds
    const onResize = () => {
      computeLayout();
      ballsRef.current = []; // clear any in-flight balls to avoid misalignment
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [computeLayout, physicsTick, renderFrame]);

  /* ── Recompute layout on rows/difficulty change ── */
  useEffect(() => {
    computeLayout();
    ballsRef.current = [];
  }, [rows, difficulty, computeLayout]);

  const mults = getMultipliers();

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
          <div className="ctrl-label">Difficulty</div>
          <div className="difficulty-select-row">
            {['Easy', 'Normal', 'Hard'].map(diff => (
              <button
                key={diff}
                className={`diff-btn ${difficulty === diff ? 'active' : ''}`}
                onClick={() => setDifficulty(diff)}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div className="ctrl-input-group">
          <div className="ctrl-label">Rows</div>
          <div className="rows-select-row">
            {[8, 10, 12, 14, 16].map(num => (
              <button
                key={num}
                className={`rows-btn ${rows === num ? 'active' : ''}`}
                onClick={() => setRows(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-game-submit" onClick={handleDrop}>
          Drop Ball
        </button>

        {lastMult !== null && (
          <div className={`plinko-last-result ${lastMult >= 1 ? 'win' : 'loss'}`}>
            Last: <span>{lastMult}x</span>
          </div>
        )}

        {history.length > 0 && (
          <div className="plinko-history">
            <div className="ctrl-label" style={{ marginBottom: 6 }}>Recent</div>
            <div className="plinko-history-tags">
              {history.map((h, i) => (
                <span key={i} className="plinko-htag" style={{ background: getMultColor(h.mult) }}>
                  {h.mult}x
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* VIEWPORT */}
      <div className="game-viewport plinko-viewport">
        <ThemedBackdrop />

        <div className="viewport-top-overlay">
          <div className="plinko-game-label">Plinko</div>
          <div className="viewport-controls">
            <button className="vp-icon-btn" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button className="vp-icon-btn"><HelpCircle size={18} /></button>
            <button className="vp-badge-btn"><History size={14} style={{ marginRight: 6 }} /> History</button>
          </div>
        </div>

        <div className="viewport-content plinko-content">
          {/* canvas fills the container; JS reads clientWidth/Height to set real pixel size */}
          <canvas
            ref={canvasRef}
            className="plinko-canvas"
          />
        </div>
      </div>
    </div>
  );
};
