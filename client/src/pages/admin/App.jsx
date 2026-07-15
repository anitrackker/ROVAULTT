import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './pages/Login.jsx';
import Shell from './pages/Shell.jsx';

const SESSION_KEY = 'rv_admin_auth';

export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');

  const handleLogin = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setAuthed(true);
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }, []);

  return (
    <div className="admin-app">
      <AnimatePresence mode="wait">
        {authed
          ? <Shell key="shell" onLogout={handleLogout} />
          : <Login key="login" onLogin={handleLogin} />
        }
      </AnimatePresence>
    </div>
  );
}
