const express = require('express');
const UserFollower = require('../models/UserFollower');
const User = require('../models/User');
const router = express.Router();

// Check if a user follows another user
router.get('/', async (req, res) => {
    try {
        const { followerId, followedId } = req.query;

        if (!followerId || !followedId) {
            return res.status(400).json({ 
                message: 'Missing followerId or followedId in query params' 
            });
        }

        const follow = await UserFollower.findOne({ followerId, followedId });
        res.json(follow || null);

    } catch (error) {
        console.error('Error checking follow status:', error);
        res.status(500).json({ message: 'Server error checking follow status' });
    }
});

// Follow a user
router.post('/', async (req, res) => {
    try {
        const { followerId, followedId } = req.body;

        if (!followerId || !followedId) {
            return res.status(400).json({ 
                message: 'Missing followerId or followedId in request body' 
            });
        }

        // Check if users are the same
        if (followerId === followedId) {
            return res.status(400).json({ 
                message: 'Users cannot follow themselves' 
            });
        }

        // Check if follow relationship already exists
        const existingFollow = await UserFollower.findOne({ followerId, followedId });
        if (existingFollow) {
            return res.status(409).json({ 
                message: 'User already follows this user' 
            });
        }

        // Check if both users exist
        const follower = await User.findById(followerId);
        const followed = await User.findById(followedId);

        if (!follower || !followed) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        // Create new follow relationship
        const userFollow = new UserFollower({ followerId, followedId });
        await userFollow.save();

        res.status(201).json(userFollow);

    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ message: 'Server error following user' });
    }
});

// Unfollow a user
router.delete('/:id', async (req, res) => {
    try {
        const userFollow = await UserFollower.findById(req.params.id);

        if (!userFollow) {
            return res.status(404).json({ 
                message: 'Follow relationship not found' 
            });
        }

        // Delete the follow relationship
        await UserFollower.findByIdAndDelete(req.params.id);
        res.json({ message: 'Unfollowed successfully' });

    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ message: 'Server error unfollowing user' });
    }
});

// Alternative unfollow endpoint using query parameters
router.delete('/', async (req, res) => {
    try {
        const { followerId, followedId } = req.query;

        if (!followerId || !followedId) {
            return res.status(400).json({ 
                message: 'Missing followerId or followedId in query params' 
            });
        }

        const userFollow = await UserFollower.findOne({ followerId, followedId });

        if (!userFollow) {
            return res.status(404).json({ 
                message: 'Follow relationship not found' 
            });
        }

        // Delete the follow relationship
        await UserFollower.deleteOne({ followerId, followedId });
        res.json({ message: 'Unfollowed successfully' });

    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ message: 'Server error unfollowing user' });
    }
});

module.exports = router;
