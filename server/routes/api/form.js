const express = require('express');
const router = express.Router();
const formController = require('../../controllers/formController')

router.route('/')
    .post(formController.formReciver);

module.exports = router;