const User = require("../../../models/user.model");
const BlackLists = require("../../../models/blacklist.model");  
const { verifyToken } = require("../../../utils/jwt");
const UserTransformer = require("../../../transformers/user.transformers");
module.exports = async (req, res, next) => {
    try {
        const accessToken = req.get("authorization").split(" ").slice(-1).join("");
        if(!accessToken){
            return res.json({
                success: false,
                message: "Bạn không có quyền truy cập"
            });
        };
        const tokenBlackList = await BlackLists.findOne({ token: accessToken });
        if(tokenBlackList){
            return res.json({
                success: false,
                message: "Bạn không có quyền truy cập"
            });
        }
        const decode = await verifyToken(accessToken);
        if(!decode){
            return res.json({
                success: false,
                message: "Bạn không có quyền truy cập"
            });
        };
        const user = await User.findById(decode.userId);
        
        if(!user){
            return res.json({
                success: false,
                message: "Bạn không có quyền truy cập"
            });
        }
        req.user = new UserTransformer(user);
        req.token = {
            accessToken
        }
        next();
    } catch (error) {
        
    }
};
  