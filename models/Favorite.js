const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    listingId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Favorite', favoriteSchema);