const mongoose = require("mongoose");
const User = require("./user.model");
const OrderSchema = new mongoose.Schema(
  {
    app_trans_id: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    rank: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  { timestamps: true, collection: "Orders" }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
