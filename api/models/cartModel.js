const mongoose = require('mongoose');
const Product = require('.').Product;

const cartSchema = new mongoose.Schema({
    pid : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Product
    },
    count : {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('Cart',cartSchema);