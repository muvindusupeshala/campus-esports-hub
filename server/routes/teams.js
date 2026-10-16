const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const auth = require('../middleware/auth'); // හෝ ඔයාගේ folder name එක අනුව '../middlewares/auth'

// @route   POST /api/teams
// @desc    Create a new team (Protected)
router.post('/', auth, async (req, res) => {
    try {
        // 1. req.body එකෙන් game එකත් destruct කරගන්න
        const { teamName, game, members } = req.body;

        // 2. new Team එකට game එක එකතු කරන්න
        const newTeam = new Team({
            teamName,
            game, 
            captain: req.user.id,
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