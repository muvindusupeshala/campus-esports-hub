const express = require('express');
const router = express.Router();
const Tournament = require('../models/tournament'); // Model path එක හරියටම තියෙනවද බලන්න

// @route   GET /api/tournaments
// @desc    Get all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json({ success: true, data: tournaments });
  } catch (err) {
    console.error("Error fetching tournaments:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/tournaments
// @desc    Create a tournament
router.post('/', async (req, res) => {
  try {
    const { title, game, startDate } = req.body;

    const newTournament = new Tournament({
      title,
      game,
      startDate
    });

    const savedTournament = await newTournament.save();
    res.status(201).json({ success: true, data: savedTournament });
  } catch (err) {
    console.error("Error creating tournament:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;