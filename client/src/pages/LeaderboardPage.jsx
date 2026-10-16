import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Trophy, Award, Shield, AlertCircle } from 'lucide-react';

const LeaderboardPage = ({ tournamentId }) => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        // Default tournament ID එකක් නැත්නම් dummy query එකක්
        const id = tournamentId || 'sample-tournament-id';
        const res = await API.get(`/leaderboard/${id}`);
        setStandings(res.data.data || res.data);
        setError('');
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
        setError("Leaderboard data ලෝඩ් කිරීමට නොහැකි විය. Backend එක active ද බලන්න.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [tournamentId]);

  return (
    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
      <div className="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-4">
        <Trophy className="w-8 h-8 text-yellow-400" />
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">TOURNAMENT LEADERBOARD</h2>
          <p className="text-slate-400 text-sm">Real-time team standings and match stats</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 font-semibold animate-pulse">
          Loading Leaderboard Standings... 🎮
        </div>
      ) : error ? (
        <div className="flex items-center justify-center space-x-2 bg-red-950/50 border border-red-800 text-red-300 p-4 rounded-lg my-4">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-300 border-collapse">
            <thead>
              <tr className="bg-slate-800/60 text-slate-400 uppercase text-xs tracking-wider border-b border-slate-700">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Team</th>
                <th className="py-3 px-4 text-center">Played</th>
                <th className="py-3 px-4 text-center">Won</th>
                <th className="py-3 px-4 text-center">Lost</th>
                <th className="py-3 px-4 text-center">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {standings.length > 0 ? (
                standings.map((team, index) => (
                  <tr key={team._id || index} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-bold flex items-center space-x-2">
                      {index === 0 && <Award className="w-5 h-5 text-yellow-400" />}
                      {index === 1 && <Award className="w-5 h-5 text-slate-300" />}
                      {index === 2 && <Award className="w-5 h-5 text-amber-600" />}
                      <span className={index < 3 ? 'text-yellow-400 font-extrabold' : ''}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-white flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-indigo-400" />
                      <span>{team.teamName || team.name || 'Unknown Team'}</span>
                    </td>
                    <td className="py-4 px-4 text-center font-mono">{team.matchesPlayed || 0}</td>
                    <td className="py-4 px-4 text-center font-mono text-emerald-400">{team.wins || 0}</td>
                    <td className="py-4 px-4 text-center font-mono text-rose-400">{team.losses || 0}</td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-yellow-400 text-lg">
                      {team.points || 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">
                    තවම තරග පැවැත්වී නැත නැතහොත් Data ලබාගත නොහැක.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;