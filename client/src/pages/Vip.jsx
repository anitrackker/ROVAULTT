import { useState, useEffect } from 'react';
import { useStore, formatPts } from '../store/useStore';
import { supabase } from '../lib/supabase';
import { VaultIcon } from '../components/VaultIcon';
import { Crown, Zap, MessageSquare, Tag } from 'lucide-react';
import { playWin, playTick } from '../utils/SoundEngine';
import confetti from 'canvas-confetti';
import './Vip.css';

const VIP_COST = 3500;
const AIRDROP_AMOUNT = 500;

export const Vip = () => {
  const { user, balance, updateBalance } = useStore();
  const [isVip, setIsVip] = useState(false);
  const [lastAirdrop, setLastAirdrop] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchVip = async () => {
      const { data } = await supabase.from('users').select('is_vip, last_airdrop_claim').eq('username', user.name).single();
      if (data) {
        setIsVip(data.is_vip || false);
        setLastAirdrop(data.last_airdrop_claim || 0);
      }
      setIsLoading(false);
    };
    fetchVip();
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isVip) return;
      const now = Date.now();
      const nextClaim = lastAirdrop + (60 * 60 * 1000); // 1 hour
      
      if (now >= nextClaim) {
        setTimeLeft(null);
      } else {
        const diff = nextClaim - now;
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isVip, lastAirdrop]);

  const purchaseVip = async () => {
    if (balance < VIP_COST || isBuying) return;
    setIsBuying(true);
    playTick();
    
    // Deduct
    updateBalance(-VIP_COST);
    
    // Update DB
    await supabase.rpc('increment_balance', { u_name: user.name, amt: -VIP_COST });
    await supabase.from('users').update({ is_vip: true }).eq('username', user.name);
    
    setIsVip(true);
    setIsBuying(false);
    playWin();
    confetti({ particleCount: 200, spread: 100, colors: ['#facc15', '#ffffff'] });
  };

  const claimAirdrop = async () => {
    if (timeLeft) return;
    playTick();
    
    const now = Date.now();
    setLastAirdrop(now);
    updateBalance(AIRDROP_AMOUNT);
    
    await supabase.rpc('increment_balance', { u_name: user.name, amt: AIRDROP_AMOUNT });
    await supabase.from('users').update({ last_airdrop_claim: now }).eq('username', user.name);
    
    playWin();
    confetti({ particleCount: 50, spread: 40 });
  };

  if (isLoading) return <div className="vip-page">Loading...</div>;

  return (
    <div className="vip-page">
      <div className="vip-header">
        <h1>VIP Club</h1>
        <p>Elevate your experience with exclusive perks, hourly airdrops, and private access.</p>
      </div>

      {isVip ? (
        <div className="vip-dashboard">
          <Crown size={64} color="#facc15" style={{ margin: '0 auto 20px auto' }} />
          <h2>Welcome back, VIP {user?.name}</h2>
          <p style={{ color: '#8b9cc7', marginTop: '10px' }}>You have access to all exclusive features.</p>
          
          <div className="vd-airdrop">
            <h3>Hourly Airdrop</h3>
            {timeLeft ? (
              <>
                <div className="airdrop-timer">{timeLeft}</div>
                <button className="vip-buy-btn" disabled>Airdrop Locked</button>
              </>
            ) : (
              <>
                <div className="airdrop-timer" style={{ color: '#22c55e' }}>Ready!</div>
                <button className="vip-buy-btn" onClick={claimAirdrop}>Claim {formatPts(AIRDROP_AMOUNT)} VAULT</button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="vip-purchase-card">
          <Crown size={80} color="#facc15" style={{ margin: '0 auto 20px auto', filter: 'drop-shadow(0 0 20px rgba(250,204,21,0.5))' }} />
          <h2>Join the Elite</h2>
          <div className="vip-price">
            <VaultIcon size={40} />
            {formatPts(VIP_COST)}
          </div>
          <button 
            className="vip-buy-btn" 
            onClick={purchaseVip} 
            disabled={balance < VIP_COST || isBuying}
          >
            {isBuying ? 'Processing...' : balance >= VIP_COST ? 'Purchase Lifetime VIP' : 'Insufficient Balance'}
          </button>
        </div>
      )}

      <div className="vip-features">
        <div className="vip-feature">
          <div className="vf-icon"><Zap size={28} /></div>
          <h3>Hourly Airdrops</h3>
          <p>Claim free Vault Bucks every single hour, directly from your VIP dashboard.</p>
        </div>
        <div className="vip-feature">
          <div className="vf-icon"><Tag size={28} /></div>
          <h3>Special Name Tag</h3>
          <p>Stand out in the live chat with a glowing golden VIP badge next to your name.</p>
        </div>
        <div className="vip-feature">
          <div className="vf-icon"><MessageSquare size={28} /></div>
          <h3>Private Chat</h3>
          <p>Gain access to the exclusive VIP-only chat room (Coming Soon).</p>
        </div>
        <div className="vip-feature">
          <div className="vf-icon"><Crown size={28} /></div>
          <h3>Early Access</h3>
          <p>Be the first to play new game modes before they are released to the public.</p>
        </div>
      </div>
    </div>
  );
};
