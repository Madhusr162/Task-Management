const mongoose = require('mongoose');

// Defining the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin:{
        type: String,
        default: false
    }

}, { timestamp: true });

let model = mongoose.model("userModel", userSchema);

module.exports=model;
