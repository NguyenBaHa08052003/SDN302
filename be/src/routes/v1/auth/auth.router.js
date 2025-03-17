const express = require("express");
const authController = require("../../../controllers/v1/auth/auth.controller");
const authMiddleware = require("../../../middlewares/auth/v1/auth.middleware");
const passport = require("passport");
const { createAccessToken, refreshAccessToken } = require("../../../utils/jwt");
const router = express.Router();
router.get("/users", authMiddleware, authController.profile);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authMiddleware, authController.logout);

// đăng nhập với google
router.get("/google", passport.authenticate("google"));
router.get("/google/callback", passport.authenticate("google", {failureRedirect: `${process.env.FRONTEND_URL}/dang-nhap`}),async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/dang-nhap?error=Login failed`);
    }
    const accessToken = await createAccessToken({
      userId: req.user._id,
    });
    
    const refreshToken = await refreshAccessToken();
    console.log("Google", accessToken);
    res.cookie("authToken", accessToken, {
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production"
    });
    return res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    console.error("Google Callback Error:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/dang-nhap?error=Server Error`);
  }
});

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
module.exports = router;
