const {Cart} = require('../models/')

exports.addToCart = async (req,res,next) => {
    const {pid,userId} = req.body;
    try {
        const cart = await Cart.findOne({user:userId});
        const cartItem = {pid};
        let newItem;
        if(cart){
            cart.items.push(cartItem);
            newItem = cart;
        } else {
            newItem = new Cart();
            newItem.user = userId;
            newItem.items.push(cartItem);
        }
        
        const item = await newItem.save();
        
        return res.status(200).json({item: item,message: 'Item added successfully'})
    } catch(err){
        return next({
            status : 400,
            message : err.message 
        })
    }
}

exports.addItemsToCartAtLogin = async (userId,cartItems) => {
	let returnItems = []
	try{
		const cart = await Cart.findOne({user:userId});
		let newItem;
		let cartItemsArray;
		if(cart){
			cartItemsArray = cart.items.map(item => item.pid);
			cartItems.forEach( pid => {
				if(cartItemsArray.indexOf(pid) === -1){
					cart.items.push({pid});
				}
			});
            newItem = cart;
		} else {
			cartItemsArray = cartItems.map(pid => ({pid}))
			newItem = new Cart();
			newItem.user = userId;
            newItem.items.push(...cartItemsArray);
		}
		
        
		const item = await newItem.save();
		returnItems = item.items.map(item => item.pid)
		return returnItems;
	} catch(err){
        return next({
            status : 400,
            message : err.message 
        })
	}
}

exports.clearCart = async (req,res,next) => {
    try{
        const {userId} = req.body
        await Cart.deleteOne({user:userId});
        res.status(200).json({ message : "cart cleared"});
    } catch(err){
        return next({
            status : 400,
            message : err.message 
        });
    } 
}

exports.removeItem = async (req,res,next) => {
    try{
        const {userId,pid} = req.body
        const cart = await Cart.findOne({user:userId});
        
        cart.items = cart.items.filter(item => item.pid!=pid);
        
        cart.save();
        res.status(200).json({ message : "Product removed"});
    } catch(err){
        console.log(err);
        
        return next({
            status : 400,
            message : err.message 
        });
    } 
}
