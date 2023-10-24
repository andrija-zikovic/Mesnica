const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/productsController')
const orderController = require('../../controllers/orderController')

router.route('/products')
    .get(productsController.getAllProducts);

router.route('/addProduct')
    .post(productsController.createProduct);

router.route('/changeProducts')
    .post(productsController.changeProducts);

router.route('/orders')
    .get(orderController.getOrders);

router.route('/orderConfirm')
    .post(orderController.orderConfirm);

router.route('/orderReject')
    .post(orderController.orderReject);

module.exports = router;