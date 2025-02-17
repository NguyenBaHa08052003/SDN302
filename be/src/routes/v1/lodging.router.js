const express = require("express");
const lodgingController = require("../../controllers/v1/lodging.controller");
const uploadCloud = require("../../middlewares/servers/imageUpload");

const router = express.Router();

router.get("/", lodgingController.getAllLodgings);
router.post("/",uploadCloud.single('image') ,lodgingController.createLodging);

module.exports = router;
