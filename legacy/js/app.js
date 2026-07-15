/* ═══════════════════════════════════════════════════
   RoVault — Main Application JavaScript v7 (High-Tech Bloxflip Clone)
   ═══════════════════════════════════════════════════ */

// ══════════════════════════════════════
// SOUND & ANIMATION ENGINE
// ══════════════════════════════════════
const SoundManager = {
  ctx: null,
  init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Bind hover sounds
    document.querySelectorAll('.btn, .nav-item').forEach(el => {
      el.addEventListener('mouseenter', () => this.play('hover'));
    });
    document.addEventListener('click', () => { if (this.ctx.state === 'suspended') this.ctx.resume(); });
  },
  play(type) {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    const now = this.ctx.currentTime;
    if (type === 'hover') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.02, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now); osc.stop(now + 0.05);
    } else if (type === 'bet') {
      osc.type = 'square'; osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
      gain.gain.setValueAtTime(0.05, now);
      osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'win') {
      osc.type = 'triangle'; osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
      gain.gain.setValueAtTime(0.05, now);
      osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'lose' || type === 'bomb' || type === 'crash') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(20, now + 0.3);
      gain.gain.setValueAtTime(0.1, now);
      osc.start(now); osc.stop(now + 0.3);
    }
  }
};

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const val = (progress * (end - start) + start).toFixed(2);
    obj.innerHTML = `$${val}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// ══════════════════════════════════════
// LIVE FEED ENGINE
// ══════════════════════════════════════
const LiveFeed = {
  names: ["Vortex", "Nebula", "CryptoGod", "BloxflipPro", "Osmancan", "Satoshi", "Gemini", "Hyperion"],
  games: ["Crash", "Mines", "Towers", "Plinko", "Cases", "Dice"],
  start() {
    setInterval(() => this.generateFakeWin(), Math.random() * 5000 + 4000);
  },
  generateFakeWin() {
    const name = this.names[Math.floor(Math.random() * this.names.length)] + Math.floor(Math.random()*99);
    const game = this.games[Math.floor(Math.random() * this.games.length)];
    const amt = (Math.random() * 500 + 10).toFixed(2);
    
    const div = document.createElement('div');
    div.className = 'live-feed-toast';
    div.innerHTML = `
      <img src="https://api.dicebear.com/9.x/thumbs/svg?seed=${name}&backgroundColor=111312&shapeColor=a3ff12" style="width:24px; border-radius:50%">
      <span><strong>${name}</strong> won <span style="color:var(--color-win)">$${amt}</span> on ${game}</span>
    `;
    document.getElementById('live-feed-container').appendChild(div);
    setTimeout(() => div.remove(), 5000);
  }
};

// ══════════════════════════════════════
// RIGHT SIDEBAR WIDGETS
// ══════════════════════════════════════
const SidebarWidgets = {
  chatNames: ["LuckyKing", "NovaBlade", "HighRoller", "CaseMaster", "DiamondX", "CryptoWhale", "VoltGaming", "RoobetPro"],
  chatMessages: [
    "Just hit a crazy win!", "Plinko is so good today", "Let's gooo!", 
    "Nice pull!", "Mines always scary", "Crash is broken lmao", "Anyone doing cases?", "GGs guys"
  ],
  init() {
    this.renderLeaderboard();
    this.populateInitialChat();
    setInterval(() => this.pushChatMessage(), Math.random() * 8000 + 5000);
  },
  
  renderLeaderboard() {
    const list = document.getElementById('leaderboard-list');
    if (!list) return;
    const players = [
      { name: "LuckyKing", amt: 24650.00 },
      { name: "NovaBlade", amt: 18430.50 },
      { name: "HighRoller", amt: 12500.20 },
      { name: "CaseMaster", amt: 9850.10 },
      { name: "DiamondX", amt: 7650.80 }
    ];
    
    list.innerHTML = players.map((p, i) => `
      <div class="lb-row">
        <div class="lb-left">
          <div class="lb-rank ${i === 0 ? 'gold' : ''}">${i + 1}</div>
          <div class="lb-name">${p.name}</div>
        </div>
        <div class="lb-amount">$${p.amt.toFixed(2)}</div>
      </div>
    `).join('');
  },
  
  populateInitialChat() {
    const chat = document.getElementById('chat-messages');
    if (!chat) return;
    for(let i=0; i<5; i++) {
      this.pushChatMessage(true);
    }
  },
  
  pushChatMessage(initial = false) {
    const chat = document.getElementById('chat-messages');
    if (!chat) return;
    
    const name = this.chatNames[Math.floor(Math.random() * this.chatNames.length)];
    const msg = this.chatMessages[Math.floor(Math.random() * this.chatMessages.length)];
    const isVip = Math.random() > 0.8;
    
    const div = document.createElement('div');
    div.className = 'chat-msg';
    div.innerHTML = `
      <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=${name}&backgroundColor=transparent" class="chat-avatar">
      <div class="chat-body">
        <div class="chat-name-row">
          <span class="chat-name">${name} ${isVip ? '<span style="color:#ffd700">👑</span>' : ''}</span>
          <span class="chat-time">${initial ? Math.floor(Math.random()*10+1)+'m ago' : 'Just now'}</span>
        </div>
        <div class="chat-text">${msg}</div>
      </div>
    `;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    
    if (chat.children.length > 30) chat.removeChild(chat.firstChild);
  }
};

// ══════════════════════════════════════
// DB HELPERS & STATE
// ══════════════════════════════════════
const API_URL = 'http://localhost:3000/api';

async function fetchUserFromDB(username) {
  try {
    const res = await fetch(`${API_URL}/users/${encodeURIComponent(username)}`);
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch (e) { return null; }
}
async function saveUserToDB(username, userData) {
  try {
    fetch(`${API_URL}/users`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username, balance: userData.balance, totalWagered: userData.totalWagered,
        signupBonusMet: userData.signupBonusMet, linkedCookieHash: userData.linkedCookieHash
      })
    });
  } catch (e) {}
}
function cryptoRand() {
  return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
}

const state = {
  user: null, balance: 0, isLoggedIn: false, totalWagered: 0, totalWins: 0, signupBonusMet: false, linkedCookieHash: null,
  lastDailyClaim: 0
};
const SIGNUP_BONUS = 1250.00;
const WAGER_REQ = 5000.00;

function deductBet(amount) {
  if (!state.isLoggedIn) { showToast('Please log in first.', 'error'); return false; }
  if (isNaN(amount) || amount <= 0) { showToast('Invalid bet amount.', 'error'); return false; }
  if (amount > state.balance) { showToast('Insufficient balance.', 'error'); return false; }
  
  const oldBal = state.balance;
  state.balance -= amount;
  state.totalWagered += amount;
  if (state.totalWagered >= WAGER_REQ) state.signupBonusMet = true;
  saveAccount();
  
  SoundManager.play('bet');
  animateValue($('#wallet-amount'), oldBal, state.balance, 300);
  return true;
}
function creditWin(amount) {
  const oldBal = state.balance;
  state.balance += amount;
  state.totalWins += amount;
  saveAccount();
  
  SoundManager.play('win');
  animateValue($('#wallet-amount'), oldBal, state.balance, 500);
}

// ══════════════════════════════════════
// DOM REFS & NAVIGATION
// ══════════════════════════════════════
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function switchView(target) {
  SoundManager.init(); // Init on first click
  $$('.view-section').forEach(el => el.classList.remove('active'));
  $(`#view-${target}`).classList.add('active');
  $$('.nav-item').forEach(el => {
    if (el.dataset.target === target) el.classList.add('active');
    else el.classList.remove('active');
  });
  if (target === 'plinko' && !PlinkoEngine.initialized) PlinkoEngine.init();
}

