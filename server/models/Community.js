const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  nama: { type: String, required: true },
  deskripsi: { type: String, required: true },
  foto: { type: String }, // Path to the community photo
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Community', communitySchema);