const Product = require('../../models/productModel');
const Catalog = require('../../models/catalogModel')

exports.list = (page, itemPerPage) => Product.findAndCountAll({
    offset: ((itemPerPage * page) - itemPerPage),
    limit: itemPerPage
});

exports.listWithCatalog = (page, itemPerPage) => Product.findAndCountAll(
    {
        where: {hide: 0},
        offset: ((itemPerPage * page) - itemPerPage),
        limit: itemPerPage,
        include: [{
            model: Catalog
        }]
    })

exports.getProductByID = id => Product.findOne({where: {id: id}})

exports.deleteByID = async (id) => {
    const product = await this.getProductByID(id);
    product.hide = true
    return product.save()
}

exports.getProductByIDWithCatalog = id => Product.findOne(
    {
        where: {id: id},
        include: [{
            model: Catalog
        }]
    })