const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth/v1/auth.middleware");
const uploadCloud = require("../middlewares/servers/imageUpload");
const router = express.Router();

router.get("/", userController.index);
router.get("/providers", userController.getProviders);
router.get("/update/:id", authMiddleware, userController.getDetailUser);
router.get("/favorite/:id", userController.getFavoriteLodging)
router.get("/check/:email", userController.getUserByEmail);
router.post("/favorite/:id", authMiddleware, userController.addFavoriteLodging)
router.put("/update/:id", authMiddleware, uploadCloud.single('image'), userController.updateUser);
module.exports = router;