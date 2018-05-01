var express = require("express");
var router = express.Router();
var productCtrl =require('../controllers/product.ctrl');

router.get("/",productCtrl.get);
router.get("/:id",productCtrl.getByID);
router.post('/',productCtrl.save);
router.delete("/:id",productCtrl.delete);
router.put('/:id',productCtrl.put);

module.exports = router;