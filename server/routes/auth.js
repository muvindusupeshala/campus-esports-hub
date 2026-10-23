const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { name, email, gamingName, faculty, academicYear, regNumber, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'මෙම Email එකෙන් දැනටමත් Account එකක් සදා ඇත!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      gamingName,
      faculty,
      academicYear,
      regNumber,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gamingName: user.gamingName,
        faculty: user.faculty,
        academicYear: user.academicYear,
        regNumber: user.regNumber,
        profilePic: user.profilePic || '',
        role: user.role || 'Player'
      }
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: 'Server Error එකක් සිදු විය' });
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'විද්‍යුත් තැපෑල හෝ මුරපදය වැරදියි!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'විද්‍යුත් තැපෑල හෝ මුරපදය වැරදියි!' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gamingName: user.gamingName,
        faculty: user.faculty,
        academicYear: user.academicYear,
        regNumber: user.regNumber,
        profilePic: user.profilePic || '',
        role: user.role || 'Player'
      }
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: 'Server Error එකක් සිදු විය' });
  }
});

// UPDATE USER PROFILE ROUTE
router.put('/update-profile', async (req, res) => {
  try {
    const { userId, name, gamingName, faculty, academicYear, regNumber, profilePic } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, gamingName, faculty, academicYear, regNumber, profilePic },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User හමුවී නැත' });
    }

    res.json({
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        gamingName: updatedUser.gamingName,
        faculty: updatedUser.faculty,
        academicYear: updatedUser.academicYear,
        regNumber: updatedUser.regNumber,
        profilePic: updatedUser.profilePic,
        role: updatedUser.role
      }
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ message: 'Profile එක update කිරීම අසාර්ථක විය' });
  }
});

module.exports = router;