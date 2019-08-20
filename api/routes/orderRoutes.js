const router = require('express').Router();
const orderControllers = require('../controllers/orderControllers');

router
    .route('/')
    .post(orderControllers.placeOrder);

module.exports = router;