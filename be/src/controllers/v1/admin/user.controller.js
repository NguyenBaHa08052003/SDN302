const userModel = require('../../../models/user.model');
const { successResponse, errorResponse } = require('../../../utils/response');
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        if (!users) {
            return errorResponse(res, {}, 404, "Không có danh sách người dùng");
        }
        const formatUsers = users.map(user => {
            return { ...user._doc, password: undefined }
        });
        return successResponse(res, formatUsers, {}, 201, "Danh sách nguoi dung");
    } catch (error) {
        console.log(error);

    }
};

const getDetailUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id).populate([{ path: 'role', select: 'name' }, { path: 'provider', select: 'name -_id' }]);
        if (!user) {
            return errorResponse(res, {}, 404, "Không có người dùng này");
        }
        const formatUser = { ...user._doc, password: undefined };
        return successResponse(res, formatUser, {}, 201, "Chi tiết người dùng");
    } catch (error) {
        console.log(error);

    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!user) {
            return errorResponse(res, {}, 404, "Không có người dùng này");
        }
        const { fullname, role } = req.body;
        const user = await userModel.findByIdAndUpdate(id, { fullname, role }, { new: true });
        return successResponse(res, user, {}, 201, "Cập nhật người dùng thành công");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllUsers, getDetailUser, updateUser
}