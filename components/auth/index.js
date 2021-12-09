const express = require('express');
const router = express.Router();
const authController = require('./authController');
const passport = require('../../passport');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/admin/login');
});

router.get('/login', authController.login);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/admin/login?wrong-password',
}));

router.get('/logout', authController.logout);
//router.post('/create', productController.product_create_post);

//router.get('/update/:id', productController.product_update_get);
//router.post('/update/:id', productController.product_update_post);

//router.get('/delete', productController.product_delete_get);

module.exports = router;