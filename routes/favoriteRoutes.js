const express = require('express');
const Favorite = require('../models/Favorite');
const router = express.Router();

router.post('/', async (req, res) => {
    const favorite = new Favorite(req.body);
    await favorite.save();
    res.json(favorite);
});

router.delete('/:id', async (req, res) => {
    await Favorite.findByIdAndDelete(req.params.id);
    res.json({ message: 'Favorite removed' });
});

module.exports = router;