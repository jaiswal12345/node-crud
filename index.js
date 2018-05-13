var http =require('http');
var express = require('express');
var mongoose = require('mongoose');
var productCtrl = require('./controllers/product.ctrl');
var defaultCtrl = require('./controllers/default.ctrl');
var productRouter = require('./routers/product.router');
var defaultRouter = require('./routers/default.router');
var userRouter = require('./routers/user.router');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();
app.use(bodyParser.json());
app.listen(3000,function(){
    console.log("Server started");
});
mongoose.connection.openUri("mongodb://admin:admin@ds119070.mlab.com:19070/product-demo");
function authentication(req,res,next){
    var user = jwt.verify(req.headers['authorization'],'secret',function(err){
        if (!err){
            res.status(200);
            next();
        }else{
            res.status(401);
            res.send("Unauthorized");
        }
    });
}
app.use('/',defaultRouter);
app.use('/api/users',userRouter);

// app.use(authentication);
app.use('/api/products',productRouter);