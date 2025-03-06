const userModel = require('../models/user.model');
const successResponse = require('../../../utils/response')
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        if (!users) {
            return errorResponse(res, {}, 404, "Không có danh sách người dùng");
        }
        return successResponse(res, users, {}, 201, "Danh sách nguoi dung");
    } catch (error) {
        console.log(error);

    }
};

module.exports = {
    getAllUsers
}