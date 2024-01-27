const refreshTokenController = require("../controllers/refreshTokenController");
const express = require("express");
const router = express.Router();

router.route("/").post(refreshTokenController.handleRefreshToken);

module.exports = router;
