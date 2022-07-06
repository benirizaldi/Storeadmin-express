const mongoose = require('mongoose');
const bankName = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama pemilik harus diisi']
    },
    bankName: {
        type: String,
        require: [true, 'Bank name must not null']
    },
    noRekening: {
        type: String,
        require: [true, 'Rekening Bank must not null']
    },
}, { timestamps: true });

module.exports = mongoose.model('Bank', bankName);