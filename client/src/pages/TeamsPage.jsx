import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Users, UserPlus, Trash2 } from 'lucide-react';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    teamName: '',
    captain: '',
    game: '',
    members: [{ name: '', campusId: '' }]
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await API.get('/teams');
      setTeams(res.data.data || []);
    } catch (err) {
      console.error("Error fetching teams", err);
    }
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index][field] = value;
    setFormData({ ...formData, members: updatedMembers });
  };

  const addMemberField = () => {
    setFormData({
      ...formData,
      members: [...formData.members, { name: '', campusId: '' }]
    });
  };

  const removeMemberField = (index) => {
    const updatedMembers = formData.members.filter((_, i) => i !== index);
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/teams', formData);
      setFormData({
        teamName: '',
        captain: '',
        game: '',
        members: [{ name: '', campusId: '' }]
      });
      fetchTeams();
    } catch (err) {
      console.error("Error creating team", err);
    }
  };

  const handleDelete = async (teamId) => {
    if (window.confirm("ඔයාට විශ්වාසද මේ Team එක delete කරන්න ඕනේ කියලා?")) {
      try {
        await API.delete(`/teams/${teamId}`);
        fetchTeams(); // List එක auto refresh කරන්න
      } catch (err) {
        console.error("Error deleting team", err);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Registration Form */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <UserPlus className="text-yellow-500" />
          <span>Register a New Team</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Team Name</label>
              <input
                type="text"
                required
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-1">Captain Name</label>
              <input
                type="text"
                required
                value={formData.captain}
                onChange={(e) => setFormData({ ...formData, captain: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-1">Game</label>
              <input
                type="text"
                required
                value={formData.game}
                onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white"
              />
            </div>
          </div>

          {/* Dynamic Members Section */}
          <div className="border-t border-slate-800 pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-200">
                Team Members ({formData.members.length})
              </h3>
              <button
                type="button"
                onClick={addMemberField}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-yellow-400 px-3 py-1.5 rounded-lg border border-slate-700"
              >
                + Add Member
              </button>
            </div>

            {formData.members.map((member, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
                <input
                  type="text"
                  placeholder={`Member ${index + 1} Name`}
                  required
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white text-sm"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Campus ID (e.g. IT210098)"
                    required
                    value={member.campusId}
                    onChange={(e) => handleMemberChange(index, 'campusId', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-white text-sm"
                  />
                  {formData.members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMemberField(index)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-950 font-bold py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Register Team
          </button>
        </form>
      </div>

      {/* Teams Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((team) => (
          <div key={team._id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white">{team.teamName}</h3>
                <p className="text-slate-400 text-sm">Game: <span className="text-yellow-400">{team.game}</span></p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
                  Captain: {team.captain}
                </span>
                {/* Delete Button එක මෙතැනින් එකතු කර ඇත */}
                <button
                  onClick={() => handleDelete(team._id)}
                  className="text-red-400 hover:text-red-300 hover:bg-slate-800 p-1.5 rounded-lg transition-colors"
                  title="Delete Team"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {team.members && team.members.length > 0 && (
              <div className="border-t border-slate-800 pt-3">
                <p className="text-xs font-semibold text-slate-400 mb-2">Members ({team.members.length}):</p>
                <div className="space-y-1">
                  {team.members.map((m, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded">
                      <span>{m.name}</span>
                      <span className="text-slate-500">{m.campusId}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;