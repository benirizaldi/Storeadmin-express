const mongoose = require('mongoose');
const voucherName = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Game name must not null']
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    thumbnail: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    nominal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nominal"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

module.exports = mongoose.model('Voucher', voucherName);