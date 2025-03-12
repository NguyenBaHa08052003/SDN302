const express = require("express");
const lodgingController = require("../../controllers/v1/lodging.controller");
const uploadCloud = require("../../middlewares/servers/imageUpload");
const authMiddleware = require("../../middlewares/auth/v1/auth.middleware");

const router = express.Router();

router.get("/", lodgingController.getAllLodgings);
router.post("/", authMiddleware, uploadCloud.array("images", 10), lodgingController.createLodging);
router.put("/:id", uploadCloud.array("images", 10), lodgingController.updateLogding);
router.delete("/:id", lodgingController.deleteLodging);
router.get("/lodging-types", lodgingController.getAllLodgingTypes);
router.get("/:userId/users", lodgingController.getLodgingByUserId);
module.exports = router;
