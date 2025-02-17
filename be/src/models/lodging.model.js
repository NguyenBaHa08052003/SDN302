const mongoose = require("mongoose");

const LodgingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true }, 
}, { timestamps: true , collection: 'Lodgings'});

module.exports = mongoose.model("Lodging", LodgingSchema);
