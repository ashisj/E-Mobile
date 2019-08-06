const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true,
    },
    image : {
        type: [String],
        required: true,
        default: []
    },
    price : {
        type: Number,
        required: true,
    },
    company : {
        type: String,
        required: true
    },
    info : {
        type: String,
        required: true
    },
    itemCount : {
        type: Number,
        default: 0
    },
    addedDate : {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Product',productSchema);