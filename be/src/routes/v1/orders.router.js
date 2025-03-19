const express = require("express");
const { getAllOrders } = require("../../controllers/v1/orders.controller");

const router = express.Router();

router.get('/', getAllOrders)
module.exports = router;