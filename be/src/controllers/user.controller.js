const Provider = require('../models/provider.model');
const User = require('../models/user.model');
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
            return successResponse(res, user, {}, 201, "Chi tiết người dùng");
        } catch (error) {
            console.log(error);

        }
    }
};