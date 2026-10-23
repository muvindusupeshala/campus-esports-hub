import React from 'react';
import { Trophy, LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setCurrentTab, currentTab }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (setCurrentTab) {
      setCurrentTab('auth');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      {/* Brand Logo - Navigates to Dashboard */}
      <div 
        onClick={() => setCurrentTab && setCurrentTab('dashboard')} 
        className="flex items-center space-x-2 cursor-pointer group"
      >
        <Trophy className="w-8 h-8 text-yellow-500 animate-pulse group-hover:scale-110 transition-transform" />
        <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          CAMPUS ESPORTS
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 items-center">
        <button 
          onClick={() => setCurrentTab && setCurrentTab('dashboard')}
          className={`flex items-center space-x-1 transition-colors ${currentTab === 'dashboard' ? 'text-yellow-400 font-semibold' : 'text-slate-300 hover:text-yellow-400'}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
      </div>

      {/* Auth Actions */}
      <div className="flex items-center space-x-3">
        {token ? (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-2 rounded-lg transition-colors font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        ) : (
          currentTab === 'auth' ? (
            <button 
              onClick={() => setCurrentTab && setCurrentTab('dashboard')}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded-lg transition-all border border-slate-700"
            >
              <span>Back to Dashboard</span>
            </button>
          ) : (
            <button 
              onClick={() => setCurrentTab ? setCurrentTab('auth') : navigate('/login')}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-indigo-500/25"
            >
              <LogIn className="w-4 h-4" />
              <span>Login / Sign Up</span>
            </button>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;