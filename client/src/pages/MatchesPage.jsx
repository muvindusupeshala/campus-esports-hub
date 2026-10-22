import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Calendar, Swords, Plus, Shield, CheckCircle2 } from 'lucide-react';

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tournament: '',
    teamA: '',
    teamB: '',
    scheduledTime: ''
  });

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await API.get('/matches');
      setMatches(res.data.data || []);
    } catch (err) {
      console.error("Error fetching matches", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/matches', formData);
      setFormData({ tournament: '', teamA: '', teamB: '', scheduledTime: '' });
      setShowForm(false);
      fetchMatches();
    } catch (err) {
      console.error("Error scheduling match", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-900 p-6 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Swords className="w-6 h-6 text-orange-500" />
            <span>Match Schedule & Results</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">Schedule esports matches and manage live scores</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Close Form' : 'Schedule Match'}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 max-w-xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-2">Schedule New Fixture</h3>
          <div>
            <label className="block text-slate-400 text-sm mb-1">Tournament</label>
            <input
              type="text"
              required
              placeholder="e.g. Valorant Inter-Faculty Championship"
              value={formData.tournament}
              onChange={(e) => setFormData({ ...formData, tournament: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Team A</label>
              <input
                type="text"
                required
                placeholder="Team Alpha"
                value={formData.teamA}
                onChange={(e) => setFormData({ ...formData, teamA: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-1">Team B</label>
              <input
                type="text"
                required
                placeholder="Team Omega"
                value={formData.teamB}
                onChange={(e) => setFormData({ ...formData, teamB: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">Date & Time</label>
            <input
              type="datetime-local"
              required
              value={formData.scheduledTime}
              onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Create Match
          </button>
        </form>
      )}

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map((match) => (
          <div key={match._id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex justify-between items-center">
            <div className="space-y-2">
              <span className="text-xs bg-slate-800 text-orange-400 px-2.5 py-1 rounded-full border border-slate-700">
                {match.tournament}
              </span>
              <div className="flex items-center space-x-3 text-lg font-bold text-white pt-2">
                <span>{match.teamA}</span>
                <span className="text-sm font-normal text-slate-500">VS</span>
                <span>{match.teamB}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(match.scheduledTime).toLocaleString()}</span>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                match.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                match.status === 'Live' ? 'bg-red-950 text-red-400 border border-red-800 animate-pulse' :
                'bg-slate-800 text-slate-400'
              }`}>
                {match.status}
              </span>
              <div className="text-xl font-extrabold text-slate-200 mt-2">
                {match.scoreA} - {match.scoreB}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesPage;