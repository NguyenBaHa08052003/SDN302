const express = require("express");
const router = express.Router();
const userRouter = require("./user.router");
const authRouter = require("./v1/auth/auth.router");
const authMiddleware = require("../middlewares/auth/v1/auth.middleware");
const lodgingRouter = require("./v1/lodging.router");
// api authentication
router.use("/auth", authRouter);
// api user
router.use("/users", userRouter);

//lodging
router.use("/lodgings", lodgingRouter);

//admin

// router.use("/admin", authMiddleware, userRouter);
module.exports = router;