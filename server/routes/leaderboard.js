const express = require('express');
const router = express.Router();
const Match = require('../models/match');
const Team = require('../models/team');

// @route   GET /api/leaderboard/:tournamentId
// @desc    Get tournament leaderboard based on match results
router.get('/:tournamentId', async (req, res) => {
    try {
        const tournamentId = req.params.tournamentId;

        // 1. Fetch all completed matches for the tournament
        const matches = await Match.find({ 
            tournament: tournamentId, 
            status: 'Completed' 
        });

        // 2. Fetch all teams participating in this tournament (or all teams generally)
        const teams = await Team.find();
        
        // Initialize stats map for teams
        const stats = {};
        teams.forEach(team => {
            stats[team._id] = {
                team: team,
                played: 0,
                won: 0,
                lost: 0,
                points: 0
            };
        });

        // 3. Calculate wins, losses, and points
        matches.forEach(match => {
            if (match.winner && stats[match.winner]) {
                stats[match.winner].played += 1;
                stats[match.winner].won += 1;
                stats[match.winner].points += 3; // 3 points for a win

                // Find the loser
                const loserId = match.teamA.toString() === match.winner.toString() 
                    ? match.teamB.toString() 
                    : match.teamA.toString();

                if (stats[loserId]) {
                    stats[loserId].played += 1;
                    stats[loserId].lost += 1;
                }
            }
        });

        // 4. Convert to array and sort by points (descending)
        const leaderboard = Object.values(stats).sort((a, b) => b.points - a.points);

        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;