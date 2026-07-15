import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { api } from '../api.js';

export default function AnalyticsPanel() {
  const [pnl, setPnl] = useState({ depositsUsd: 0, withdrawalsUsd: 0, ggr: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.analytics();
        if (res.pnl) setPnl(res.pnl);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-panel">
      <div className="panel-header">
        <div className="panel-title">
          <TrendingUp size={18} color="#10b981" /> House PnL & Analytics
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card color-green">
          <div className="stat-icon-wrap"><DollarSign size={20} /></div>
          <div className="stat-body">
            <div className="stat-value">${pnl.depositsUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div className="stat-label">Total Deposits (USD)</div>
          </div>
        </div>
        <div className="stat-card color-red">
          <div className="stat-icon-wrap"><DollarSign size={20} /></div>
          <div className="stat-body">
            <div className="stat-value">${pnl.withdrawalsUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div className="stat-label">Total Withdrawals (USD)</div>
          </div>
        </div>
        <div className="stat-card color-purple">
          <div className="stat-icon-wrap"><PieChart size={20} /></div>
          <div className="stat-body">
            <div className="stat-value">${pnl.ggr.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div className="stat-label">Gross Gaming Revenue (GGR)</div>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ margin: '0 0 16px 0' }}>Financial Breakdown</h3>
        <p style={{ color: '#8b9cc7', lineHeight: '1.6' }}>
          This panel tracks the overall profitability of the RoVault platform. GGR represents the total amount retained by the house (total wagered minus total won by players).
          A positive GGR means the casino is operating profitably. Make sure to monitor this in conjunction with your crypto liabilities.
        </p>
      </div>
    </div>
  );
}
