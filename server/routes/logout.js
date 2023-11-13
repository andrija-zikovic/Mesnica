const logoutController = require('../controllers/logoutController');
const express = require('express');
const router = express.Router(); 

router.route('/')
    .get(logoutController.handleLogout);

module.exports = router;