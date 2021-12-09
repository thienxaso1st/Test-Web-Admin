const {Sequelize} = require('sequelize');
const sequelize = require('../models');
const Catalog = require('./catalogModel');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    amount: {
        type: Sequelize.INTEGER
    },
    img: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
    old_price: {
        type: Sequelize.INTEGER
    },
    update_at: {
        type: Sequelize.DATE
    },
    description: {
        type: Sequelize.STRING
    },
    catalog_id: {
        type: Sequelize.INTEGER

    },
    hide: {
        type: Sequelize.INTEGER
    }
}, {
    tableName: "product",
    timestamps: false
});

Product.belongsTo(Catalog, {foreignKey: `catalog_id`, targetKey: `id`})

module.exports = Product;