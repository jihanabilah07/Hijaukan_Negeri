const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Judul postingan wajib diisi']
    },
    description: {
        type: String,
        required: [true, 'Deskripsi postingan wajib diisi']
    },
    location: {
        type: String,
        required: [true, 'Lokasi wajib diisi']
    },
    date: {
        type: Date,
        required: [true, 'Tanggal wajib diisi']
    },
    image: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author wajib diisi']
    },
    community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);