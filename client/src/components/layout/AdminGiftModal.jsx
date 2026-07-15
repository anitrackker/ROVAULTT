import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';
import { formatPts } from '../../store/useStore';
import { VaultIcon } from '../VaultIcon';
import './AdminGiftModal.css';

export const AdminGiftModal = ({ show, amount, note, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="gift-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="gift-modal-content"
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="gift-icon-wrap">
              <Gift size={36} color="#facc15" />
            </div>
            
            <h2 className="gift-title">Admin Gift Received!</h2>
            
            <div className="gift-amount">
              <VaultIcon size={28} color="#facc15" />
              +{formatPts(amount)}
            </div>

            {note && (
              <div className="gift-note-box">
                <div className="gift-note-label">Message from Admin</div>
                <div className="gift-note-text">"{note}"</div>
              </div>
            )}

            <button className="gift-btn" onClick={onClose}>
              <Sparkles size={16} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
              Claim Gift
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
