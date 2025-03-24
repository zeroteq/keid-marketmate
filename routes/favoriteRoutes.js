const express = require('express');
const Favorite = require('../models/Favorite');
const router = express.Router();

// Create a favorite
router.post('/', async (req, res) => {
    const favorite = new Favorite(req.body);
    await favorite.save();
    res.json(favorite);
});

// Delete a favorite
router.delete('/:id', async (req, res) => {
    await Favorite.findByIdAndDelete(req.params.id);
    res.json({ message: 'Favorite removed' });
});

// Get favorite by userId and listingId
router.get('/', async (req, res) => {
    const { userId, listingId } = req.query;
    const favorite = await Favorite.findOne({ userId, listingId });
    res.json(favorite || {});
});

module.exports = router;