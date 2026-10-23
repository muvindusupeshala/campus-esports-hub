const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gamingName: { type: String, required: true },
  faculty: { type: String, required: true },
  academicYear: { type: String, required: true },
  regNumber: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: '' }, // Profile Picture එක save කර ගැනීමට
  role: { type: String, enum: ['Player', 'Captain', 'Admin'], default: 'Player' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);