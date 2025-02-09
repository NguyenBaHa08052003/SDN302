const mongoose = require('mongoose');
//  định nghĩa schema
const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    }

}, {collection: 'Providers'});
const Provider = mongoose.model('Provider', providerSchema);
module.exports = Provider;