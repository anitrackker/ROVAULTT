import { VaultIcon } from '../../components/VaultIcon';
import { useState, useEffect, useRef } from 'react';
import { useStore, formatPts } from '../../store/useStore';
import { ThemedBackdrop } from './ThemedBackdrop';
import { HelpCircle, History, RotateCcw, Play, Square, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playDeal, playWin, playLose, playStep, playClick } from '../../utils/SoundEngine';
import confetti from 'canvas-confetti';
import './Games.css';
import './Blackjack.css';

const SUITS = [
  { symbol: '♠', name: 'spades', color: 'black' },
  { symbol: '♥', name: 'hearts', color: 'red' },
  { symbol: '♦', name: 'diamonds', color: 'red' },
  { symbol: '♣', name: 'clubs', color: 'black' }
];

const VALUES = [
  { val: '2', score: 2 },
  { val: '3', score: 3 },
  { val: '4', score: 4 },
  { val: '5', score: 5 },
  { val: '6', score: 6 },
  { val: '7', score: 7 },
  { val: '8', score: 8 },
  { val: '9', score: 9 },
  { val: '10', score: 10 },
  { val: 'J', score: 10 },
  { val: 'Q', score: 10 },
  { val: 'K', score: 10 },
  { val: 'A', score: 11 }
];