$$('.nav-item').forEach(el => {
  el.addEventListener('click', (e) => { e.preventDefault(); if (el.dataset.target) switchView(el.dataset.target); });
});

function applyScreenShake(el) {
  el.classList.add('shake-anim');
  setTimeout(() => el.classList.remove('shake-anim'), 400);
}

// ══════════════════════════════════════
// 1. MINES ENGINE
// ══════════════════════════════════════
const Mines = {
  isPlaying: false, bet: 0, count: 3, safe: 0, locations: [], grid: [], mult: 1.00,
  
  init() {
    $('#mines-grid').innerHTML = '';
    this.grid = [];
    for (let i = 0; i < 25; i++) {
      const t = document.createElement('div'); t.className = 'mine-tile';
      t.addEventListener('click', () => this.click(i));
      $('#mines-grid').appendChild(t); this.grid.push(t);
    }
    $('#btn-mines-play').addEventListener('click', () => this.start());
    $('#btn-mines-cashout').addEventListener('click', () => this.cashout());
  },
  
  start() {
    const bet = parseFloat($('#mines-bet').value);
    this.count = parseInt($('#mines-count').value);
    if (!deductBet(bet)) return;
    
    this.isPlaying = true; this.bet = bet; this.safe = 0; this.mult = 1.00;
    this.locations = [];
    while (this.locations.length < this.count) {
      const r = Math.floor(cryptoRand() * 25);
      if (!this.locations.includes(r)) this.locations.push(r);
    }
    
    this.grid.forEach(t => { t.className = 'mine-tile'; t.innerHTML = ''; t.classList.remove('revealed', 'bomb', 'safe', 'dimmed'); });
    $('#mines-overlay').classList.add('hidden');
    $('#btn-mines-play').classList.add('hidden');
    $('#btn-mines-cashout').classList.remove('hidden');
    this.updateUI();
  },
  
  click(i) {
    if (!this.isPlaying || this.grid[i].classList.contains('revealed')) return;
    if (this.locations.includes(i)) {
      this.grid[i].classList.add('revealed', 'bomb');
      SoundManager.play('bomb');
      applyScreenShake($('.game-board-area'));
      this.end(false);
    } else {
      this.safe++;
      this.mult = this.calcMult(this.safe, this.count);
      this.grid[i].classList.add('revealed', 'safe');
      SoundManager.play('hover'); // ping sound
      if (this.safe === 25 - this.count) this.end(true);
      else this.updateUI();
    }
  },
  
  calcMult(picks, mines) {
    let m = 0.99;
    for (let i=0; i<picks; i++) m *= (25-i)/(25-mines-i);
    return parseFloat(m.toFixed(2));
  },
  
  updateUI() { $('#mines-current-mult').textContent = this.mult.toFixed(2); },
  
  cashout() { if (this.isPlaying && this.safe > 0) this.end(true); },
  
  end(win) {
    this.isPlaying = false;
    this.grid.forEach((t, i) => {
      if (!t.classList.contains('revealed')) {
        t.classList.add('revealed', 'dimmed', this.locations.includes(i) ? 'bomb' : 'safe');
      }
    });
    if (win) {
      const payout = this.bet * this.mult;
      creditWin(payout);
      showToast(`Cashed out $${payout.toFixed(2)} at ${this.mult}x`, 'success');
      if(typeof confetti === 'function') confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      showToast(`Busted. Lost $${this.bet.toFixed(2)}`, 'error');
    }
    $('#btn-mines-play').classList.remove('hidden');
    $('#btn-mines-cashout').classList.add('hidden');
    $('#mines-overlay').classList.remove('hidden');
    $('#mines-overlay h2').textContent = win ? 'Winner!' : 'Busted!';
    $('#mines-overlay p').textContent = win ? `You won $${(this.bet*this.mult).toFixed(2)}` : 'You hit a mine.';
  }
};

