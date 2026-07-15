/* ═══════════════════════════════════════
   Shared Sound Engine for all RoVault Games
   ═══════════════════════════════════════ */

let _ctx = null;

function ctx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

function makeOsc(type, freq, gainVal, start, dur, freqEnd) {
  const c = ctx(), now = c.currentTime + start;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, now);
  if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, now + dur);
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(gainVal, now + 0.015);
  g.gain.exponentialRampToValueAtTime(0.001, now + dur);
  o.connect(g); g.connect(c.destination);
  o.start(now); o.stop(now + dur);
}

/** Pleasant ascending arpeggio — for gem reveals, safe picks */
export function playGem() {
  [523.25, 659.25, 783.99].forEach((f, i) => makeOsc('sine', f, 0.14, i * 0.07, 0.35));
}

/** Deep rumble + crackle — for mines, bombs, busts */
export function playMine() {
  makeOsc('sawtooth', 150, 0.22, 0, 0.6, 25);
  makeOsc('square', 90, 0.08, 0, 0.4, 15);
}

/** Triumphant chord — for cashing out, winning */
export function playWin() {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => makeOsc('sine', f, 0.11, i * 0.1, 0.6));
}

/** Soft click — for UI interactions */
export function playClick() {
  makeOsc('sine', 1200, 0.04, 0, 0.06);
}

/** Rising whoosh — for dice rolls, spins, flips */
export function playRoll() {
  makeOsc('triangle', 120, 0.06, 0, 0.5, 600);
  makeOsc('sine', 200, 0.03, 0.1, 0.3, 800);
}

/** Sad descend — for losses */
export function playLose() {
  makeOsc('sawtooth', 300, 0.08, 0, 0.35, 80);
}

/** Card deal sound */
export function playDeal() {
  makeOsc('triangle', 800, 0.05, 0, 0.08);
  makeOsc('sine', 1000, 0.03, 0.04, 0.06);
}

/** Step / tick upward — for tower climbing, each pick */
export function playStep(pitch = 0) {
  makeOsc('sine', 500 + pitch * 60, 0.08, 0, 0.12);
  makeOsc('triangle', 700 + pitch * 60, 0.04, 0.03, 0.1);
}

/** Roulette tick sound — for case openings */
export function playTick() {
  makeOsc('sine', 900, 0.03, 0, 0.04);
}

/** Coin flip whoosh */
export function playCoinFlip() {
  const c = ctx(), now = c.currentTime;
  for (let i = 0; i < 8; i++) {
    makeOsc('sine', 400 + i * 80, 0.025, i * 0.06, 0.08);
  }
}
