const mongoose = require('mongoose');
const userName = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email must not null']
    },
    name: {
        type: String,
        require: [true, 'Name must not null']
    },
    password: {
        type: String,
        require: [true, 'Password must not null']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    phoneNumber: {
        type: String,
        require: [true, 'Nomor Telepon must not null']
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userName);