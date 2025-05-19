import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import HomePage from './pages/HomePage';
import CreateGiveawayPage from './pages/CreateGiveawayPage';
import GiveawaysPage from './pages/GiveawaysPage';
import GiveawaySetupPage from './pages/GiveawaySetupPage';
import WinnerSelectionPage from './pages/WinnerSelectionPage';
import HelpPage from './pages/HelpPage';
import { GiveawayProvider } from './context/GiveawayContext';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <GiveawayProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreateGiveawayPage />} />
              <Route path="/giveaways" element={<GiveawaysPage />} />
              <Route path="/giveaways/:giveawayId/setup" element={<GiveawaySetupPage />} />
              <Route path="/giveaways/:giveawayId/winner" element={<WinnerSelectionPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </GiveawayProvider>
    </Router>
  );
}

export default App;