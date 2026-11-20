const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory: {
        type: [Date],
        default: []
    }
})

const URL = new mongoose.model("URL", urlSchema);

module.exports = URL;