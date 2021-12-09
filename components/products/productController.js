const productService = require('./productService');
const catalogService = require('./catalogService');
const {body, validationResult} = require('express-validator');
const Catalog = require('../../models/catalogModel');
const Product = require('../../models/productModel');
const {result} = require('lodash');
const createError = require("http-errors");

exports.list = async function (req, res, next) {
    let page = parseInt(req.query.page) || 1;

    const itemPerPage = 6;
    const productsList = await productService.listWithCatalog(page, itemPerPage);
    const products = productsList.rows;
    const numPages = Math.ceil(productsList.count / itemPerPage);
    //if (page> numPages) {
    //next(createError(404))
    //}
    let pages = Array(numPages)
        .fill("")
        .map((page, index) => {
            return {
                url: `/items-list?page=${index + 1}`,
                page: index + 1,
                //active: false
            }
        })
    res.render('items/items-list', {
        products,
        pages,
        previous: pages[page - 2] || false,
        next: pages[page] || false,
        title: 'TNKStore'
    });
}

// Display product create form on GET.
exports.product_create_get = async function (req, res) {
    const catalog = await catalogService.list;

    res.render('items/item-editor', {
        pageTitle: 'Create Product',
        action: '/items-list/create',
        catalog: catalog,
        title: 'Create Product'
    });
};

exports.product_create_post = [
    body('name', 'Title must not be empty.').trim().isLength({min: 1}).escape(),
    body('amount', 'Author must not be empty.').trim().isLength({min: 1}).escape(),
    body('price', 'Summary must not be empty.').trim().isLength({min: 1}).escape(),
    body('category.*').escape(),

    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var product = new Product({
            name: req.body.name,
            amount: parseInt(req.body.amount),
            price: parseInt(req.body.price),
            catalog_id: parseInt(req.body.category)
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                /*authors: function(callback) {
                    Author.find(callback);
                },*/
            }, function (err, results) {
                if (err) {
                    return next(err);
                }
                res.render('items/item-editor', {
                    name: results.name,
                    amount: results.amount,
                    price: results.price,
                    catalog_id: results.catalog_id,
                    errors: errors.array()
                });
            });
        } else {
            // Data from form is valid. Save book.
            product.save()//successful - redirect to new book record.
                .then(_ => res.redirect('/items-list'))
                .catch(err => next(err));
        }
    }
];

// Display product delete form on GET.
exports.product_delete_get = async function (req, res, next) {
    const id = parseInt(req.query.id)
    if (id) {
        productService.deleteByID(id)
            .then(_ => res.redirect('/items-list'))
            .catch(err => next(err))
    }
};

// Handle product delete on POST.
exports.product_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: product delete POST');
};

// Display product update form on GET.
exports.product_update_get = async function (req, res, next) {
    let id = parseInt(req.params.id);

    if (id) {
        const product = await productService.getProductByIDWithCatalog(id);
        const catalog = await catalogService.list;
        res.render('items/item-editor',
            {
                pageTitle: "Update the product",
                action: '/items-list/update/' + id,
                product: product,
                catalog: catalog
            })
    } else {
        next(createError(404))
    }
};

// Handle product update on POST.
exports.product_update_post = [
    body('name', 'Title must not be empty.').trim().isLength({min: 1}).escape(),
    body('amount', 'Author must not be empty.').trim().isLength({min: 1}).escape(),
    body('price', 'Summary must not be empty.').trim().isLength({min: 1}).escape(),
    body('category.*').escape(),

    async (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const id = parseInt(req.params.id);
        // Create a Book object with escaped and trimmed data.
        const product = await productService.getProductByID(id);

        product.name = req.body.name;
        product.amount = parseInt(req.body.amount);
        product.price = parseInt(req.body.price);
        product.catalog_id = parseInt(req.body.category);

        if (!errors.isEmpty()) {
            async.parallel({}, function (err, results) {
                if (err) {
                    return next(err);
                }
                res.render('items/item-editor', {
                    name: results.name,
                    amount: results.amount,
                    price: results.price,
                    catalog_id: results.catalog_id,
                    errors: errors.array()
                });
            });
        } else {
            product.save()
                .then(_ => res.redirect('/items-list'))
                .catch(err => next(err));
        }
    }
];