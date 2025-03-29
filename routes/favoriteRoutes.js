const express = require('express');
const Favorite = require('../models/Favorite');
const Product = require('../models/Product');
const Service = require('../models/Service');
const router = express.Router();


// Fetch favorites
router.get('/', async (req, res) => {
    try {
        const { userId, listingId } = req.query;
        if (!userId || !listingId) {
            return res.status(400).json({ message: 'Missing userId or listingId in query params' });
        }
        
        const favorite = await Favorite.findOne({ userId, listingId });
        res.json(favorite || null);
    } catch (error) {
        console.error('Error checking favorite:', error);
        res.status(500).json({ message: 'Server error checking favorite status' });
    }
});


// Add to favorites
router.post('/', async (req, res) => {
    try {
        const { userId, listingId } = req.body;

        // Check if already favorited
        const existingFavorite = await Favorite.findOne({ userId, listingId });
        if (existingFavorite) {
            return res.status(409).json({ 
                message: 'Listing already in favorites' 
            });
        }

        // Check if listing exists
        const product = await Product.findById(listingId);
        const service = await Service.findById(listingId);

        if (!product && !service) {
            return res.status(404).json({ 
                message: 'Listing not found' 
            });
        }

        // Update the listing
        if (product) {
            product.favoritedBy.push(userId);
            await product.save();
        } else {
            service.favoritedBy.push(userId);
            await service.save();
        }

        // Create new favorite
        const favorite = new Favorite({ userId, listingId });
        await favorite.save();

        res.status(201).json(favorite);

    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ message: 'Server error adding favorite' });
    }
});

// Remove from favorites
router.delete('/:id', async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);

        if (!favorite) {
            return res.status(404).json({ 
                message: 'Favorite not found' 
            });
        }

        // Update the listing
        const product = await Product.findById(favorite.listingId);
        const service = await Service.findById(favorite.listingId);

        if (product) {
            product.favoritedBy.pull(favorite.userId);
            await product.save();
        } else if (service) {
            service.favoritedBy.pull(favorite.userId);
            await service.save();
        }

        // Delete the favorite
        await Favorite.findByIdAndDelete(req.params.id);
        res.json({ message: 'Favorite removed successfully' });

    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ message: 'Server error removing favorite' });
    }
});

module.exports = router;
