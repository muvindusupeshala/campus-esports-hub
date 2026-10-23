import React from 'react';
import { User, Mail, Shield, Gamepad2, GraduationCap, Calendar, FileText, Edit3 } from 'lucide-react';

const UserProfile = ({ user, onEditClick }) => {
  // Local storage එකෙන් හෝ props වලින් user දත්ත ලබා ගැනීම
  const currentUser = user || JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500 bg-slate-800 flex items-center justify-center">
            {currentUser.profilePic ? (
              <img src={currentUser.profilePic} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-yellow-500" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">
                Welcome back, {currentUser.name || 'Gamer'}! 👋
              </h2>
              <span className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {currentUser.role || 'Player'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
              <Mail className="w-4 h-4 text-slate-500" />
              <span>{currentUser.email || 'No email provided'}</span>
            </div>
          </div>
        </div>

        {/* Single Edit Profile Button */}
        <button
          onClick={onEditClick}
          className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/10"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile Details</span>
        </button>
      </div>

      {/* Grid Metadata Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Gamepad2 className="w-3.5 h-3.5 text-yellow-500" />
            <span>Gaming Name</span>
          </div>
          <p className="text-white font-semibold text-sm">{currentUser.gamingName || 'N/A'}</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <GraduationCap className="w-3.5 h-3.5 text-yellow-500" />
            <span>Faculty</span>
          </div>
          <p className="text-white font-semibold text-sm">{currentUser.faculty || 'N/A'}</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Calendar className="w-3.5 h-3.5 text-yellow-500" />
            <span>Academic Year</span>
          </div>
          <p className="text-white font-semibold text-sm">{currentUser.academicYear || 'N/A'}</p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <FileText className="w-3.5 h-3.5 text-yellow-500" />
            <span>Reg Number</span>
          </div>
          <p className="text-white font-semibold text-sm">{currentUser.regNumber || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;