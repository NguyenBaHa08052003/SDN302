const orderModel = require('../../models/order.model.js')

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
            .populate({
                path: 'user',
                select: '-password' // Ẩn password khi populate user
            });
        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }
        )
    }
}
module.exports = { getAllOrders }