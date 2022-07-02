const mongoose = require('mongoose');
const categoryName = mongoose.Schema({
    name:{
        type:String,
        require:[true,'Category name must not null']
    }
});

module.exports = mongoose.model('Category',categoryName);