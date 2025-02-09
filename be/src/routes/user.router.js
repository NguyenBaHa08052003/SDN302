const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get("/", userController.index);
router.get("/providers", userController.getProviders);
module.exports = router;