const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
    standings: [{
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
        matchesPlayed: { type: Number, default: 0 },
        wins: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
        points: { type: Number, default: 0 },
        kills: { type: Number, default: 0 } // Useful for Battle Royale games like PUBG
    }],
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);