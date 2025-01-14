const express = require("express");
const router = express.Router();
const userRouter = require("./user.router");
const authRouter = require("./v1/auth/auth.router");
// api authentication
router.use("/auth", authRouter);
// api user
router.use("/users", userRouter);
module.exports = router;