const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// GET all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().sort({ scheduledTime: 1 });
    res.json({ success: true, data: matches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// CREATE a new match
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

// UPDATE match score/status/winner
router.put('/:id', async (req, res) => {
  try {
    const { scoreA, scoreB, status, winner } = req.body;
    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      { scoreA, scoreB, status, winner },
      { new: true }
    );
    res.json({ success: true, data: updatedMatch });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;