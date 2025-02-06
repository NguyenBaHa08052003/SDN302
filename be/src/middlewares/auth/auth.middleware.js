module.exports = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken || !refreshToken) {
    return res.status(401).json({
      status: false,
      message: "Bạn không có quyền truy cập",
    });
  }
  const { role } = req.user;
  if (role === "admin") {
  }
  const status = false;
  if (!status) {
    return res.status(401).json({
      status: false,
      message: "Bạn không có quyền truy cập",
    });
  }
  next();
};
