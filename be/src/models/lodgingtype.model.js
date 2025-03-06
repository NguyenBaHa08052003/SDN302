const mongoose = require('mongoose');

const LodgingTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true, collection: 'LodgingTypes' });

module.exports = mongoose.model('LodgingType', LodgingTypeSchema);