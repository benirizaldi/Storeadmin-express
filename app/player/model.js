const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HAST_ROUND = 10;
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
playerSchema.path('email').validate(async function (value) {
    try {
        const count = await this.model('Player').countDocuments({ email: value });
        return !count;
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`)

playerSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, HAST_ROUND);
    next();
})

module.exports = mongoose.model('Player', playerSchema);