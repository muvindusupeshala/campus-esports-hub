import React, { useState } from 'react';
import API from '../services/api';
import { Camera, User } from 'lucide-react';

const EditProfileModal = ({ user, setUser, onClose }) => {
  const [formData, setFormData] = useState({
    userId: user.id || user._id,
    name: user.name || '',
    gamingName: user.gamingName || '',
    faculty: user.faculty || '',
    academicYear: user.academicYear || '',
    regNumber: user.regNumber || '',
    profilePic: user.profilePic || ''
  });

  // Image File එක Base64 බවට හැරවීම
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put('/auth/update-profile', formData);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      onClose();
    } catch (err) {
      console.error('Profile update failed', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Edit Profile</h3>
        
        {/* Profile Image Preview & Upload Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500 bg-slate-800 flex items-center justify-center">
            {formData.profilePic ? (
              <img src={formData.profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-slate-500" />
            )}
            <label className="absolute bottom-0 inset-x-0 bg-black/60 hover:bg-black/80 py-1 flex items-center justify-center cursor-pointer">
              <Camera className="w-4 h-4 text-white" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <span className="text-xs text-slate-400 mt-2">ෆෝටෝ එකක් upload කිරීමට Camera icon එක click කරන්න</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white"
            placeholder="Full Name"
          />
          <input
            type="text"
            value={formData.gamingName}
            onChange={(e) => setFormData({ ...formData, gamingName: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white"
            placeholder="Gaming Name"
          />
          
          <div className="flex gap-2 justify-end mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-slate-400 hover:text-white">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm bg-yellow-500 text-slate-950 font-bold rounded-lg">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;