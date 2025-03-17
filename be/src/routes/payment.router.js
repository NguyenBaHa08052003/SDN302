const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const moment = require("moment");
const APP_ID = "2554";
const axios = require("axios");
const KEY_1 = "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn";
const ENDPOINT = "https://sb-openapi.zalopay.vn/v2/create";

router.post("/create-payment", async (req, res) => {
  try {
    const { amount, description } = req.body;

    const app_trans_id = `${moment().format("YYMMDD")}_${Math.floor(
      Math.random() * 1000000
    )}`;

    const order = {
      app_id: APP_ID,
      app_user: "demo_user",
      app_time: Date.now(),
      amount: amount,
      app_trans_id: app_trans_id,
      embed_data: "{}",
      item: "[]",
      description: description || `Payment for Order ${app_trans_id}`,
      bank_code: "",
      callback_url: "http://localhost:5000/payment-callback",
    };

    const dataString = `${APP_ID}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = crypto
      .createHmac("sha256", KEY_1)
      .update(dataString)
      .digest("hex");
    const response = await axios.post(ENDPOINT, order);
    return res.json(response.data);
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ error: "Failed to create payment order" });
  }
});
router.post("/payment-callback", (req, res) => {
  console.log("Payment callback received:", req.body);
  res.status(200).send("OK");
});

module.exports = router;
