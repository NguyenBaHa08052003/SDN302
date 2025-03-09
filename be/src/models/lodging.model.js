const mongoose = require("mongoose");
const User = require("./user.model");
const LodgingType = require("./lodgingtype.model");
const LodgingSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    images: { type: [String], required: [true, "Images are required"] },
    address: { type: String, required: [true, "Address is required"] },
    description: { type: String },
    title: { type: String, required: [true, "Title is required"] },
    area: { type: Number, required: [true, "Area is required"] },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    detail_address: {
      type: String
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Lodgingtype" },
  },
  { timestamps: true, collection: "Lodgings" }
);

module.exports = mongoose.model("Lodging", LodgingSchema);
