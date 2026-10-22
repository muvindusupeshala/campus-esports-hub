import React, { useState } from 'react';
import API from '../services/api';
import { Lock, Mail, User, LogIn, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';

const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const endpoint = isLogin ? '/auth/login' : '/auth/register';

    try {
      const res = await API.post(endpoint, formData);
      const token = res.data.token || res.data.data?.token;

      if (token) {
        localStorage.setItem('token', token);
        setSuccess(isLogin ? 'Login Successful! 🚀' : 'Registration Successful! Logging in...');
        if (onLoginSuccess) onLoginSuccess(token);
      } else {
        setSuccess('Success!');
      }
    } catch (err) {
      console.error("Auth error", err);
      setError(err.response?.data?.message || err.response?.data?.error || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl">
      <div className="text-center mb-6">
        <div className="bg-indigo-900/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 border border-indigo-700">
          <Lock className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          {isLogin ? 'Access your campus esports profile' : 'Join tournaments & manage teams'}
        </p>
      </div>

      {/* Notifications */}
      {success && (
        <div className="mb-4 flex items-center space-x-2 bg-emerald-950/50 border border-emerald-800 text-emerald-300 p-3 rounded-lg text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div className="mb-4 flex items-center space-x-2 bg-red-950/50 border border-red-800 text-red-300 p-3 rounded-lg text-sm">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-slate-400 text-sm mb-1">Full Name</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Kasun Perera"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-slate-400 text-sm mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="student@campus.ac.lk"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-400 text-sm mb-1">Password</label>
          <div className="relative">
            <Lock className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-2.5 rounded-lg transition-all shadow-md flex items-center justify-center space-x-2"
        >
          {loading ? (
            <span>Processing...</span>
          ) : isLogin ? (
            <>
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center border-t border-slate-800 pt-4">
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setSuccess('');
          }}
          className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;