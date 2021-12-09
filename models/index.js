const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);
//const sequelize = new Sequelize("mysql://thienxaso1st:tdht27092001@db4free.net:3306/tnkdatabase");

module.exports = sequelize;