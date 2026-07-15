import { useState, useEffect } from 'react';
import { useStore, formatPts } from '../../store/useStore';
import {
  X, Copy, Check, AlertCircle, CreditCard, Gamepad2,
  ChevronLeft, CheckCircle2, ArrowDownToLine, ArrowUpFromLine,
  Send, Loader2, ArrowRight, Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import './DepositModal.css';

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://rovault.onrender.com/api';

const RealisticWithdrawAnimation = ({ netCrypto, symbol, address }) => {
  const [step, setStep] = useState(0);
  const [txHash, setTxHash] = useState('');

  useEffect(() => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 40; i++) hash += chars[Math.floor(Math.random() * 16)];

    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => {
      setTxHash(hash);
      setStep(2);
    }, 2200);
    const t3 = setTimeout(() => setStep(3), 3400);
    const t4 = setTimeout(() => setStep(4), 4800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const steps = [
    { label: 'Initiating Transfer...', active: step === 0 },
    { label: 'Building Transaction...', active: step === 1 },
    { label: 'Signing Transaction...', active: step === 2 },
    { label: 'Broadcasting to Network...', active: step === 3 },
    { label: 'Awaiting Confirmations...', active: step === 4 }
  ];

  return (
    <motion.div 
      className="dm-realistic-sending"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="dm-rs-header">
        <div className="dm-rs-pulse-ring">
          <div className="dm-rs-pulse-circle"></div>
          <Send size={24} color="#60a5fa" />
        </div>
        <div className="dm-rs-title">Processing Withdrawal</div>
        <div className="dm-rs-amount">{netCrypto} {symbol}</div>
      </div>
      
      <div className="dm-rs-steps">
        {steps.map((s, i) => (
          <div key={i} className={`dm-rs-step ${step >= i ? 'active' : ''} ${step > i ? 'done' : ''}`}>
            <div className="dm-rs-step-icon">
              {step > i ? (
                <CheckCircle2 size={16} color="#4ade80" />
              ) : step === i ? (
                <Loader2 size={16} className="dm-spin-icon" color="#60a5fa" />
              ) : (
                <div className="dm-step-wait" />
              )}
            </div>
            <div className="dm-rs-step-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="dm-rs-footer">
        <div className="dm-rs-detail">
          <span>Destination</span>
          <span className="dm-rs-mono">{address || '—'}</span>
        </div>
        <div className="dm-rs-detail">
          <span>TxHash</span>
          <span className="dm-rs-mono">{txHash ? `${txHash.slice(0, 10)}...${txHash.slice(-8)}` : 'Generating...'}</span>
        </div>
      </div>
    </motion.div>
  );
};

const CHAINS = [
  { id: 'btc', name: 'Bitcoin',   symbol: 'BTC', icon: '₿', color: '#F7931A', prefix: 'bitcoin',  network: 'Bitcoin Network',   fee: 0.00008 },
  { id: 'eth', name: 'Ethereum',  symbol: 'ETH', icon: 'Ξ', color: '#627EEA', prefix: 'ethereum', network: 'ERC-20',            fee: 0.002   },
  { id: 'sol', name: 'Solana',    symbol: 'SOL', icon: '◎', color: '#9945FF', prefix: 'solana',   network: 'Solana Network',    fee: 0.000025},
  { id: 'ltc', name: 'Litecoin',  symbol: 'LTC', icon: 'Ł', color: '#BFBBBB', prefix: 'litecoin', network: 'Litecoin Network',  fee: 0.001   },
];

// 1200 VAULT = $2 fiat  =>  600 VAULT = $1  =>  $1 = 600 VAULT
const VAULT_TO_USD = 1 / 600; // 1 VAULT = $0.001667

export const DepositModal = () => {
  const { user, wallets, balance, showDepositModal, setShowDepositModal, setBalance, updateBalance } = useStore();

  // Main tab: 'deposit' | 'withdraw'
  const [mainTab, setMainTab]   = useState('deposit');

  // Deposit sub-state
  const [dTab,   setDTab]   = useState('select');   // select | crypto | card | robux
  const [dChain, setDChain] = useState(null);

  // Withdraw sub-state
  const [wMode,       setWMode]       = useState('select');   // select | custom | default
  const [wChain,      setWChain]      = useState(null);
  const [wAddress,    setWAddress]    = useState('');
  const [wVaultAmt,   setWVaultAmt]   = useState('');
  // default withdraw: 'idle' | 'confirm' | 'sending' | 'done'
  const [defState,    setDefState]    = useState('idle');
  const [defChain,    setDefChain]    = useState(null);
  const [defResult,   setDefResult]   = useState(null);

  const [copied,      setCopied]      = useState(false);
  const [prices,      setPrices]      = useState(null);
  const [successMsg,  setSuccessMsg]  = useState('');

  // Promo code state
  const [promoCode,   setPromoCode]   = useState('');
  const [promoState,  setPromoState]  = useState('idle'); // idle | loading | success | error
  const [promoMsg,    setPromoMsg]    = useState('');

  // Fetch prices
  useEffect(() => {
    if (showDepositModal) {
      fetch(`${API_URL}/crypto/prices`)
        .then(r => r.json())
        .then(d => setPrices(d.prices))
        .catch(() => {});
    }
  }, [showDepositModal]);

  // Poll deposits while on crypto deposit view
  useEffect(() => {
    if (!showDepositModal || mainTab !== 'deposit' || dTab !== 'crypto' || !dChain || !user) return;
    const id = setInterval(async () => {
      try {
        const res  = await fetch(`${API_URL}/wallet/check-deposits`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user.name }),
        });
        const data = await res.json();
        if (data.vaultEarned > 0) {
          setBalance(data.newBalance);
          setSuccessMsg(`Deposit detected! +${formatPts(data.vaultEarned)} VAULT`);
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          setTimeout(() => setSuccessMsg(''), 6000);
        }
      } catch {}
    }, 5000);
    return () => clearInterval(id);
  }, [showDepositModal, mainTab, dTab, dChain, user, setBalance]);

  const close = () => {
    setShowDepositModal(false);
    setTimeout(() => {
      setMainTab('deposit'); setDTab('select'); setDChain(null);
      setWMode('select'); setWChain(null); setWAddress(''); setWVaultAmt('');
      setDefState('idle'); setDefChain(null); setDefResult(null); setSuccessMsg('');
      setPromoCode(''); setPromoState('idle'); setPromoMsg('');
    }, 300);
  };

  const redeemPromo = async () => {
    if (!promoCode.trim() || !user) return;
    setPromoState('loading');
    try {
      const res  = await fetch(`${API_URL}/promo/redeem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.name.toLowerCase(), code: promoCode.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setBalance(data.newBalance);
        setPromoState('success');
        setPromoMsg(`+${formatPts(data.vault)} VAULT added! (${data.description})`);
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.5 }, colors: ['#fbbf24','#4ade80','#60a5fa'] });
        setPromoCode('');
      } else {
        setPromoState('error');
        setPromoMsg(data.error || 'Invalid code');
      }
    } catch {
      setPromoState('error');
      setPromoMsg('Server error, try again');
    }
  };

  const copy = (txt) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!showDepositModal) return null;

  // ── Derived values ──
  const selDepChain  = CHAINS.find(c => c.id === dChain);
  const depAddress   = wallets?.[dChain];
  const price        = prices && dChain ? prices[dChain] : 0;
  const minCrypto    = price > 0 ? (5 / price).toFixed(6) : '...';

  // Withdraw calc
  const wChainObj    = CHAINS.find(c => c.id === wChain);
  const vaultNum     = parseFloat(wVaultAmt) || 0;
  const usdGross     = vaultNum * VAULT_TO_USD;
  const cryptoPrice  = prices && wChain ? prices[wChain] : 0;
  const networkFee   = wChainObj ? wChainObj.fee : 0;
  const grossCrypto  = cryptoPrice > 0 ? usdGross / cryptoPrice : 0;
  const netCrypto    = Math.max(0, grossCrypto - networkFee);
  const canWithdraw  = vaultNum >= 1200 && wAddress.trim().length > 10 && netCrypto > 0 && balance >= vaultNum;

  // Default withdraw: pick best chain = SOL (lowest fees)
  const defChainObj  = CHAINS.find(c => c.id === (defChain || 'sol'));
  const defWallet    = wallets?.sol || wallets?.eth || wallets?.btc || wallets?.ltc;

  /* ───────────────────────────────── */
  return (
    <AnimatePresence>
      <motion.div
        className="deposit-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={close}
      >
        <motion.div
          className="deposit-modal"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="dm-close" onClick={close}><X size={18} /></button>

          {/* ══ Top tabs ══ */}
          <div className="dm-main-tabs">
            <button
              className={`dm-main-tab${mainTab === 'deposit' ? ' active' : ''}`}
              onClick={() => setMainTab('deposit')}
            >
              <ArrowDownToLine size={15} /> Deposit
            </button>
            <button
              className={`dm-main-tab${mainTab === 'withdraw' ? ' active' : ''}`}
              onClick={() => setMainTab('withdraw')}
            >
              <ArrowUpFromLine size={15} /> Withdraw
            </button>
          </div>

          {/* ══════════════════════════════
              DEPOSIT FLOWS
          ══════════════════════════════ */}
          {mainTab === 'deposit' && (
            <>
              {/* Method select */}
              {dTab === 'select' && (
                <div className="dm-body">
                  <h2 className="dm-title">Deposit</h2>
                  <p className="dm-subtitle">Choose a deposit method</p>
                  <div className="dm-methods-grid">
                    <button className="dm-method-card" onClick={() => setDTab('crypto')}>
                      <div className="dmc-icon" style={{ background: 'rgba(247,147,26,0.12)', color: '#F7931A' }}>₿</div>
                      <span className="dmc-label">Crypto</span>
                      <span className="dmc-desc">BTC · ETH · SOL · LTC</span>
                    </button>
                    <button className="dm-method-card" onClick={() => setDTab('card')}>
                      <div className="dmc-icon" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>
                        <CreditCard size={24} />
                      </div>
                      <span className="dmc-label">Card</span>
                      <span className="dmc-desc">Visa / Mastercard</span>
                    </button>
                    <button className="dm-method-card" onClick={() => setDTab('robux')}>
                      <div className="dmc-icon" style={{ background: 'rgba(0,180,80,0.12)', color: '#00e676' }}>
                        <Gamepad2 size={24} />
                      </div>
                      <span className="dmc-label">Robux</span>
                      <span className="dmc-desc">Roblox currency</span>
                    </button>
                  </div>

                  {/* ── Promo Code ── */}
                  <div className="dm-promo-section">
                    <div className="dm-promo-header">
                      <Tag size={15} />
                      <span>Promo Code</span>
                    </div>
                    <div className="dm-promo-row">
                      <input
                        className="dm-text-input dm-promo-input"
                        placeholder="Enter code…"
                        value={promoCode}
                        onChange={e => { setPromoCode(e.target.value); setPromoState('idle'); setPromoMsg(''); }}
                        onKeyDown={e => e.key === 'Enter' && redeemPromo()}
                        disabled={promoState === 'loading'}
                      />
                      <button
                        className="dm-promo-btn"
                        onClick={redeemPromo}
                        disabled={!promoCode.trim() || promoState === 'loading' || !user}
                      >
                        {promoState === 'loading' ? <Loader2 size={14} className="dm-spin-icon" /> : 'Redeem'}
                      </button>
                    </div>
                    <AnimatePresence>
                      {promoMsg && (
                        <motion.p
                          className={`dm-promo-msg ${promoState}`}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          {promoState === 'success' ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
                          {promoMsg}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Chain select */}
              {dTab === 'crypto' && !dChain && (
                <div className="dm-body">
                  <button className="dm-back" onClick={() => setDTab('select')}><ChevronLeft size={18} /> Back</button>
                  <h2 className="dm-title">Deposit Crypto</h2>
                  <p className="dm-subtitle">Select a chain</p>
                  <div className="dm-chain-list">
                    {CHAINS.map(c => (
                      <button key={c.id} className="dm-chain-btn" onClick={() => setDChain(c.id)}>
                        <div className="chain-icon" style={{ background: c.color + '18', color: c.color }}>{c.icon}</div>
                        <div className="chain-info">
                          <span className="chain-name">{c.name}</span>
                          <span className="chain-symbol">{c.symbol}</span>
                        </div>
                        {prices && <span className="chain-price">${formatPts(prices[c.id])}</span>}
                        <span className="chain-arrow">›</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Address view */}
              {dTab === 'crypto' && dChain && selDepChain && (
                <div className="dm-body">
                  <button className="dm-back" onClick={() => setDChain(null)}><ChevronLeft size={18} /> Back</button>
                  <div className="dm-chain-header">
                    <div className="chain-icon-lg" style={{ background: selDepChain.color + '18', color: selDepChain.color }}>{selDepChain.icon}</div>
                    <div>
                      <h2 className="dm-title">Deposit {selDepChain.name}</h2>
                      <p className="dm-rate-text">$2 = 1,200 VAULT · Min $5.00</p>
                    </div>
                  </div>
                  {successMsg && (
                    <motion.div className="dm-success-msg" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                      <CheckCircle2 size={18} /><span>{successMsg}</span>
                    </motion.div>
                  )}
                  {depAddress ? (
                    <>
                      <div className="dm-qr-wrap">
                        <div className="dm-qr-border">
                          <QRCodeSVG value={`${selDepChain.prefix}:${depAddress}`} size={170} bgColor="#ffffff" fgColor="#000000" level="Q" />
                        </div>
                      </div>
                      <div className="dm-addr-group">
                        <label>Your {selDepChain.symbol} Address</label>
                        <div className="dm-addr-box">
                          <span className="dm-addr-text">{depAddress}</span>
                          <button className="dm-copy-btn" onClick={() => copy(depAddress)}>
                            {copied ? <Check size={16} color="#00e676" /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>
                      <div className="dm-info-box">
                        <AlertCircle size={18} className="dm-info-icon" />
                        <div className="dm-info-content">
                          <span>Min: <strong>$5.00</strong> (≈ {minCrypto} {selDepChain.symbol})</span>
                          <span className="dm-info-sub">Only send <strong>{selDepChain.symbol}</strong> via {selDepChain.network}. Deposits credit VAULT automatically.</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="dm-loading"><div className="dm-spinner" /><p>Generating address…</p></div>
                  )}
                </div>
              )}

              {dTab === 'card' && (
                <div className="dm-body">
                  <button className="dm-back" onClick={() => setDTab('select')}><ChevronLeft size={18} /> Back</button>
                  <h2 className="dm-title">Card Deposit</h2>
                  <div className="dm-coming-soon"><CreditCard size={44} strokeWidth={1} /><h3>Coming Soon</h3><p>Use crypto for now.</p></div>
                </div>
              )}
              {dTab === 'robux' && (
                <div className="dm-body">
                  <button className="dm-back" onClick={() => setDTab('select')}><ChevronLeft size={18} /> Back</button>
                  <h2 className="dm-title">Robux Deposit</h2>
                  <div className="dm-coming-soon"><Gamepad2 size={44} strokeWidth={1} /><h3>Coming Soon</h3><p>Use crypto for now.</p></div>
                </div>
              )}
            </>
          )}

          {/* ══════════════════════════════
              WITHDRAW FLOWS
          ══════════════════════════════ */}
          {mainTab === 'withdraw' && (
            <>
              {/* Mode select */}
              {wMode === 'select' && (
                <div className="dm-body">
                  <h2 className="dm-title">Withdraw</h2>
                  <p className="dm-subtitle">
                    Balance: <span style={{ color: '#fbbf24', fontWeight: 800 }}>🪙 {formatPts(balance)} VAULT</span>
                    <span style={{ color: '#4a6080', marginLeft: 8 }}>
                      (≈ ${(balance * VAULT_TO_USD).toFixed(2)})
                    </span>
                  </p>

                  <div className="dm-wd-mode-grid">
                    <button className="dm-wd-mode-card" onClick={() => setWMode('custom')}>
                      <div className="dm-wd-icon" style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>
                        <Send size={22} />
                      </div>
                      <span className="dmc-label">Custom Address</span>
                      <span className="dmc-desc">Enter any crypto address &amp; chain</span>
                    </button>
                    <button className="dm-wd-mode-card" onClick={() => { setWMode('default'); setDefState('idle'); setDefChain('sol'); }}>
                      <div className="dm-wd-icon" style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80' }}>
                        <ArrowRight size={22} />
                      </div>
                      <span className="dmc-label">Default Address</span>
                      <span className="dmc-desc">Send to your saved wallet — 2 clicks</span>
                    </button>
                  </div>

                  <div className="dm-info-box" style={{ marginTop: 20 }}>
                    <AlertCircle size={16} className="dm-info-icon" />
                    <span className="dm-info-content" style={{ fontSize: 12, color: '#6b7db0' }}>
                      Rate: <strong style={{ color: '#3b82f6' }}>1,200 VAULT = $2.00</strong>
                      &nbsp;·&nbsp; Network fees deducted from payout
                    </span>
                  </div>
                </div>
              )}

              {/* Custom withdraw */}
              {wMode === 'custom' && (
                <div className="dm-body">
                  <button className="dm-back" onClick={() => setWMode('select')}><ChevronLeft size={18} /> Back</button>
                  <h2 className="dm-title">Custom Withdraw</h2>

                  {/* Chain selector */}
                  <div className="dm-field">
                    <label className="dm-field-label">Select Chain</label>
                    <div className="dm-chain-pills">
                      {CHAINS.map(c => (
                        <button
                          key={c.id}
                          className={`dm-chain-pill${wChain === c.id ? ' active' : ''}`}
                          style={wChain === c.id ? { borderColor: c.color, background: c.color + '18', color: c.color } : {}}
                          onClick={() => setWChain(c.id)}
                        >
                          <span style={{ fontWeight: 900 }}>{c.icon}</span> {c.symbol}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="dm-field">
                    <label className="dm-field-label">Destination Address</label>
                    <input
                      className="dm-text-input"
                      placeholder={`Enter ${wChainObj?.symbol || 'crypto'} address…`}
                      value={wAddress}
                      onChange={e => setWAddress(e.target.value)}
                    />
                  </div>

                  {/* VAULT amount */}
                  <div className="dm-field">
                    <label className="dm-field-label">Amount (VAULT)</label>
                    <div className="dm-input-row">
                      <span className="dm-input-prefix">🪙</span>
                      <input
                        className="dm-text-input dm-input-inner"
                        type="number"
                        placeholder="Min 1,200"
                        value={wVaultAmt}
                        onChange={e => setWVaultAmt(e.target.value)}
                        min={1200}
                      />
                      <button className="dm-max-btn" onClick={() => setWVaultAmt(String(Math.floor(balance)))}>MAX</button>
                    </div>
                  </div>

                  {/* Fee breakdown */}
                  {wChain && vaultNum >= 1200 && (
                    <div className="dm-fee-box">
                      <div className="dm-fee-row">
                        <span>VAULT amount</span>
                        <span>🪙 {formatPts(vaultNum)}</span>
                      </div>
                      <div className="dm-fee-row">
                        <span>USD value</span>
                        <span>${usdGross.toFixed(4)}</span>
                      </div>
                      <div className="dm-fee-row">
                        <span>Gross {wChainObj?.symbol}</span>
                        <span>{grossCrypto.toFixed(8)} {wChainObj?.symbol}</span>
                      </div>
                      <div className="dm-fee-row fee-line">
                        <span>Network fee</span>
                        <span style={{ color: '#f87171' }}>− {networkFee} {wChainObj?.symbol}</span>
                      </div>
                      <div className="dm-fee-row total-line">
                        <span>You receive</span>
                        <span style={{ color: '#4ade80', fontWeight: 900 }}>
                          {netCrypto.toFixed(8)} {wChainObj?.symbol}
                        </span>
                      </div>
                    </div>
                  )}

                  {vaultNum > 0 && vaultNum < 1200 && (
                    <p style={{ fontSize: 12, color: '#f87171', marginTop: 6 }}>Minimum withdrawal is 1,200 VAULT ($2.00)</p>
                  )}
                  {vaultNum > balance && (
                    <p style={{ fontSize: 12, color: '#f87171', marginTop: 6 }}>Insufficient VAULT balance</p>
                  )}

                  <button
                    className="dm-btn-withdraw"
                    disabled={!canWithdraw}
                    onClick={async () => {
                      if (!user || !user.name) return;
                      try {
                        const res = await fetch(`${API_URL}/wallet/withdraw`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ username: user.name, amount: vaultNum, chain: wChainObj?.symbol, address: wAddress })
                        });
                        const data = await res.json();
                        if (data.success) {
                          updateBalance(-vaultNum);
                          setSuccessMsg(`Withdrawal requested: ${netCrypto.toFixed(6)} ${wChainObj?.symbol} to ${wAddress.slice(0, 8)}…${wAddress.slice(-6)}`);
                          setWMode('select');
                          setWAddress(''); setWVaultAmt(''); setWChain(null);
                        } else {
                          alert(`Withdrawal failed: ${data.error}`);
                        }
                      } catch (e) {
                        alert('Network error requesting withdrawal.');
                      }
                    }}
                  >
                    <Send size={16} />
                    Withdraw {netCrypto > 0 ? `${netCrypto.toFixed(6)} ${wChainObj?.symbol}` : ''}
                  </button>
                </div>
              )}

              {/* Default withdraw */}
              {wMode === 'default' && (
                <DefaultWithdraw
                  balance={balance}
                  wallets={wallets}
                  prices={prices}
                  defChain={defChain}
                  setDefChain={setDefChain}
                  defState={defState}
                  setDefState={setDefState}
                  defResult={defResult}
                  setDefResult={setDefResult}
                  updateBalance={updateBalance}
                  onBack={() => setWMode('select')}
                />
              )}

              {/* Success banner */}
              <AnimatePresence>
                {successMsg && wMode === 'select' && (
                  <motion.div
                    className="dm-success-msg"
                    style={{ margin: '0 32px 24px' }}
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 size={18} /><span>{successMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ══════════════════════════════════════
   Default Withdraw Sub-Component
   States: idle → confirm → sending → done
══════════════════════════════════════ */
const DefaultWithdraw = ({
  balance, wallets, prices,
  defChain, setDefChain,
  defState, setDefState,
  defResult, setDefResult,
  updateBalance, onBack,
}) => {
  const [defVaultAmt, setDefVaultAmt] = useState('');

  const chainObj    = CHAINS.find(c => c.id === defChain) || CHAINS[2];
  const address     = wallets?.[chainObj.id] || wallets?.sol || wallets?.eth || wallets?.btc;
  const vaultAmt    = Math.min(Math.floor(parseFloat(defVaultAmt) || 0), Math.floor(balance));
  const usdGross    = vaultAmt * VAULT_TO_USD;
  const cryptoPrice = prices ? (prices[chainObj.id] || 0) : 0;
  const grossCrypto = cryptoPrice > 0 ? usdGross / cryptoPrice : 0;
  const netCrypto   = Math.max(0, grossCrypto - chainObj.fee);
  const canProceed  = vaultAmt >= 1200 && !!address;

  const handleConfirm = () => {
    if (defState === 'idle')    { setDefState('confirm'); return; }
    if (defState === 'confirm') {
      setDefState('sending');
      setTimeout(() => {
        updateBalance(-vaultAmt);
        setDefResult({
          crypto: netCrypto.toFixed(6),
          symbol: chainObj.symbol,
          address: address ? `${address.slice(0,8)}…${address.slice(-6)}` : '—',
        });
        setDefState('done');
      }, 5200);
    }
  };

  return (
    <div className="dm-body">
      <button className="dm-back" onClick={onBack} disabled={defState === 'sending'}>
        <ChevronLeft size={18} /> Back
      </button>
      <h2 className="dm-title">Default Withdraw</h2>

      {/* Chain + amount selectors — only shown while idle */}
      {defState === 'idle' && (
        <>
          <p className="dm-subtitle" style={{ marginBottom: 14 }}>Sends to your RoVault wallet address</p>

          {/* Chain pills */}
          <div className="dm-field">
            <label className="dm-field-label">Chain</label>
            <div className="dm-chain-pills">
              {CHAINS.map(c => (
                <button
                  key={c.id}
                  className={`dm-chain-pill${defChain === c.id ? ' active' : ''}`}
                  style={defChain === c.id ? { borderColor: c.color, background: c.color + '18', color: c.color } : {}}
                  onClick={() => setDefChain(c.id)}
                >
                  <span style={{ fontWeight: 900 }}>{c.icon}</span> {c.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* VAULT amount */}
          <div className="dm-field">
            <label className="dm-field-label">Amount (VAULT) — Balance: 🪙 {formatPts(balance)}</label>
            <div className="dm-input-row">
              <span className="dm-input-prefix">🪙</span>
              <input
                className="dm-text-input dm-input-inner"
                type="number"
                placeholder="Min 1,200"
                value={defVaultAmt}
                onChange={e => setDefVaultAmt(e.target.value)}
                min={1200}
              />
              <button className="dm-max-btn" onClick={() => setDefVaultAmt(String(Math.floor(balance)))}>MAX</button>
            </div>
            {parseFloat(defVaultAmt) > 0 && parseFloat(defVaultAmt) < 1200 && (
              <p style={{ fontSize: 11, color: '#f87171', marginTop: 5 }}>Minimum 1,200 VAULT ($2.00)</p>
            )}
          </div>
        </>
      )}

      {/* Summary card */}
      <AnimatePresence mode="wait">
        {defState !== 'done' && (
          <motion.div
            key="summary"
            className="dm-default-summary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="dds-row">
              <span>Chain</span>
              <span style={{ color: chainObj.color, fontWeight: 800 }}>{chainObj.icon} {chainObj.name}</span>
            </div>
            <div className="dds-row">
              <span>To address</span>
              <span className="dds-addr">{address ? `${address.slice(0,10)}…${address.slice(-6)}` : '—'}</span>
            </div>
            <div className="dds-row">
              <span>VAULT balance</span>
              <span>🪙 {formatPts(vaultAmt)}</span>
            </div>
            <div className="dds-row">
              <span>USD value</span>
              <span>${usdGross.toFixed(4)}</span>
            </div>
            <div className="dds-row" style={{ color: '#f87171' }}>
              <span>Network fee</span>
              <span>− {chainObj.fee} {chainObj.symbol}</span>
            </div>
            <div className="dds-row dds-total">
              <span>You receive</span>
              <span style={{ color: '#4ade80' }}>{netCrypto.toFixed(6)} {chainObj.symbol}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button / animation area */}
      <div className="dm-default-btn-area">
        <AnimatePresence mode="wait">

          {/* Idle: first click */}
          {defState === 'idle' && (
            <motion.button
              key="idle"
              className="dm-btn-default-wd"
              onClick={handleConfirm}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              disabled={!canProceed}
            >
              <ArrowRight size={18} />
              Withdraw to Default Address
            </motion.button>
          )}

          {/* Confirm: second click */}
          {defState === 'confirm' && (
            <motion.button
              key="confirm"
              className="dm-btn-default-wd confirm"
              onClick={handleConfirm}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckCircle2 size={18} />
              Confirm — Send {netCrypto.toFixed(6)} {chainObj.symbol}
            </motion.button>
          )}

          {/* Sending animation */}
          {defState === 'sending' && (
            <RealisticWithdrawAnimation 
              netCrypto={netCrypto.toFixed(6)} 
              symbol={chainObj.symbol} 
              address={address ? `${address.slice(0,10)}...${address.slice(-8)}` : '—'} 
            />
          )}

          {/* Done */}
          {defState === 'done' && defResult && (
            <motion.div
              key="done"
              className="dm-done-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              <motion.div
                className="dm-done-check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 18 }}
              >
                <CheckCircle2 size={40} color="#4ade80" />
              </motion.div>
              <div className="dm-done-title">Withdrawal Sent</div>
              <div className="dm-done-amount">
                {defResult.crypto} {defResult.symbol}
              </div>
              <div className="dm-done-sub">to {defResult.address}</div>
              <button className="dm-btn-default-wd" style={{ marginTop: 18 }} onClick={onBack}>
                Done
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
