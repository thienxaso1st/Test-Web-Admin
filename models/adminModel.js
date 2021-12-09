const passport = require('passport');
const { Sequelize } = require('sequelize');
const sequelize = require('../models');

const Admin = sequelize.define('admin', {
    username: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING
    }}, {
        tableName: "admin",
        timestamps: false
    });

module.exports = Admin;