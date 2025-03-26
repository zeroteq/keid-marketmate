const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    displayName: String,
    email: { type: String, unique: true },
    password: String,
    profilePic: { type: String, default: 'https://picsum.photos/400/400?random=11' },
    phone: String,
    whatsapp: String,
    bio: String,
    joinedDate: { type: Date, default: Date.now },
    location: String,
    likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
