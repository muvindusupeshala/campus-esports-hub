const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    game: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ['upcoming', 'ongoing', 'completed'], 
        default: 'upcoming' 
    },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    registeredTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tournament', tournamentSchema);