export const Blackjack = () => {
  const { balance, updateBalance } = useStore();
  const [bet, setBet] = useState(25);
  const [gameState, setGameState] = useState('idle'); // idle, playing, ended
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [outcome, setOutcome] = useState(null); // win, lose, push, blackjack, bust, dealerBust
  const [statusMessage, setStatusMessage] = useState('');
  
  // Autobet state
  const [activeTab, setActiveTab] = useState('manual'); // manual, auto
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoRounds, setAutoRounds] = useState(10);
  const [onWinMultiplier, setOnWinMultiplier] = useState(100); // percentage (100% = no change)
  const [onLossMultiplier, setOnLossMultiplier] = useState(100);
  const [stopOnLoss, setStopOnLoss] = useState('');
  const [stopOnWin, setStopOnWin] = useState('');
  
  const autoStatsRef = useRef({
    initialBalance: 0,
    roundsPlayed: 0,
    currentBet: 25,
  });

  const getCardValue = () => {
    const suit = SUITS[Math.floor(Math.random() * SUITS.length)];
    const value = VALUES[Math.floor(Math.random() * VALUES.length)];
    return { ...value, ...suit, id: Math.random().toString(36).substr(2, 9) };
  };

  const getHandScore = (hand) => {
    let score = 0;
    let aces = 0;
    hand.forEach(c => {
      score += c.score;
      if (c.val === 'A') aces++;
    });
    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }
    return score;
  };

  const startGame = (customBet = bet) => {
    const betToUse = customBet;
    if (balance < betToUse) {
      setIsAutoPlaying(false);
      setStatusMessage('Insufficient balance!');
      return;
    }
    updateBalance(-betToUse);
    setGameState('playing');
    setOutcome(null);
    setStatusMessage('');

    // Deal initial cards sequentially
    const p1 = getCardValue();
    const d1 = getCardValue();
    const p2 = getCardValue();
    const d2 = getCardValue();

    setPlayerHand([p1]);
    setDealerHand([d1]);
    playDeal();

    setTimeout(() => {
      setPlayerHand(prev => [...prev, p2]);
      playDeal();
    }, 200);

    setTimeout(() => {
      setDealerHand(prev => [...prev, d2]);
      playDeal();

      // Check for natural Blackjack
      const playerVal = getHandScore([p1, p2]);
      if (playerVal === 21) {
        // Dealer also has blackjack check
        const dealerVal = getHandScore([d1, d2]);
        if (dealerVal === 21) {
          endGame('push', [p1, p2], [d1, d2]);
        } else {
          endGame('blackjack', [p1, p2], [d1, d2]);
        }
      }
    }, 400);
  };

  const hit = () => {
    if (gameState !== 'playing') return;
    const card = getCardValue();
    const nextHand = [...playerHand, card];
    setPlayerHand(nextHand);
    playStep(playerHand.length);

    if (getHandScore(nextHand) > 21) {
      endGame('bust', nextHand, dealerHand);
    }
  };

  const stand = (currentP = playerHand, currentD = dealerHand) => {
    if (gameState !== 'playing') return;
    playClick();

    let nextD = [...currentD];
    let scoreD = getHandScore(nextD);
    const scoreP = getHandScore(currentP);

    // Dealer hits on soft 17
    const dealerTakeTurn = () => {
      if (scoreD < 17) {
        const card = getCardValue();
        nextD.push(card);
        setDealerHand([...nextD]);
        playDeal();
        scoreD = getHandScore(nextD);
        setTimeout(dealerTakeTurn, 400);
      } else {
        // Dealer finished
        if (scoreD > 21) {
          endGame('dealerBust', currentP, nextD);
        } else if (scoreP > scoreD) {
          endGame('win', currentP, nextD);
        } else if (scoreP < scoreD) {
          endGame('lose', currentP, nextD);
        } else {
          endGame('push', currentP, nextD);
        }
      }
    };

    dealerTakeTurn();
  };

  const doubleDown = () => {
    if (gameState !== 'playing' || playerHand.length !== 2) return;
    if (balance < bet) {
      setStatusMessage('Insufficient balance for double down!');
      return;
    }
    updateBalance(-bet);
    
    const card = getCardValue();
    const nextHand = [...playerHand, card];
    setPlayerHand(nextHand);
    playStep(playerHand.length);

    if (getHandScore(nextHand) > 21) {
      endGame('bust', nextHand, dealerHand, true);
    } else {
      stand(nextHand, dealerHand);
    }
  };

  const endGame = (outcomeType, finalPlayerHand, finalDealerHand, isDouble = false) => {
    setGameState('ended');
    setOutcome(outcomeType);
    const currentBetAmount = isDouble ? bet * 2 : bet;

    if (outcomeType === 'blackjack') {
      const payout = currentBetAmount * 2.5;
      updateBalance(payout);
      setStatusMessage(`BLACKJACK! Won ${formatPts(payout)} VAULT`);
      playWin();
      confetti({ particleCount: 80, spread: 60 });
    } else if (outcomeType === 'win' || outcomeType === 'dealerBust') {
      const payout = currentBetAmount * 2;
      updateBalance(payout);
      setStatusMessage(`You win! Won ${formatPts(payout)} VAULT`);
      playWin();
      confetti({ particleCount: 50, spread: 50 });
    } else if (outcomeType === 'bust') {
      setStatusMessage(`Busted! Lost ${formatPts(currentBetAmount)} VAULT`);
      playLose();
    } else if (outcomeType === 'lose') {
      setStatusMessage(`Dealer wins! Lost ${formatPts(currentBetAmount)} VAULT`);
      playLose();
    } else if (outcomeType === 'push') {
      updateBalance(currentBetAmount);
      setStatusMessage('Push. Bet returned.');
      playClick();
    }
  };

  // Keep latest values in refs so the autobet effect never has stale closure issues
  const autoConfigRef = useRef({});
  useEffect(() => {
    autoConfigRef.current = {
      balance, outcome, stopOnLoss, stopOnWin,
      autoRounds, onWinMultiplier, onLossMultiplier, isAutoPlaying,
    };
  });

  // Autobet logic controller
  useEffect(() => {
    if (!isAutoPlaying) return;
    if (gameState === 'idle') {
      autoStatsRef.current.roundsPlayed++;
      startGame(autoStatsRef.current.currentBet);
    } else if (gameState === 'ended') {
      const cfg = autoConfigRef.current;
      const profitLoss = cfg.outcome === 'win' || cfg.outcome === 'blackjack' || cfg.outcome === 'dealerBust';
      let nextBet = autoStatsRef.current.currentBet;
      if (profitLoss) {
        nextBet = Math.max(1, Math.floor((nextBet * cfg.onWinMultiplier) / 100));
      } else if (cfg.outcome === 'bust' || cfg.outcome === 'lose') {
        nextBet = Math.max(1, Math.floor((nextBet * cfg.onLossMultiplier) / 100));
      }

      const netGainLoss = cfg.balance - autoStatsRef.current.initialBalance;
      if (cfg.stopOnLoss && netGainLoss <= -parseFloat(cfg.stopOnLoss)) {
        setIsAutoPlaying(false);
        setStatusMessage('Autobet stopped: Net loss limit reached.');
        return;
      }
      if (cfg.stopOnWin && netGainLoss >= parseFloat(cfg.stopOnWin)) {
        setIsAutoPlaying(false);
        setStatusMessage('Autobet stopped: Net gain limit reached.');
        return;
      }
      if (autoStatsRef.current.roundsPlayed >= cfg.autoRounds) {
        setIsAutoPlaying(false);
        setStatusMessage('Autobet completed all rounds.');
        return;
      }

      autoStatsRef.current.currentBet = nextBet;
      setBet(nextBet);

      const timer = setTimeout(() => {
        if (autoConfigRef.current.isAutoPlaying) {
          autoStatsRef.current.roundsPlayed++;
          startGame(nextBet);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, isAutoPlaying]);

  const startAutoBetting = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      return;
    }
    autoStatsRef.current.initialBalance = balance;
    autoStatsRef.current.roundsPlayed = 0;
    autoStatsRef.current.currentBet = bet;
    setIsAutoPlaying(true);
    setStatusMessage('');
  };

  return (
    <div className="game-layout">
      {/* SIDEBAR / CONTROL PANEL */}
      <div className="game-control-panel">
        <div className="panel-tabs">
          <button 
            className={`panel-tab ${activeTab === 'manual' ? 'active' : ''}`}
            onClick={() => { if (!isAutoPlaying) setActiveTab('manual'); }}
          >
            Manual
          </button>
          <button 
            className={`panel-tab ${activeTab === 'auto' ? 'active' : ''}`}
            onClick={() => { if (!isAutoPlaying) setActiveTab('auto'); }}
          >
            Auto
          </button>
        </div>

        {activeTab === 'manual' ? (
          <div className="tab-content">
            <div className="ctrl-input-group">
              <div className="ctrl-label">Bet amount</div>
              <div className="ctrl-input-wrap">
                <span className="currency-symbol"><VaultIcon size={15} /></span>
                <input 
                  type="number" 
                  value={bet} 
                  onChange={(e) => setBet(Math.max(1, parseInt(e.target.value) || 0))}
                  disabled={gameState === 'playing'}
                />
                <button className="quick-btn" disabled={gameState === 'playing'} onClick={() => setBet(Math.max(1, Math.floor(bet / 2)))}>1/2</button>
                <button className="quick-btn" disabled={gameState === 'playing'} onClick={() => setBet(bet * 2)}>2x</button>
              </div>
            </div>

            {gameState === 'playing' ? (
              <div className="bj-actions-grid">
                <button className="bj-btn hit" onClick={hit}>Hit</button>
                <button className="bj-btn stand" onClick={() => stand()}>Stand</button>
                <button 
                  className="bj-btn double" 
                  disabled={playerHand.length !== 2 || balance < bet} 
                  onClick={doubleDown}
                >
                  Double
                </button>
              </div>
            ) : (
              <div style={{ marginTop: 'auto', paddingTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <button className="btn-game-submit" onClick={() => startGame(bet)} style={{ width: '100%' }}>
                  Deal Cards
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="tab-content">
            <div className="ctrl-input-group">
              <div className="ctrl-label">Initial Bet</div>
              <div className="ctrl-input-wrap">
                <span className="currency-symbol"><VaultIcon size={15} /></span>
                <input 
                  type="number" 
                  value={bet} 
                  onChange={(e) => setBet(Math.max(1, parseInt(e.target.value) || 0))}
                  disabled={isAutoPlaying}
                />
              </div>
            </div>

            <div className="ctrl-input-group">
              <div className="ctrl-label">Number of Rounds</div>
              <input 
                type="number" 
                className="bj-control-input"
                value={autoRounds} 
                onChange={(e) => setAutoRounds(Math.max(1, parseInt(e.target.value) || 1))}
                disabled={isAutoPlaying}
              />
            </div>

            <div className="ctrl-input-group">
              <div className="ctrl-label">On Win (% of last bet)</div>
              <input 
                type="number" 
                className="bj-control-input"
                value={onWinMultiplier} 
                onChange={(e) => setOnWinMultiplier(Math.max(0, parseInt(e.target.value) || 0))}
                disabled={isAutoPlaying}
              />
            </div>

            <div className="ctrl-input-group">
              <div className="ctrl-label">On Loss (% of last bet)</div>
              <input 
                type="number" 
                className="bj-control-input"
                value={onLossMultiplier} 
                onChange={(e) => setOnLossMultiplier(Math.max(0, parseInt(e.target.value) || 0))}
                disabled={isAutoPlaying}
              />
            </div>

            <div className="ctrl-input-group">
              <div className="ctrl-label">Stop on Net Loss (VAULT)</div>
              <input 
                type="number" 
                placeholder="None"
                className="bj-control-input"
                value={stopOnLoss} 
                onChange={(e) => setStopOnLoss(e.target.value)}
                disabled={isAutoPlaying}
              />
            </div>

            <div className="ctrl-input-group">
              <div className="ctrl-label">Stop on Net Win (VAULT)</div>
              <input 
                type="number" 
                placeholder="None"
                className="bj-control-input"
                value={stopOnWin} 
                onChange={(e) => setStopOnWin(e.target.value)}
                disabled={isAutoPlaying}
              />
            </div>

            <button 
              className={`btn-game-submit ${isAutoPlaying ? 'btn-danger' : ''}`}
              onClick={startAutoBetting}
            >
              {isAutoPlaying ? <span className="flex-center"><Square size={16} style={{ marginRight: 8 }} /> Stop Auto</span> : <span className="flex-center"><Play size={16} style={{ marginRight: 8 }} /> Start Auto</span>}
            </button>
          </div>
        )}
      </div>

      {/* VIEWPORT / CASINO felt TABLE */}
      <div className="game-viewport bj-viewport">
        <ThemedBackdrop />

        <div className="viewport-top-overlay">
          <div className="bj-game-title">Blackjack</div>
          <div className="viewport-controls">
            <button className="vp-icon-btn"><HelpCircle size={18} /></button>
            <button className="vp-badge-btn"><History size={14} style={{ marginRight: 6 }} /> History</button>
          </div>
        </div>

        {/* Casino Table Felt */}
        <div className="bj-table-felt">
          {/* Card Shoe (Deck) Graphic */}
          <div className="bj-card-shoe">
            <div className="shoe-deck-glow" />
            <div className="shoe-cards">
              <div className="card-back-patternSmall" />
              <div className="card-back-patternSmall offset1" />
              <div className="card-back-patternSmall offset2" />
            </div>
            <span className="shoe-label">RoVault Shoe</span>
          </div>

          <div className="table-felt-lanes">
            <div className="lane-arc text-lane">Blackjack Pays 3 to 2</div>
            <div className="lane-arc-small text-lane">Dealer Must Draw to 16 and Stand on all 17's</div>
          </div>

          <div className="bj-hands-layout">
            {/* DEALER HAND SECTION */}
            <div className="bj-hand-wrapper dealer-section">
              <div className="hand-header">
                <span className="hand-owner">Dealer</span>
                {dealerHand.length > 0 && (
                  <div className="bj-score-badge">
                    {gameState === 'playing' ? (
                      // Only show score of first dealer card
                      dealerHand[0].score
                    ) : (
                      getHandScore(dealerHand)
                    )}
                  </div>
                )}
              </div>

              <div className="bj-cards-row">
                <AnimatePresence>
                  {dealerHand.map((card, i) => {
                    const isHidden = gameState === 'playing' && i === 1;
                    return (
                      <motion.div
                        key={card.id}
                        className="card-3d-wrapper"
                        initial={{ y: -250, x: 200, rotate: 35, opacity: 0 }}
                        animate={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                      >
                        <div className={`bj-card ${isHidden ? 'hidden' : ''}`}>
                          <div className="card-inner">
                            <div className="card-front">
                              <span className={`card-val top-left ${card.color}`}>{card.val}</span>
                              <span className={`card-suit center ${card.color}`}>{card.symbol}</span>
                              <span className={`card-val bottom-right ${card.color}`}>{card.val}</span>
                            </div>
                            <div className="card-back">
                              <div className="card-back-design">
                                <svg viewBox="0 0 100 100" className="vault-gold-icon">
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="gold" strokeWidth="3" />
                                  <path d="M50 20 L50 80 M20 50 L80 50" stroke="gold" strokeWidth="3" />
                                </svg>
                                <span>RoVault</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* PLAYER HAND SECTION */}
            <div className="bj-hand-wrapper player-section">
              <div className="hand-header">
                <span className="hand-owner">Your Hand</span>
                {playerHand.length > 0 && (
                  <div className="bj-score-badge">
                    {getHandScore(playerHand)}
                  </div>
                )}
              </div>

              <div className="bj-cards-row">
                <AnimatePresence>
                  {playerHand.map((card) => (
                    <motion.div
                      key={card.id}
                      className="card-3d-wrapper"
                      initial={{ y: -300, x: 150, rotate: 45, opacity: 0 }}
                      animate={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                    >
                      <div className="bj-card">
                        <div className="card-inner">
                          <div className="card-front">
                            <span className={`card-val top-left ${card.color}`}>{card.val}</span>
                            <span className={`card-suit center ${card.color}`}>{card.symbol}</span>
                            <span className={`card-val bottom-right ${card.color}`}>{card.val}</span>
                          </div>
                          <div className="card-back">
                            <div className="card-back-design">
                              <svg viewBox="0 0 100 100" className="vault-gold-icon">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="gold" strokeWidth="3" />
                                <path d="M50 20 L50 80 M20 50 L80 50" stroke="gold" strokeWidth="3" />
                              </svg>
                              <span>RoVault</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Outcome & Notification Display */}
          <AnimatePresence>
            {statusMessage && (
              <motion.div 
                className={`bj-outcome-banner ${outcome || 'info'}`}
                initial={{ scale: 0.8, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div className="banner-content">
                  {statusMessage}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
