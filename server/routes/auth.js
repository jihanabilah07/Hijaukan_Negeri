const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Import model User
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');  // Import model Post

// Middleware untuk verifikasi token
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.user.id; // Fix: mengakses id dari struktur payload yang benar
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

// Endpoint registrasi pengguna
router.post('/register', async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Create new user
    user = new User({
      nama,
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Create JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            nama: user.nama,
            email: user.email
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// Endpoint login pengguna
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            nama: user.nama,
            email: user.email
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    res.json({
      user
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { nama, email } = req.body;
    const updates = { nama, email };

    // Check if email is being changed and if it's already taken
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.userId } });
      if (existingUser) {
        return res.status(400).json({ message: "Email sudah digunakan" });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true }
    ).select('-password');

    res.json({ message: "Profil berhasil diperbarui", user });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});

// Change password
router.put('/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Password saat ini tidak sesuai" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password berhasil diubah" });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;