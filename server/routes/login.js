const logInController = require('../controllers/logInController');
const express = require('express');
const router = express.Router();

router.route('/')
    .post(logInController.auth);

module.exports = router;