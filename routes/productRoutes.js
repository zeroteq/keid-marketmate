const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Fetch All Products
router.get('/', async (req, res) => {
    const products = await Product.find().populate('userId','displayName');
    res.json(products);
});

// Fetch a Single Product by ID
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Add a New Product
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

// Update a Product
router.put('/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Delete a Product
router.delete('/:id', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = router;