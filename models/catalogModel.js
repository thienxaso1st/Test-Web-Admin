const { Sequelize } = require('sequelize');
const sequelize = require('../models');

const Catalog = sequelize.define('catalog', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }}, {
        tableName: "catalog",
        timestamps: false
    });

module.exports = Catalog;