const express = require('express');
const Product = require('../models/Product');
const Service = require('../models/Service');
const router = express.Router();

// Search for Listings
router.get('/', async (req, res) => {
    const { query, category, location } = req.query;
    const searchQuery = {};

    if (query) {
        searchQuery.$or = [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ];
    }

    if (category) {
        searchQuery.category = category;
    }

    if (location) {
        searchQuery.location = location;
    }

    const products = await Product.find(searchQuery);
    const services = await Service.find(searchQuery);
    res.json([...products, ...services]);
});

module.exports = router;