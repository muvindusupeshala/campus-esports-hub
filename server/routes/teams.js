const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// GET all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json({ success: true, data: teams });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create team with members
router.post('/', async (req, res) => {
  try {
    const { teamName, captain, game, members } = req.body;

    const newTeam = new Team({
      teamName: teamName || req.body.name,
      captain: captain || req.body.captainName,
      game: game || req.body.gameName,
      membersCount: members ? members.length : 0,
      members: members || []
    });

    const savedTeam = await newTeam.save();
    res.status(201).json({ success: true, data: savedTeam });
  } catch (err) {
    console.error("Error creating team:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});
// @route   DELETE /api/teams/:id
// @desc    Delete a team by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ success: false, message: 'Team එක හමු වූයේ නැත.' });
    }
    res.json({ success: true, message: 'Team එක සාර්ථකව delete කරන ලදී!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;