const Provider = require('../models/provider.model');
const User = require('../models/user.model');
const { successResponse } = require('../utils/response');
module.exports = {
    index : async (req, res) => {
        const users = await User.find(); 
        return successResponse(res, users, {}, 201, "Danh sách nguoi dung");
    },
    getProviders: async (req, res) => {
        const providers = await Provider.find();
        return res.json(providers);
    }
};