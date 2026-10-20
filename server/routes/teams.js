const express = require('express');
const router = express.Router();
const Team = require('../models/team'); // Model path එක වෙනස් නම් බලන්න

// @route   GET /api/teams
// @desc    Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json({ success: true, data: teams });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/teams
// @desc    Register a new team (auth middleware එක මෙතනින් අයින් කළා)
router.post('/', async (req, res) => {
  try {
    const { name, captainName, contactEmail } = req.body;

    const newTeam = new Team({
      name,
      captainName,
      contactEmail
    });

    const savedTeam = await newTeam.save();
    res.status(201).json({ success: true, data: savedTeam });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;