// ══════════════════════════════════════
// 2. DICE ENGINE
// ══════════════════════════════════════
const Dice = {
  init() {
    const s = $('#dice-slider');
    s.addEventListener('input', () => {
      const target = parseFloat(s.value);
      $('#dice-target-display').textContent = target.toFixed(2);
      const chance = 100 - target;
      $('#dice-chance').value = chance.toFixed(2);
      $('#dice-target-mult').value = (99 / chance).toFixed(2);
      SoundManager.play('hover');
    });
    $('#btn-dice-play').addEventListener('click', () => this.roll());
  },
  roll() {
    const bet = parseFloat($('#dice-bet').value);
    if (!deductBet(bet)) return;
    
    const target = parseFloat($('#dice-slider').value);
    const result = (cryptoRand() * 100).toFixed(2);
    const mult = parseFloat($('#dice-target-mult').value);
    
    const resEl = $('#dice-result');
    resEl.textContent = result;
    
    if (parseFloat(result) > target) {
      resEl.style.color = 'var(--color-win)';
      creditWin(bet * mult);
      showToast(`Rolled ${result}. Won $${(bet*mult).toFixed(2)}`, 'success');
    } else {
      resEl.style.color = 'var(--color-lose)';
      SoundManager.play('lose');
      showToast(`Rolled ${result}. Lost $${bet.toFixed(2)}`, 'error');
    }
  }
};

