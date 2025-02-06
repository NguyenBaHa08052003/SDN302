const express = require("express");
const authController = require("../../../controllers/v1/auth/auth.controller");
const authMiddleware = require("../../../middlewares/auth/v1/auth.middleware");
const router = express.Router();
router.get("/",authMiddleware, authController.profile)
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout",authMiddleware, authController.logout);
module.exports = router;