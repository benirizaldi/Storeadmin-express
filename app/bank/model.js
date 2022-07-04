const mongoose = require('mongoose');
const bankName = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama pemilik harus diisi']
    },
    nameBank: {
        type: String,
        require: [true, 'Bank name must not null']
    },
    noRekening: {
        type: String,
        require: [true, 'Rekening Bank must not null']
    },
});

module.exports = mongoose.model('Bank', bankName);