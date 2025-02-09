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
router.get("/google/callback", passport.authenticate("google"), async (req, res) => {
    if (req.user) {
        const accessToken = await createAccessToken({
            userId: req.user._id,
          });
          const refreshToken = await refreshAccessToken();
          return res.json({
            message: "Đăng nhập thành công",
            data: {
              accessToken,
              refreshToken,
            },
        });
    } else {
      return res.status(400).json({
        message: "Không thể lấy thông tin người dùng"
      });
    }
  });
module.exports = router;
