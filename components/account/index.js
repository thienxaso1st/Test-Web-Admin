const express = require('express');
const router = express.Router();
const accountController = require('./accountController');
//const Product = require('../../models/productModel');

/* GET home page. */
router.get('/', accountController.info);

//router.post('', productController.list);

//router.get('/create', productController.product_create_get);
//router.post('/create', productController.product_create_post);

module.exports = router;
