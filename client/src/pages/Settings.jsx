import React from 'react';
import { useStore, formatPts } from '../store/useStore';
import './Settings.css';

export const Settings = () => {
  const { user, totalPnl, recentDeposits, recentWithdrawals, robloxCookie, setRobloxCookie } = useStore();

  const handleCookieChange = (e) => {
    setRobloxCookie(e.target.value || null);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">Settings</div>
      
      <div className="settings-grid">
        {/* Login Info */}
        <div className="settings-card">
          <div className="settings-card-title">Login Information</div>
          <div className="settings-field">
            <span className="settings-label">Username</span>
            <div className="settings-value">
              {user ? user.name : <span className="null-text">null</span>}
            </div>
          </div>
          <div className="settings-field">
            <span className="settings-label">Avatar URL</span>
            <div className="settings-value" style={{ wordBreak: 'break-all' }}>
              {user && user.avatar ? user.avatar : <span className="null-text">null</span>}
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="settings-card">
          <div className="settings-card-title">Account Details</div>
          <div className="settings-field">
            <span className="settings-label">Total PNL</span>
            <div className="settings-value">
              {totalPnl !== null ? `${totalPnl >= 0 ? '+' : ''}${formatPts(totalPnl)} VAULT` : <span className="null-text">null</span>}
            </div>
          </div>
          <div className="settings-field">
            <span className="settings-label">Roblox Cookie</span>
            <input 
              type="password" 
              className="settings-input" 
              placeholder="null"
              value={robloxCookie || ''}
              onChange={handleCookieChange}
            />
            <span style={{ fontSize: '11px', color: '#5d6b8b', marginTop: '4px' }}>
              Used for tracking items (mocked on client-side)
            </span>
          </div>
        </div>

        {/* Recent Deposits */}
        <div className="settings-card">
          <div className="settings-card-title">Recent Deposits</div>
          <div className="settings-list">
            {recentDeposits && recentDeposits.length > 0 ? (
              recentDeposits.map((dep, idx) => (
                <div key={idx} className="settings-list-item">
                  <span>{dep.date}</span>
                  <span style={{ color: 'var(--color-win)' }}>+{formatPts(dep.amount)}</span>
                </div>
              ))
            ) : (
              <span className="null-text" style={{ padding: '10px 0' }}>null</span>
            )}
          </div>
        </div>

        {/* Recent Withdrawals */}
        <div className="settings-card">
          <div className="settings-card-title">Recent Withdrawals</div>
          <div className="settings-list">
            {recentWithdrawals && recentWithdrawals.length > 0 ? (
              recentWithdrawals.map((wit, idx) => (
                <div key={idx} className="settings-list-item">
                  <span>{wit.date}</span>
                  <span style={{ color: 'var(--color-lose)' }}>-{formatPts(wit.amount)}</span>
                </div>
              ))
            ) : (
              <span className="null-text" style={{ padding: '10px 0' }}>null</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
