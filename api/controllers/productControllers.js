const Product = require('../models/index').Product;

exports.getProducts = async (req,res,next) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({products:products})
    } catch(err){
        return next({
            status : 400,
            message : err.message 
        })
    }
}

exports.addProduct = async (req,res,next) => {  
    try {
    
        const image=[]
        const files = req.files;
        for(const file of files){
            image.push(`/uploads/images/${file.filename}`);
        }
    
        const {title,price,company,info,itemCount} = req.body;
        const newProduct = new Product({
            title,
            image, 
            price,
            company,
            info,
            itemCount
        });
        const product = await newProduct.save();
        return res.status(200).json({product: product})
    } catch(err){
        if (err.code === 11000) {
            err.message = 'this item is already added';
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

exports.getProduct = async (req,res,next) => {
    const id = req.params.id
    try {
        const product = await Product.find({_id:id});
        return res.status(200).json({product:product})
    } catch(err){
        return next({
            status : 400,
            message : err.message 
        })
    }
}