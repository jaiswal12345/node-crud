var http =require('http');
var express = require('express');
var mongoose = require('mongoose');
var productCtrl = require('./controllers/product.ctrl');
var defaultCtrl = require('./controllers/default.ctrl');
var productRouter = require('./routers/product.router');
var defaultRouter = require('./routers/default.router');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.listen(3000,function(){
    console.log("Server started");
});
mongoose.connect("mongodb://localhost/productdb");
app.use('/',defaultRouter);
app.use('/api/product',productRouter);