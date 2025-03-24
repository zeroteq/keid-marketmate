const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Service = require('../models/Service');
const Favorite = require('../models/Favorite');
const UserLike = require('../models/UserLike');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.json(user);
});

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
    const { displayName, phone, whatsapp, bio, profilePic, location } = req.body;
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { displayName, phone, whatsapp, bio, profilePic, location },
        { new: true }
    );
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
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

module.exports = router;