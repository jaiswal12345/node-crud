var Product = require('../models/product.model');
var Review = require('../models/review.model');
function ProductCtrl(){
    //find 
    // this.get = function (req,res){
    //      var product = new Product();
    //      //using promises
    //      Product.find().exec().then(function(result){
    //          res.status(200);
    //          res.json(result);
    //      }).catch(function(error){
    //         res.status(500);
    //         res.status("Internal server error");
    //      });
    //     // Product.find(function(err,result){
    //     //     if (err){
    //     //         res.status(500);
    //     //         res.send("Internal server error");
    //     //     } else{

    //     //         res.status(200);
    //     //         res.json(result);
    //     //     }
    //     // });
       
    // };
    //pagination

    // this.get = function(req,res){
    //     var count;
    //     var pageSize = +req.params.pageSize || 10;
    //     var pageIndex = +req.params.pageIndex || 0;
    //     Product.count().exec().then(function(result){
    //         count = result;
    //         Product.find().skip(pageIndex*pageSize).limit(pageSize).exec().then(function(product){
    //             var meta = {
    //                 totalRecords : count,
    //                 totalPages : Math.ceil(count/pageSize)
    //             };
    //             var response = {
    //                 metaData : meta,
    //                 product : product
    //             };
    //             res.status(200);
    //             res.json(response);
    //         }).catch(function(error){
    //             res.status(500);
    //             res.send(error);
    //         });
          
    //     }).catch(function(error){
    //         res.status(500);
    //         res.send(error);
    //     });
    // };
    //using promises without nesting
    
    this.get = function(req,res){
        var count;
        var pageSize = +req.params.pageSize || 10;
        var pageIndex = +req.params.pageIndex || 0;
        //deferred execution:
        var query = Product.find().skip(pageIndex*pageSize).limit(pageSize);
        var count;
        Product.count().exec()
        .then(function(result){
            count = result;
            return query.exec()
        .then(function(product){  
                var meta = {
                    totalRecords : count,
                    totalPages : Math.ceil(count/pageSize)
                };
                var response = {
                    metaData : meta,
                    product : product
                };
                res.status(200);
                res.json(response);
            }).catch(function(error){
                res.status(500);
                res.send(error);
            });
          
        })
    };


    //find by id 
    // this.getByID = function(req,res){
    //     var id = req.params.id;
    //     console.log(id);
    //     Product.findById(id,function(err,result){
    //         if (err){
    //             res.status(500);
    //             res.send("Internal Server Error");
    //            } else{
    //             res.status(200);//deleted
    //             res.json(result);
    //            }
    //     });  
    // };
    //insert
    this.save = function(req,res){
        var product = new Product(req.body);
        console.log(product);
        product.save(function(err,result){
            if(err){
                res.status(500);
                res.send(err);
            }
            else{
                res.status(200);
                res.send("saved successfully");
            }
        });
   };
   this.put = function(req,res){
    var id = req.params.id;
    //var product = new Product(req.body);
    Product.findByIdAndUpdate(id,req.body,function(err,result){
        if (err){
         res.status(500);
         res.send("Internal Server Error");
        } else{
         res.status(200);//deleted
         res.send('updated successfully');
        }
    });   
 };
   //delete function
   this.delete = function(req,res){
       var id = req.params.id;
       Product.findByIdAndRemove(id,function(err,result){
           if (err){
            res.status(500);
            res.send("Internal Server Error");
           } else{
            res.status(204);//deleted
            res.send();
           }
       });   
    };


    //finding product with its review:
    this.getByID = function(req,res){
        var id = req.params.id;
        var pro;
        var query   = Review.find({productId:id});
        var query1  = Review.aggregate([
              {$match:{productId:id}},
            {$group:{_id:"$productId",avgRating:{$avg:"$rating"}}}
        ]);
        Product.findById(id)
                .exec()
                .then(function(product){
                    pro = product.toJSON();
                    return query.exec();
                }) 
                .then(function(result){
                    pro.review = result;
                  return query1.exec();
                })
                .then(function(res1){
                    if(res1 && res1.length>0){
                        pro.avgRating = res1[0].avgRating;  
                    }      
                    res.status(200);
                    res.json(pro);
                })
                .catch(function(err){
                    res.status(500);
                    res.send(err);
                });
    };
}
module.exports = new ProductCtrl();