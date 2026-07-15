import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://rovault.onrender.com/api';

export const useStore = create(
  persist(
    (set, get) => ({
  user: null,
  balance: 0,
  isAuthenticated: false,
  wallets: null, // { btc, eth, sol, ltc }

  // UI states
  isSidebarOpen: true,
  isChatOpen: true,
  showLoginModal: false,
  showDepositModal: false,
  loginLoading: false,

  // Settings & User Info
  robloxCookie: null,
  totalPnl: null,
  betsPlaced: 0,
  xp: 0,
  level: 1,
  totalWagered: 0,
  recentDeposits: [],
  recentWithdrawals: [],
  activeSportsBets: [],

  setRobloxCookie: (cookie) => set({ robloxCookie: cookie }),

  placeSportsBet: (bet) => set((state) => {
    if (state.balance < bet.amount) return state;
    state.updateBalance(-bet.amount, 'Sportsbook', bet.isCombo ? `Combo (${bet.legs?.length || 2} Legs)` : bet.marketId);
    return { activeSportsBets: [...(state.activeSportsBets || []), bet] };
  }),

  cashoutSportsBet: (betId, cashoutAmount) => set((state) => {
    const bets = state.activeSportsBets || [];
    const bet = bets.find(b => b.id === betId);
    if (!bet) return state;
    
    state.updateBalance(cashoutAmount);
    return { activeSportsBets: bets.filter(b => b.id !== betId) };
  }),

  setShowLoginModal: (show) => set({ showLoginModal: show }),
  setShowDepositModal: (show) => set({ showDepositModal: show }),

  login: async (username, promoCode) => {
    if (!username?.trim()) return;
    set({ loginLoading: true });

    let avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}&backgroundColor=transparent`;

    try {
      const res = await fetch(`${API_URL}/roblox/avatar/${encodeURIComponent(username)}`);
      const data = await res.json();
      if (data.avatarUrl) avatarUrl = data.avatarUrl;
    } catch (e) {}

    let userBalance = 0;
    let userWagered = 0;

    try {
      const res = await fetch(`${API_URL}/users/${encodeURIComponent(username.toLowerCase())}`);
      const { data } = await res.json();
      if (data) {
        userBalance = data.balance;
        userWagered = data.totalWagered ?? 0;
        // Update avatarUrl on every login
        await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.toLowerCase(), balance: userBalance, totalWagered: userWagered, signupBonusMet: data.signupBonusMet ?? false, avatarUrl })
        });
      } else {
        await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.toLowerCase(), balance: 0, totalWagered: 0, signupBonusMet: false, avatarUrl })
        });
      }
    } catch (e) {}

    let wallets = null;
    try {
      const wres = await fetch(`${API_URL}/wallet/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.toLowerCase() })
      });
      const wdata = await wres.json();
      if (wdata.wallets) wallets = wdata.wallets;
    } catch (e) {}

    set({
      user: { name: username, avatar: avatarUrl },
      isAuthenticated: true,
      balance: userBalance,
      totalWagered: userWagered,
      wallets,
      showLoginModal: false,
      loginLoading: false
    });
  },

  logout: () => set({ user: null, isAuthenticated: false, balance: 0, totalWagered: 0, wallets: null }),

  // amount < 0 = bet placed, amount > 0 = winnings
  updateBalance: (amount, gameContext = 'Casino Game', details = '') => {
    set((state) => {
      const newBalance = state.balance + amount;
      const addedWager = amount < 0 ? Math.abs(amount) : 0;
      const newWagered = (state.totalWagered || 0) + addedWager;

      let newPnl = state.totalPnl;
      let newBets = state.betsPlaced;
      let newXp = state.xp || 0;
      let newLevel = state.level || 1;

      if (amount < 0) {
        newBets += 1;
        newXp += Math.floor(Math.abs(amount) / 10);
        newLevel = Math.floor(newXp / 1000) + 1;
      }
      if (newBets > 0) {
        newPnl = (state.totalPnl || 0) + amount;
      }

      if (state.user) {
        fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: state.user.name.toLowerCase(),
            balance: newBalance,
            totalWagered: newWagered,
            signupBonusMet: false,
          })
        }).catch(() => {});
      }
      return { balance: newBalance, totalWagered: newWagered, totalPnl: newPnl, betsPlaced: newBets, xp: newXp, level: newLevel };
    });
  },

  setBalance: (newBalance) => {
    set((state) => {
      if (state.user) {
        fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: state.user.name.toLowerCase(),
            balance: newBalance,
            totalWagered: state.totalWagered ?? 0,
            signupBonusMet: false,
          })
        }).catch(() => {});
      }
      return { balance: newBalance };
    });
  },

  logGameResult: (game, wager, payout, details = '') => {
    const state = get();
    if (state.user) {
      fetch(`${API_URL}/admin/log-bet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: state.user.name,
          game,
          amount: wager,
          potentialPayout: payout,
          details
        })
      }).catch(() => {});
    }
  },

  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  toggleChat: () => set((s) => ({ isChatOpen: !s.isChatOpen })),
}), {
  name: 'rovault-storage',
  partialize: (state) => ({ 
    user: state.user, 
    isAuthenticated: state.isAuthenticated, 
    balance: state.balance,
    wallets: state.wallets,
    robloxCookie: state.robloxCookie,
    totalPnl: state.totalPnl,
    betsPlaced: state.betsPlaced,
    xp: state.xp,
    level: state.level,
    totalWagered: state.totalWagered
  })
}));

/** Format points for display: 5000 → "5,000" */
export const formatPts = (val) => Math.floor(val).toLocaleString();
