const express = require("express");
const authController = require("../../../controllers/v1/auth/auth.controller");
const router = express.Router();
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;