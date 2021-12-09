const express = require('express');
const router = express.Router();
const productController = require('./productController');
//const Product = require('../../models/productModel');

/* GET home page. */
router.get('/', productController.list);

//router.post('', productController.list);

router.get('/create', productController.product_create_get);
router.post('/create', productController.product_create_post);

router.get('/update/:id', productController.product_update_get);
router.post('/update/:id', productController.product_update_post);

router.get('/delete', productController.product_delete_get);

module.exports = router;
