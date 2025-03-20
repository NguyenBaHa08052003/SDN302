const express = require("express");
const lodgingController = require("../../controllers/v1/lodging.controller");
const uploadCloud = require("../../middlewares/servers/imageUpload");
const authMiddleware = require("../../middlewares/auth/v1/auth.middleware");
const router = express.Router();

router.get("/", lodgingController.getAllLodgings);
router.post("/", authMiddleware, uploadCloud.array("images", 5), lodgingController.createLodging);
router.get("/lodging-types", lodgingController.getAllLodgingTypes);
router.get('/:id', lodgingController.getLodginById);
router.get("/:userId/users", lodgingController.getLodgingByUserId);
router.put("/:id/lodging", uploadCloud.array("images", 5),lodgingController.updateLodging);
router.put("/:id/toggle-status", lodgingController.updateStatusLoding);
module.exports = router;