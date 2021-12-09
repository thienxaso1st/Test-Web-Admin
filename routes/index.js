const express = require('express');
const router = express.Router();


/* GET home page. */

router.get('/', function (req, res, next) {
    //res.redirect('/admin/login');
    res.redirect('/dashboard');
})

module.exports = router;