const adminService = require('./adminService');
const {body, validationResult} = require('express-validator');
const Admin = require('../../models/adminModel');
const {result} = require('lodash');
const createError = require("http-errors");

const bcrypt = require('bcrypt');
const saltRounds = 10

exports.list = async function (req, res, next) {
    let page = parseInt(req.query.page) || 1;

    const itemPerPage = 6;
    const adminList = await adminService.list(page, itemPerPage);
    const admin = adminList.rows;
    const numPages = Math.ceil(adminList.count / itemPerPage);
    //if (page> numPages) {
    //next(createError(404))
    //}
    let pages = Array(numPages)
        .fill("")
        .map((page, index) => {
            return {
                url: `/admin-list?page=${index + 1}`,
                page: index + 1,
                //active: false
            }
        })
    res.render('admin/admin-list', {
        admin,
        pages,
        previous: pages[page - 2] || false,
        next: pages[page] || false,
        title: 'TNKStore'
    });
}

exports.admin_create_get = async function (req, res) {

    res.render('admin/admin-editor', {
        pageTitle: 'Create Admin',
        action: '/admin-list/create',
        title: 'Create Admin'
    });
};

exports.admin_create_post = [
    body('username', 'Username must not be empty.').trim().isLength({min: 1}).escape(),
    body('password', 'Password must not be empty.').trim().isLength({min: 1}).escape(),

    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var admin = new Admin({
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: bcrypt.hashSync(req.body.password, saltRounds)
        });

        if (!errors.isEmpty()) {
            async.parallel({
            }, function (err, results) {
                if (err) {
                    return next(err);
                }
                res.render('admin/admin-editor', {
                    username: results.username,
                    first_name: results.first_name,
                    last_name: results.last_name,
                    password: results.password,
                    errors: errors.array()
                });
            });
        } else {
            // Data from form is valid. Save book.
            admin.save()//successful - redirect to new book record.
                .then(_ => res.redirect('/admin-list'))
                .catch(err => next(err));
        }
    }
];