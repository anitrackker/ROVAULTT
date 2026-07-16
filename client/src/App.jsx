import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Crash } from './pages/games/Crash';
import { Dice } from './pages/games/Dice';
import { Mines } from './pages/games/Mines';
import { Plinko } from './pages/games/Plinko';
import { Towers } from './pages/games/Towers';
import { Slots } from './pages/games/Slots';
import { Blackjack } from './pages/games/Blackjack';
import { Cases } from './pages/games/Cases';
import { Coinflip } from './pages/games/Coinflip';
import { Settings } from './pages/Settings';
import { Rewards } from './pages/Rewards';
import { Vip } from './pages/Vip';
import { ComingSoon } from './pages/ComingSoon';
import { Affiliates } from './pages/Affiliates';
import { Leaderboard } from './pages/Leaderboard';
import { Sportsbook } from './pages/sports/Sportsbook';
import AdminApp from './pages/admin/App';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { CookieBanner } from './components/layout/CookieBanner';
import './pages/admin/index.css';

function App() {
  return (
    <Routes>
      {/* Admin Panel Route */}
      <Route path="/admin/*" element={<AdminApp />} />
      
      {/* Main App Routes */}
      <Route path="*" element={
        <AppLayout>
          <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sports" element={<Sportsbook />} />
        <Route path="/crash" element={<Crash />} />
        <Route path="/dice" element={<Dice />} />
        <Route path="/mines" element={<Mines />} />
        <Route path="/plinko" element={<Plinko />} />
        <Route path="/towers" element={<Towers />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/blackjack" element={<Blackjack />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/coinflip" element={<Coinflip />} />
        <Route path="/settings" element={<Settings />} />
        {/* Extras */}
        <Route path="/affiliates" element={<Affiliates />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/leaderboards" element={<Leaderboard />} />
        <Route path="/bonus" element={<ComingSoon />} />
        <Route path="/vip" element={<Vip />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
          <CookieBanner />
        </AppLayout>
      } />
    </Routes>
  );
}

export default App;
