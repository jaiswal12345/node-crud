var mongoose = require('mongoose');

module.exports = mongoose.model("Reviews",{
productId:{type:String,required:true},
rating:{type:Number,required:true},
subject:{type:String,required:true},
review:{type:String},
lastUpdated:{type:Date,default:Date.now}
});