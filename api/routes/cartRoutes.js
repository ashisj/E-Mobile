const router = require('express').Router();
const cartControllers = require('../controllers/cartControllers');

router
    .route('/')
    .get(cartControllers.getCartItems)
    .post(cartControllers.addToCart);

router
    .route('/ids')
    .get(cartControllers.getCartIds)
module.exports = router;