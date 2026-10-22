const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const Team = require('../models/team');

// @route   GET /api/leaderboard/:tournamentId
// @desc    Get tournament leaderboard based on match results
router.get('/:tournamentId', async (req, res) => {
    try {
        const tournamentId = req.params.tournamentId;

        // 🛑 Safe Guard: Dummy ID එකක් හෝ valid ObjectId එකක් නෙමෙයි නම් 500 crash වීම වැළැක්වීම
        if (!tournamentId || tournamentId === 'sample-tournament-id' || tournamentId.length !== 24) {
            return res.json({
                success: true,
                count: 0,
                data: []
            });
        }

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
                teamId: team._id,
                teamName: team.name || team.teamName || 'Unknown Team',
                matchesPlayed: 0,
                wins: 0,
                losses: 0,
                points: 0
            };
        });

        // 3. Calculate wins, losses, and points
        matches.forEach(match => {
            if (match.winner && stats[match.winner]) {
                stats[match.winner].matchesPlayed += 1;
                stats[match.winner].wins += 1;
                stats[match.winner].points += 3; // 3 points for a win

                // Find the loser
                const loserId = match.teamA.toString() === match.winner.toString() 
                    ? match.teamB.toString() 
                    : match.teamA.toString();

                if (stats[loserId]) {
                    stats[loserId].matchesPlayed += 1;
                    stats[loserId].losses += 1;
                }
            }
        });

        // 4. Convert to array and sort by points (descending)
        const leaderboard = Object.values(stats).sort((a, b) => b.points - a.points);

        // Front-end එකට පහසු වෙන්න success format එකකින් return කිරීම
        res.json({
            success: true,
            count: leaderboard.length,
            data: leaderboard
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;