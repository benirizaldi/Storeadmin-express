const mongoose = require('mongoose');
const nominalName = mongoose.Schema({
    coinQuantity: {
        type: Number,
        default: 0
    },
    coinName: {
        type: String,
        require: [true, 'Nominal name must not null']
    },
    price: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Nominal', nominalName);