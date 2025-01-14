const { object, string } = require("yup");
const User = require("../../../models/user.model");
const { hashMake } = require("../../../utils/hash");
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
        return res.json(body);
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
};
