const express = require('express');
const router = express.Router();


/* GET home page. */

router.get('/', function (req, res, next) {
    res.render('auth/login', {
        title: 'Sign in',
        layout: false
    });
});

module.exports = router;