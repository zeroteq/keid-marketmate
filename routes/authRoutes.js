const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Forgot password - Send OTP
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        // Generate OTP and send it to the user's email
        // For now, we'll just return a success message
        res.json({ message: 'OTP sent to your email' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    // Verify the OTP (for now, we'll assume it's always valid)
    if (otp === '0000') {
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
});

module.exports = router;
