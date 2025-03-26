const express = require('express');
const UserLike = require('../models/UserLike');
const Product = require('../models/Product');
const Service = require('../models/Service');
const router = express.Router();

// Check if a user has liked a listing
router.get('/', async (req, res) => {
    try {
        const { userId, listingId } = req.query;

        if (!userId || !listingId) {
            return res.status(400).json({ 
                message: 'Missing userId or listingId in query params' 
            });
        }

        const userLike = await UserLike.findOne({ userId, listingId });
        res.json(userLike || null);

    } catch (error) {
        console.error('Error checking like:', error);
        res.status(500).json({ message: 'Server error checking like status' });
    }
});

// Add a like
router.post('/', async (req, res) => {
    try {
        const { userId, listingId } = req.body;

        if (!userId || !listingId) {
            return res.status(400).json({ 
                message: 'Missing userId or listingId in request body' 
            });
        }

        // Check if like already exists
        const existingLike = await UserLike.findOne({ userId, listingId });
        if (existingLike) {
            return res.status(409).json({ 
                message: 'User has already liked this listing' 
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

        // Update the listing (product or service)
        if (product) {
            product.likes += 1;
            product.likedBy.push(userId);
            await product.save();
        } else {
            service.likes += 1;
            service.likedBy.push(userId);
            await service.save();
        }

        // Create new like
        const userLike = new UserLike({ userId, listingId });
        await userLike.save();

        res.status(201).json(userLike);

    } catch (error) {
        console.error('Error adding like:', error);
        res.status(500).json({ message: 'Server error adding like' });
    }
});

// Remove a like
router.delete('/:id', async (req, res) => {
    try {
        const userLike = await UserLike.findById(req.params.id);

        if (!userLike) {
            return res.status(404).json({ 
                message: 'Like not found' 
            });
        }

        // Update the listing (product or service)
        const product = await Product.findById(userLike.listingId);
        const service = await Service.findById(userLike.listingId);

        if (product) {
            product.likes = Math.max(0, product.likes - 1);
            product.likedBy.pull(userLike.userId);
            await product.save();
        } else if (service) {
            service.likes = Math.max(0, service.likes - 1);
            service.likedBy.pull(userLike.userId);
            await service.save();
        }

        // Delete the like
        await UserLike.findByIdAndDelete(req.params.id);
        res.json({ message: 'Like removed successfully' });

    } catch (error) {
        console.error('Error removing like:', error);
        res.status(500).json({ message: 'Server error removing like' });
    }
});

module.exports = router;