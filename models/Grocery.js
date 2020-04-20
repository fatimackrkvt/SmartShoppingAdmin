const mongoose = require('mongoose');

const GrocerySchema = mongoose.Schema({
    name:{
        type: String,
        require:true,
        unique:true
    }
})

module.exports = mongoose.model('Grocery', GrocerySchema);