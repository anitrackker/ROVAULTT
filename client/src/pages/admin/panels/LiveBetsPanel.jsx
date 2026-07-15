import { useState, useEffect } from 'react';
import { Activity, Clock } from 'lucide-react';
import { api } from '../api.js';

export default function LiveBetsPanel() {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const res = await api.liveBets();
        if (res.bets) setBets(res.bets);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBets();
    const interval = setInterval(fetchBets, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-panel">
      <div className="panel-header">
        <div className="panel-title">
          <Activity size={18} color="#a855f7" /> Global Live Bets Feed
        </div>
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="live-dot" style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span>
            Real-Time Wagers
          </h3>
        </div>
        
        {loading && bets.length === 0 ? (
          <p style={{ color: '#8b9cc7' }}>Listening for live bets...</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Username</th>
                  <th>Game / Market</th>
                  <th>Wager</th>
                  <th>Potential Payout</th>
                </tr>
              </thead>
              <tbody>
                {bets.map((b) => (
                  <tr key={b.id} style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <td style={{ fontSize: 11, color: '#8b9cc7' }}>
                      <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                      {new Date(b.time).toLocaleTimeString()}
                    </td>
                    <td style={{ fontWeight: 600 }}>{b.username}</td>
                    <td style={{ color: '#c4b5fd' }}>
                      {b.game} 
                      {b.details && <span style={{ display: 'block', fontSize: 10, color: '#8b9cc7' }}>{b.details}</span>}
                    </td>
                    <td style={{ color: '#fbbf24', fontWeight: 600 }}>🪙 {Math.floor(b.amount).toLocaleString()}</td>
                    <td style={{ color: '#10b981', fontWeight: 600 }}>🪙 {Math.floor(b.potentialPayout).toLocaleString()}</td>
                  </tr>
                ))}
                {bets.length === 0 && (
                  <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No bets placed yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
