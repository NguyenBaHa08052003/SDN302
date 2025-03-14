const Provider = require('../models/provider.model');
const User = require('../models/user.model');
const UserTransform = require('../transformers/user.transformers');
const { successResponse, errorResponse } = require('../utils/response');
module.exports = {
    index: async (req, res) => {
        const users = await User.find();
        return successResponse(res, users, {}, 201, "Danh sách nguoi dung");
    },
    getProviders: async (req, res) => {
        const providers = await Provider.find();
        return res.json(providers);
    },
    getDetailUser: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            if (!user) {
                return errorResponse(res, {}, 404, "Không tìm thấy người dùng");
            }
            return successResponse(res, { ...user._doc, password: undefined }, {}, 201, "Chi tiết người dùng");
        } catch (error) {
            console.log(error);

        }
    },
    updateUser: async (req, res) => {
        console.log("Da vao backend");
        const { fullname, email, phoneNumber } = req.body;
        const image = req.file ? req.file.path : null;

        const id = req.params.id;
        console.log(req.body, id);
        // return res.json(image);
        if (email) {
            return errorResponse(res, {}, 404, "Không được thay đổi email");
        }
        try {
            const user = await User.findById(id);
            if (!user) {
                return errorResponse(res, {}, 404, "Không tìm thấy người dùng");
            }
            //khong thay doi gi thi lay defaut
            user.fullname = fullname || user.fullname;
            //khong thay doi gi thi lay defaut
            user.imageUrl = image || user.imageUrl;
            //khong thay doi gi thi lay defaut
            user.phoneNumber = phoneNumber || user.phoneNumber;
            await user.save();
            return successResponse(res, new UserTransform(user), {}, 201, "Cập nhật người dùng thành công");
        } catch (error) {
            console.log(error);
        }
    }


};