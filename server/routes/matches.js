const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// @route   GET /api/matches
// @desc    Get all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().sort({ scheduledTime: 1 });
    res.json({ success: true, data: matches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/matches
// @desc    Schedule a new match
router.post('/', async (req, res) => {
  try {
    const { tournament, teamA, teamB, scheduledTime } = req.body;
    const newMatch = new Match({ tournament, teamA, teamB, scheduledTime });
    const savedMatch = await newMatch.save();
    res.status(201).json({ success: true, data: savedMatch });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/matches/:id
// @desc    Update match status, scores, and determine winner
router.put('/:id', async (req, res) => {
  try {
    const { scoreA, scoreB, status } = req.body;
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ success: false, message: 'Match එක හමු වූයේ නැත.' });
    }

    if (scoreA !== undefined) match.scoreA = Number(scoreA);
    if (scoreB !== undefined) match.scoreB = Number(scoreB);
    if (status) match.status = status;

    // Auto determine winner if completed
    if (status === 'Completed' || match.status === 'Completed') {
      if (match.scoreA > match.scoreB) {
        match.winner = match.teamA;
      } else if (match.scoreB > match.scoreA) {
        match.winner = match.teamB;
      } else {
        match.winner = 'Draw';
      }
    }

    const updatedMatch = await match.save();
    res.json({ success: true, data: updatedMatch });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;