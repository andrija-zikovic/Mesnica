const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/productsController');
const orderController = require('../../controllers/orderController');

router.route('/products')
    .get(productsController.getAllProducts)
    .post(productsController.createProduct)
    .put(productsController.changeProducts)
    .delete(productsController.deleteProduct);

router.route('/orders')
    .get(orderController.getOrders);

router.route('/orderConfirm')
    .post(orderController.orderConfirm);

router.route('/orderReject')
    .post(orderController.orderReject);
    
module.exports = router;