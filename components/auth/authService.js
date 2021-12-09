const adminModel = require('../../models/adminModel');

const bcrypt = require('bcrypt');
const saltRounds = 10

exports.findByUsername = (username) => {
    return adminModel.findOne({
        where: {username: username}
    });
}

exports.validPassword = (password, user) => {
    //return user.password === password;  // use this for initial admin
    return bcrypt.compare(password, user.password);
}