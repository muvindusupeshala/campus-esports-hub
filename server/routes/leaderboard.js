const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// @route   GET /api/leaderboard
// @desc    Calculate and return leaderboard standings from completed matches
router.get('/', async (req, res) => {
  try {
    const completedMatches = await Match.find({ status: 'Completed' });
    const stats = {};

    completedMatches.forEach((match) => {
      const { teamA, teamB, scoreA, scoreB, winner } = match;

      // Initialize team stats if not exists
      if (!stats[teamA]) stats[teamA] = { team: teamA, played: 0, won: 0, lost: 0, points: 0 };
      if (!stats[teamB]) stats[teamB] = { team: teamB, played: 0, won: 0, lost: 0, points: 0 };

      stats[teamA].played += 1;
      stats[teamB].played += 1;

      if (winner === teamA || scoreA > scoreB) {
        stats[teamA].won += 1;
        stats[teamA].points += 3; // 3 points for win
        stats[teamB].lost += 1;
      } else if (winner === teamB || scoreB > scoreA) {
        stats[teamB].won += 1;
        stats[teamB].points += 3;
        stats[teamA].lost += 1;
      } else {
        // Draw / Tie
        stats[teamA].points += 1;
        stats[teamB].points += 1;
      }
    });

    // Convert stats object to array & sort by points descending
    const leaderboard = Object.values(stats).sort((a, b) => b.points - a.points);

    res.json({ success: true, data: leaderboard });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;