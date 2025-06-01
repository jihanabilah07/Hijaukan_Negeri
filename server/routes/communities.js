const express = require('express');
const router = express.Router();
const Community = require('../models/Community');
const multer = require('multer');
const path = require('path');
const { verifyToken } = require('../middleware/auth');

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Hanya gambar dengan format JPG, JPEG, atau PNG yang diperbolehkan'));
    }
  },
});

// Middleware untuk menangani error dari multer
const uploadMiddleware = (req, res, next) => {
  upload.single('foto')(req, res, function (err) {
    if (err instanceof multer.MulterError || err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

// Endpoint POST untuk membuat komunitas
router.post('/', [verifyToken, uploadMiddleware], async (req, res) => {
  try {
    const { nama, deskripsi } = req.body;
    const foto = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate input
    if (!nama || !deskripsi) {
      return res.status(400).json({ error: 'Nama dan deskripsi komunitas diperlukan' });
    }

    // Validate user authentication
    if (!req.user || !req.user.id) {
      console.error('User data missing:', { reqUser: req.user, headers: req.headers });
      return res.status(401).json({ error: 'User tidak terautentikasi dengan benar' });
    }

    // Create community with explicit creator ID
    const newCommunity = new Community({
      nama,
      deskripsi,
      foto,
      creator: req.user.id
    });

    const savedCommunity = await newCommunity.save();
    
    // Populate creator data
    const populatedCommunity = await Community.findById(savedCommunity._id)
      .populate('creator', 'nama email');

    console.log('Community created successfully:', populatedCommunity);

    res.status(201).json({
      message: 'Komunitas berhasil dibuat',
      community: populatedCommunity,
    });
  } catch (error) {
    console.error('Error creating community:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validasi gagal: ' + Object.values(error.errors).map(err => err.message).join(', ')
      });
    }
    res.status(500).json({ error: error.message || 'Gagal membuat komunitas' });
  }
});

// Endpoint GET untuk mengambil semua komunitas
router.get('/', async (req, res) => {
  try {
    const communities = await Community.find()
      .populate('creator', 'nama email')
      .sort({ createdAt: -1 });
    res.status(200).json(communities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    res.status(500).json({ error: 'Gagal mengambil komunitas' });
  }
});

// Endpoint GET untuk mengambil detail komunitas berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
      .populate('creator', 'nama email');
    if (!community) {
      return res.status(404).json({ error: 'Komunitas tidak ditemukan' });
    }
    res.status(200).json(community);
  } catch (error) {
    console.error('Error fetching community:', error);
    res.status(500).json({ error: 'Gagal mengambil komunitas' });
  }
});

// Get communities by user (creator)
router.get('/user/me', verifyToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'User tidak terautentikasi' });
    }

    const communities = await Community.find({ creator: req.user.id })
      .populate('creator', 'nama email')
      .sort({ createdAt: -1 });
    res.json(communities);
  } catch (error) {
    console.error('Error fetching user communities:', error);
    res.status(500).json({ error: 'Gagal mengambil komunitas pengguna' });
  }
});

module.exports = router;