// ══════════════════════════════════════
// 3. COINFLIP ENGINE
// ══════════════════════════════════════
const Coinflip = {
  side: 'heads',
  isFlipping: false,
  init() {
    $$('.coin-btn').forEach(b => {
      b.addEventListener('click', () => {
        if (this.isFlipping) return;
        $$('.coin-btn').forEach(btn => btn.classList.remove('selected'));
        b.classList.add('selected');
        this.side = b.dataset.side;
        SoundManager.play('hover');
      });
    });
    $('#btn-coinflip-play').addEventListener('click', () => this.flip());
  },
  flip() {
    if (this.isFlipping) return;
    const bet = parseFloat($('#coinflip-bet').value);
    if (!deductBet(bet)) return;
    
    this.isFlipping = true;
    const coin = $('#coin-obj');
    const txt = $('#coinflip-result-text');
    txt.textContent = 'Flipping...';
    txt.style.color = 'white';
    
    coin.style.transition = 'none';
    coin.style.transform = 'rotateY(0deg)';
    void coin.offsetWidth; 
    
    const isHeads = cryptoRand() > 0.5;
    const spins = 5; 
    const deg = isHeads ? (spins * 360) : (spins * 360 + 180);
    
    coin.style.transition = 'transform 3s cubic-bezier(0.1, 0.8, 0.2, 1)';
    coin.style.transform = `rotateY(${deg}deg)`;
    
    setTimeout(() => {
      this.isFlipping = false;
      const resultSide = isHeads ? 'heads' : 'tails';
      if (this.side === resultSide) {
        txt.textContent = `It's ${resultSide}! You won $${(bet * 1.95).toFixed(2)}`;
        txt.style.color = 'var(--color-win)';
        creditWin(bet * 1.95);
        if(typeof confetti === 'function') confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        txt.textContent = `It's ${resultSide}. You lost.`;
        txt.style.color = 'var(--color-lose)';
        SoundManager.play('lose');
      }
    }, 3100);
  }
};

// ══════════════════════════════════════
// 4. TOWERS ENGINE
// ══════════════════════════════════════
const Towers = {
  isPlaying: false, bet: 0, currentRow: 0, mult: 1.00, rows: [],
  init() {
    this.buildGrid();
    $('#btn-towers-play').addEventListener('click', () => this.start());
    $('#btn-towers-cashout').addEventListener('click', () => this.cashout());
  },
  buildGrid() {
    const grid = $('#towers-grid');
    grid.innerHTML = '';
    this.rows = [];
    for (let r=0; r<8; r++) {
      const row = document.createElement('div'); row.className = 'tower-row';
      const tiles = [];
      for (let c=0; c<3; c++) {
        const t = document.createElement('div'); t.className = 'tower-tile';
        t.addEventListener('click', () => this.click(r, t));
        row.appendChild(t);
        tiles.push(t);
      }
      grid.appendChild(row);
      this.rows.push({ el: row, tiles });
    }
  },
  start() {
    const bet = parseFloat($('#towers-bet').value);
    if (!deductBet(bet)) return;
    
    this.rows.forEach(r => {
      const bombIndex = Math.floor(cryptoRand() * 3);
      r.tiles.forEach((t, i) => {
        t.dataset.isBomb = (i === bombIndex);
        t.className = 'tower-tile';
      });
      r.el.classList.remove('active');
    });

    this.isPlaying = true; this.bet = bet; this.currentRow = 0; this.mult = 1.00;
    this.rows[0].el.classList.add('active');
    
    $('#towers-overlay').classList.add('hidden');
    $('#btn-towers-play').classList.add('hidden');
    $('#btn-towers-cashout').classList.remove('hidden');
    $('#towers-mult').textContent = '1.00';
  },
  click(rIdx, tile) {
    if (!this.isPlaying || rIdx !== this.currentRow) return;
    if (tile.dataset.isBomb === 'true') {
      tile.classList.add('revealed', 'bomb');
      tile.innerHTML = '💣';
      SoundManager.play('bomb');
      applyScreenShake($('.game-board-area'));
      this.end(false);
    } else {
      tile.classList.add('revealed', 'safe');
      this.mult = parseFloat((this.mult * 1.45).toFixed(2));
      $('#towers-mult').textContent = this.mult.toFixed(2);
      this.rows[this.currentRow].el.classList.remove('active');
      this.currentRow++;
      SoundManager.play('hover');
      if (this.currentRow >= 8) {
        this.end(true);
      } else {
        this.rows[this.currentRow].el.classList.add('active');
      }
    }
  },
  cashout() { if(this.isPlaying && this.currentRow > 0) this.end(true); },
  end(win) {
    this.isPlaying = false;
    this.rows.forEach(r => r.el.classList.remove('active'));
    if (win) {
      creditWin(this.bet * this.mult);
      showToast(`Cashed out $${(this.bet*this.mult).toFixed(2)}`, 'success');
      if(typeof confetti === 'function') confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
      showToast(`Hit a bomb! Lost $${this.bet.toFixed(2)}`, 'error');
    }
    $('#towers-overlay').classList.remove('hidden');
    $('#btn-towers-play').classList.remove('hidden');
    $('#btn-towers-cashout').classList.add('hidden');
    $('#towers-overlay h2').textContent = win ? 'Winner!' : 'Busted!';
    $('#towers-overlay p').textContent = win ? `Won $${(this.bet*this.mult).toFixed(2)}` : 'Better luck next time.';
  }
};

