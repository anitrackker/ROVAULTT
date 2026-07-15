import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';
import './CookieBanner.css';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('rovault_cookies_accepted');
    if (!hasAccepted) {
      // Small delay to ensure smooth entrance animation after initial load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('rovault_cookies_accepted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="cookie-banner-wrapper"
          initial={{ x: "-50%", y: 100, opacity: 0 }}
          animate={{ x: "-50%", y: 0, opacity: 1 }}
          exit={{ x: "-50%", y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="cookie-banner-content">
            <div className="cookie-banner-icon">
              <ShieldAlert size={24} color="#a855f7" />
            </div>
            
            <div className="cookie-banner-text">
              <h3>Notice & Disclaimer</h3>
              <p>
                We use cookies to improve your experience. By using our site, you agree to our <Link to="/privacy">Privacy Policy</Link>. 
                <strong> You must be 18+ to play.</strong>
                <br/><br/>
                <strong> Important:</strong> On RoVault, gameplay is conducted entirely using our premium virtual currency, "Vaults". Vaults are acquired via crypto deposits at a fixed rate of <strong>1,200 Vaults = $2.00 USD</strong>. Once topped up, your Vaults serve as your exclusive platform balance for participating in all games and unlocking rewards.
              </p>
            </div>
            
            <div className="cookie-banner-actions">
              <button className="cookie-btn primary" onClick={handleAccept}>
                I Understand & Accept
              </button>
              <button className="cookie-btn-close" onClick={() => setIsVisible(false)}>
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
