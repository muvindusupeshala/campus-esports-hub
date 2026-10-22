import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TournamentsPage from './pages/TournamentsPage';
import TeamsPage from './pages/TeamsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AuthPage from './pages/AuthPage';

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard'); // 'dashboard' or 'auth'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12">
      <Navbar setCurrentTab={setCurrentTab} currentTab={currentTab} />
      
      <main className="p-8 max-w-7xl mx-auto space-y-12">
        {currentTab === 'dashboard' ? (
          <>
            <div className="text-center">
              <h1 className="text-4xl font-extrabold my-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                Campus Esports Hub 🎮
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Manage tournaments, create teams, schedule matches, and track leaderboard standings in real time!
              </p>
            </div>

            {/* Tournaments Section */}
            <TournamentsPage />

            {/* Teams Section */}
            <TeamsPage />

            {/* Leaderboard Section */}
            <LeaderboardPage />
          </>
        ) : (
          /* Authentication Section */
          <AuthPage onLoginSuccess={() => setCurrentTab('dashboard')} />
        )}
      </main>
    </div>
  );
}

export default App;