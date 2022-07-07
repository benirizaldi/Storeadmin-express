const mongoose = require('mongoose');
const playerSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email must not null']
    },
    name: {
        type: String,
        require: [true, 'Name must not null']
    },
    username: {
        type: String,
        require: [true, 'Username must not null'],
        maxlength: [255, 'panjang username harus antara 3 -225 karakter'],
        minlength: [3, 'panjang username harus antara 3 - 225 karakter']
    },
    password: {
        type: String,
        require: [true, 'Password must not null']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    avatar: {
        type: String,
    },
    fileName: { type: String },
    phoneNumber: {
        type: String,
        require: [true, 'Nomor Telepon must not null']
    },
    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);