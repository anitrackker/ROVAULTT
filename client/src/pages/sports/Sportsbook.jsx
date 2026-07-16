import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, ChevronLeft, TrendingUp, CheckCircle, MessageSquare, Star, Globe, Cpu, Trophy, LandPlot } from 'lucide-react';
import { useStore, formatPts } from '../../store/useStore';
import { MarketChart } from './MarketChart';
import './Sportsbook.css';

// Custom Vault Coin Icon
export const VaultIcon = ({ size = 16 }) => (
  <div style={{ 
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
    width: size, height: size, borderRadius: '50%', 
    background: 'linear-gradient(135deg, #fbbf24, #d97706)', 
    color: '#000', fontSize: size * 0.65, fontWeight: '900', 
    marginLeft: '4px', marginRight: '4px', verticalAlign: 'middle',
    fontFamily: 'system-ui, sans-serif'
  }}>
    V
  </div>
);

// Map categories to clean SVG icons
const getCategoryIcon = (tag) => {
  const lower = (tag || '').toLowerCase();
  if (lower.includes('politic') || lower.includes('election')) return <Globe size={14} />;
  if (lower.includes('crypto') || lower.includes('bitcoin')) return <Cpu size={14} />;
  if (lower.includes('sport') || lower.includes('soccer') || lower.includes('football') || lower.includes('nfl') || lower.includes('nba') || lower.includes('basketball') || lower.includes('ufc') || lower.includes('mma') || lower.includes('tennis')) return <Trophy size={14} />;
  return <LandPlot size={14} />;
};

const formatVolume = (vol) => {
  if (vol >= 1000000) return `$${(vol / 1000000).toFixed(1)}m`;
  if (vol >= 1000) return `$${(vol / 1000).toFixed(1)}k`;
  return `$${vol.toFixed(0)}`;
};

