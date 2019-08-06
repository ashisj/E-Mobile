const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE,{useNewUrlParser: true});

module.exports.Product = require('./productModel');