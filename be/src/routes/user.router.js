const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("Hello from user.router.js");
});


module.exports = router;