import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Trophy, Crown, Activity, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, formatPts } from '../../store/useStore';
import { VaultIcon } from '../VaultIcon';
import { supabase } from '../../lib/supabase';
import { ROBLOX_PLAYERS } from '../../data/usernames';
import { ChatProfileModal } from './ChatProfileModal';
import { Link } from 'react-router-dom';
import './RightSidebar.css';

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://rovault.onrender.com/api';

const RANK_STYLES = [
  { bg: '#ffd700', color: '#000', glow: 'rgba(255,215,0,0.5)' },
  { bg: '#c0c0c0', color: '#000', glow: 'rgba(192,192,192,0.3)' },
  { bg: '#cd7f32', color: '#000', glow: 'rgba(205,127,50,0.3)' },
];

const LiveLeaderboard = () => {
  const { user } = useStore();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res  = await fetch(`${API_URL}/leaderboard?tab=balance`);
      const json = await res.json();
      setEntries((json.leaderboard || []).slice(0, 10));
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 20000);
    return () => clearInterval(id);
  }, [load]);

  return (
    <div className="widget-box">
      <div className="widget-header">
        <span style={{ fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Trophy size={16} color="#fbbf24" style={{ filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.5))' }} />
          Top Balances
        </span>
        <span className="wh-live-dot">
          <span className="live-pulse" />
          LIVE
        </span>
      </div>
      <div className="lb-widget-list">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="lb-widget-skeleton-row">
              <div className="lb-w-skeleton" style={{ width: 22 }} />
              <div className="lb-w-skeleton" style={{ width: 110 }} />
              <div className="lb-w-skeleton" style={{ width: 70 }} />
            </div>
          ))
        ) : entries.length === 0 ? (
          <div className="lb-widget-empty">No players yet</div>
        ) : (
          <AnimatePresence initial={false}>
            {entries.map((e, i) => {
              const rank  = i + 1;
              const isMe  = user && e.username.toLowerCase() === user.name.toLowerCase();
              const style = RANK_STYLES[i] || null;
              const avatar = e.avatarUrl ||
                `https://api.dicebear.com/9.x/avataaars/svg?seed=${e.username}&backgroundColor=transparent`;
              return (
                <motion.div
                  key={e.username}
                  layout
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`lb-widget-row${isMe ? ' lb-widget-row-me' : ''}`}
                >
                  <div
                    className="lb-w-rank"
                    style={style ? { background: style.bg, color: style.color, boxShadow: `0 0 8px ${style.glow}` } : {}}
                  >
                    {rank <= 3 ? <Crown size={10} style={{ color: style.color }} /> : rank}
                  </div>
                  <img
                    className="lb-w-avatar"
                    src={avatar}
                    alt={e.username}
                    loading="lazy"
                    onError={ev => { ev.target.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${e.username}&backgroundColor=transparent`; }}
                  />
                  <span className={`lb-w-name${rank === 1 ? ' lb-w-gold' : ''}${isMe ? ' lb-w-me' : ''}`}>
                    {e.username}
                    {isMe && <span className="lb-w-you">YOU</span>}
                  </span>
                  <span className={`lb-w-val${rank === 1 ? ' lb-w-gold' : ''}`}>
                    🪙 {formatPts(e.balance)}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

const SIM_GAMES = ['Crash', 'Slots', 'Plinko', 'Cases', 'Mines', 'Dice', 'Coinflip'];

const initialMessages = [
  { id: 1, user: 'LuckyKing', text: 'Just hit a crazy win!', isVip: true },
  { id: 2, user: 'NovaBlade', text: 'Plinko is so good today', isVip: false },
  { id: 3, user: 'HighRoller', text: 'Lets gooo!', isVip: false },
];

export const RightSidebar = () => {
  const { user, level } = useStore();
  const isAuthenticated = !!user;
  const canChat = isAuthenticated;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [liveActivity, setLiveActivity] = useState([]);
  const [onlineCount, setOnlineCount] = useState(135);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // 1. Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (!error && data) {
        setMessages(data.reverse());
      }
    };
    fetchMessages();

    // 2. Subscribe to new messages
    const channel = supabase
      .channel('public:chat_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const fetchLiveBets = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/live-bets`);
        const data = await res.json();
        if (data.bets) {
          // Map backend bet structure to the frontend RightSidebar expected format
          const mapped = data.bets.map(b => ({
            id: b.id,
            player: b.username,
            game: b.game,
            isWin: b.amount < 0, // Since it's a live feed of placed bets, we just show the action
            amount: b.amount
          }));
          setLiveActivity(mapped);
        }
      } catch (e) {
        // ignore
      }
    };

    fetchLiveBets();
    const intervalId = setInterval(fetchLiveBets, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Fluctuating online count
    const interval = setInterval(() => {
      setOnlineCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        let next = prev + change;
        if (next < 100) next = 100;
        if (next > 300) next = 300;
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    
    const newMsg = {
      user: user.name,
      text: input.trim(),
      is_vip: false // You can wire this to user real VIP status if needed
    };
    
    setInput('');
    
    // Insert into DB. The realtime subscription will instantly append it to our state and everyone else's!
    await supabase.from('chat_messages').insert([newMsg]);
  };

  return (
    <aside className="sidebar-right">
      <ChatProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      
      {/* LIVE CHAT */}
      <div className="widget-box chat-widget">
        <div className="widget-header">
          <span style={{ fontWeight: 700, color: 'white' }}>Live Chat</span>
          <span className="online-count">
            <div className="status-dot"></div> {onlineCount} Online
          </span>
        </div>
        
        <div className="chat-messages-container">
          <div className="chat-messages">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="chat-msg"
                >
                  <img 
                    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${msg.user}&backgroundColor=transparent`} 
                    alt="avatar" 
                    className="chat-avatar" 
                    onClick={() => setSelectedProfile({ username: msg.user, isVip: msg.is_vip })}
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="chat-body">
                    <div className="chat-name-row">
                      <span 
                        className="chat-name" 
                        onClick={() => setSelectedProfile({ username: msg.user, isVip: msg.is_vip })}
                        style={{ cursor: 'pointer' }}
                      >
                        {msg.user} {msg.is_vip && <Crown size={12} color="#facc15" style={{ marginLeft: 4 }} />}
                      </span>
                      <span className="chat-time">Just now</span>
                    </div>
                    <div className="chat-text">{msg.text}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>
        </div>
        
        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder={canChat ? "Type a message..." : "Login to chat"} 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!canChat}
          />
          <button type="submit" className="chat-send-btn" disabled={!canChat || !input.trim()}>
            <Send size={16} />
          </button>
        </form>
      </div>



      {/* LEADERBOARD */}
      <LiveLeaderboard />

      {/* VIP CLUB */}
      <div className="widget-box vip-promo">
        <div className="widget-header" style={{ border: 'none', paddingBottom: '5px' }}>
          <span style={{ fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Crown size={18} color="#facc15" /> VIP Club
          </span>
        </div>
        <p className="vip-text">Exclusive rewards & benefits for our VIP members.</p>
        <Link to="/vip" className="vip-link">Join Now →</Link>
      </div>

    </aside>
  );
};
