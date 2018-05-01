var Product = require('../models/product.model');
function ProductCtrl(){
    //find 
    this.get = function (req,res){
         var product = new Product();
        Product.find(function(err,result){
            if (err){
                res.status(500);
                res.send("Internal server error");
            } else{

                res.status(200);
                res.json(result);
            }
        });
       
    };
    //find by id 
    this.getByID = function(req,res){
        var id = req.params.id;
        console.log(id);
        Product.findById(id,function(err,result){
            if (err){
                res.status(500);
                res.send("Internal Server Error");
               } else{
                res.status(200);//deleted
                res.json(result);
               }
        });  
    };
    //insert
    this.save = function(req,res){
        var product = new Product(req.body);
        product.save(function(err,result){
            if(err){
                res.status(500);
                res.send("Internal server error");
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
}
module.exports = new ProductCtrl();