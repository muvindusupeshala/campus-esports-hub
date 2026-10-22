const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  campusId: { type: String, required: true }
});

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  captain: { type: String, required: true },
  game: { type: String, required: true },
  membersCount: { type: Number, default: 0 },
  members: [MemberSchema] // Array of team members
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);