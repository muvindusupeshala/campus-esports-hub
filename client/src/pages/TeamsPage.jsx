import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Users, UserPlus, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // New Team Form State - Matching Schema Keys
  const [formData, setFormData] = useState({
    teamName: '',
    captain: '',
    game: 'Valorant', // Default game selection
  });

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await API.get('/teams');
      setTeams(res.data.data || res.data);
      setError('');
    } catch (err) {
      console.error("Failed to fetch teams", err);
      setError("Teams ලෝඩ් කරගැනීමට නොහැකි විය. Backend එක active ද බලන්න.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await API.post('/teams', formData);
      setSuccessMsg('Team එක සාර්ථකව Register කරන ලදී! 🛡️');
      setFormData({ teamName: '', captain: '', game: 'Valorant' });
      fetchTeams();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error("Failed to create team", err);
      setError(err.response?.data?.message || err.response?.data?.error || 'Team එක create කිරීමේදී දෝෂයක් ඇති විය.');
    }
  };

  return (
    <div className="space-y-8 mt-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl">
        <div className="flex items-center space-x-3">
          <Users className="w-8 h-8 text-indigo-400" />
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">CAMPUS TEAMS</h2>
            <p className="text-slate-400 text-sm">Register and manage esports squads across faculties</p>
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

      {/* Register Team Form */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <UserPlus className="w-5 h-5 text-indigo-400" />
          <span>Register a New Team</span>
        </h3>
        <form onSubmit={handleCreateTeam} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1">Team Name</label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleInputChange}
              required
              placeholder="e.g. Team Thunder"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">Captain Name</label>
            <input
              type="text"
              name="captain"
              value={formData.captain}
              onChange={handleInputChange}
              required
              placeholder="e.g. Hirusha Nirmana"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">Esports Game</label>
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
          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md"
            >
              Register Team
            </button>
          </div>
        </form>
      </div>

      {/* Registered Teams Grid */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Registered Teams</h3>
        {loading ? (
          <div className="text-center py-8 text-slate-400 animate-pulse">Loading Teams... 🛡️</div>
        ) : teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div key={team._id} className="bg-slate-950 border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-purple-950 text-purple-400 text-xs font-bold px-2.5 py-1 rounded border border-purple-800 flex items-center space-x-1">
                    <Shield className="w-3.5 h-3.5" />
                    <span>{team.game || 'Esports'}</span>
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{team.teamName || team.name}</h4>
                <p className="text-slate-400 text-sm">Captain: <span className="text-indigo-400 font-medium">{team.captain || team.captainName || 'N/A'}</span></p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            තවම teams කිසිවක් register කර නැත. ඉහත form එකෙන් පළමු team එක එකතු කරන්න!
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;