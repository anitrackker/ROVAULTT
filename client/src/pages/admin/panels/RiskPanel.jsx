import { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { api } from '../api.js';

export default function RiskPanel() {
  const [risk, setRisk] = useState({ totalExposure: 0, highRiskMarkets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRisk = async () => {
      try {
        const res = await api.risk();
        if (res) setRisk(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRisk();
    const interval = setInterval(fetchRisk, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-panel">
      <div className="panel-header">
        <div className="panel-title">
          <ShieldAlert size={18} color="#ef4444" /> Liability & Risk Radar
        </div>
      </div>

      <div className="admin-card" style={{ background: 'rgba(239, 68, 68, 0.08)', borderColor: 'rgba(239, 68, 68, 0.2)', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <AlertTriangle size={18} color="#ef4444" />
          <span style={{ color: '#f87171', fontSize: 13, fontWeight: 600 }}>
            Total Sportsbook Exposure: 🪙 {Math.floor(risk.totalExposure).toLocaleString()} VAULT (≈ ${(risk.totalExposure/600).toFixed(2)} USD)
          </span>
        </div>
        <p style={{ color: '#8b9cc7', fontSize: 12, margin: 0, marginTop: 4 }}>
          This represents the absolute maximum payout if every active user bet on the sportsbook hits.
        </p>
      </div>

      <div className="admin-card">
        <h3 style={{ margin: '0 0 16px 0', color: '#fff' }}>High Risk Markets (Heavy-Sided)</h3>
        {loading && risk.highRiskMarkets.length === 0 ? (
          <p style={{ color: '#8b9cc7' }}>Scanning active bets for liability...</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Market ID</th>
                  <th>Total Liability (VAULT)</th>
                  <th>Risk Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {risk.highRiskMarkets.map((m, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: '#c4b5fd' }}>{m.market}</td>
                    <td style={{ color: '#ef4444', fontWeight: 600 }}>🪙 {Math.floor(m.exposure).toLocaleString()}</td>
                    <td>
                      <span style={{ 
                        background: m.exposure > 50000 ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)', 
                        color: m.exposure > 50000 ? '#f87171' : '#fbbf24',
                        padding: '4px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700
                      }}>
                        {m.exposure > 50000 ? 'SEVERE' : 'MODERATE'}
                      </span>
                    </td>
                    <td>
                      <button className="admin-btn sm danger">Pause Market</button>
                    </td>
                  </tr>
                ))}
                {risk.highRiskMarkets.length === 0 && (
                  <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No high-risk markets detected.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
