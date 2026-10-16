const express = require('express');
const router = express.Router();
const Tournament = require('../models/tournament');
const auth = require('../middleware/auth'); // Auth middleware eka import kirima

// @route   POST /api/tournaments
// @desc    Create a new tournament (Protected)
router.post('/', auth, async (req, res) => {
    try {
        const { title, game, description, startDate, endDate } = req.body;

        const newTournament = new Tournament({
            title,
            game,
            description,
            startDate,
            endDate,
            organizer: req.user.id // Token එකෙන් කෙලින්ම Organizer ID එක ලබා ගැනීම
        });

        const savedTournament = await newTournament.save();
        res.status(201).json(savedTournament);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   GET /api/tournaments
// @desc    Get all tournaments (Public route)
router.get('/', async (req, res) => {
    try {
        const tournaments = await Tournament.find().populate('organizer', 'username email');
        res.json(tournaments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;