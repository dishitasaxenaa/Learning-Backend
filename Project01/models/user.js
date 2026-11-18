const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true
    },
    lastName: {
        type: String,
        required : false
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    ip_address: {
        type: String,
        required: true
    }
})

const User = new mongoose.model("user", userSchema);
module.exports = User;