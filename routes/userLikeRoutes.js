const express = require('express');
const UserLike = require('../models/UserLike');
const router = express.Router();

// Create a user like
router.post('/', async (req, res) => {
    const userLike = new UserLike(req.body);
    await userLike.save();
    res.json(userLike);
});

// Delete a user like
router.delete('/:id', async (req, res) => {
    await UserLike.findByIdAndDelete(req.params.id);
    res.json({ message: 'Like removed' });
});

// Get user like by userId and listingId or profileId
router.get('/', async (req, res) => {
    const { userId, listingId, profileId } = req.query;
    if (listingId) {
        const like = await UserLike.findOne({ userId, listingId });
        res.json(like || {});
    } else if (profileId) {
        const like = await UserLike.findOne({ userId, profileId });
        res.json(like || {});
    } else {
        res.status(400).json({ message: 'Invalid query parameters' });
    }
});

module.exports = router;