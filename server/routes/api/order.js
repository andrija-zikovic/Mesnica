const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController')

router.route('/')
    .post(orderController.orderHandler);

module.exports = router;