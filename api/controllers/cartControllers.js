const Cart = require('../models/').Cart;
const Product = require('../models/').Product;
exports.addToCart = async (req,res,next) => {
    const {pid} = req.body;
    try {
        const newItem = new Cart();
        newItem.pid = pid;
        //newItem.count = count;
        const item = await newItem.save();
        return res.status(200).json({item: item,message: 'Item added successfully'})
    } catch(err){
        return next({
            status : 400,
            message : err.message 
        })
    }
}

exports.getCartItems = async (req,res,next) => {
    try {
        const cart = await Cart.find({});
        const cartItems = [];
        let cartLength = cart.length;

        cart.forEach(async item => {
            let cartItem = {}
            let product = await Product.findById(item.pid);
            if(product){
                cartItem['pid'] = product._id;
                cartItem['title'] = product.title;
                cartItem['price'] = product.price;
                cartItem['image'] = product.image;
                cartItem['count'] = item.count;

                cartItems.push(cartItem);
            }
            cartLength -= 1;
            if(!cartLength){
                return res.status(200).json({cart: cartItems})
            }
        })
    } catch(err){
        return next({
            status : 400,
            message : err.message 
        })
    }
}

exports.getCartIds = async (req,res,next) => {
    try {
        const cart = await Cart.find({},{pid:1,_id:0});
        const cartIds = cart.map( item => item.pid)
        return res.status(200).json({cart: cartIds})
        
    } catch(err){
        return next({
            status : 400,
            message : err.message 
        })
    }
}
