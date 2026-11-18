const mongoose = require("mongoose");

function connectMongoDb(url){
    mongoose.connect(url)
    .then(() => { console.log("MongoDB connected"); })
    .catch((err) => { console.log("Error: ", err); });
}

module.exports = {connectMongoDb};