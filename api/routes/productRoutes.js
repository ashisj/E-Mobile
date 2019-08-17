const router = require('express').Router();
const productControllers = require('../controllers/productControllers');
const upload = require('../controllers/imageUpload');
const admin = require('../../middleware/adminAuthorization')

router
    .route('/')
    .get(productControllers.getProducts)
    .post(admin,upload.array('imageFiles',12),productControllers.addProduct);

router
    .route('/:id')
    .get(productControllers.getProduct)
module.exports = router;