const ScoreFlipper = ({ score }) => {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={score}
        initial={{ y: 15, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -15, opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
        style={{ fontSize: '16px', fontWeight: 'bold', color: '#fbbf24', minWidth: '18px', textAlign: 'center', display: 'inline-block' }}
      >
        {score}
      </motion.span>
    </AnimatePresence>
  );
};

function getTeamRating(name) {
  if (!name) return 80;
  const ratings = {
    'Argentina': 92, 'France': 91, 'England': 90, 'Brazil': 90, 'Belgium': 88,
    'Portugal': 89, 'Netherlands': 88, 'Spain': 90, 'Italy': 88, 'Croatia': 86,
    'Germany': 88, 'Morocco': 85, 'Uruguay': 85, 'USA': 83, 'Mexico': 82,
    'Senegal': 83, 'Japan': 84, 'South Korea': 83, 'Denmark': 84, 'Switzerland': 84
  };
  
  const cleanName = name.trim();
  if (ratings[cleanName]) return ratings[cleanName];
  
  let hash = 0;
  for (let i = 0; i < cleanName.length; i++) {
    hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 70 + (Math.abs(hash) % 20); 
}

function calculateMarketProbs(homeScore, awayScore, clockMins, status, homeName = '', awayName = '') {
  if (status === 'post') {
    return {
      home: homeScore > awayScore ? 0.99 : 0.01,
      draw: homeScore === awayScore ? 0.99 : 0.01,
      away: awayScore > homeScore ? 0.99 : 0.01
    };
  }

  const isEngArg = (homeName.toLowerCase().includes('england') && awayName.toLowerCase().includes('argentina')) ||
                   (homeName.toLowerCase().includes('argentina') && awayName.toLowerCase().includes('england'));

  if (isEngArg && clockMins === 0 && homeScore === 0 && awayScore === 0) {
    return {
      home: homeName.toLowerCase().includes('england') ? 0.35 : 0.32,
      draw: 0.34,
      away: homeName.toLowerCase().includes('england') ? 0.32 : 0.35
    };
  }

  const t = Math.max(0, Math.min(clockMins / 90, 1));
  const remaining = 1 - t;
  const diff = homeScore - awayScore;

  const rHome = getTeamRating(homeName);
  const rAway = getTeamRating(awayName);
  const ratingDiff = rHome - rAway; 

  let baseHome = 0.38 + (ratingDiff * 0.015);
  let baseAway = 0.38 - (ratingDiff * 0.015);
  let baseDraw = 0.24;

  if (isEngArg) {
    if (homeName.toLowerCase().includes('england')) {
      baseHome = 0.35;
      baseDraw = 0.34;
      baseAway = 0.32;
    } else {
      baseHome = 0.32;
      baseDraw = 0.34;
      baseAway = 0.35;
    }
  } else {
    baseHome = Math.max(0.15, Math.min(0.65, baseHome));
    baseAway = Math.max(0.15, Math.min(0.65, baseAway));
    baseDraw = 1.0 - baseHome - baseAway;
  }

  let pHome = baseHome;
  let pAway = baseAway;
  let pDraw = baseDraw;

  if (diff > 0) {
    pHome = baseHome + ((1 - baseHome) * 0.6 * t) + (diff * 0.15 * remaining);
    pAway = Math.max(0.01, baseAway - (baseAway * 0.8 * t) - (diff * 0.1));
    pDraw = Math.max(0.01, baseDraw - (baseDraw * 0.5 * t));
  } else if (diff < 0) {
    pAway = baseAway + ((1 - baseAway) * 0.6 * t) + (Math.abs(diff) * 0.15 * remaining);
    pHome = Math.max(0.01, baseHome - (baseHome * 0.8 * t) - (Math.abs(diff) * 0.1));
    pDraw = Math.max(0.01, baseDraw - (baseDraw * 0.5 * t));
  } else {
    pDraw = baseDraw + ((0.95 - baseDraw) * t);
    pHome = (1 - pDraw) * (baseHome / (baseHome + baseAway));
    pAway = (1 - pDraw) * (baseAway / (baseHome + baseAway));
  }

  const total = pHome + pAway + pDraw;
  return {
    home: Math.max(0.01, Math.min(0.98, pHome / total)),
    draw: Math.max(0.01, Math.min(0.98, pDraw / total)),
    away: Math.max(0.01, Math.min(0.98, pAway / total))
  };
}

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://rovault.onrender.com/api';

export const Sportsbook = () => {
  const { user, balance, setBalance } = useStore();
  const [matches, setMatches] = useState([]);
  const [worldCupMatches, setWorldCupMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null); 
  const [activeMarketIdx, setActiveMarketIdx] = useState(0); 
  const [sharesAmount, setSharesAmount] = useState('10');
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState('worldcup');
  const [selectedMarketIdx, setSelectedMarketIdx] = useState(0);
  const [dbBets, setDbBets] = useState([]);
  const chartHistoryRef = useRef({});

  const fetchDbBets = useCallback(async () => {
    if (!user || !user.name) return;
    try {
      const res = await fetch(`${API_URL}/sports/bets/${encodeURIComponent(user.name)}`);
      const data = await res.json();
      if (data && data.bets) {
        setDbBets(data.bets);
      }
    } catch (e) {
      console.error("Failed to fetch DB bets:", e);
    }
  }, [user]);

  useEffect(() => {
    fetchDbBets();
    const interval = setInterval(fetchDbBets, 10000);
    return () => clearInterval(interval);
  }, [fetchDbBets]);

  const fetchMatches = useCallback(async () => {
    try {
      const [activeRes, closedRes, sportsActiveRes, sportsClosedRes, wcActiveRes, espnRes] = await Promise.all([
        fetch('https://gamma-api.polymarket.com/events?closed=false&limit=200'),
        fetch('https://gamma-api.polymarket.com/events?closed=true&limit=100'),
        fetch('https://gamma-api.polymarket.com/events?tag_id=1&closed=false&limit=100'),
        fetch('https://gamma-api.polymarket.com/events?tag_id=1&closed=true&limit=50'),
        fetch('https://gamma-api.polymarket.com/events?tag_id=102232&closed=false&limit=100'),
        fetch(`${API_URL}/sports/worldcup`).catch(() => null)
      ]);
      const activeData = await activeRes.json();
      const closedData = await closedRes.json();
      const sportsActiveData = await sportsActiveRes.json();
      const sportsClosedData = await sportsClosedRes.json();
      const wcActiveData = await wcActiveRes.json();
      const espnData = espnRes ? await espnRes.json() : null;

      const rawData = [
        ...(Array.isArray(activeData) ? activeData : []),
        ...(Array.isArray(closedData) ? closedData : []),
        ...(Array.isArray(sportsActiveData) ? sportsActiveData : []),
        ...(Array.isArray(sportsClosedData) ? sportsClosedData : []),
        ...(Array.isArray(wcActiveData) ? wcActiveData : [])
      ];

      const uniqueMap = new Map();
      rawData.forEach(item => {
        if (item && item.id) {
          uniqueMap.set(item.id, item);
        }
      });
      const data = Array.from(uniqueMap.values());
      
      let parsedWc = [];
      if (espnData && espnData.events) {
        parsedWc = espnData.events.map(ev => {
          const comp = ev.competitions[0];
          const homeTeam = comp.competitors.find(c => c.homeAway === 'home');
          const awayTeam = comp.competitors.find(c => c.homeAway === 'away');
          if (!homeTeam || !awayTeam) return null;
          
          let clockMins = 0;
          if (comp.status.type.state === 'in') {
            clockMins = Math.floor(comp.status.clock / 60);
          } else if (comp.status.type.state === 'post') {
            clockMins = 90;
          }

          const homeScore = parseInt(homeTeam.score) || 0;
          const awayScore = parseInt(awayTeam.score) || 0;
          
          const pmEvent = data.find(item => {
            const titleLower = (item.title || '').toLowerCase();
            const slugLower = (item.slug || '').toLowerCase();
            const homeLower = homeTeam.team.name.toLowerCase();
            const awayLower = awayTeam.team.name.toLowerCase();
            const homeAbbr = (homeTeam.team.abbreviation || '').toLowerCase();
            const awayAbbr = (awayTeam.team.abbreviation || '').toLowerCase();

            if (titleLower.includes(homeLower) && titleLower.includes(awayLower)) return true;
            if (homeAbbr && awayAbbr && slugLower.includes(homeAbbr) && slugLower.includes(awayAbbr)) return true;
            
            const homeParts = homeLower.split(' ').filter(p => p.length > 3);
            const awayParts = awayLower.split(' ').filter(p => p.length > 3);
            if (homeParts.length > 0 && awayParts.length > 0) {
              const homeMatch = homeParts.every(p => titleLower.includes(p));
              const awayMatch = awayParts.every(p => titleLower.includes(p));
              if (homeMatch && awayMatch) return true;
            }
            return false;
          });

          let homePrice = null;
          let drawPrice = null;
          let awayPrice = null;

          if (pmEvent && pmEvent.markets && pmEvent.markets.length >= 2) {
            const homeMarket = pmEvent.markets.find(m => {
              const q = (m.question || '').toLowerCase();
              const title = (m.groupItemTitle || '').toLowerCase();
              return q.includes(homeTeam.team.name.toLowerCase()) || title === homeTeam.team.name.toLowerCase();
            });
            const awayMarket = pmEvent.markets.find(m => {
              const q = (m.question || '').toLowerCase();
              const title = (m.groupItemTitle || '').toLowerCase();
              return q.includes(awayTeam.team.name.toLowerCase()) || title === awayTeam.team.name.toLowerCase();
            });
            const drawMarket = pmEvent.markets.find(m => {
              const q = (m.question || '').toLowerCase();
              const title = (m.groupItemTitle || '').toLowerCase();
              return q.includes('draw') || title === 'draw';
            });

            if (homeMarket && homeMarket.outcomePrices) {
              try {
                const prices = JSON.parse(homeMarket.outcomePrices);
                homePrice = parseFloat(prices[0]) || null;
              } catch(e){}
            }
            if (awayMarket && awayMarket.outcomePrices) {
              try {
                const prices = JSON.parse(awayMarket.outcomePrices);
                awayPrice = parseFloat(prices[0]) || null;
              } catch(e){}
            }
            if (drawMarket && drawMarket.outcomePrices) {
              try {
                const prices = JSON.parse(drawMarket.outcomePrices);
                drawPrice = parseFloat(prices[0]) || null;
              } catch(e){}
            }
          }

          if (homePrice === null || awayPrice === null || drawPrice === null) {
            const probs = calculateMarketProbs(homeScore, awayScore, clockMins, comp.status.type.state, homeTeam.team.name, awayTeam.team.name);
            homePrice = probs.home;
            drawPrice = probs.draw;
            awayPrice = probs.away;
          }

          const homeName = homeTeam.team.name;
          const awayName = awayTeam.team.name;

          const outcomes = [
            { 
              name: homeName, 
              price: homePrice,
              marketId: (pmEvent && pmEvent.markets && pmEvent.markets.find(m => {
                const q = (m.question || '').toLowerCase();
                const title = (m.groupItemTitle || '').toLowerCase();
                return q.includes(homeName.toLowerCase()) || title === homeName.toLowerCase();
              }) || { id: `wc-m-home-${ev.id}` }).id
            },
            { 
              name: "Draw", 
              price: drawPrice,
              marketId: (pmEvent && pmEvent.markets && pmEvent.markets.find(m => {
                const q = (m.question || '').toLowerCase();
                const title = (m.groupItemTitle || '').toLowerCase();
                return q.includes('draw') || title === 'draw';
              }) || { id: `wc-m-draw-${ev.id}` }).id
            },
            { 
              name: awayName, 
              price: awayPrice,
              marketId: (pmEvent && pmEvent.markets && pmEvent.markets.find(m => {
                const q = (m.question || '').toLowerCase();
                const title = (m.groupItemTitle || '').toLowerCase();
                return q.includes(awayName.toLowerCase()) || title === awayName.toLowerCase();
              }) || { id: `wc-m-away-${ev.id}` }).id
            }
          ];

          // Build player rosters from ESPN lineup data (or use known defaults)
          const homeRoster = (comp.competitors?.find(c => c.homeAway === 'home')?.roster || []).map(p => p.athlete?.displayName).filter(Boolean);
          const awayRoster = (comp.competitors?.find(c => c.homeAway === 'away')?.roster || []).map(p => p.athlete?.displayName).filter(Boolean);
          
          // Known player data per team (fallback if ESPN doesn't provide roster)
          const knownPlayers = {
            'Argentina': [
              { name: 'Emiliano Martínez', goals1: 0.01, goals2: 0.001, sot: 0.01 },
              { name: 'Nahuel Molina', goals1: 0.05, goals2: 0.01, sot: 0.08 },
              { name: 'Cristian Romero', goals1: 0.06, goals2: 0.01, sot: 0.10 },
              { name: 'Nicolás Otamendi', goals1: 0.07, goals2: 0.01, sot: 0.12 },
              { name: 'Nicolás Tagliafico', goals1: 0.04, goals2: 0.01, sot: 0.06 },
              { name: 'Enzo Fernández', goals1: 0.12, goals2: 0.03, sot: 0.25 },
              { name: 'Rodrigo De Paul', goals1: 0.08, goals2: 0.02, sot: 0.20 },
              { name: 'Alexis Mac Allister', goals1: 0.15, goals2: 0.04, sot: 0.28 },
              { name: 'Lionel Messi', goals1: 0.42, goals2: 0.15, sot: 0.55 },
              { name: 'Julián Álvarez', goals1: 0.35, goals2: 0.12, sot: 0.42 },
              { name: 'Ángel Di María', goals1: 0.22, goals2: 0.07, sot: 0.32 },
            ],
            'England': [
              { name: 'Jordan Pickford', goals1: 0.01, goals2: 0.001, sot: 0.01 },
              { name: 'Kyle Walker', goals1: 0.03, goals2: 0.01, sot: 0.05 },
              { name: 'John Stones', goals1: 0.06, goals2: 0.01, sot: 0.10 },
              { name: 'Harry Maguire', goals1: 0.08, goals2: 0.01, sot: 0.15 },
              { name: 'Luke Shaw', goals1: 0.05, goals2: 0.01, sot: 0.08 },
              { name: 'Declan Rice', goals1: 0.08, goals2: 0.02, sot: 0.18 },
              { name: 'Jude Bellingham', goals1: 0.28, goals2: 0.08, sot: 0.35 },
              { name: 'Phil Foden', goals1: 0.22, goals2: 0.06, sot: 0.30 },
              { name: 'Bukayo Saka', goals1: 0.25, goals2: 0.07, sot: 0.33 },
              { name: 'Cole Palmer', goals1: 0.20, goals2: 0.05, sot: 0.28 },
              { name: 'Harry Kane', goals1: 0.38, goals2: 0.12, sot: 0.48 },
            ]
          };

          // Default fallback players for unknown teams
          const defaultPlayers = [
            { name: 'Player 1', goals1: 0.30, goals2: 0.10, sot: 0.40 },
            { name: 'Player 2', goals1: 0.25, goals2: 0.08, sot: 0.35 },
            { name: 'Player 3', goals1: 0.20, goals2: 0.06, sot: 0.30 },
          ];

          const homePlayers = knownPlayers[homeName] || defaultPlayers;
          const awayPlayers = knownPlayers[awayName] || defaultPlayers;

          // Build per-player outcomes (combined goals and SOT)
          const homePlayerOutcomes = homePlayers.map(p => {
            const props = [
              { name: `${p.name} 1+ G`, price: p.goals1, marketId: `wc-prop-${p.name.replace(/\s/g,'-')}-1g-${ev.id}` },
              { name: `${p.name} 2+ G`, price: p.goals2, marketId: `wc-prop-${p.name.replace(/\s/g,'-')}-2g-${ev.id}` }
            ];
            if (p.sot > 0.05) props.push({ name: `${p.name} 2+ SOT`, price: p.sot, marketId: `wc-sot-${p.name.replace(/\s/g,'-')}-${ev.id}` });
            return props;
          }).flat();

          const awayPlayerOutcomes = awayPlayers.map(p => {
            const props = [
              { name: `${p.name} 1+ G`, price: p.goals1, marketId: `wc-prop-${p.name.replace(/\s/g,'-')}-1g-${ev.id}` },
              { name: `${p.name} 2+ G`, price: p.goals2, marketId: `wc-prop-${p.name.replace(/\s/g,'-')}-2g-${ev.id}` }
            ];
            if (p.sot > 0.05) props.push({ name: `${p.name} 2+ SOT`, price: p.sot, marketId: `wc-sot-${p.name.replace(/\s/g,'-')}-${ev.id}` });
            return props;
          }).flat();

          const subMarkets = [
            {
              id: `wc-m-ml-${ev.id}`,
              question: "Match Winner",
              outcomes: outcomes
            },
            {
              id: `wc-m-advance-${ev.id}`,
              question: "To Advance",
              outcomes: [
                { name: `${homeName}`, price: Math.max(0.1, Math.min(0.9, homePrice + drawPrice * 0.5)), marketId: `wc-adv-h-${ev.id}` },
                { name: `${awayName}`, price: Math.max(0.1, Math.min(0.9, awayPrice + drawPrice * 0.5)), marketId: `wc-adv-a-${ev.id}` }
              ]
            },
            {
              id: `wc-m-btts-${ev.id}`,
              question: "Both Teams Score",
              outcomes: [
                { name: "Yes", price: 0.52, marketId: `wc-btts-y-${ev.id}` },
                { name: "No", price: 0.48, marketId: `wc-btts-n-${ev.id}` }
              ]
            },
            {
              id: `wc-m-hplayers-${ev.id}`,
              question: `${homeName} Players`,
              outcomes: homePlayerOutcomes
            },
            {
              id: `wc-m-aplayers-${ev.id}`,
              question: `${awayName} Players`,
              outcomes: awayPlayerOutcomes
            },
            {
              id: `wc-m-exact-${ev.id}`,
              question: "Exact Score",
              outcomes: [
                { name: "Draw 2-2", price: 0.08, marketId: `wc-score-22-${ev.id}` },
                { name: `${homeName} 2-1`, price: 0.12, marketId: `wc-score-h21-${ev.id}` },
                { name: `${awayName} 2-1`, price: 0.11, marketId: `wc-score-a21-${ev.id}` },
                { name: `${homeName} 1-0`, price: 0.09, marketId: `wc-score-h10-${ev.id}` },
                { name: `${awayName} 1-0`, price: 0.08, marketId: `wc-score-a10-${ev.id}` },
                { name: "Draw 1-1", price: 0.11, marketId: `wc-score-11-${ev.id}` }
              ]
            },
            {
              id: `wc-m-corners-${ev.id}`,
              question: "Corners",
              outcomes: [
                { name: "Over 9.5", price: 0.50, marketId: `wc-corn-over-${ev.id}` },
                { name: "Under 9.5", price: 0.50, marketId: `wc-corn-under-${ev.id}` }
              ]
            },
            {
              id: `wc-m-combos-${ev.id}`,
              question: "Combos",
              outcomes: [
                { name: "Albiceleste ascendant", price: 0.075, marketId: `wc-combo-albi-${ev.id}`, isCombo: true, multiplier: 13.3, desc: "ARG advance + Messi 2G + BTTS" },
                { name: "Three lions' fortress", price: 0.10, marketId: `wc-combo-lions-${ev.id}`, isCombo: true, multiplier: 10.0, desc: "ENG advance + Kane 1G + ENG 1H" },
                { name: "98 rewind", price: 0.072, marketId: `wc-combo-rewind-${ev.id}`, isCombo: true, multiplier: 13.9, desc: "Draw 2-2 + ARG advance + Pens" },
                { name: "Golden boot trident", price: 0.057, marketId: `wc-combo-trident-${ev.id}`, isCombo: true, multiplier: 17.6, desc: "Kane + Bellingham + Messi 1G" },
                { name: "Kane's corner office", price: 0.083, marketId: `wc-combo-kaneoffice-${ev.id}`, isCombo: true, multiplier: 12.0, desc: "ENG win + Kane 1G + 9.5+ corners" }
              ]
            }
          ];

          return {
            id: `wc-${ev.id}`,
            isWorldCup: true,
            name: ev.name,
            shortName: ev.shortName || ev.name,
            status: comp.status.type.state === 'post' ? 'post' : comp.status.type.state === 'in' ? 'in' : 'pre',
            volume: pmEvent ? parseFloat(pmEvent.volumeNum || pmEvent.volume || 0) : (520000 + (parseInt(ev.id || '0') % 1000) * 1450),
            image: homeTeam.team.logo || 'https://polymarket.com/images/default.png',
            awayLogo: awayTeam.team.logo || 'https://polymarket.com/images/default.png',
            tag: "World Cup",
            endDate: ev.date,
            clock: comp.status.displayClock || "0'",
            homeScore,
            awayScore,
            markets: subMarkets
          };
        }).filter(Boolean);
        
        parsedWc.sort((a, b) => {
          const statusOrder = { 'in': 0, 'pre': 1, 'post': 2 };
          const orderA = statusOrder[a.status] ?? 1;
          const orderB = statusOrder[b.status] ?? 1;
          if (orderA !== orderB) return orderA - orderB;
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        });
        setWorldCupMatches(parsedWc);
      }

      let parsed = [];
      if (data && data.length > 0) {
        parsed = data.map(ev => {
          if (!ev.markets || ev.markets.length === 0) return null;
          
          const parsedMarkets = ev.markets.map(m => {
            let outcomes = [];
            let outcomePrices = [];
            try {
              outcomes = JSON.parse(m.outcomes);
              outcomePrices = JSON.parse(m.outcomePrices);
            } catch(e) { return null; }

            if (!outcomes || outcomes.length < 2) return null;

            return {
              id: m.id,
              question: m.question,
              outcomes: outcomes.map((name, idx) => ({
                name,
                price: parseFloat(outcomePrices[idx] || 0)
              })).filter(o => o.price > 0 && o.price < 1)
            };
          }).filter(Boolean);

          if (parsedMarkets.length === 0) return null;

          // Identify specific sports/topics by matching tag labels
          let tag = "General";
          if (ev.tags && ev.tags.length > 0) {
            const labels = ev.tags.map(t => t.label.toLowerCase());
            if (labels.includes('soccer') || labels.includes('fifa world cup') || labels.includes('world cup')) tag = "Soccer";
            else if (labels.includes('football') || labels.includes('nfl')) tag = "Football";
            else if (labels.includes('basketball') || labels.includes('nba')) tag = "Basketball";
            else if (labels.includes('ufc') || labels.includes('mma')) tag = "UFC";
            else if (labels.includes('tennis')) tag = "Tennis";
            else if (labels.includes('politics') || labels.includes('election')) tag = "Politics";
            else if (labels.includes('crypto')) tag = "Crypto";
            else tag = ev.tags[0].label;
          }
          
          return {
            id: ev.id,
            name: ev.title,
            status: ev.markets.some(m => m.closed) ? 'post' : 'in',
            volume: parseFloat(ev.volumeNum || 0),
            image: ev.image || 'https://polymarket.com/images/default.png',
            tag: tag,
            endDate: ev.endDateIso || ev.createdAt,
            markets: parsedMarkets
          };
        }).filter(Boolean);
        
        parsed.sort((a, b) => b.volume - a.volume);
        setMatches(parsed);
      }

      setSelectedMatch(prev => {
        if (!prev) return null;
        const allMatches = [...parsed, ...parsedWc];
        const updated = allMatches.find(m => m.id === prev.id);
        return updated || prev;
      });
    } catch (e) {
      console.error("Failed to fetch Polymarket data:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, 15000);
    return () => clearInterval(interval);
  }, [fetchMatches]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handlePlaceBet = async () => {
    if (!user) return showToast("Please login first");
    const shares = parseInt(sharesAmount);
    if (isNaN(shares) || shares <= 0) return showToast("Invalid amount");
    
    const activeMarket = selectedMatch.markets[selectedMarketIdx];
    if (!activeMarket || !activeMarket.outcomes[activeMarketIdx]) return showToast("Invalid market");
    
    const activeOutcome = activeMarket.outcomes[activeMarketIdx];
    const pricePerShare = activeOutcome.price * 100;
    const totalCost = Number((shares * pricePerShare).toFixed(2));

    if (totalCost > balance) return showToast("Insufficient Vaults balance");
    if (selectedMatch.status === 'post') return showToast("Market closed");

    try {
      const res = await fetch(`${API_URL}/sports/bets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.name,
          matchId: selectedMatch.id,
          marketId: activeOutcome.marketId || activeMarket.id,
          type: activeOutcome.name,
          amount: totalCost,
          sharesPurchased: shares,
          initialOdds: activeOutcome.price,
          question: activeMarket.question,
          category: selectedMatch.tag || 'World Cup',
          outcome: activeOutcome.name,
          isCombo: !!activeOutcome.isCombo,
          multiplier: activeOutcome.multiplier || 1
        })
      });
      const data = await res.json();
      if (data.error) {
        showToast(data.error);
      } else {
        setBalance(data.newBalance);
        showToast(`Bought ${shares} shares of ${activeOutcome.name}!`);
        fetchDbBets();
      }
    } catch(e) {
      showToast("Order placement failed");
    }
  };

  const handleCashout = async (bet) => {
    const match = matches.concat(worldCupMatches).find(m => m.id === bet.matchId);
    if (!match) return showToast("Market data unavailable");

    const market = match.markets.find(m => m.id === bet.marketId);
    let currentPrice = bet.initialOdds;
    if (market) {
      const outcome = market.outcomes.find(o => o.name === bet.type);
      if (outcome) currentPrice = outcome.price;
    }
    const currentSharePrice = currentPrice * 100;
    const cashoutValue = Number(((bet.sharesPurchased * currentSharePrice) * 0.99).toFixed(2)); // 1% fee

    try {
      const res = await fetch(`${API_URL}/sports/bets/cashout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          betId: bet.id,
          cashoutAmount: cashoutValue
        })
      });
      const data = await res.json();
      if (data.error) {
        showToast(data.error);
      } else {
        setBalance(data.newBalance);
        showToast(`Sold position for ${formatPts(cashoutValue)} V`);
        fetchDbBets();
      }
    } catch(e) {
      showToast("Sell order failed");
    }
  };

  const chartData = useMemo(() => {
    if (!selectedMatch) return [];
    const activeMarket = selectedMatch.markets[selectedMarketIdx];
    if (!activeMarket) return [];
    
    const currentPrices = activeMarket.outcomes.map(o => Number((o.price * 100).toFixed(2)));
    const key = `${selectedMatch.id}-${selectedMarketIdx}`;
    
    if (!chartHistoryRef.current[key]) {
      const data = [];
      const numPoints = 80; // Much longer history so it's not vertically squished
      
      let prices = currentPrices.map(curr => {
        // If it's a blowout (99% or 1%), simulate a "comeback" or "choke" by starting the odds inversed!
        if (curr >= 85) return 20 + Math.random() * 15; // Winner started as underdog
        if (curr <= 15) return 50 + Math.random() * 20; // Loser started as favorite
        return (100 / currentPrices.length) + (Math.random() - 0.5) * 15;
      });
      
      let sum = prices.reduce((a, b) => a + b, 0);
      prices = prices.map(p => Number(((p / sum) * 100).toFixed(2)));

      for (let i = 0; i < numPoints; i++) {
        data.push({ time: i, prices: [...prices] });
        
        const progress = i / numPoints;
        // Exponentially pull towards the real current prices as time goes on
        const pullFactor = 0.01 + (Math.pow(progress, 3) * 0.25);
        
        prices = prices.map((p, idx) => {
          const move = (currentPrices[idx] - p) * pullFactor + (Math.random() - 0.5) * 6;
          return Math.max(0.5, Math.min(99.5, p + move));
        });
        const stepSum = prices.reduce((a, b) => a + b, 0);
        prices = prices.map(p => Number(((p / stepSum) * 100).toFixed(2)));
      }
      data.push({ time: numPoints, prices: currentPrices });
      chartHistoryRef.current[key] = data;
    } else {
      const history = [...chartHistoryRef.current[key]];
      const lastPoint = history[history.length - 1];
      const changed = currentPrices.some((p, idx) => lastPoint.prices?.[idx] !== p);
      if (changed) {
        history.push({ time: lastPoint.time + 1, prices: currentPrices });
        if (history.length > 80) history.shift();
        chartHistoryRef.current[key] = history;
      }
    }
    return chartHistoryRef.current[key];
  }, [selectedMatch, selectedMarketIdx]);

  const displayedMatches = useMemo(() => {
    if (activeTab === 'worldcup') {
      return worldCupMatches;
    }
    
    let filtered = matches;
    if (activeTab === 'resolved') {
      filtered = matches.filter(m => m.status === 'post');
    } else {
      filtered = matches.filter(m => m.status !== 'post');
      
      if (activeTab === 'sports') {
        filtered = filtered.filter(m => /sport|soccer|football|nba|nfl|tennis|ufc|mma|basketball/i.test(m.tag));
      } else if (activeTab === 'politics') {
        filtered = filtered.filter(m => /politic|election|president/i.test(m.tag));
      } else if (activeTab === 'crypto') {
        filtered = filtered.filter(m => /crypto|bitcoin|ethereum|defi/i.test(m.tag));
      }
    }
    return filtered;
  }, [matches, worldCupMatches, activeTab]);

  return (
    <div className="sportsbook-container">
      {toast && (
        <motion.div className="sports-toast" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <CheckCircle size={16} /> {toast}
        </motion.div>
      )}

      {!selectedMatch ? (
        <>
          <div className="sports-header">
            <div className="sports-title">
              <BarChart2 size={32} color="#fbbf24" className="sports-icon" />
              <div>
                <h1>Prediction Markets</h1>
                <p>Trade Global Events Live on the Orderbook</p>
              </div>
            </div>
          </div>

          <div className="sports-tabs">
            <button className={`sports-tab worldcup-tab ${activeTab === 'worldcup' ? 'active' : ''}`} onClick={() => setActiveTab('worldcup')}>🏆 World Cup</button>
            <button className={`sports-tab ${activeTab === 'top' ? 'active' : ''}`} onClick={() => setActiveTab('top')}>Top Markets</button>
            <button className={`sports-tab ${activeTab === 'sports' ? 'active' : ''}`} onClick={() => setActiveTab('sports')}>Sports & Soccer</button>
            <button className={`sports-tab ${activeTab === 'politics' ? 'active' : ''}`} onClick={() => setActiveTab('politics')}>Politics</button>
            <button className={`sports-tab ${activeTab === 'crypto' ? 'active' : ''}`} onClick={() => setActiveTab('crypto')}>Crypto</button>
            <button className={`sports-tab ${activeTab === 'resolved' ? 'active' : ''}`} onClick={() => setActiveTab('resolved')}>Resolved</button>
          </div>

          {loading ? (
            <div className="sports-loading">Syncing Gamma API order books...</div>
          ) : displayedMatches.length === 0 ? (
            <div className="sports-loading">No markets found.</div>
          ) : (
            <div className="markets-grid">
              {displayedMatches.map(match => {
                const isMultiChoice = match.markets.length > 1;
                
                if (match.isWorldCup) {
                  return (
                    <div key={match.id} className="poly-market-card worldcup-card" onClick={() => { setSelectedMatch(match); setSelectedMarketIdx(0); setActiveMarketIdx(0); }}>
                      <div className="poly-card-top">
                        <span className="poly-tag wc-tag"><Trophy size={12} /> {match.tag}</span>
                        {match.status === 'in' ? (
                          <span className="live-pill" style={{ background: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1s infinite' }} /> LIVE {match.clock}
                          </span>
                        ) : match.status === 'post' ? (
                          <span className="live-pill" style={{ background: '#3b82f6', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>FULL TIME</span>
                        ) : (
                          <span className="live-pill" style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>UPCOMING</span>
                        )}
                      </div>
                      
                      <div className="poly-card-body wc-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                        <div className="wc-match-teams" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', width: '100%' }}>
                          <div className="wc-team" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <img src={match.image} alt="" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                            <span style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{match.markets[0].outcomes[0].name}</span>
                          </div>
                          {match.status !== 'pre' && <ScoreFlipper score={match.homeScore} />}
                        </div>

                        <div className="wc-match-teams" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', width: '100%' }}>
                          <div className="wc-team" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                            <img src={match.awayLogo} alt="" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                            <span style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{match.markets[0].outcomes[2].name}</span>
                          </div>
                          {match.status !== 'pre' && <ScoreFlipper score={match.awayScore} />}
                        </div>
                      </div>

                      <div className="poly-outcomes" style={{ marginTop: 'auto', paddingTop: '10px' }}>
                        {match.markets[0].outcomes.map((outcome, idx) => (
                          <button key={idx} className="poly-outcome-btn" style={{ padding: '6px 4px', fontSize: '11px' }} onClick={(e) => { e.stopPropagation(); setSelectedMatch(match); setSelectedMarketIdx(0); setActiveMarketIdx(idx); }}>
                            <span className="po-name" style={{ maxWidth: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{outcome.name}</span>
                            <span className="po-price">{(outcome.price * 100).toFixed(0)}¢</span>
                          </button>
                        ))}
                      </div>

                      <div className="poly-card-footer" style={{ marginTop: '8px' }}>
                        <div className="poly-footer-left">
                          <MessageSquare size={14} /> <span>Discuss</span>
                        </div>
                        <Star size={14} className="poly-star" />
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={match.id} className="poly-market-card" onClick={() => { setSelectedMatch(match); setSelectedMarketIdx(0); setActiveMarketIdx(0); }}>
                    <div className="poly-card-top">
                      <span className="poly-tag">{getCategoryIcon(match.tag)} {match.tag}</span>
                      <span className="poly-vol">{formatVolume(match.volume)} Vol</span>
                    </div>
                    
                    <div className="poly-card-body">
                      <img src={match.image} alt="" className="poly-image" onError={(e) => { e.target.style.display='none' }} />
                      <h3 className="poly-title">{match.name}</h3>
                    </div>

                    {!isMultiChoice ? (
                      <div className="poly-outcomes">
                        {match.markets[0].outcomes.slice(0, 2).map((outcome, idx) => (
                          <button key={idx} className="poly-outcome-btn" onClick={(e) => { e.stopPropagation(); setSelectedMatch(match); setSelectedMarketIdx(0); setActiveMarketIdx(idx); }}>
                            <span className="po-name">{outcome.name}</span>
                            <span className="po-price">{(outcome.price * 100).toFixed(0)}¢</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="poly-multi-outcomes" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto' }}>
                        {match.markets.slice(0, 3).map((m, mIdx) => {
                          const yesOutcome = m.outcomes.find(o => o.name.toLowerCase() === 'yes') || m.outcomes[0];
                          const yesPrice = yesOutcome ? (yesOutcome.price * 100).toFixed(0) : '0';
                          return (
                            <div key={m.id} className="poly-multi-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                              <span className="pm-question" style={{ color: '#8b9cc7', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>{m.question}</span>
                              <span className="pm-prob" style={{ color: '#fbbf24', fontWeight: 'bold' }}>{yesPrice}%</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="poly-card-footer">
                      <div className="poly-footer-left">
                        <MessageSquare size={14} /> <span>Discuss</span>
                      </div>
                      <Star size={14} className="poly-star" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        /* TRADING TERMINAL VIEW */
        <motion.div className="trading-terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button className="back-btn" onClick={() => setSelectedMatch(null)}>
            <ChevronLeft size={20} /> Back to Markets
          </button>

          {selectedMatch.isWorldCup ? (
            <div className="terminal-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)', padding: '24px 32px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={selectedMatch.image} alt="" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                  <h2 style={{ fontSize: '22px', margin: 0, color: 'white' }}>{selectedMatch.markets[0].outcomes[0].name}</h2>
                </div>
                <span style={{ fontSize: '20px', fontWeight: '900', color: '#a855f7' }}>VS</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h2 style={{ fontSize: '22px', margin: 0, color: 'white' }}>{selectedMatch.markets[0].outcomes[2].name}</h2>
                  <img src={selectedMatch.awayLogo} alt="" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                {selectedMatch.status === 'in' ? (
                  <span className="live-badge" style={{ background: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}>
                    LIVE {selectedMatch.clock} • {selectedMatch.homeScore} - {selectedMatch.awayScore}
                  </span>
                ) : selectedMatch.status === 'post' ? (
                  <span className="live-badge" style={{ background: '#3b82f6', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}>
                    FULL TIME • {selectedMatch.homeScore} - {selectedMatch.awayScore}
                  </span>
                ) : (
                  <span className="live-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}>
                    UPCOMING • Starts {new Date(selectedMatch.endDate).toLocaleDateString()}
                  </span>
                )}
                <span style={{ color: '#8b9cc7', fontSize: '12px' }}>{formatVolume(selectedMatch.volume)} Vol</span>
              </div>
            </div>
          ) : (
            <div className="terminal-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
              <img src={selectedMatch.image} alt="" style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }} />
              <div>
                <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', color: 'white' }}>{selectedMatch.name}</h2>
                <div style={{ display: 'flex', gap: '16px', color: '#8b9cc7', fontSize: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>{getCategoryIcon(selectedMatch.tag)} {selectedMatch.tag}</span>
                  <span>{formatVolume(selectedMatch.volume)} Vol</span>
                  <span>Resolves: {new Date(selectedMatch.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="terminal-layout">
            <div className="terminal-chart-area">
              {selectedMatch.markets.length > 1 && (
                <div className="sub-market-selector" style={{ 
                  marginBottom: '16px', display: 'flex', gap: '6px', 
                  overflowX: 'auto', overflowY: 'hidden', paddingBottom: '8px',
                  scrollbarWidth: 'thin', scrollbarColor: 'rgba(168,85,247,0.3) transparent'
                }}>
                  {selectedMatch.markets.map((m, idx) => (
                    <button 
                      key={m.id} 
                      className={`sports-tab ${selectedMarketIdx === idx ? 'active' : ''}`}
                      onClick={() => { setSelectedMarketIdx(idx); setActiveMarketIdx(0); }}
                      style={{ fontSize: '11px', padding: '5px 10px', whiteSpace: 'nowrap', flexShrink: 0 }}
                    >
                      {m.question}
                    </button>
                  ))}
                </div>
              )}

              { (() => {
                const activeMarketObj = selectedMatch.markets[selectedMarketIdx];
                const activeMarketId = activeMarketObj.id;
                const isPlayerProp = activeMarketId.includes('players');
                
                if (isPlayerProp) {
                  const activeOutcome = activeMarketObj.outcomes[activeMarketIdx];
                  const activePlayerName = activeOutcome ? activeOutcome.name.replace(' 1+ G', '').replace(' 2+ G', '').replace(' 2+ SOT', '') : null;
                  
                  // Extract unique players
                  const uniquePlayers = Array.from(new Set(activeMarketObj.outcomes.map(o => o.name.replace(' 1+ G', '').replace(' 2+ G', '').replace(' 2+ SOT', ''))));

                  return (
                    <div className="turf-ui-container">
                      <div className="turf-pitch">
                        <div className="turf-lines"></div>
                        <div className="turf-players-grid">
                          {uniquePlayers.map((playerName, idx) => {
                            const isSelected = playerName === activePlayerName;
                            return (
                              <button key={idx} className={`turf-player-btn ${isSelected ? 'active' : ''}`} 
                                onClick={() => {
                                  const firstIdx = activeMarketObj.outcomes.findIndex(o => o.name.includes(playerName));
                                  if (firstIdx !== -1) setActiveMarketIdx(firstIdx);
                                }}>
                                <div className="player-info">
                                  <div className="player-name">{playerName}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Secondary selector for chosen player */}
                      {activePlayerName && (
                        <div className="player-props-selector" style={{ padding: '16px', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          <h4 style={{ margin: '0 0 12px 0', color: '#fff', fontSize: '14px' }}>{activePlayerName} Props</h4>
                          <div className="market-selector" style={{ marginBottom: 0, maxHeight: 'none' }}>
                            {activeMarketObj.outcomes.map((outcome, idx) => {
                              if (!outcome.name.includes(activePlayerName)) return null;
                              const propType = outcome.name.replace(activePlayerName + ' ', '');
                              return (
                                <button key={idx} className={activeMarketIdx === idx ? 'active' : ''} onClick={() => setActiveMarketIdx(idx)}>
                                  {propType} <span className="prob-pill">{(outcome.price * 100).toFixed(0)}%</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div className="market-selector">
                    {selectedMatch.markets[selectedMarketIdx].outcomes.map((outcome, idx) => (
                      <button key={idx} className={activeMarketIdx === idx ? 'active' : ''} onClick={() => setActiveMarketIdx(idx)}
                        title={outcome.desc || outcome.name}
                      >
                        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px', minWidth: 0 }}>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>{outcome.name}</span>
                          {outcome.desc && <span style={{ fontSize: '10px', color: '#6b7a9e', fontWeight: 400 }}>{outcome.desc}</span>}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                          {outcome.multiplier && <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>{outcome.multiplier}x</span>}
                          <span className="prob-pill">{(outcome.price * 100).toFixed(0)}%</span>
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })()}
              
              <div className="chart-wrapper">
                {(() => {
                  const activeMarketObj = selectedMatch.markets[selectedMarketIdx];
                  let chartOutcomes = activeMarketObj.outcomes;
                  let chartActiveIdx = activeMarketIdx;

                  if (activeMarketObj.id.includes('players')) {
                    const activeOutcome = activeMarketObj.outcomes[activeMarketIdx];
                    const activePlayerName = activeOutcome ? activeOutcome.name.replace(' 1+ G', '').replace(' 2+ G', '').replace(' 2+ SOT', '') : null;
                    
                    if (activePlayerName) {
                      chartOutcomes = activeMarketObj.outcomes.map((o, i) => ({ ...o, originalIdx: i })).filter(o => o.name.includes(activePlayerName));
                      chartActiveIdx = chartOutcomes.findIndex(o => o.originalIdx === activeMarketIdx);
                    }
                  }

                  return (
                    <MarketChart 
                      data={chartData} 
                      outcomes={chartOutcomes} 
                      activeIdx={chartActiveIdx !== -1 ? chartActiveIdx : 0} 
                    />
                  );
                })()}
              </div>
            </div>

            <div className="terminal-order-book">
              <div className="sports-panel betslip-panel">
                <h3>Order Entry</h3>
                {selectedMatch.status !== 'post' && selectedMatch.markets[selectedMarketIdx].outcomes[activeMarketIdx] ? (
                  <>
                    <div className="order-type">Buy "{selectedMatch.markets[selectedMarketIdx].outcomes[activeMarketIdx].name}" Shares</div>
                    <div className="order-target" style={{ fontSize: '12px', color: '#8b9cc7', margin: '4px 0 12px 0' }}>{selectedMatch.markets[selectedMarketIdx].question}</div>

                    <div className="order-price-display">
                      <span className="op-label">Avg Price</span>
                      <span className="op-val">{(selectedMatch.markets[selectedMarketIdx].outcomes[activeMarketIdx].price * 100).toFixed(0)} <VaultIcon /></span>
                    </div>
                    
                    <div className="bet-input-group">
                      <input 
                        type="number" 
                        value={sharesAmount} 
                        onChange={e => setSharesAmount(e.target.value)} 
                        placeholder="Shares"
                      />
                      <div className="bet-pts">Shares</div>
                    </div>
                    
                    <div className="bet-payout">
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>Total Cost</span>
                      </div>
                      <span className="payout-val" style={{ color: 'white' }}>
                        <VaultIcon /> {formatPts((parseInt(sharesAmount) || 0) * (selectedMatch.markets[selectedMarketIdx].outcomes[activeMarketIdx].price * 100))}
                      </span>
                    </div>

                    <div className="bet-payout" style={{ marginTop: '-12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>Potential Payout</span>
                      </div>
                      <span className="payout-val">
                        <VaultIcon /> {formatPts((parseInt(sharesAmount) || 0) * 100)}
                      </span>
                    </div>
                    
                    <button className="place-bet-btn" onClick={handlePlaceBet}>
                      Submit Order
                    </button>
                  </>
                ) : (
                  <div className="betslip-empty">Market Resolved</div>
                )}
              </div>
              
              <div className="sports-panel active-bets-panel" style={{ marginTop: '20px' }}>
                <h3><TrendingUp size={16} /> My Positions</h3>
                <div className="active-bets-list">
                  {(() => {
                    const activePositions = dbBets.filter(b => b.matchId === selectedMatch.id && b.status === 'active');
                    const settledPositions = dbBets.filter(b => b.matchId === selectedMatch.id && b.status !== 'active');

                    if (activePositions.length === 0 && settledPositions.length === 0) {
                      return <div className="betslip-empty">No positions in this market</div>;
                    }

                    return (
                      <>
                        {activePositions.map(bet => {
                          const market = selectedMatch.markets.find(m => m.id === bet.marketId);
                          const question = market ? market.question : bet.question;
                          const outcome = market ? market.outcomes.find(o => o.name === bet.type) : null;
                          const currentPrice = outcome ? outcome.price : bet.initialOdds;
                          const currentSharePrice = currentPrice * 100;
                          const cashoutValue = Number(((bet.sharesPurchased * currentSharePrice) * 0.99).toFixed(2));
                          const isProfitable = cashoutValue > bet.amount;

                          return (
                            <div key={bet.id} className="active-bet-card" style={{ marginBottom: '12px', borderLeft: '3px solid #10b981' }}>
                              <div className="act-sel">
                                <span style={{ color: 'white', fontWeight: 600 }}>{bet.type}</span> 
                                <span style={{ fontSize: '11px', color: '#8b9cc7', display: 'block', margin: '2px 0 6px 0', lineHeight: '1.2' }}>{question}</span>
                                <span className="act-odds">
                                  {bet.sharesPurchased} Shares @ {(bet.initialOdds * 100).toFixed(0)}% (<VaultIcon size={12}/> {formatPts(bet.amount)})
                                </span>
                              </div>
                              
                              <button className={`cashout-btn ${isProfitable ? 'profitable' : ''}`} onClick={() => handleCashout(bet)} style={{ marginTop: '12px' }}>
                                Sell for <VaultIcon size={12}/> {formatPts(cashoutValue)}
                              </button>
                            </div>
                          );
                        })}

                        {settledPositions.map(bet => {
                          const market = selectedMatch.markets.find(m => m.id === bet.marketId);
                          const question = market ? market.question : bet.question;
                          const isWin = bet.status === 'won';
                          const isCashout = bet.status === 'cashed_out';

                          return (
                            <div key={bet.id} className="active-bet-card" style={{ marginBottom: '12px', opacity: 0.7, borderLeft: isWin ? '3px solid #a855f7' : isCashout ? '3px solid #6b7280' : '3px solid #ef4444' }}>
                              <div className="act-sel">
                                <span style={{ color: 'white', fontWeight: 600 }}>{bet.type}</span> 
                                <span style={{ fontSize: '11px', color: '#8b9cc7', display: 'block', margin: '2px 0 6px 0', lineHeight: '1.2' }}>{question}</span>
                                <span className="act-odds">
                                  {bet.sharesPurchased} Shares @ {(bet.initialOdds * 100).toFixed(0)}%
                                </span>
                              </div>
                              
                              <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 'bold', color: isWin ? '#fbbf24' : isCashout ? '#9ca3af' : '#ef4444' }}>
                                {isWin ? `WON: +${formatPts(bet.payout)} V` : isCashout ? `Cashed out: +${formatPts(bet.cashoutAmount)} V` : 'LOST'}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
