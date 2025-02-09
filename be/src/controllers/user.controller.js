const Provider = require('../models/provider.model');
const User = require('../models/user.model');
module.exports = {
    index : async (req, res) => {
        const users = await User.find(); 
        return res.json(users);
    },
    getProviders: async (req, res) => {
        const providers = await Provider.find();
        return res.json(providers);
    }
};