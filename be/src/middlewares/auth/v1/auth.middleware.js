const User = require("../../../models/user.model");
const BlackLists = require("../../../models/blacklist.model");
const { verifyToken } = require("../../../utils/jwt");
const UserTransformer = require("../../../transformers/user.transformers");
module.exports = async (req, res, next) => {
  try {
    const accessToken = req.get("authorization").split(" ").slice(-1).join("");
    console.log("ddang xuat", accessToken);
    if (!accessToken) {
      return res.status(404).json({
        success: false,
        message: "Bạn không có quyền truy cập",
      });
    }
    const tokenBlackList = await BlackLists.findOne({ token: accessToken });
    if (tokenBlackList) {
      return res.status(404).json({
        success: false,
        message: "Bạn không có quyền truy cập",
      });
    }
    const decode = await verifyToken(accessToken);
    console.log("decodeToken", decode);
    if (!decode) {
      return res.status(404).json({
        success: false,
        message: "Bạn không có quyền truy cập",
      });
    }
    const user = await User.findById(decode.userId).populate({
      path: "role",
      select: "name -_id",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Bạn không có quyền truy cập",
      });
    }
    console.log("user", user);
    
    if (!user.status) {
      return res.status(404).json({
        success: false,
        message:
          "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên!!!",
      });
    }
    console.log("user", user);
    console.log(req.originalUrl); // lay duong dan toan bo
    if (user.role.name !== 'Admin' && req.originalUrl.includes('/admin')) {
      return res.status(404).json({
        success: false,
        message: "Bạn không có quyền truy cập vì đây dành cho admin",
      });
    };

    req.user = new UserTransformer(user);
    req.token = {
      accessToken,
    };
    next();
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Bạn không có quyền truy cập",
    });
  }
};
