const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.user || !decoded.user.id) {
      return res.status(401).json({ message: "Token tidak valid: data user tidak lengkap" });
    }

    // Set user data in request
    req.user = {
      id: decoded.user.id
    };
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

module.exports = { verifyToken }; 