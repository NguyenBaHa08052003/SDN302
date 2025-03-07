const mongoose = require('mongoose');
const Role = require('./role.model');
const Provider = require('./provider.model');
const Lodging = require('./lodging.model');
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        default: '60b8d8d8d8d8d8d8d8d8d8d8',
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        default: '67a8b65e9a36f2ef8c4f01e7',
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    favLodging: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Lodging'
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    }

}, { collection: 'Users' });
const User = mongoose.model('User', userSchema);
module.exports = User;