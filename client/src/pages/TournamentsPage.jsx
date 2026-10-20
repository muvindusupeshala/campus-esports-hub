import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Trophy, Gamepad2, Calendar, PlusCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // New Tournament Form State
  const [formData, setFormData] = useState({
    title: '',
    game: '',
    startDate: '',
  });

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const res = await API.get('/tournaments');
      setTournaments(res.data.data || res.data);
      setError('');
    } catch (err) {
      console.error("Failed to fetch tournaments", err);
      setError("Tournaments ලෝඩ් කරගැනීමට නොහැකි විය. Backend එක active ද බලන්න.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTournament = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tournaments', formData);
      setSuccessMsg('Tournament එක සාර්ථකව Create කරන ලදී! 🚀');
      setFormData({ title: '', game: '', startDate: '' });
      fetchTournaments();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error("Failed to create tournament", err);
      setError(err.response?.data?.message || 'Tournament එක create කිරීමේදී දෝෂයක් ඇති විය.');
    }
  };

  return (
    <div className="space-y-8 mt-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl">
        <div className="flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">CAMPUS TOURNAMENTS</h2>
            <p className="text-slate-400 text-sm">Create and manage upcoming esports championships</p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="flex items-center space-x-2 bg-emerald-950/50 border border-emerald-800 text-emerald-300 p-4 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center space-x-2 bg-red-950/50 border border-red-800 text-red-300 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Create Tournament Form */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <PlusCircle className="w-5 h-5 text-indigo-400" />
          <span>Host a New Tournament</span>
        </h3>
        <form onSubmit={handleCreateTournament} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1">Tournament Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g. Valorant Campus Clash"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">Game Name</label>
            <input
              type="text"
              name="game"
              value={formData.game}
              onChange={handleInputChange}
              required
              placeholder="e.g. Valorant / PUBG Mobile"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md"
            >
              Create Tournament
            </button>
          </div>
        </form>
      </div>

      {/* Tournaments List Grid */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Active & Upcoming Tournaments</h3>
        {loading ? (
          <div className="text-center py-8 text-slate-400 animate-pulse">Loading Tournaments... 🎮</div>
        ) : tournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
              <div key={tournament._id} className="bg-slate-950 border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-indigo-950 text-indigo-400 text-xs font-bold px-2.5 py-1 rounded border border-indigo-800 flex items-center space-x-1">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>{tournament.game}</span>
                  </span>
                  <span className="text-slate-400 text-xs flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{tournament.startDate ? new Date(tournament.startDate).toLocaleDateString() : 'TBA'}</span>
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{tournament.title}</h4>
                <p className="text-slate-400 text-sm">Status: <span className="text-emerald-400 font-semibold">{tournament.status || 'Upcoming'}</span></p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            තවම tournaments කිසිවක් create කර නැත. ඉහත form එකෙන් එකක් එකතු කරන්න!
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentsPage;