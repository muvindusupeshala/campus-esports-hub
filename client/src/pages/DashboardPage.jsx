import React, { useState } from 'react';
import UserProfile from '../components/UserProfile';
import EditProfileModal from '../components/EditProfileModal';
import { Trophy, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });
  
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* User Welcome Profile Section (UserProfile component එක ඇතුළේ ඇති button එකෙන්ම Edit Profile modal එක open වේ) */}
      <UserProfile user={user} onEditClick={() => setIsEditOpen(true)} />

      {/* Edit Profile Modal */}
      {isEditOpen && user && (
        <EditProfileModal
          user={user}
          setUser={setUser}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {/* Main Banner */}
      <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/10 to-slate-900 border border-slate-800 p-8 rounded-2xl">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Campus Esports Tournament Hub
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Manage teams, view match schedules, and track leaderboard standings in real time!
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/teams" className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-yellow-500/50 transition-colors group">
          <Users className="w-8 h-8 text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white mb-1">Teams</h3>
          <p className="text-slate-400 text-sm">Register new teams and manage members.</p>
        </Link>

        <Link to="/matches" className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-yellow-500/50 transition-colors group">
          <Calendar className="w-8 h-8 text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white mb-1">Matches</h3>
          <p className="text-slate-400 text-sm">View scheduled matches and update live scores.</p>
        </Link>

        <Link to="/leaderboard" className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-yellow-500/50 transition-colors group">
          <Trophy className="w-8 h-8 text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white mb-1">Leaderboard</h3>
          <p className="text-slate-400 text-sm">Check automated tournament rankings.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;