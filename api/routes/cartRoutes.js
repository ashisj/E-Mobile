const router = require('express').Router();
const cartControllers = require('../controllers/cartControllers');

router
    .route('/')
    .post(cartControllers.addToCart);

router.post('/clearCart',cartControllers.clearCart);
router.post('/removeItem',cartControllers.removeItem);

module.exports = router;