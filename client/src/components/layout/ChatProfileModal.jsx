import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Crown } from 'lucide-react';
import { VaultIcon } from '../VaultIcon';
import { useStore, formatPts } from '../../store/useStore';
import './ChatProfileModal.css';

export const ChatProfileModal = ({ profile, onClose }) => {
  const { user, balance, setBalance } = useStore();
  const [donateAmount, setDonateAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  if (!profile) return null;

  // Fake a large profit for hype unless it's the current user
  const profit = profile.username === user?.name ? balance : (Math.floor(Math.random() * 100000) + 5000);

  const handleDonate = async () => {
    const amt = parseInt(donateAmount);
    if (!amt || amt <= 0) {
      setMessage({ text: 'Enter a valid amount', type: 'error' });
      return;
    }
    if (!user) {
      setMessage({ text: 'You must be logged in to donate.', type: 'error' });
      return;
    }
    if (balance < amt) {
      setMessage({ text: 'Insufficient balance.', type: 'error' });
      return;
    }
    
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api'
        : 'https://rovault.onrender.com/api';
      const res = await fetch(`${API_URL}/wallet/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromUser: user.name, toUser: profile.username, amount: amt })
      });
      const data = await res.json();
      
      if (data.success) {
        setBalance(data.newBalance); // Deduct from local state instantly
        setMessage({ text: `Successfully gifted ${formatPts(amt)} VAULT!`, type: 'success' });
        setDonateAmount('');
      } else {
        setMessage({ text: data.error || 'Transfer failed.', type: 'error' });
      }
    } catch (e) {
      setMessage({ text: 'Network error.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="chat-profile-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="chat-profile-modal"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="cp-close-btn" onClick={onClose}><X size={20} /></button>
          
          <div className="cp-avatar-wrap">
            <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${profile.username}&backgroundColor=transparent`} className="cp-avatar" alt="avatar" />
          </div>
          
          <div className="cp-name">
            {profile.username}
            {profile.isVip && <Crown size={16} color="#facc15" />}
          </div>
          
          <div className="cp-stat-box">
            <div className="cp-stat-label">Total Profit</div>
            <div className="cp-stat-value">
              <VaultIcon size={20} color="var(--color-win)" />
              {formatPts(profit)}
            </div>
          </div>
          
          {user && user.name !== profile.username && (
            <div className="cp-donate-section">
              <div className="cp-stat-label" style={{ marginBottom: 0 }}>Gift Vault Bucks</div>
              <input 
                type="number" 
                className="cp-donate-input" 
                placeholder="Amount" 
                value={donateAmount}
                onChange={(e) => setDonateAmount(e.target.value)}
                disabled={loading}
              />
              <button className="cp-donate-btn" onClick={handleDonate} disabled={loading || !donateAmount}>
                <Gift size={16} /> {loading ? 'Sending...' : 'Donate'}
              </button>
            </div>
          )}

          {message.text && (
            <div className={message.type === 'error' ? 'cp-error' : 'cp-success'}>{message.text}</div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
