const express = require("express");
const router = express.Router();
const userRouter = require("./user.router");
const authRouter = require("./v1/auth/auth.router");
const lodgingRouter = require("./v1/lodging.router");
const adminRouter = require("./v1/admin/user.admin.router");
const paymentRouter = require("./payment.router");
// api authentication
router.use("/auth", authRouter);
// api user
router.use("/users", userRouter);

//lodging
router.use("/lodgings", lodgingRouter);

//admin
router.use("/admin", adminRouter);
//payment zalo
router.use("/zalo", paymentRouter);

module.exports = router;