import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';

const CORRECT = 'ROVAULTADMIN';

export default function Login({ onLogin }) {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900)); // simulate auth delay
    if (value === CORRECT) {
      onLogin();
    } else {
      setError('Invalid admin credentials');
      setShake(true);
      setValue('');
      setLoading(false);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <motion.div
      className="login-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated background orbs */}
      <div className="login-orb orb1" />
      <div className="login-orb orb2" />
      <div className="login-orb orb3" />

      {/* Grid overlay */}
      <div className="login-grid" />

      <motion.div
        className={`login-card ${shake ? 'shake' : ''}`}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 22 }}
      >
        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo-ring">
            <ShieldCheck size={28} color="#a855f7" />
          </div>
        </div>

        <div className="login-header">
          <h1>RoVault Admin</h1>
          <p>Restricted access. Authorised personnel only.</p>
        </div>

        <form onSubmit={submit} className="login-form">
          <div className={`login-field ${error ? 'has-error' : ''}`}>
            <Lock size={15} className="field-icon" />
            <input
              ref={inputRef}
              type={show ? 'text' : 'password'}
              placeholder="Enter admin password"
              value={value}
              onChange={e => { setValue(e.target.value); setError(''); }}
              autoComplete="off"
              spellCheck="false"
            />
            <button type="button" className="toggle-eye" onClick={() => setShow(s => !s)}>
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                className="login-error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <AlertCircle size={13} /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" className="login-btn" disabled={loading || !value.trim()}>
            {loading
              ? <span className="login-spinner" />
              : 'Access Control Panel'
            }
          </button>
        </form>

        <div className="login-footer">
          <span className="status-dot" /> System online — RoVault v1.0
        </div>
      </motion.div>
    </motion.div>
  );
}