// ══════════════════════════════════════
// 4.5. CRASH ENGINE (WITH BOTS)
// ══════════════════════════════════════
const Crash = {
  isPlaying: false, isCashedOut: false, bet: 0, autoCashout: 0, currentMult: 1.00, crashPoint: 1.00,
  timer: null, startTime: 0, canvas: null, ctx: null, bots: [],
  
  init() {
    this.canvas = $('#crash-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.drawCurve(1.00);
    $('#btn-crash-play').addEventListener('click', () => this.start());
    $('#btn-crash-cashout').addEventListener('click', () => this.cashout());
  },
  
  generateCrashPoint() {
    const e = 2 ** 32;
    const h = crypto.getRandomValues(new Uint32Array(1))[0];
    if (h % 33 === 0) return 1.00; // 3% instant crash
    return Math.max(1.00, parseFloat((100 * e - h) / (e - h) / 100).toFixed(2));
  },
  
  generateBots() {
    const names = ["Nebula", "Osmancan", "Vortex", "Quantum", "Hyperion", "CryptoKing", "RoobetPro", "BloxGod", "Luna", "Titan"];
    this.bots = [];
    const numBots = 5 + Math.floor(cryptoRand() * 10);
    for(let i=0; i<numBots; i++) {
      this.bots.push({
        name: names[Math.floor(cryptoRand()*names.length)] + Math.floor(cryptoRand()*100),
        bet: Math.floor(cryptoRand()*500) + 10,
        targetMult: 1.01 + cryptoRand()*10,
        cashedOut: false
      });
    }
    this.renderTable();
  },
  
  renderTable() {
    const list = $('#crash-players-list');
    list.innerHTML = '';
    
    // Add real player if playing
    if (this.isPlaying) {
      const pRow = document.createElement('div');
      pRow.className = `crash-player-row ${this.isCashedOut ? 'cashed-out' : ''} ${!this.isPlaying && !this.isCashedOut ? 'crashed' : ''}`;
      pRow.innerHTML = `
        <div style="font-weight:700; color:var(--accent-green)">${state.user.name} (You)</div>
        <div>$${this.bet.toFixed(2)}</div>
        <div>${this.isCashedOut ? this.currentMult.toFixed(2) + 'x' : '-'}</div>
        <div>${this.isCashedOut ? '$'+(this.bet*this.currentMult).toFixed(2) : '-'}</div>
      `;
      list.appendChild(pRow);
    }

    this.bots.sort((a,b) => b.bet - a.bet).forEach(bot => {
      const row = document.createElement('div');
      row.className = `crash-player-row ${bot.cashedOut ? 'cashed-out' : ''} ${!this.isPlaying && !bot.cashedOut ? 'crashed' : ''}`;
      row.innerHTML = `
        <div>${bot.name}</div>
        <div>$${bot.bet.toFixed(2)}</div>
        <div>${bot.cashedOut ? bot.targetMult.toFixed(2) + 'x' : '-'}</div>
        <div>${bot.cashedOut ? '$'+(bot.bet*bot.targetMult).toFixed(2) : '-'}</div>
      `;
      list.appendChild(row);
    });
  },

  start() {
    const bet = parseFloat($('#crash-bet').value);
    const auto = parseFloat($('#crash-auto').value);
    if (!deductBet(bet)) return;
    
    this.isPlaying = true; this.isCashedOut = false; this.bet = bet; this.autoCashout = isNaN(auto) ? 0 : auto;
    this.currentMult = 1.00; this.crashPoint = this.generateCrashPoint();
    this.startTime = Date.now();
    this.generateBots();
    
    $('#btn-crash-play').classList.add('hidden');
    $('#btn-crash-cashout').classList.remove('hidden');
    $('#crash-mult-display').style.color = 'var(--text-main)';
    $('#crash-status-display').textContent = 'Graph is rising...';
    
    this.loop();
  },
  
  loop() {
    if (!this.isPlaying) return;
    
    const elapsed = Date.now() - this.startTime;
    this.currentMult = Math.pow(Math.E, 0.00006 * elapsed);
    
    let botsUpdated = false;
    this.bots.forEach(bot => {
      if (!bot.cashedOut && bot.targetMult <= this.currentMult) {
        bot.cashedOut = true; botsUpdated = true;
      }
    });
    if (botsUpdated) this.renderTable();
    
    if (this.currentMult >= this.crashPoint) {
      this.currentMult = this.crashPoint;
      this.end(false);
      return;
    }
    
    if (!this.isCashedOut && this.autoCashout > 1 && this.currentMult >= this.autoCashout) {
      this.cashout(true);
    }
    
    this.updateUI();
    this.drawCurve(this.currentMult);
    this.timer = requestAnimationFrame(() => this.loop());
  },
  
  updateUI() { $('#crash-mult-display').textContent = `${this.currentMult.toFixed(2)}x`; },
  
  drawCurve(mult) {
    const ctx = this.ctx; const w = this.canvas.width; const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h); ctx.beginPath(); ctx.moveTo(0, h);
    
    const points = 50;
    for (let i = 0; i <= points; i++) {
      const x = (i / points) * w;
      const progress = i / points;
      const curveHeight = (Math.pow(progress, 2) * (h * 0.8));
      ctx.lineTo(x, h - curveHeight);
    }
    
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.isCashedOut ? '#8e9590' : 'var(--accent-green)';
    ctx.stroke();
    
    ctx.lineTo(w, h); ctx.lineTo(0, h);
    ctx.fillStyle = this.isCashedOut ? 'rgba(255,255,255,0.05)' : 'rgba(163, 255, 18, 0.1)';
    ctx.fill();
  },
  
  cashout(isAuto = false) {
    if (!this.isPlaying || this.isCashedOut) return;
    this.isCashedOut = true;
    
    const winAmt = this.bet * this.currentMult;
    creditWin(winAmt);
    showToast(`Cashed out at ${this.currentMult.toFixed(2)}x (Won $${winAmt.toFixed(2)})`, 'success');
    
    $('#btn-crash-cashout').classList.add('hidden');
    $('#crash-status-display').textContent = isAuto ? 'Auto Cashed Out!' : 'Cashed Out!';
    this.renderTable();
  },
  
  end(didWin) {
    this.isPlaying = false;
    cancelAnimationFrame(this.timer);
    
    this.updateUI();
    this.drawCurve(this.currentMult);
    this.renderTable();
    
    $('#btn-crash-cashout').classList.add('hidden');
    $('#btn-crash-play').classList.remove('hidden');
    
    const display = $('#crash-mult-display');
    display.textContent = `${this.crashPoint.toFixed(2)}x`;
    display.style.color = 'var(--color-lose)';
    
    SoundManager.play('crash');
    
    if (!this.isCashedOut) {
      $('#crash-status-display').textContent = 'Crashed!';
      showToast(`Crashed at ${this.crashPoint.toFixed(2)}x! Lost $${this.bet.toFixed(2)}`, 'error');
    }
  }
};

