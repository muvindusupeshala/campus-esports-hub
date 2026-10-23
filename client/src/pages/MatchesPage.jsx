import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Calendar, Edit3, CheckCircle, Play, Clock } from 'lucide-react';

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [editingMatch, setEditingMatch] = useState(null);
  const [updateData, setUpdateData] = useState({ scoreA: 0, scoreB: 0, status: 'Scheduled' });

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await API.get('/matches');
      setMatches(res.data.data || []);
    } catch (err) {
      console.error("Error fetching matches", err);
    }
  };

  const handleEditClick = (match) => {
    setEditingMatch(match._id);
    setUpdateData({
      scoreA: match.scoreA || 0,
      scoreB: match.scoreB || 0,
      status: match.status || 'Scheduled'
    });
  };

  const handleUpdateSubmit = async (e, matchId) => {
    e.preventDefault();
    try {
      await API.put(`/matches/${matchId}`, updateData);
      setEditingMatch(null);
      fetchMatches();
    } catch (err) {
      console.error("Error updating match score", err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Live':
        return (
          <span className="flex items-center space-x-1 text-xs bg-red-500/20 text-red-400 border border-red-500/40 px-2.5 py-1 rounded-full font-semibold animate-pulse">
            <Play className="w-3 h-3 fill-current" />
            <span>LIVE</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="flex items-center space-x-1 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-full font-semibold">
            <CheckCircle className="w-3 h-3" />
            <span>COMPLETED</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center space-x-1 text-xs bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            <span>SCHEDULED</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <div className="flex items-center space-x-3">
          <Calendar className="w-8 h-8 text-yellow-500" />
          <div>
            <h2 className="text-2xl font-bold text-white">Match Schedule & Results</h2>
            <p className="text-slate-400 text-sm">Manage live scores and match statuses</p>
          </div>
        </div>
      </div>

      {/* Matches List Grid */}
      <div className="grid grid-cols-1 gap-4">
        {matches.length === 0 ? (
          <div className="text-center py-8 text-slate-500 bg-slate-900 rounded-xl border border-slate-800">
            No scheduled matches found.
          </div>
        ) : (
          matches.map((match) => (
            <div key={match._id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 shadow-lg">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-xs text-yellow-400 font-semibold uppercase tracking-wider">
                  {match.tournament}
                </span>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(match.status)}
                  <button
                    onClick={() => handleEditClick(match)}
                    className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-lg border border-slate-700 transition-colors"
                    title="Update Score"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Match Teams & Score Display */}
              <div className="flex items-center justify-between text-center px-4 py-2">
                <div className="flex-1 text-right font-bold text-lg text-white">
                  {match.teamA}
                </div>
                <div className="mx-6 px-4 py-1.5 bg-slate-950 rounded-lg border border-slate-800 text-xl font-extrabold text-yellow-400">
                  {match.scoreA} - {match.scoreB}
                </div>
                <div className="flex-1 text-left font-bold text-lg text-white">
                  {match.teamB}
                </div>
              </div>

              {/* Winner Tag if Completed */}
              {match.status === 'Completed' && (
                <div className="text-center text-xs text-slate-400 pt-1">
                  Winner: <span className="text-emerald-400 font-bold">{match.winner}</span>
                </div>
              )}

              {/* Edit Score Modal / Inline Form */}
              {editingMatch === match._id && (
                <form
                  onSubmit={(e) => handleUpdateSubmit(e, match._id)}
                  className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-4 mt-3"
                >
                  <h4 className="text-sm font-semibold text-slate-300">Update Match Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">{match.teamA} Score</label>
                      <input
                        type="number"
                        min="0"
                        value={updateData.scoreA}
                        onChange={(e) => setUpdateData({ ...updateData, scoreA: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">{match.teamB} Score</label>
                      <input
                        type="number"
                        min="0"
                        value={updateData.scoreB}
                        onChange={(e) => setUpdateData({ ...updateData, scoreB: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Status</label>
                      <select
                        value={updateData.status}
                        onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white text-sm"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Live">Live</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditingMatch(null)}
                      className="px-3 py-1 text-xs bg-slate-800 text-slate-300 rounded border border-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 text-xs bg-yellow-500 text-slate-950 font-bold rounded hover:bg-yellow-400"
                    >
                      Save Score
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MatchesPage;