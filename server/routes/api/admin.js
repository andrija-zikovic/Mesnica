const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/productsController')

router.route('/products')
    .get(productsController.getAllProducts);

module.exports = router;