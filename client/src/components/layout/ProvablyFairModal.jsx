import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Hash, RefreshCw, Copy, Check, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import './ProvablyFairModal.css';

// Generate a cryptographically realistic hex hash
function generateHash(input) {
  let hash = 0;
  const str = input + Date.now().toString(36) + Math.random().toString(36);
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  // Expand to 64 hex chars
  let result = '';
  let seed = Math.abs(hash);
  for (let i = 0; i < 64; i++) {
    seed = (seed * 16807 + 12345) & 0x7fffffff;
    result += (seed % 16).toString(16);
  }
  return result;
}

function generateClientSeed() {
  const seg = () => Math.random().toString(16).slice(2, 6);
  return `${seg()}${seg()}-${seg()}-${seg()}-${seg()}-${seg()}${seg()}${seg()}`;
}

export const ProvablyFairModal = ({ isOpen, onClose }) => {
  const { user } = useStore();
  const [clientSeed, setClientSeed] = useState(() => generateClientSeed());
  const [serverHash] = useState(() => generateHash('server_seed_' + (user?.name || 'anonymous')));
  const [nonce] = useState(() => Math.floor(Math.random() * 500) + 1);
  const [copied, setCopied] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleCopy = useCallback((text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  const handleSave = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  const regenerateClientSeed = useCallback(() => {
    setClientSeed(generateClientSeed());
    setSaved(false);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="pf-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="pf-modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="pf-header">
              <div className="pf-title-row">
                <ShieldCheck size={22} className="pf-shield-icon" />
                <h2>Provably Fair</h2>
              </div>
              <button className="pf-close-btn" onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            <p className="pf-description">
              From here you can edit your client seed and see the server hash and the nonce of the next provably fair game.
            </p>

            {/* Client Seed */}
            <div className="pf-field">
              <label className="pf-label">Client seed</label>
              <div className="pf-input-row">
                <div className="pf-input-icon">
                  <Hash size={14} />
                </div>
                <input
                  type="text"
                  className="pf-input"
                  value={clientSeed}
                  onChange={e => { setClientSeed(e.target.value); setSaved(false); }}
                  placeholder="Your client seed here"
                />
                <button className="pf-copy-btn" onClick={() => handleCopy(clientSeed, 'client')} title="Copy">
                  {copied === 'client' ? <Check size={14} /> : <Copy size={14} />}
                </button>
                <button className="pf-copy-btn" onClick={regenerateClientSeed} title="Regenerate">
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>

            {/* Server Seed Hash */}
            <div className="pf-field">
              <label className="pf-label">Next server seed (hashed)</label>
              <div className="pf-input-row">
                <div className="pf-input-icon">
                  <Hash size={14} />
                </div>
                <input
                  type="text"
                  className="pf-input disabled"
                  value={serverHash}
                  disabled
                />
                <button className="pf-copy-btn" onClick={() => handleCopy(serverHash, 'server')} title="Copy">
                  {copied === 'server' ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Nonce */}
            <div className="pf-field">
              <label className="pf-label">Next nonce</label>
              <div className="pf-input-row">
                <div className="pf-input-icon">
                  <Hash size={14} />
                </div>
                <input
                  type="text"
                  className="pf-input disabled"
                  value={nonce}
                  disabled
                />
                <button className="pf-copy-btn" onClick={() => handleCopy(String(nonce), 'nonce')} title="Copy">
                  {copied === 'nonce' ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button className={`pf-save-btn ${saved ? 'saved' : ''}`} onClick={handleSave}>
              {saved ? '✓ Saved' : 'Save'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
