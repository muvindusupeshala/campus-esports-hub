const express = require('express');
const router = express.Router();
const Match = require('../models/match');
const auth = require('../middleware/auth'); // ඔයාගේ folder නම අනුව check කරගන්න ('../middleware/auth')

// @route   POST /api/matches
// @desc    Schedule a new match (Protected)
router.post('/', auth, async (req, res) => {
    try {
        const { tournament, teamA, teamB, matchDate } = req.body; // scheduledTime වෙනුවට matchDate දාන්න

        const newMatch = new Match({
            tournament,
            teamA,
            teamB,
            matchDate // matchDate එක මෙතනට pass කරන්න
        });

        const savedMatch = await newMatch.save();
        res.status(201).json(savedMatch);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   GET /api/matches/tournament/:tournamentId
// @desc    Get all matches for a specific tournament
router.get('/tournament/:tournamentId', async (req, res) => {
    try {
        const matches = await Match.find({ tournament: req.params.tournamentId })
            .populate('teamA', 'teamName')
            .populate('teamB', 'teamName')
            .populate('winner', 'teamName');
        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   PUT /api/matches/:id/score
// @desc    Update match score & set winner (Protected)
router.put('/:id/score', auth, async (req, res) => {
    try {
        const { scoreA, scoreB, winner, status } = req.body;

        const updatedMatch = await Match.findByIdAndUpdate(
            req.params.id,
            { scoreA, scoreB, winner, status },
            { new: true }
        );

        if (!updatedMatch) {
            return res.status(404).json({ message: 'Match not found' });
        }

        res.json(updatedMatch);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;