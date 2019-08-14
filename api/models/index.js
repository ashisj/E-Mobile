const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect(process.env.DATABASE).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
        
    },
    err => {
         /** handle initial connection error */ 
        console.log('error connecting to Mongo: ')
        console.log(err);
    }
);

module.exports.Product = require('./productModel');
module.exports.Cart = require('./cartModel');
module.exports.User = require('./userModel');
module.exports.db = mongoose.connection;