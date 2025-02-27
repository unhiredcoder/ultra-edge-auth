const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    attempts: { 
        type: Number, 
        default: 0 
    }, // for login attempts
    labelVerified: { 
        type: Boolean, 
        default: false 
    } 
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
