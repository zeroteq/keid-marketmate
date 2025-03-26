const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Fetch All Services
router.get('/', async (req, res) => {
    const services = await Service.find()
        .populate('userId', 'displayName profilePic')
        .populate('likedBy favoritedBy', '_id');
    res.json(services);
});

// Fetch a Single Service by ID
router.get('/:id', async (req, res) => {
    const service = await Service.findById(req.params.id)
        .populate('userId', 'displayName profilePic')
        .populate('likedBy favoritedBy', '_id');
    if (service) {
        res.json(service);
    } else {
        res.status(404).json({ message: 'Service not found' });
    }
});

// Add a New Service
router.post('/', async (req, res) => {
    const service = new Service(req.body);
    await service.save();
    res.json(service);
});

// Update a Service
router.put('/:id', async (req, res) => {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { 
        new: true 
    }).populate('userId', 'displayName profilePic')
      .populate('likedBy favoritedBy', '_id');
    if (service) {
        res.json(service);
    } else {
        res.status(404).json({ message: 'Service not found' });
    }
});

// Delete a Service
router.delete('/:id', async (req, res) => {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (service) {
        res.json({ message: 'Service deleted successfully' });
    } else {
        res.status(404).json({ message: 'Service not found' });
    }
});

module.exports = router;