const express = require("express");
const lodgingController = require("../../controllers/v1/lodging.controller");
const uploadCloud = require("../../middlewares/servers/imageUpload");

const router = express.Router();

router.get("/", lodgingController.getAllLodgings);
router.post("/", uploadCloud.array("images", 10), lodgingController.createLodging);
router.put("/:id", uploadCloud.array("images", 10),  lodgingController.updateLogding);
router.delete("/:id", lodgingController.deleteLodging);
module.exports = router;
