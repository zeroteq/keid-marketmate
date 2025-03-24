const express = require('express');
const Product = require('../models/Product');
const Service = require('../models/Service');
const router = express.Router();

// Get a listing by ID (either product or service)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
        res.json(product);
    } else {
        const service = await Service.findById(id);
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ message: 'Listing not found' });
        }
    }
});

module.exports = router;