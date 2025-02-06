const { object, string } = require("yup");
const User = require("../../../models/user.model");
const { hashMake, hashCheck } = require("../../../utils/hash");
const {createAccessToken, refreshAccessToken, verifyToken } = require("../../../utils/jwt");
const BlackLists = require("../../../models/blacklist.model");

module.exports = {
  register: async (req, res) => {
    try {
        const body = req.body;
        let userSchema = object({
            fullname: string().required().min(6, "Ten phai toi thieu 6 ky tu"),
            email: string().required().email("Email không đúng định dạng").test("checkEmail", "Email đã tồn tại",async (value) => {
                console.log(value);
                
                const user = await User.findOne({ email: value });
                console.log(user);
                
                return !user
            }),
            password: string().required().min(8, "Mat khau phai co it nhat 8 ky tu")
        })
        await userSchema.validate(body, {
            abortEarly: true,
        })
        body.password = await hashMake(body.password)
        const user = await User.create(body);
        return res.json({
            message: "Dang ky thanh cong",
            data: user
        })
    } catch (e) {
        if(e.errors) {
           return res.json({
                message: e.errors
           })
        }
        return res.json({
            message: e.message
        })
    }
  },

  login: async (req, res) => {
    try {
        const body = req.body;
        let userSchema = object({
            email: string().required().email("Email không đúng định dạng"),
            password: string().required().min(8, "Mat khau phai co it nhat 8 ky tu")
        })
        await userSchema.validate(body, {
            abortEarly: true,
        })
        const user = await User.findOne({ email: body.email });
        if(!user) {
            return res.json({
                message: "Email khong ton tai"
            })
        }
        const checkPassword = await hashCheck(body.password, user.password);
        if(!checkPassword) {
            return res.json({
                message: "Mat khau khong chinh xac"
            })  
        }        
        const accessToken = await createAccessToken({
            userId: user._id,
        });
        const refreshToken = await refreshAccessToken();
        return res.json({
            message: "Dang nhap thanh cong",
            data: {
                accessToken,
                refreshToken
            }
        })  
    } catch (e) {
        if(e.errors) {
           return res.json({
                message: e.errors
           })
        }
        return res.json({
            message: e.message
        })
    }
  },

  logout: async (req, res) => {
    try {
        const token = req.token;
        const accessToken = token.accessToken;
        if(!accessToken){
            return res.json({
                message: "Dang xuat khong thanh cong"
            })
        }
        const tokenDie = await BlackLists.create({
            token: accessToken
        });
        return res.json({
            message: "Đăng xuất thanh công",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Dang xuat faild",
        })
    }
  },

  profile: async (req, res) => {
   try {
    const user = req.user;
    const token = req.token;
    return res.json({
        success: true,
        message: "Thong tin nguoi dung",
        data: user, 
        token: token
    })
   } catch (error) {
    return res.json.status(500).json({
        success: false,
        message: "Server chết",
    })
   }
  }

};
