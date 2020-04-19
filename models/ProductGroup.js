const mongoose = require('mongoose');

const ProductGroupSchema = mongoose.Schema({
    name:{
        type: String,
        require:true,
        unique:true
    },
    baseProductGroupId:{
        type: String,
        require:true
    }
})

module.exports = mongoose.model('ProductGroup', ProductGroupSchema);