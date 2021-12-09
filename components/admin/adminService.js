const Admin = require('../../models/adminModel');

exports.list = (page, itemPerPage) => Admin.findAndCountAll({
    offset: ((itemPerPage * page) - itemPerPage),
    limit: itemPerPage
});