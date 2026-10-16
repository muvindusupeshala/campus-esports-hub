import React from 'react';
import { Trophy, Users, Shield, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      {/* Brand Logo */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <Trophy className="w-8 h-8 text-yellow-500 animate-pulse" />
        <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          CAMPUS ESPORTS
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <a href="#tournaments" className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
          <Trophy className="w-4 h-4" />
          <span>Tournaments</span>
        </a>
        <a href="#teams" className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
          <Users className="w-4 h-4" />
          <span>Teams</span>
        </a>
        <a href="#leaderboard" className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
          <Shield className="w-4 h-4" />
          <span>Leaderboard</span>
        </a>
      </div>

      {/* Action Button */}
      <div>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-indigo-500/25">
          <LogIn className="w-4 h-4" />
          <span>Login</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;