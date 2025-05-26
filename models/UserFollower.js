const mongoose = require('mongoose');

const userFollowerSchema = new mongoose.Schema({
    followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who follows
    followedId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User being followed
}, { timestamps: true });

module.exports = mongoose.model('UserFollower', userFollowerSchema);
