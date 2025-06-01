const express = require('express');
const router = express.Router();
const ConservationPlace = require('../models/ConservationPlace');

// Get all conservation places (list only)
router.get('/', async (req, res) => {
    try {
        const places = await ConservationPlace.find()
            .select('name location coordinates status')
            .sort({ name: 1 });
        res.status(200).json(places);
    } catch (error) {
        console.error('Error fetching conservation places:', error);
        res.status(500).json({ error: 'Gagal mengambil data tempat konservasi' });
    }
});

// Get a specific conservation place
router.get('/:id', async (req, res) => {
    try {
        const place = await ConservationPlace.findById(req.params.id)
            .select('name location coordinates status');
        if (!place) {
            return res.status(404).json({ error: 'Tempat konservasi tidak ditemukan' });
        }
        res.status(200).json(place);
    } catch (error) {
        console.error('Error fetching conservation place:', error);
        res.status(500).json({ error: 'Gagal mengambil data tempat konservasi' });
    }
});

// Create a new conservation place
router.post('/', async (req, res) => {
    try {
        const {
            name,
            description,
            location,
            latitude,
            longitude,
            status,
            area,
            plantTypes
        } = req.body;

        const newPlace = new ConservationPlace({
            name,
            description,
            location,
            coordinates: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            },
            status,
            area: parseFloat(area),
            plantTypes: plantTypes ? JSON.parse(plantTypes) : []
        });

        await newPlace.save();
        res.status(201).json({
            message: 'Tempat konservasi berhasil ditambahkan',
            place: newPlace
        });
    } catch (error) {
        console.error('Error creating conservation place:', error);
        res.status(500).json({ error: 'Gagal menambahkan tempat konservasi' });
    }
});

// Update a conservation place
router.put('/:id', async (req, res) => {
    try {
        const {
            name,
            description,
            location,
            latitude,
            longitude,
            status,
            area,
            plantTypes
        } = req.body;

        const updateData = {
            name,
            description,
            location,
            coordinates: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            },
            status,
            area: parseFloat(area),
            plantTypes: plantTypes ? JSON.parse(plantTypes) : [],
            updatedAt: Date.now()
        };

        const place = await ConservationPlace.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!place) {
            return res.status(404).json({ error: 'Tempat konservasi tidak ditemukan' });
        }

        res.status(200).json({
            message: 'Tempat konservasi berhasil diperbarui',
            place
        });
    } catch (error) {
        console.error('Error updating conservation place:', error);
        res.status(500).json({ error: 'Gagal memperbarui tempat konservasi' });
    }
});

// Delete a conservation place
router.delete('/:id', async (req, res) => {
    try {
        const place = await ConservationPlace.findByIdAndDelete(req.params.id);
        if (!place) {
            return res.status(404).json({ error: 'Tempat konservasi tidak ditemukan' });
        }
        res.status(200).json({ message: 'Tempat konservasi berhasil dihapus' });
    } catch (error) {
        console.error('Error deleting conservation place:', error);
        res.status(500).json({ error: 'Gagal menghapus tempat konservasi' });
    }
});

module.exports = router; 