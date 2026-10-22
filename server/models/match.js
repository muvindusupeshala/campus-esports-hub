const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  tournament: {
    type: String,
    required: true
  },
  teamA: {
    type: String,
    required: true
  },
  teamB: {
    type: String,
    required: true
  },
  scheduledTime: {
    type: Date,
    required: true
  },
  scoreA: {
    type: Number,
    default: 0
  },
  scoreB: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Live', 'Completed'],
    default: 'Scheduled'
  },
  winner: {
    type: String,
    default: 'TBD'
  }
}, { timestamps: true });

module.exports = mongoose.model('Match', MatchSchema);