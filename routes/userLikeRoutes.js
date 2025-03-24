const express = require('express');
const UserLike = require('../models/UserLike');
const Product = require('../models/Product');
const Service = require('../models/Service');
const router = express.Router();

// Add a like
router.post('/', async (req, res) => {
    const { userId, listingId } = req.body;

    // Check if the listing is a product or service
    const product = await Product.findById(listingId);
    const service = await Service.findById(listingId);

    if (product) {
        // Increment the likes count for the product
        product.likes += 1;
        await product.save();
    } else if (service) {
        // Increment the likes count for the service
        service.likes += 1;
        await service.save();
    }

    // Save the user like
    const userLike = new UserLike({ userId, listingId });
    await userLike.save();

    res.json(userLike);
});

// Remove a like
router.delete('/:id', async (req, res) => {
    const userLike = await UserLike.findById(req.params.id);

    if (userLike) {
        // Check if the listing is a product or service
        const product = await Product.findById(userLike.listingId);
        const service = await Service.findById(userLike.listingId);

        if (product) {
            // Decrement the likes count for the product
            product.likes -= 1;
            await product.save();
        } else if (service) {
            // Decrement the likes count for the service
            service.likes -= 1;
            await service.save();
        }

        // Delete the user like
        await UserLike.findByIdAndDelete(req.params.id);
        res.json({ message: 'Like removed' });
    } else {
        res.status(404).json({ message: 'Like not found' });
    }
});

module.exports = router;