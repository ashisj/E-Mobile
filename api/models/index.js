const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE,{useNewUrlParser: true},(err)=>{
    if(err){
        console.log(err);
    } else{
        console.log('Database connected successfully');
    }
});

module.exports.Product = require('./productModel');
module.exports.Cart = require('./cartModel');