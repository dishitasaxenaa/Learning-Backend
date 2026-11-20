const express = require("express");
const path = require("path");
const connectMongoDB = require("./connection")
const URL = require("./models/url")
const {nanoid} = require("nanoid");
const { staticRouter } = require("./routes/staticRouter");

const app = express();
const PORT = 5001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

connectMongoDB("mongodb://127.0.0.1:27017/Project2");

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
    const code = await nanoid(8);
    //console.log(url);
    await URL.create({
        url: body.url,
        shortCode: code
    })
    const allURL = await URL.find({});
    res.render("home", {
        shortCode: code, 
        allURL
    });
})

app.get("/analytics/:id", async (req, res) => {
    const user = await URL.findOne({ shortCode: req.params.id });
    if(!user) res.status(404).json({ msg: "URL not found" });
    //console.log(user.clicks);
    res.render("home", { clicks: user.visitHistory.length});
})

app.get("/", staticRouter);

app.listen(PORT, () => {
    console.log("Server running on Port: ", PORT);
});