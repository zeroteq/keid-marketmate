const express = require('express');
const UserLike = require('../models/UserLike');
const router = express.Router();

router.post('/', async (req, res) => {
    const userLike = new UserLike(req.body);
    await userLike.save();
    res.json(userLike);
});

router.delete('/:id', async (req, res) => {
    await UserLike.findByIdAndDelete(req.params.id);
    res.json({ message: 'Like removed' });
});

module.exports = router;