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
        require: [true, 'Username must not null']
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
        type: String
    },
    phoneNumber: {
        type: String,
        require: [true, 'Nomor Telepon must not null']
    },
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);