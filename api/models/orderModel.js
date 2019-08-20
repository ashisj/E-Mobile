const mongoose = require('mongoose');
const {Product,User} = require('./');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User,
        unique: true
    },
    orders:[
        {
            items : [],
            total : {
                type: Number,
                required: true
            },
            orderDate: {
                type : Date,
                default: Date.now()
            }, 
            transactionId:{
                type: String,
                required: true
            },
            deliveryDetails:{}
        }
    ]
});

module.exports = mongoose.model('Order',orderSchema);