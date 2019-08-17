const {User,Cart} = require('../models/');
const cartControllers = require('./cartControllers');
exports.user = async (req,res,next) => {
	try{
		if (req.user) {
			const user = req.user;
			const resData = {}
			if(user.local){
				resData.email = user.local.email || user.google.email;
				resData.name = user.name;
				resData._id = user._id;
				resData.isAdmin = user.isAdmin;
			}
			let cart = await Cart.findOne({user:user._id});
			if(cart){
				cart = cart.items.map(item => item.pid);
				resData.cart = cart
			}
			
			return res.status(200).json({ user : resData })
		} else {
			return res.status(200).json({ user: null })
		}
	} catch(err){
		next(err);
	}
}



exports.login = async (req, res,next) => {
	try{
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = {}
		if (user.local) {
			cleanUser.email = user.local.email;
		}
		cleanUser.name = user.name;
		cleanUser._id = user._id;
		cleanUser.isAdmin = user.isAdmin;
		let cartItem = [];
		if(req.body.cart){
			cartItem = await cartControllers.addItemsToCartAtLogin(cleanUser._id,JSON.parse(req.body.cart));
			if(cartItem.length){
				cleanUser.cart = cartItem;
			}
		} else {
			cartItem = await cartControllers.addItemsToCartAtLogin(cleanUser._id,[]);
			if(cartItem.length){
				cleanUser.cart = cartItem;
			}
		}
		return res.status(200).json({ message: 'Login successfull', user: cleanUser})
	} catch(err){
		next(err);
	}
}

exports.googleLogin = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.status(401).json({message:'User Not Authenticated'});
		}
		const user = req.user;
		const cleanUser = {}
		if (user.google) {
			cleanUser.email = user.google.email;
		}
		cleanUser._id = user._id;
		cleanUser.name = user.name;
		cleanUser.isAdmin = user.isAdmin;
		let cartItem = [];
		if(req.body.cart){
			cartItem = await cartControllers.addItemsToCartAtLogin(cleanUser._id,JSON.parse(req.body.cart));
			if(cartItem.length){
				cleanUser.cart = cartItem;
			}
		} else {
			cartItem = await cartControllers.addItemsToCartAtLogin(cleanUser._id,[]);
			if(cartItem.length){
				cleanUser.cart = cartItem;
			}
		}
		res.status(200).json({ message: 'Login successfull', user: cleanUser})
	} catch(err){
		next(err);
	}
}

exports.logout = (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid')
		return res.status(200).json({ message : 'logging you out' })
	} else {
		return res.status(200).json({ message : 'no user to log out!' })
	}
}

exports.signup = (req, res, next) => {
	const { name, email, password,isAdmin } = req.body;

	User.findOne({ 'local.email': email }, (err, user) => {
		if(err){
			return next({
				status: 400,
				message: err.message
			})
		}
		if (user) {
			return next({
				status: 400,
				message: `${email} is already rgistered` 
			})
		}
		const newUser = new User({
			'name':name,
			'local.email': email,
			'local.password': password,
			'isAdmin': isAdmin
		});
		
		newUser.save((err, savedUser) => {
			if (err) {
				return next({
					status: 400,
					message: `This ${email} id is already rgistered` 
				});
			}
			
			return res.status(200).json({message:'User registered successfully'});
		})
	})
}