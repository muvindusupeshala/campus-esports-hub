const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const auth = require('../middleware/auth'); // or '../middlewares/auth' based on your folder name

// @route   POST /api/teams
// @desc    Create a new team (Protected)
router.post('/', auth, async (req, res) => {
    try {
        const { teamName, members } = req.body;

        const newTeam = new Team({
            teamName,
            captain: req.user.id, // Current logged-in user becomes captain
            members: members || []
        });

        const savedTeam = await newTeam.save();
        res.status(201).json(savedTeam);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   GET /api/teams
// @desc    Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find().populate('captain', 'username email');
        res.json(teams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;