import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Gift } from 'lucide-react';
import { api } from '../api.js';

export default function PromoPanel() {
  const [promos, setPromos] = useState({});
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [vault, setVault] = useState('');
  const [description, setDescription] = useState('');

  const loadPromos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.promos();
      setPromos(res.promos || {});
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadPromos(); }, [loadPromos]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!code || !vault) return;
    setLoading(true);
    try {
      await api.createPromo(code, vault, description);
      setCode('');
      setVault('');
      setDescription('');
      await loadPromos();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (promoCode) => {
    if (!window.confirm(`Delete promo code ${promoCode}?`)) return;
    setLoading(true);
    try {
      await api.deletePromo(promoCode);
      await loadPromos();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="panel-header">
        <div className="panel-title">
          <Gift size={18} color="#a855f7" /> Promo Code Manager
        </div>
      </div>

      <div className="admin-card">
        <form className="admin-form" onSubmit={handleCreate}>
          <h3>Create New Promo Code</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label>Promo Code</label>
              <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="e.g. WELCOME100" required />
            </div>
            <div className="form-group">
              <label>Vault Amount</label>
              <input type="number" value={vault} onChange={e => setVault(e.target.value)} placeholder="e.g. 1000" required />
            </div>
          </div>
          <div className="form-group">
            <label>Description (Optional)</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g. Summer Event 2026" />
          </div>
          <button type="submit" className="admin-btn primary" disabled={loading}>
            <Plus size={16} /> Create Promo
          </button>
        </form>
      </div>

      <div className="admin-card" style={{ marginTop: '20px' }}>
        <h3>Active Promo Codes</h3>
        {loading && Object.keys(promos).length === 0 ? (
          <p>Loading...</p>
        ) : Object.keys(promos).length === 0 ? (
          <p className="empty-text" style={{ marginTop: '10px' }}>No promo codes found.</p>
        ) : (
          <div className="table-responsive" style={{ marginTop: '16px' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Vault Amount</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(promos).map(([key, data]) => (
                  <tr key={key}>
                    <td><span className="badge badge-primary" style={{ padding: '4px 8px', borderRadius: '4px', background: '#3b82f6', color: 'white', fontWeight: 'bold' }}>{key.toUpperCase()}</span></td>
                    <td className="coins-cell" style={{ color: '#fbbf24', fontWeight: 'bold' }}>🪙 {data.vault}</td>
                    <td>{data.description}</td>
                    <td>
                      <button className="admin-btn danger sm" onClick={() => handleDelete(key)}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
