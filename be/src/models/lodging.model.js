const mongoose = require("mongoose");
const User = require("./user.model");
const LodgingType = require("./lodgingtype.model");
const LodgingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    title: { type: String, required: true },
    area: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Lodgingtype" },
}, { timestamps: true, collection: 'Lodgings' });

module.exports = mongoose.model("Lodging", LodgingSchema);
