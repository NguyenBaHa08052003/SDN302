const { object, string } = require("yup");
const User = require("../../../models/user.model");
const { hashMake, hashCheck } = require("../../../utils/hash");
const {
  createAccessToken,
  refreshAccessToken,
} = require("../../../utils/jwt");
const BlackLists = require("../../../models/blacklist.model");
const Provider = require("../../../models/provider.model");

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
      console.log(body);
      const provider = await Provider.findOne({ name: "email" });
      const user = await User.findOne({ email: body.email, provider: provider._id }).populate({
        path: "role",
        select: "name -_id",
      });
      console.log(user);

      if (!user) {
        console.log("hello");
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
      const refreshToken = await refreshAccessToken();
      return res.json({
        message: "Đăng nhập thành công",
        data: {
          accessToken,
          refreshToken,
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
};
