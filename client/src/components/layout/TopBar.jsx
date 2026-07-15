import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore, formatPts } from '../../store/useStore';
import { Bell, Settings, Wallet, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VaultIcon } from '../VaultIcon';
import { DepositModal } from './DepositModal';
import './TopBar.css';

export const TopBar = () => {
  const { user, balance, isAuthenticated, login, logout, loginLoading, showLoginModal, setShowLoginModal, setShowDepositModal, toggleSidebar } = useStore();
  const [username, setUsername] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username.trim() === 'ROVAULTADMIN') {
      window.location.href = '/admin';
      return;
    }
    if (username.trim()) await login(username.trim());
  };

  return (
    <>
      <header className="top-bar">
        <div className="top-bar-left">
          <button className="icon-btn mobile-only" onClick={toggleSidebar}>
            <Menu size={20} />
          </button>
        </div>

        <div className="top-auth">
          {!isAuthenticated ? (
            <button className="btn btn-primary" onClick={() => setShowLoginModal(true)}>
              Log In / Sign Up
            </button>
          ) : (
            <>
              <div className="wallet-display">
                <VaultIcon size={17} color="#facc15" />
                <span className="wallet-amount">{formatPts(balance)}</span>
                <button className="btn btn-primary btn-sm" onClick={() => setShowDepositModal(true)}>
                  <Wallet size={16} style={{ marginRight: '6px' }} />
                  Wallet
                </button>
              </div>

              <button className="icon-btn"><Bell size={20} /></button>
              <Link to="/settings" className="icon-btn"><Settings size={20} /></Link>

              <div className="user-profile">
                <img src={user.avatar} alt="Avatar" className="user-avatar" />
                <span className="user-name">{user.name}</span>
              </div>

              <button className="icon-btn logout-btn" onClick={logout} title="Log Out">
                <LogOut size={18} />
              </button>
            </>
          )}
        </div>
      </header>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            className="login-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              className="login-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="login-modal-close" onClick={() => setShowLoginModal(false)}>
                <X size={20} />
              </button>

              <div className="login-modal-header">
                <h2>Welcome to RoVault</h2>
                <p>Enter your Roblox username to get started</p>
              </div>

              <form onSubmit={handleLogin} className="login-form">
                <div className="login-input-wrap">
                  <input
                    type="text"
                    placeholder="Roblox Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                    disabled={loginLoading}
                  />
                </div>
                <button type="submit" className="btn btn-primary login-submit" style={{ marginTop: '16px' }} disabled={loginLoading || !username.trim()}>
                  {loginLoading ? 'Connecting...' : "Let's Go"}
                </button>
              </form>

              <p className="login-note">Your profile picture will be loaded from Roblox</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DepositModal />
    </>
  );
};
