import { useState, useEffect, useCallback } from 'react';
import { CreditCard, Check, ShieldAlert } from 'lucide-react';
import { api } from '../api.js';

export default function PayoutPanel() {
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWithdrawals = useCallback(async () => {
    try {
      const res = await api.withdrawals();
      if (res.withdrawals) setPendingWithdrawals(res.withdrawals);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWithdrawals();
    const interval = setInterval(fetchWithdrawals, 10000);
    return () => clearInterval(interval);
  }, [fetchWithdrawals]);

  const handleApproveWithdrawal = async (id) => {
    try {
      await api.approveWithdrawal(id);
      fetchWithdrawals();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="admin-panel">
      <div className="panel-header">
        <div className="panel-title">
          <CreditCard size={18} color="#f59e0b" /> Payout Management
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 24, background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldAlert size={16} /> Manual Approval Required
        </h3>
        <p style={{ color: '#8b9cc7', margin: 0, fontSize: 13, lineHeight: '1.5' }}>
          When players request a withdrawal to their custom wallet address, the system deducts their VAULT balance immediately. 
          However, the actual crypto transaction must be manually fulfilled by an administrator. 
          <strong> Do not click "Mark Approved" until you have successfully broadcast the transaction on the blockchain!</strong>
        </p>
      </div>

      <div className="admin-card">
        <h3 style={{ margin: '0 0 16px 0', color: '#fff' }}>Pending Payout Queue</h3>
        {loading && pendingWithdrawals.length === 0 ? (
          <p style={{ color: '#8b9cc7' }}>Scanning for payout requests...</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Time Requested</th>
                  <th>Username</th>
                  <th>Amount Requested</th>
                  <th>Destination Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingWithdrawals.filter(w => w.status === 'pending').map(w => (
                  <tr key={w.id}>
                    <td style={{ fontSize: 11, color: '#8b9cc7' }}>{new Date(w.time).toLocaleString()}</td>
                    <td style={{ fontWeight: 600 }}>{w.username}</td>
                    <td>
                      <div style={{ color: '#fbbf24', fontWeight: 600 }}>🪙 {Math.floor(w.amount).toLocaleString()} VAULT</div>
                      <div style={{ fontSize: 11, color: '#8b9cc7' }}>
                        ≈ ${w.usdValue?.toFixed(2) || '0.00'} USD
                      </div>
                      <div style={{ fontSize: 12, color: '#10b981', fontWeight: 600, marginTop: 4 }}>
                        {w.cryptoAmount ? w.cryptoAmount.toFixed(6) : '0'} <span style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '2px 4px', borderRadius: 4, fontSize: 10 }}>{w.chain}</span>
                      </div>
                    </td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, wordBreak: 'break-all', maxWidth: 200 }}>
                      {w.address}
                    </td>
                    <td>
                      <button 
                        className="admin-btn primary sm" 
                        onClick={() => handleApproveWithdrawal(w.id)} 
                        style={{ background: '#10b981', color: 'white', border: 'none' }}
                      >
                        <Check size={14} /> Mark Approved
                      </button>
                    </td>
                  </tr>
                ))}
                {pendingWithdrawals.filter(w => w.status === 'pending').length === 0 && (
                  <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#8b9cc7' }}>No pending payouts right now.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
