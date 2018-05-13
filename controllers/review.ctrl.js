var Review = require('../models/review.model');

module.exports = {
    save: function(req,res){
    var review = new Review(req.body);
    review.save()
        .then(function(result){
            res.status(200);
            res.send('Added successfully');
        })
        .catch(function(err){
            res.status(500);
            res.send("Internal SErver Error");
        })
    }
}