const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const PORT = 5001;

app.use(express.urlencoded({extended: false}));

mongoose.connect("mongodb://127.0.0.1:27017/Project2")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Error: ", err));

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

app.get("/:shortId", async (req, res) => {
    const user = await URL.findOne({ shortCode: req.params.shortId });
    if(user){
       user.visitHistory.push(new Date());
       await user.save();
       res.redirect(user.url);
    } 
    else res.status(404).json({ msg: "URL not found" });
})

app.post("/", async (req, res) => {
    const body = req.body;
    const code = crypto.randomUUID();
    //console.log(url);
    await URL.create({
        url: body.url,
        shortCode: code,
    })
    res.status(200).json({ shortenedUrl: "short.com/"+code });
})

app.get("/analytics/:id", async (req, res) => {
    const user = await URL.findOne({ shortCode: req.params.id });
    if(!user) res.status(404).json({ msg: "URL not found" });
    //console.log(user.clicks);
    res.status(200).json({ clicks: user.visitHistory.length});
})

app.listen(PORT, () => {
    console.log("Server running on Port: ", PORT);
});