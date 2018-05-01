var mongoose = require('mongoose');

var productModel = mongoose.model("Product",{
    brand : String,
    model : String,
    inStock : Boolean,
    lastUpdated : Date,
    price : Number
});

module.exports = productModel;