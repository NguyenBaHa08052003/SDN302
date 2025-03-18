const { object, string } = require("yup");
const User = require("../../../models/user.model");
const { hashMake, hashCheck } = require("../../../utils/hash");
const {
  createAccessToken,
  refreshAccessToken,
} = require("../../../utils/jwt");
const BlackLists = require("../../../models/blacklist.model");
const Provider = require("../../../models/provider.model");
const OTP = require("../../../models/otp.model");
const sendEmail = require('../../../utils/email');


module.exports = {
  register: async (req, res) => {
    try {
      const body = req.body;
      let userSchema = object({
        fullname: string().required().min(6, "Ten phai toi thieu 6 ky tu"),
        email: string()
          .required()
          .email("Email không đúng định dạng")
          .test("checkEmail", "Email đã tồn tại", async (value) => {
            console.log(value);
            const user = await User.findOne({ email: value });
            console.log(user);

            return !user;
          }),
        password: string()
          .required()
          .min(8, "Mat khau phai co it nhat 8 ky tu"),
      });
      await userSchema.validate(body, {
        abortEarly: false,
      });
      body.password = await hashMake(body.password);
      const user = await User.create(body);
      return res.json({
        message: "Dang ky thanh cong",
        data: user,
      });
    } catch (e) {
      if (e.errors) {
        console.log(e.errors);
        const errors = Object.fromEntries(
          e.inner.map((err) => [err.path, err.message])
        );
        return res.json({
          message: errors,
        })
      }
      return res.json({
        message: e.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const body = req.body;
      let userSchema = object({
        email: string().required("Email hoặc mật khẩu không chính xác").email("Email hoặc mật khẩu không chính xác"),
        password: string()
          .required()
          .min(8, "Email hoặc mật khẩu không chính xác"),
      });
      await userSchema.validate(body, {
        abortEarly: false,
      });
      const provider = await Provider.findOne({ name: "email" });
      const user = await User.findOne({ email: body.email, provider: provider._id }).populate({
        path: "role",
        select: "name -_id",
      });

      if (!user) {
        return res.status(400).json({
          message: "Email hoặc mật khẩu không chính xác",
        });
      }
      const checkPassword = await hashCheck(body.password, user.password);
      if (!checkPassword) {
        return res.status(400).json({
          message: "Email hoặc mật khẩu không chính xác",
        });
      }
      const accessToken = await createAccessToken({
        userId: user._id,
      });
      // const refreshToken = await refreshAccessToken();
      return res.json({
        message: "Đăng nhập thành công",
        data: {
          accessToken,
          // refreshToken,
        },
      });
    } catch (e) {
      if (e.errors) {
        const errors = Object.fromEntries(
          e.inner.map((err) => [err.path, err.message])
        );
        return res.json({
          message: errors,
        })
      }
      return res.json({
        message: e.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.token;
      const accessToken = token.accessToken;
      if (!accessToken) {
        return res.status(404).json({
          message: "Dang xuat khong thanh cong",
        });
      }
      const tokenDie = await BlackLists.create({
        token: accessToken,
      });
      return res.json({
        message: "Đăng xuất thanh công",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Dang xuat faild",
      });
    }
  },

  profile: async (req, res) => {
    try {
      console.log("đã vào profile");
      const user = req.user;
      console.log(user);
      return res.json({
        success: true,
        message: "Đăng nhập thành công. Chào mừng bạn trở lại!!!",
        data: user,
      });
    } catch (error) {
      return res.json.status(500).json({
        success: false,
        message: "Server chết",
      });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      
      // Kiểm tra email có tồn tại không
      const user = await User.findOne({ email }).populate("provider");
      if (!user) {
        return res.status(404).json({ message: "Email không tồn tại" });
      }

      // Kiểm tra tài khoản có đăng ký bằng email/password không
      const emailProvider = await Provider.findOne({ name: "email" });
      if (!user.provider || user.provider._id.toString() !== emailProvider._id.toString()) {
        return res.status(403).json({ message: "Tài khoản này không thể đặt lại mật khẩu bằng email" });
      }

      // Tạo OTP ngẫu nhiên (6 chữ số)
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 5 * 60 * 1000; // Hết hạn sau 5 phút

      // Xóa OTP cũ nếu có
      await OTP.deleteMany({ email });

      // Lưu OTP mới vào database
      await OTP.create({ email, otp, expiresAt });

      // Gửi email OTP cho người dùng
      await sendEmail(
        email,
        "Mã OTP đặt lại mật khẩu",
        `<h2>Mã OTP của bạn là: <b>${otp}</b></h2>
         <p>OTP này sẽ hết hạn sau 5 phút. Không chia sẻ mã này với bất kỳ ai.</p>`
      );

      return res.json({ message: "Mã OTP đã được gửi qua email" });

    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      let userSchema = object({
        email: string().required("Email hoặc mật khẩu không chính xác").email("Email hoặc mật khẩu không chính xác"),
        newPassword: string()
          .required()
          .min(8, "Email hoặc mật khẩu không chính xác"),
      });
      await userSchema.validate(body, {
        abortEarly: false,
      });

      // Kiểm tra email có tồn tại không
      const user = await User.findOne({ email }).populate("provider");
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      // Kiểm tra tài khoản có đăng ký bằng email/password không
      const emailProvider = await Provider.findOne({ name: "email" });
      if (!user.provider || user.provider._id.toString() !== emailProvider._id.toString()) {
        return res.status(403).json({ message: "Tài khoản này không thể đặt lại mật khẩu bằng email" });
      }

      // Kiểm tra OTP hợp lệ không
      const otpRecord = await OTP.findOne({ email, otp });
      if (!otpRecord) {
        return res.status(400).json({ message: "OTP không hợp lệ" });
      }
      if (otpRecord.expiresAt < Date.now()) {
        await OTP.deleteOne({ email, otp }); // Xóa OTP đã hết hạn
        return res.status(400).json({ message: "OTP đã hết hạn" });
      }

      // Băm mật khẩu mới
      const hashPassword = await hashMake(newPassword);

      // Cập nhật mật khẩu mới cho user
      await User.updateOne({ email }, { password: hashPassword });

      // Xóa OTP sau khi sử dụng
      await OTP.deleteOne({ email, otp });

      return res.json({ message: "Mật khẩu đã được đặt lại thành công. Hãy đăng nhập!" });

    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

};
