import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Trophy, Award, Flame } from 'lucide-react';

const LeaderboardPage = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await API.get('/leaderboard');
      setStandings(res.data.data || []);
    } catch (err) {
      console.error("Error fetching leaderboard", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Trophy className="w-7 h-7 text-yellow-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Championship Standings</h2>
            <p className="text-slate-400 text-sm">Real-time team rankings based on completed match points</p>
          </div>
        </div>
        <button
          onClick={fetchLeaderboard}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
        >
          Refresh Standings
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-500">Calculating standings...</div>
      ) : standings.length === 0 ? (
        <div className="text-center py-8 text-slate-500 bg-slate-950/50 rounded-lg border border-slate-800">
          No completed matches yet. Complete matches in the schedule section to generate rankings!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-sm uppercase">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Team</th>
                <th className="py-3 px-4 text-center">Played</th>
                <th className="py-3 px-4 text-center">Won</th>
                <th className="py-3 px-4 text-center">Lost</th>
                <th className="py-3 px-4 text-center">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {standings.map((team, index) => (
                <tr key={team.team} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-4 font-bold">
                    {index === 0 ? (
                      <span className="flex items-center space-x-1 text-yellow-400">
                        <Award className="w-5 h-5" />
                        <span>#1</span>
                      </span>
                    ) : index === 1 ? (
                      <span className="text-slate-300">#2</span>
                    ) : index === 2 ? (
                      <span className="text-amber-600">#3</span>
                    ) : (
                      `#${index + 1}`
                    )}
                  </td>
                  <td className="py-4 px-4 font-semibold text-white flex items-center space-x-2">
                    <span>{team.team}</span>
                    {index === 0 && <Flame className="w-4 h-4 text-orange-500 animate-pulse" />}
                  </td>
                  <td className="py-4 px-4 text-center text-slate-400">{team.played}</td>
                  <td className="py-4 px-4 text-center text-emerald-400 font-medium">{team.won}</td>
                  <td className="py-4 px-4 text-center text-red-400 font-medium">{team.lost}</td>
                  <td className="py-4 px-4 text-center font-bold text-yellow-400 text-lg">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;