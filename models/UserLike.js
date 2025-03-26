const mongoose = require('mongoose');

const userLikeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    listingId: mongoose.Schema.Types.ObjectId,
    profileId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('UserLike', userLikeSchema);