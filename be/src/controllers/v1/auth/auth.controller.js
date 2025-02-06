const { object, string } = require("yup");
const User = require("../../../models/user.model");
const { hashMake, hashCheck } = require("../../../utils/hash");
const {createAccessToken, refreshAccessToken } = require("../../../utils/jwt");
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
            id: user._id,
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
  }
};
