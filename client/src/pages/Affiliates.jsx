import { useState, useEffect } from 'react';
import { useStore, formatPts } from '../store/useStore';
import { Users, DollarSign, Coins, TrendingUp, Copy, CheckCircle2, ChevronRight, Award, BarChart2, Link as LinkIcon } from 'lucide-react';
import './Affiliates.css';

export const Affiliates = () => {
  const { user } = useStore();
  const [affiliateData, setAffiliateData] = useState({ code: null, referredBy: null, earnings: 0, referrals: 0, deposits: 0, wagered: 0 });
  const [affiliateCodeInput, setAffiliateCodeInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : 'https://rovault.onrender.com/api';

  useEffect(() => {
    if (!user || !user.name) return;
    fetch(`${API_URL}/affiliate/${user.name}`)
      .then(r=>r.json())
      .then(d=>setAffiliateData(d))
      .catch(()=>{});
  }, [user, API_URL]);

  const createAffiliateCode = async () => {
    if (!affiliateCodeInput) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/affiliate/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.name, code: affiliateCodeInput })
      });
      const data = await res.json();
      if (data.success) {
        setAffiliateData(prev => ({ ...prev, code: data.affiliate.code }));
      } else {
        alert(data.error);
      }
    } catch(e) {
      alert("Failed to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTierInfo = (referrals) => {
    if (referrals >= 100) return { name: 'Diamond', next: null, min: 100, color: '#38bdf8' };
    if (referrals >= 25) return { name: 'Gold', next: 'Diamond', min: 25, max: 100, color: '#fbbf24' };
    if (referrals >= 5) return { name: 'Silver', next: 'Gold', min: 5, max: 25, color: '#94a3b8' };
    return { name: 'Bronze', next: 'Silver', min: 0, max: 5, color: '#b45309' };
  };

  const tier = getTierInfo(affiliateData.referrals);
  const progressPercent = tier.next ? ((affiliateData.referrals - tier.min) / (tier.max - tier.min)) * 100 : 100;

  return (
    <div className="affiliates-page">
      <div className="aff-header">
        <div className="aff-header-content">
          <h1>Affiliate Dashboard</h1>
          <p>Invite friends and earn a passive <strong>25% Revenue Share</strong> on all their deposits.</p>
        </div>
      </div>

      {!affiliateData.code ? (
        <div className="aff-create-section">
          <div className="aff-create-card">
            <div className="aff-create-icon">
              <LinkIcon size={32} />
            </div>
            <h2>Create Your Custom Code</h2>
            <p>Choose a unique referral code to start earning lifetime commissions.</p>
            <div className="aff-input-wrapper">
              <span className="aff-prefix">rovaultt.com/?r=</span>
              <input 
                type="text" 
                placeholder="YOURCODE" 
                value={affiliateCodeInput} 
                onChange={e => setAffiliateCodeInput(e.target.value.toUpperCase())} 
                maxLength={20} 
              />
            </div>
            <button 
              className="aff-btn-primary" 
              onClick={createAffiliateCode}
              disabled={isLoading || !affiliateCodeInput}
            >
              {isLoading ? 'Creating...' : 'Create Code'}
            </button>
          </div>
        </div>
      ) : (
        <div className="aff-dashboard">
          
          <div className="aff-code-banner">
            <div className="aff-code-info">
              <span className="aff-label">Your Referral Code</span>
              <div className="aff-code-value">{affiliateData.code.toUpperCase()}</div>
            </div>
            <div className="aff-code-actions">
              <button className="aff-btn-secondary" onClick={() => copyToClipboard(affiliateData.code.toUpperCase())}>
                {copied ? <CheckCircle2 size={16} color="#10b981" /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
              <button className="aff-btn-primary" onClick={() => copyToClipboard(`https://rovaultt.vercel.app/?r=${affiliateData.code}`)}>
                <LinkIcon size={16} />
                Copy Link
              </button>
            </div>
          </div>

          <div className="aff-stats-grid">
            <div className="aff-stat-card">
              <div className="aff-stat-header">
                <span className="aff-stat-title">Total Referrals</span>
                <Users size={18} className="aff-stat-icon" style={{color: '#8b5cf6'}} />
              </div>
              <div className="aff-stat-value">{affiliateData.referrals}</div>
              <div className="aff-stat-desc">Active users invited</div>
            </div>

            <div className="aff-stat-card">
              <div className="aff-stat-header">
                <span className="aff-stat-title">Total Deposited</span>
                <DollarSign size={18} className="aff-stat-icon" style={{color: '#10b981'}} />
              </div>
              <div className="aff-stat-value">${(affiliateData.deposits || 0).toFixed(2)}</div>
              <div className="aff-stat-desc">Generated by referrals</div>
            </div>

            <div className="aff-stat-card">
              <div className="aff-stat-header">
                <span className="aff-stat-title">Total Gambled</span>
                <Coins size={18} className="aff-stat-icon" style={{color: '#f59e0b'}} />
              </div>
              <div className="aff-stat-value">{formatPts(affiliateData.wagered || 0)}</div>
              <div className="aff-stat-desc">Vault wagered by referrals</div>
            </div>

            <div className="aff-stat-card highlight">
              <div className="aff-stat-header">
                <span className="aff-stat-title">Total Earnings</span>
                <TrendingUp size={18} className="aff-stat-icon" style={{color: '#3b82f6'}} />
              </div>
              <div className="aff-stat-value" style={{color: '#3b82f6'}}>+{formatPts(affiliateData.earnings)}</div>
              <div className="aff-stat-desc">Lifetime Vault earned</div>
            </div>
          </div>

          <div className="aff-tier-section">
            <div className="aff-tier-header">
              <div className="aff-tier-title">
                <Award size={20} style={{color: tier.color}} />
                <h3>{tier.name} Tier</h3>
              </div>
              <span className="aff-tier-rate">25% Commission Rate</span>
            </div>
            
            <div className="aff-tier-progress-container">
              <div className="aff-tier-progress-bar">
                <div className="aff-tier-progress-fill" style={{ width: `${progressPercent}%`, backgroundColor: tier.color }}></div>
              </div>
              <div className="aff-tier-labels">
                <span>{affiliateData.referrals} Referrals</span>
                {tier.next ? (
                  <span>{tier.max} needed for {tier.next}</span>
                ) : (
                  <span>Max Tier Reached!</span>
                )}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
