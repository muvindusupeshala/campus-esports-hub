import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { User, Mail, Lock, Gamepad2, GraduationCap, Calendar, FileText, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gamingName: '',
    faculty: '',
    academicYear: '',
    regNumber: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/auth/register', formData);
      
      // Token සහ User data localStorage එකේ save කර ගැනීම
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Dashboard එකට යැවීම
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Create Campus Account 🎮</h2>
        <p className="text-slate-400 text-sm text-center mb-6">Join the Campus Esports Tournament & Leaderboard Platform</p>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 text-xs mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                name="email"
                placeholder="user@campus.ac.lk"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs mb-1">Gaming Name / IGN</label>
            <div className="relative">
              <Gamepad2 className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="gamingName"
                placeholder="Gamer_Pro"
                value={formData.gamingName}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs mb-1">Faculty</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="faculty"
                placeholder="Faculty of Computing"
                value={formData.faculty}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs mb-1">Academic Year</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="academicYear"
                placeholder="Year 2"
                value={formData.academicYear}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-xs mb-1">Registration Number</label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="regNumber"
                placeholder="IT22001122"
                value={formData.regNumber}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-400 text-xs mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-950 font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <p className="text-center text-slate-400 text-xs mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;