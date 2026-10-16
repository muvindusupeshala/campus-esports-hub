const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
    teamA: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    teamB: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    scoreA: { type: Number, default: 0 },
    scoreB: { type: Number, default: 0 },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
    status: { 
        type: String, 
        enum: ['scheduled', 'ongoing', 'completed'], 
        default: 'scheduled' 
    },
    round: { type: String }, // e.g., Quarter-finals, Semi-finals, Finals
    matchDate: { type: Date, required: true }
});

module.exports = mongoose.model('Match', matchSchema);