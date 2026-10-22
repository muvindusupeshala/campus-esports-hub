const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// @route   POST /api/auth/register
// @desc    Register user & return JWT token
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Create token payload
    const payload = {
      user: {
        name,
        email
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey123', { expiresIn: '7d' });
    res.status(201).json({ success: true, token, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & return JWT token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const payload = {
      user: {
        email
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey123', { expiresIn: '7d' });
    res.json({ success: true, token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;