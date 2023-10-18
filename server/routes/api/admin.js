const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/productsController')

router.route('/products')
    .get(productsController.getAllProducts);

router.route('/addProduct')
    .post(productsController.createProduct);

router.route('/changeProducts')
    .post(productsController.changeProducts);

module.exports = router;