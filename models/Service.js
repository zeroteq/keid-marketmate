const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    type: String,
    title: String,
    price: Number,
    description: String,
    location: String,
    images: [String],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    category: String
});

module.exports = mongoose.model('Service', serviceSchema);