const mongoose = require('mongoose');
const {Product,User} = require('./');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User,
        unique: true
    },
    items:[
        {
            pid : {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: Product
            },
            count : {
                type: Number,
                default: 1
            }
        }
    ]
});

module.exports = mongoose.model('Cart',cartSchema);