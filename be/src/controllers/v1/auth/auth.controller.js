const { object, string } = require("yup");
const User = require("../../../models/user.model");
const { hashMake, hashCheck } = require("../../../utils/hash");
const { createAccessToken, refreshAccessToken } = require("../../../utils/jwt");
const BlackLists = require("../../../models/blacklist.model");
const Provider = require("../../../models/provider.model");
const OTP = require("../../../models/otp.model");
const sendEmail = require("../../../utils/email");

module.exports = {
  register: async (req, res) => {
    try {
      const body = req.body;
      let userSchema = object({
        fullname: string().required().min(6, "Tên phải tối thiểu 6 ký tự"),
        email: string()
          .required()
          .email("Email không đúng định dạng")
          .test("checkEmail", "Email đã tồn tại", async (value) => {
            const user = await User.findOne({ email: value });

            return !user;
          }),
        password: string()
          .required()
          .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
      });
      await userSchema.validate(body, {
        abortEarly: false,
      });
      body.password = await hashMake(body.password);
      const user = await User.create({...body, status: true});
      return res.json({
        message: "Đăng ký thành công",
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
        });
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
        email: string()
          .required("Email hoặc mật khẩu không chính xác")
          .email("Email hoặc mật khẩu không chính xác"),
        password: string()
          .required()
          .min(8, "Email hoặc mật khẩu không chính xác"),
      });
      await userSchema.validate(body, {
        abortEarly: false,
      });
      const provider = await Provider.findOne({ name: "email" });
      const user = await User.findOne({
        email: body.email,
        provider: provider._id,
      }).populate({
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
        });
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
          message: "Đăng xuất không thành công",
        });
      }
      const tokenDie = await BlackLists.create({
        token: accessToken,
      });
      return res.json({
        message: "Đăng xuất thành công",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Đăng xuất faild",
      });
    }
  },

  profile: async (req, res) => {
    try {
      const user = req.user;
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
      if (
        !user.provider ||
        user.provider._id.toString() !== emailProvider._id.toString()
      ) {
        return res
          .status(403)
          .json({
            message: "Tài khoản này không thể đặt lại mật khẩu bằng email",
          });
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
        email: string()
          .required("Email hoặc mật khẩu không chính xác")
          .email("Email hoặc mật khẩu không chính xác"),
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
      if (
        !user.provider ||
        user.provider._id.toString() !== emailProvider._id.toString()
      ) {
        return res
          .status(403)
          .json({
            message: "Tài khoản này không thể đặt lại mật khẩu bằng email",
          });
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

      return res.json({
        message: "Mật khẩu đã được đặt lại thành công. Hãy đăng nhập!",
      });
    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { email, oldPassword, newPassword } = req.body;

      // Validate dữ liệu nhập vào
      const userSchema = object({
        email: string()
          .required("Email không hợp lệ")
          .email("Email không hợp lệ"),
        oldPassword: string().required("Vui lòng nhập mật khẩu cũ"),
        newPassword: string()
          .required()
          .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự"),
      });
      await userSchema.validate(req.body, { abortEarly: false });

      const userToken = req.user;

      if (userToken.email !== email) {
        return res.status(400).json({ message: "Email không trùng khớp" });
      }

      // Kiểm tra tài khoản có tồn tại không
      const user = await User.findOne({ email }).populate("provider");
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      // Kiểm tra tài khoản có đăng ký bằng email/password không
      const emailProvider = await Provider.findOne({ name: "email" });
      if (
        !user.provider ||
        user.provider._id.toString() !== emailProvider._id.toString()
      ) {
        return res
          .status(403)
          .json({ message: "Tài khoản này không thể thay đổi mật khẩu" });
      }

      // Kiểm tra mật khẩu cũ có đúng không
      const isMatch = await hashCheck(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Mật khẩu cũ không chính xác" });
      }

      // Băm mật khẩu mới
      const hashedPassword = await hashMake(newPassword);

      // Cập nhật mật khẩu mới
      await User.updateOne({ email }, { password: hashedPassword });

      return res.json({ message: "Mật khẩu đã được cập nhật thành công!" });
    } catch (error) {
      console.error("Lỗi changePassword:", error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  },
};
