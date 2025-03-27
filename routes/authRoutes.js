const express = require('express');
const User = require('../models/User');
const axios = require('axios');
const router = express.Router();

// Send OTP for Signup
router.post('/send-otp', async (req, res) => {
    try {
        const { email } = req.body;

        // Call external OTP generation service
        const response = await axios.post('https://email-auth-service.vercel.app/api/generate-otp', { email });

        if (response.data.success) {
            res.json({ message: 'OTP sent to your email' });
        } else {
            res.status(500).json({ message: 'Failed to send OTP' });
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error in OTP generation' });
    }
});

// Forgot password - Send OTP
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Verify user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Call external OTP generation service
        const response = await axios.post('https://email-auth-service.vercel.app/api/generate-otp', {
            email
        });
        
        if (response.data.success) {
            res.json({ message: 'OTP sent to your email' });
        } else {
            res.status(500).json({ message: 'Failed to send OTP' });
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error in OTP generation' });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        // Call external OTP verification service
        const response = await axios.post('https://email-auth-service.vercel.app/api/verify-otp', {
            email,
            otp
        });
        
        if (response.data.success) {
            res.json({ success: true, message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ 
                success: false, 
                message: response.data.message || 'Invalid OTP' 
            });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error in OTP verification' 
        });
    }
});

module.exports = router;
