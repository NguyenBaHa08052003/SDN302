const userModel = require('../../../models/user.model');
const { successResponse, errorResponse } = require('../../../utils/response');
const roleModel = require('../../../models/role.model');
const sendEmail = require('../../../utils/email');
const { hashMake } = require('../../../utils/hash');
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().populate('role');
        if (!users) {
            return errorResponse(res, {}, 404, "Không có danh sách người dùng");
        }
        const formatUsers = users.map(user => {
            return { ...user._doc, password: undefined }
        });
        console.log(formatUsers);
        return successResponse(res, formatUsers, {}, 201, "Danh sách nguoi dung thanh cong");
    } catch (error) {
        console.log(error);

    }
};

const addUser = async (req, res) => {
    const { fullname, email, phoneNumber, role } = req.body;
    try {
        if (!fullname || !email || !phoneNumber || !role) {
            return errorResponse(res, {}, 404, "Vui long nhap day du thong tin");
        }

        const checkEmail = await userModel.findOne({ email, status: true });
        if (checkEmail) {
            return errorResponse(res, {}, 404, "Email nay da ton tai");
        }

        const randomPassword = Math.random().toString(36).slice(-8);
        const hashPassword = await hashMake(randomPassword);
        const user = await userModel.create({ fullname, email, phoneNumber, password: hashPassword, role });
        await sendEmail(email,
            "Mật khẩu do admin cung cấp",
            `<h2>Mật khẩu của bạn là: ${randomPassword}</h2>
             <a href="http://localhost:3001/verify-account/${user._id}">Click vào đây để kích hoạt tài khoản</a>
             `);

        return successResponse(res, { ...user._doc, password: undefined }, {}, 201, "Tạo người dùng thanh cong");
    } catch (error) {
        console.log(error);
    }
}

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
        const user = await userModel.findById(id);
        if (!user) {
            return errorResponse(res, {}, 404, "Không có người dùng này");
        }
        const updateUser = await userModel.findByIdAndUpdate(id, req.body, { new: true }).populate('role');
        return successResponse(res, { ...updateUser._doc, password: undefined }, {}, 201, "Cập nhật người dùng thành công");
    } catch (error) {
        console.log(error);
    }
}

const verifyAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findByIdAndUpdate(id, { status: true }, { new: true });
        return successResponse(res, { ...user, password: undefined }, {}, 201, "Kích hoạt tài khoản thành công, bạn có thể đăng nhập ngay");
    } catch (error) {
        console.log(error);
    }
}


const getAllRole = async (req, res) => {
    try {
        const roles = await roleModel.find();
        if (roles.length === 0) {
            return errorResponse(res, {}, 404, "Không có danh sách quyền");
        }
        return successResponse(res, roles, {}, 200, "Danh sách quyen");
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getAllUsers, getDetailUser, updateUser, getAllRole,
    addUser, verifyAccount
}