// ══════════════════════════════════════
// 5. CASES ENGINE
// ══════════════════════════════════════
const Cases = {
  items: [
    { name: 'Common Skin', value: 5, tier: 'gray' },
    { name: 'Rare Core', value: 25, tier: 'blue' },
    { name: 'Epic Blade', value: 100, tier: 'purple' },
    { name: 'Gold Watch', value: 500, tier: 'gold' }
  ],
  init() {
    $('#btn-cases-play').addEventListener('click', () => this.open());
  },
  open() {
    const cost = 50;
    if (!deductBet(cost)) return;
    
    const track = $('#cases-track');
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
    track.innerHTML = '';
    
    let targetItem = null;
    for (let i = 0; i < 60; i++) {
      const r = cryptoRand();
      let item = this.items[0]; 
      if (r > 0.7) item = this.items[1]; 
      if (r > 0.9) item = this.items[2]; 
      if (r > 0.98) item = this.items[3]; 
      
      if (i === 50) targetItem = item; 
      
      const el = document.createElement('div');
      el.className = `case-item tier-${item.tier}`;
      el.dataset.name = item.name;
      const imgSeed = encodeURIComponent(item.name);
      el.innerHTML = `
        <img src="https://api.dicebear.com/9.x/icons/svg?seed=${imgSeed}&backgroundColor=transparent" style="width:50px; height:50px; filter: drop-shadow(0 0 5px rgba(255,255,255,0.5));">
        <div style="font-size: 16px; font-weight: 800; color: #fff; margin-top: 5px;">$${item.value}</div>
      `;
      track.appendChild(el);
    }
    
    void track.offsetWidth; 
    
    const targetX = -(50 * 130) + (track.parentElement.offsetWidth / 2) - 65;
    const randomOffset = (cryptoRand() - 0.5) * 100; 
    
    track.style.transition = 'transform 5s cubic-bezier(0.1, 0.8, 0.1, 1)';
    track.style.transform = `translateX(${targetX + randomOffset}px)`;
    
    $('#cases-result').textContent = 'Rolling...';
    $('#cases-result').style.color = 'white';
    
    SoundManager.play('hover'); // Initial sound
    
    setTimeout(() => {
      creditWin(targetItem.value);
      $('#cases-result').textContent = `You won ${targetItem.name}! ($${targetItem.value})`;
      $('#cases-result').style.color = targetItem.value > 50 ? 'var(--color-win)' : 'var(--text-muted)';
      showToast(`Unboxed ${targetItem.name} worth $${targetItem.value}`);
      
      if (targetItem.tier === 'purple' || targetItem.tier === 'gold') {
        if(typeof confetti === 'function') confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      }
    }, 5100);
  }
};

