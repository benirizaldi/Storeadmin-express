const mongoose = require('mongoose');
const voucherName = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Voucher name must not null']
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'N'
    },
    thumbnail: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    nominal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nominal"
    }
});

module.exports = mongoose.model('Voucher', voucherName);