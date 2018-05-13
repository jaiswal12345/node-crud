var express = require("express");
var router = express.Router();
var productCtrl = require('../controllers/product.ctrl');
var reviewCtrl =  require('../controllers/review.ctrl');

router.get("/",productCtrl.get);
router.get("/:pageIndex/:pageSize",productCtrl.get);
router.get("/:id",productCtrl.getByID);
router.post('/',productCtrl.save);
router.delete("/:id",productCtrl.delete);
router.put('/:id',productCtrl.put);

//review
router.post('/review',reviewCtrl.save);
//router.get("/review/:id",productCtrl.getProductReview);
module.exports = router;