// ══════════════════════════════════════
// 6. PLINKO (MATTER.JS PHYSICS)
// ══════════════════════════════════════
const PlinkoEngine = {
  initialized: false,
  engine: null, render: null, runner: null,
  multipliers: [110, 41, 10, 5, 3, 1.5, 1, 0.5, 1, 1.5, 3, 5, 10, 41, 110],
  init() {
    if (this.initialized || typeof Matter === 'undefined') return;
    this.initialized = true;
    
    const { Engine, Render, Runner, World, Bodies, Events } = Matter;
    this.engine = Engine.create();
    
    const container = $('#plinko-canvas-container');
    const w = 600, h = 500;
    
    this.render = Render.create({
      element: container,
      engine: this.engine,
      options: { width: w, height: h, wireframes: false, background: 'transparent' }
    });
    
    const rows = 14; const spacing = 36;
    for (let r = 0; r < rows; r++) {
      const numPegs = r + 3;
      const rowY = 50 + (r * spacing);
      for (let c = 0; c < numPegs; c++) {
        const cx = w/2 - ((numPegs-1)*spacing/2) + (c*spacing);
        const peg = Bodies.circle(cx, rowY, 4, { isStatic: true, render: { fillStyle: '#fff' } });
        World.add(this.engine.world, peg);
      }
    }
    
    const numBuckets = 15;
    for (let i = 0; i < numBuckets; i++) {
      const bx = w/2 - ((numBuckets-1)*spacing/2) + (i*spacing);
      const bY = 50 + (rows * spacing);
      const bucket = Bodies.rectangle(bx, bY, spacing-4, 20, { 
        isStatic: true, isSensor: true, label: `bucket_${i}`,
        render: { fillStyle: this.getBucketColor(this.multipliers[i]) }
      });
      World.add(this.engine.world, bucket);
    }
    
    Events.on(this.engine, 'collisionStart', (event) => {
      event.pairs.forEach(pair => {
        const bodyA = pair.bodyA; const bodyB = pair.bodyB;
        if (bodyA.label.startsWith('bucket') || bodyB.label.startsWith('bucket')) {
          const ball = bodyA.label === 'ball' ? bodyA : bodyB;
          const bucket = bodyA.label.startsWith('bucket') ? bodyA : bodyB;
          
          if (!ball.isProcessed) {
            ball.isProcessed = true;
            World.remove(this.engine.world, ball);
            
            const bIdx = parseInt(bucket.label.split('_')[1]);
            const mult = this.multipliers[bIdx];
            const bet = ball.betAmount;
            
            creditWin(bet * mult);
            showToast(`Plinko: Ball landed in ${mult}x. Won $${(bet*mult).toFixed(2)}`, mult >= 1 ? 'success' : 'error');
          }
        }
      });
    });

    Render.run(this.render);
    Runner.run(Runner.create(), this.engine);
    
    $('#btn-plinko-play').addEventListener('click', () => this.drop());
  },
  
  getBucketColor(mult) {
    if (mult >= 10) return '#ff3d00';
    if (mult >= 3) return '#ffb436';
    if (mult >= 1) return '#00e676';
    return '#555';
  },

  drop() {
    const bet = parseFloat($('#plinko-bet').value);
    if (!deductBet(bet)) return;
    
    const { Bodies, World } = Matter;
    const randomOffset = (cryptoRand() - 0.5) * 10;
    const ball = Bodies.circle(300 + randomOffset, -10, 8, {
      restitution: 0.5, friction: 0.05, density: 0.04, label: 'ball',
      render: { fillStyle: 'var(--accent-green)' }
    });
    ball.betAmount = bet;
    World.add(this.engine.world, ball);
  }
};


