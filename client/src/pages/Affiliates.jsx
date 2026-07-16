import { useState, useEffect } from 'react';
import { useStore, formatPts } from '../store/useStore';
import confetti from 'canvas-confetti';
import './Affiliates.css';

export const Affiliates = () => {
  const { user, updateBalance } = useStore();
  const [affiliateData, setAffiliateData] = useState({ code: null, referredBy: null, earnings: 0, referrals: 0, deposits: 0, wagered: 0 });
  const [affiliateCodeInput, setAffiliateCodeInput] = useState('');
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (!user || !user.name) return;
    fetch(`${API_URL}/affiliate/${user.name}`)
      .then(r=>r.json())
      .then(d=>setAffiliateData(d))
      .catch(()=>{});
  }, [user, API_URL]);

  const createAffiliateCode = async () => {
    if (!affiliateCodeInput) return;
    try {
      const res = await fetch(`${API_URL}/affiliate/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.name, code: affiliateCodeInput })
      });
      const data = await res.json();
      if (data.success) {
        setAffiliateData(prev => ({ ...prev, code: data.affiliate.code }));
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        alert(data.error);
      }
    } catch(e) {}
  };
  return (
    <div className="affiliates-page">
      <div className="partner-header">
        <h2>RoVault Partner Program</h2>
        <p>Earn a massive 25% lifetime revenue share from everyone you refer to RoVault.</p>
      </div>

      <div className="partner-section">
        {affiliateData.code ? (
          <div className="partner-dashboard">
            <div className="pd-stats-grid">
              <div className="pd-stat-card">
                <div className="pd-stat-label">Your Custom Code</div>
                <div className="pd-stat-value code">{affiliateData.code.toUpperCase()}</div>
                <button className="rc-btn copy-btn" onClick={() => {
                  navigator.clipboard.writeText(affiliateData.code);
                  alert('Copied to clipboard!');
                }}>Copy Code</button>
              </div>
              <div className="pd-stat-card">
                <div className="pd-stat-label">Total Referrals</div>
                <div className="pd-stat-value">{affiliateData.referrals}</div>
                <div className="pd-stat-sub">Active Players</div>
              </div>
              <div className="pd-stat-card">
                <div className="pd-stat-label">Total Deposited</div>
                <div className="pd-stat-value">${(affiliateData.deposits || 0).toFixed(2)}</div>
                <div className="pd-stat-sub">By Referrals</div>
              </div>
              <div className="pd-stat-card">
                <div className="pd-stat-label">Total Gambled</div>
                <div className="pd-stat-value">🪙 {formatPts(affiliateData.wagered || 0)}</div>
                <div className="pd-stat-sub">By Referrals</div>
              </div>
              <div className="pd-stat-card highlight">
                <div className="pd-stat-label">Your Earnings</div>
                <div className="pd-stat-value">+{formatPts(affiliateData.earnings)}</div>
                <div className="pd-stat-sub">Vault Bucks</div>
              </div>
            </div>
            
            <div className="pd-tier-banner">
              <div className="tier-icon">{affiliateData.referrals >= 100 ? '💎' : affiliateData.referrals >= 25 ? '🥇' : affiliateData.referrals >= 5 ? '🥈' : '🥉'}</div>
              <div className="tier-info">
                <h3>{affiliateData.referrals >= 100 ? 'Diamond' : affiliateData.referrals >= 25 ? 'Gold' : affiliateData.referrals >= 5 ? 'Silver' : 'Bronze'} Partner Status</h3>
                <p>You currently receive 25% of all crypto deposits made by your referrals.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="partner-create">
            <div className="pc-glow" />
            <div className="pc-content">
              <h3>Create Your Partner Code</h3>
              <p>Claim your unique word. Make it catchy. Once claimed, it's yours forever.</p>
              <div className="pc-input-group">
                <input type="text" placeholder="e.g. ROVAULT2026" value={affiliateCodeInput} onChange={e => setAffiliateCodeInput(e.target.value.toUpperCase())} maxLength={20} />
                <button className="rc-btn glow-btn" onClick={createAffiliateCode}>Claim Code</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
