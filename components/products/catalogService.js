const Catalog = require('../../models/catalogModel')

exports.list = Catalog.findAll()