// ══════════════════════════════════════
// AUTH LOGIC & DAILY BONUS
// ══════════════════════════════════════
async function handleAuth(username) {
  if (!username) return;
  
  const local = JSON.parse(localStorage.getItem('rovault_accounts')||'{}')[username.toLowerCase()];
  
  if (local) {
    state.user = local.user; state.balance = local.balance; state.totalWagered = local.totalWagered; 
    state.totalWins = local.totalWins || 0; state.lastDailyClaim = local.lastDailyClaim || 0;
  } else {
    state.user = { name: username }; state.balance = SIGNUP_BONUS; state.totalWagered = 0; 
    state.totalWins = 0; state.lastDailyClaim = 0;
  }
  
  state.isLoggedIn = true;
  state.user.avatarUrl = `https://api.dicebear.com/9.x/thumbs/svg?seed=${username}&backgroundColor=111312&shapeColor=a3ff12`;
  saveAccount(); 
  updateAuthUI();
  $('#modal-signup').classList.remove('open');
  showToast(`Welcome back, ${username}!`);

  fetchUserFromDB(username).then(dbUser => {
    if (dbUser) {
      state.balance = dbUser.balance; state.totalWagered = dbUser.total_wagered; 
      state.totalWins = dbUser.total_wins || 0;
      saveAccount(); updateAuthUI();
    }
  });

  fetch(`https://bloxflip.com/api/rolimons-username?q=${username}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.success && data.avatar) {
        state.user.avatarUrl = data.avatar;
        saveAccount(); updateAuthUI();
      }
    })
    .catch(() => {});
}

function saveAccount() {
  if (!state.user) return;
  const accs = JSON.parse(localStorage.getItem('rovault_accounts')||'{}');
  accs[state.user.name.toLowerCase()] = state;
  localStorage.setItem('rovault_accounts', JSON.stringify(accs));
  localStorage.setItem('rovault_current', state.user.name.toLowerCase());
  saveUserToDB(state.user.name, state);
  updateAuthUI();
}

function updateAuthUI() {
  if (state.isLoggedIn) {
    $('#nav-auth-loggedout').classList.add('hidden');
    $('#nav-auth-loggedin').classList.remove('hidden');
    $('#nav-auth-loggedin').style.display = 'flex';
    $('#wallet-amount').textContent = `$${state.balance.toFixed(2)}`;
    $('#user-name').textContent = state.user.name;
    $('#user-avatar').src = state.user.avatarUrl;
    $('#stat-balance').textContent = `$${state.balance.toFixed(2)}`;
    $('#stat-wagered').textContent = `$${state.totalWagered.toFixed(2)}`;
    $('#stat-wins').textContent = `$${state.totalWins.toFixed(2)}`;
  } else {
    $('#nav-auth-loggedout').classList.remove('hidden');
    $('#nav-auth-loggedin').classList.add('hidden');
  }
}

function checkDailyBonus() {
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  
  if (now - state.lastDailyClaim >= ONE_DAY) {
    $('#daily-bonus-time').textContent = 'Ready to claim!';
    $('#btn-daily-bonus').disabled = false;
  } else {
    const timeLeft = ONE_DAY - (now - state.lastDailyClaim);
    const hrs = Math.floor(timeLeft / (1000 * 60 * 60));
    const mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((timeLeft % (1000 * 60)) / 1000);
    $('#daily-bonus-time').textContent = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    $('#btn-daily-bonus').disabled = true;
  }
}
setInterval(checkDailyBonus, 1000);

$('#btn-daily-bonus').addEventListener('click', () => {
  if (!state.isLoggedIn) { showToast('Log in to claim bonus', 'error'); return; }
  state.balance += 250;
  state.lastDailyClaim = Date.now();
  saveAccount();
  showToast('Claimed $250 Daily Bonus!', 'success');
  checkDailyBonus();
});

function showToast(msg, type='info') {
  const t = document.createElement('div'); t.className = `toast ${type}`; t.textContent = msg;
  $('#toast-container').appendChild(t);
  setTimeout(() => { t.style.opacity = 0; setTimeout(()=>t.remove(),300); }, 3000);
}

// ══════════════════════════════════════
// INIT
// ══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  const cur = localStorage.getItem('rovault_current');
  if (cur) handleAuth(cur);
  
  Mines.init();
  Dice.init();
  Coinflip.init();
  Towers.init();
  Crash.init();
  Cases.init();
  
  LiveFeed.start();
  SidebarWidgets.init();
  
  $('#btn-signup-open').onclick = () => { SoundManager.init(); $('#modal-signup').classList.add('open'); }
  $('#modal-signup-close').onclick = () => $('#modal-signup').classList.remove('open');
  $('#btn-signup-submit').onclick = () => handleAuth($('#username-input').value.trim());
});
