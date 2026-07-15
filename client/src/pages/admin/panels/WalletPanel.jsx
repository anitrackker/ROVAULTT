import { useState, useEffect, useCallback } from 'react';
import { Wallet, Search, Copy, Check, Eye, EyeOff, AlertTriangle, ShieldCheck } from 'lucide-react';
import { api } from '../api.js';

export default function WalletPanel() {
  const [wallets, setWallets] = useState([]);
  const [mnemonicInfo, setMnemonicInfo] = useState({ valid: false, preview: '' });
  const [selectedUser, setSelectedUser] = useState('');
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState(null);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [copied, setCopied] = useState(null);

  const fetchAllWallets = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await api.wallets();
      if (!res.error) {
        setWallets(res.wallets || []);
        setMnemonicInfo({
          valid: res.masterMnemonicValid,
          preview: res.mnemonicPreview
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    fetchAllWallets();
  }, [fetchAllWallets]);

  const fetchWallet = useCallback(async (username) => {
    const userToFetch = username || selectedUser.trim();
    if (!userToFetch) return;
    
    setSelectedUser(userToFetch);
    setLoading(true);
    setError(null);
    setWalletData(null);
    setShowMnemonic(false);
    
    try {
      const res = await api.wallet(userToFetch.toLowerCase());
      if (res.error) {
        setError(res.error);
      } else {
        setWalletData(res);
        // Scroll down to the specific wallet data if we opened from the table
        if (username) {
          setTimeout(() => {
            document.getElementById('wallet-details-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    } catch (e) {
      setError('Failed to fetch wallet data');
    } finally {
      setLoading(false);
    }
  }, [selectedUser]);

  const handleCopy = useCallback((text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  const CopyBtn = ({ text, field }) => (
    <button
      className="admin-btn sm"
      onClick={() => handleCopy(text, field)}
      style={{ minWidth: 32, padding: '4px 8px' }}
    >
      {copied === field ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );

  return (
    <div className="admin-panel">
      <div className="panel-header">
        <div className="panel-title">
          <Wallet size={18} color="#f59e0b" /> Wallet Manager
        </div>
      </div>

      {/* Warning Banner & Mnemonic Status */}
      <div className="admin-card" style={{ background: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245, 158, 11, 0.2)', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <AlertTriangle size={18} color="#f59e0b" />
          <span style={{ color: '#fbbf24', fontSize: 13, fontWeight: 600 }}>
            This panel exposes sensitive seed phrase data. Handle with extreme care.
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: mnemonicInfo.valid ? '#10b981' : '#ef4444' }}>
          <ShieldCheck size={14} />
          <strong>Master Mnemonic Validation:</strong> {mnemonicInfo.valid ? 'Valid (BIP39 Compliant)' : 'Invalid or Missing'} 
          <span style={{ color: '#8b9cc7', marginLeft: 8 }}>({mnemonicInfo.preview})</span>
        </div>
      </div>

      {/* All Users Wallet Table */}
      <div className="admin-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>All User Crypto Balances</h3>
          <button className="admin-btn sm" onClick={fetchAllWallets} disabled={loadingList}>
            {loadingList ? 'Refreshing...' : 'Refresh List'}
          </button>
        </div>
        
        {loadingList && wallets.length === 0 ? (
          <p style={{ color: '#8b9cc7' }}>Loading wallet data from blockchain APIs...</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Total Crypto Value</th>
                  <th>Vault Coins</th>
                  <th>BTC / ETH / SOL / LTC</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {wallets.map(w => (
                  <tr key={w.username}>
                    <td style={{ fontWeight: 600 }}>{w.username}</td>
                    <td style={{ color: w.cryptoBalanceUsd > 0 ? '#10b981' : '#8b9cc7', fontWeight: 600 }}>
                      ${w.cryptoBalanceUsd.toFixed(2)}
                    </td>
                    <td style={{ color: '#fbbf24', fontWeight: 600 }}>
                      🪙 {Math.floor(w.vaultBalance).toLocaleString()}
                    </td>
                    <td style={{ fontSize: 11, color: '#5d6b8b', fontFamily: "'JetBrains Mono', monospace" }}>
                      {w.credited.btc.toFixed(4)} / {w.credited.eth.toFixed(4)} / {w.credited.sol.toFixed(2)} / {w.credited.ltc.toFixed(2)}
                    </td>
                    <td>
                      <button className="admin-btn primary sm" onClick={() => fetchWallet(w.username)}>
                        <Eye size={12} /> View Seeds
                      </button>
                    </td>
                  </tr>
                ))}
                {wallets.length === 0 && (
                  <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No wallets found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Wallet Results Section */}
      {walletData && (
        <div id="wallet-details-section" style={{ marginTop: 24, padding: '20px', background: 'rgba(0,0,0,0.15)', borderRadius: 12, border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 16px 0', color: '#c4b5fd' }}>
            <Wallet size={20} /> Wallet Details: <span style={{ color: 'white' }}>{walletData.username}</span>
          </h2>
          
          {/* Seed Phrase */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3>Master Seed Phrase</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="admin-btn sm" onClick={() => setShowMnemonic(!showMnemonic)}>
                  {showMnemonic ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showMnemonic ? ' Hide' : ' Reveal'}
                </button>
                {showMnemonic && <CopyBtn text={walletData.mnemonic} field="mnemonic" />}
              </div>
            </div>
            <div style={{
              marginTop: 12,
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 8,
              padding: '14px 16px',
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: 13,
              lineHeight: 1.8,
              color: showMnemonic ? '#fbbf24' : '#3d4b6b',
              wordBreak: 'break-all',
              userSelect: showMnemonic ? 'text' : 'none',
              letterSpacing: showMnemonic ? '0.3px' : '2px',
            }}>
              {showMnemonic
                ? walletData.mnemonic
                : '•'.repeat(walletData.mnemonic.length)}
            </div>
            <p style={{ fontSize: 11, color: '#5d6b8b', marginTop: 8 }}>
              Account Index: <span style={{ color: '#8b9cc7', fontWeight: 700 }}>{walletData.accountIndex}</span>
            </p>
          </div>

          {/* Addresses Table */}
          <div className="admin-card" style={{ marginTop: 16 }}>
            <h3>Wallet Addresses</h3>
            <div className="table-responsive" style={{ marginTop: 12 }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Chain</th>
                    <th>Address</th>
                    <th>Derivation Path</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(walletData.addresses).map(([chain, address]) => (
                    <tr key={chain}>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          padding: '3px 10px',
                          borderRadius: 4,
                          fontWeight: 700,
                          fontSize: 11,
                          textTransform: 'uppercase',
                          background: chain === 'btc' ? 'rgba(247,147,26,0.15)' :
                                      chain === 'eth' ? 'rgba(98,126,234,0.15)' :
                                      chain === 'sol' ? 'rgba(0,255,163,0.15)' :
                                                        'rgba(52,93,206,0.15)',
                          color:      chain === 'btc' ? '#f7931a' :
                                      chain === 'eth' ? '#627eea' :
                                      chain === 'sol' ? '#00ffa3' :
                                                        '#345dce',
                        }}>
                          {chain}
                        </span>
                      </td>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {address || '—'}
                      </td>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8b9cc7' }}>
                        {walletData.derivationPaths[chain]}
                      </td>
                      <td>
                        {address && <CopyBtn text={address} field={`addr-${chain}`} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Error Display */}
      {error && (
        <div className="admin-card" style={{ marginTop: 16, borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <p style={{ color: '#ef4444', fontWeight: 600, margin: 0 }}>{error}</p>
        </div>
      )}
    </div>
  );
}
