import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { RightSidebar } from './RightSidebar';
import { AdminGiftModal } from './AdminGiftModal';
import { useStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';
import confetti from 'canvas-confetti';
import { useState, useEffect, useRef } from 'react';
import './layout.css';

export const AppLayout = ({ children }) => {
  const { user, setBalance } = useStore();
  const [giftData, setGiftData] = useState(null); // { amount, note }
  const processedTsRef = useRef(0);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`public:users:username=eq.${user.name}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'users',
        filter: `username=eq.${user.name}` 
      }, (payload) => {
        const { new: newRow, old: oldRow } = payload;
        
        // If balance increased, and it was an admin action
        if (newRow.balance > (oldRow?.balance || 0)) {
          const action = newRow.lastAdminAction;
          if (action && action.type === 'balance' && action.next > action.prev && action.ts > processedTsRef.current) {
            // It's a new gift!
            processedTsRef.current = action.ts;
            const diff = action.next - action.prev;
            
            // Fire confetti
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#facc15', '#a855f7', '#ffffff']
            });

            // Show Modal
            setGiftData({ amount: diff, note: action.note });
            
            // Instantly update the frontend balance
            setBalance(newRow.balance);
          }
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <div className="app-layout">
      <AdminGiftModal 
        show={!!giftData} 
        amount={giftData?.amount || 0} 
        note={giftData?.note || ''} 
        onClose={() => setGiftData(null)} 
      />
      <Sidebar />
      <div className="main-column">
        <TopBar />
        <div className="content-split">
          <main className="center-content">
            {children}
          </main>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};
