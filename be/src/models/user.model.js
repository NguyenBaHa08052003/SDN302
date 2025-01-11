const mongoose = require('mongoose');
const Role = require('./role.model');
//  định nghĩa schema
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
        required: true,
        trim: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    }

}, {collection: 'Users'});
userSchema.pre('find', function() {
    this.populate('role');  
});
const User = mongoose.model('User', userSchema);
module.exports = User;