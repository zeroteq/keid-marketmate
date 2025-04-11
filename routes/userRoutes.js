const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Service = require('../models/Service');
const Favorite = require('../models/Favorite');
const UserLike = require('../models/UserLike');
const jwt = require('jsonwebtoken');
const router = express.Router();

// I just generated a random string
const JWT_SECRET = '7c765f8b76978d3df73d0a78d98d4f072a9d854512b0c48b2d44dc75743c4790'; // Chill niggas during production we will change and add this to env vars as a secret

// Function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '30d' } // Token expires in 30 days
    );
};

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        // Generate token
        const token = generateToken(user);
        // Return user data and token
        res.json({
            user,
            token
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    // Create user with all required fields initialized
    const user = new User({ 
        name, 
        email, 
        password,
        displayName: name, 
        phone: 'Not set',        
        whatsapp: 'Not set',     
        bio: 'Tell us about yourself...', 
        location: 'Not specified',        
        
    });
    
    await user.save();
    
    // Generate token for new user
    const token = generateToken(user);
    
    // Return user data and token
    res.json({
        user,
        token
    });
});

// Auth middleware to protect routes
const protect = async (req, res, next) => {
    let token;
    
    // Check if auth header exists and starts with Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            
            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET);
            
            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');
            
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Fetch User Profile by ID
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Update User Profile
router.put('/:id', async (req, res) => {
    const allowedFields = ['displayName', 'phone', 'whatsapp', 'bio', 'profilePic', 'location'];
    const updateData = {};

    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updateData[field] = req.body[field];
        }
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
});

// Delete User Account
router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
        // Delete associated listings, favorites, and likes
        await Product.deleteMany({ userId: user._id });
        await Service.deleteMany({ userId: user._id });
        await Favorite.deleteMany({ userId: user._id });
        await UserLike.deleteMany({ userId: user._id });
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Fetch User's Listings
router.get('/:id/listings', async (req, res) => {
    const products = await Product.find({ userId: req.params.id });
    const services = await Service.find({ userId: req.params.id });
    res.json([...products, ...services]);
});

// Fetch User's Favorites
router.get('/:id/favorites', async (req, res) => {
    const favorites = await Favorite.find({ userId: req.params.id }).populate('listingId');
    res.json(favorites);
});

// Fetch User's Likes
router.get('/:id/likes', async (req, res) => {
    const likes = await UserLike.find({ userId: req.params.id }).populate('listingId');
    res.json(likes);
});

// Verify token route (useful for checking if token is valid)
router.get('/auth/verify', protect, (req, res) => {
    res.json({ isValid: true, user: req.user });
});

module.exports = router;
