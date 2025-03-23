const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const userLikeRoutes = require('./routes/userLikeRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes'); // New
const listingRoutes = require('./routes/listingRoutes'); // New

const app = express();

// CORS Configuration - Updated to handle preflight requests properly
app.use(cors({
  origin: ['http://localhost:8080', 'https://yourdomain.com'], // Specify all allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Enable credentials (cookies, authorization headers, etc)
}));

// Parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/userLikes', userLikeRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes); // New
app.use('/api/listings', listingRoutes); // New

// MongoDB Connection
mongoose.connect('mongodb+srv://contactglobaldynamic:Gg5pSJWuPjducRjJ@cluster0.2tt69.mongodb.net/KeidZimbabwe?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('MongoDB Connection Error:', err));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
