const express = require("express");
const URL = require("../models/url")
const router = express.Router();

router.get("/", async (req, res) => {
    const allURL = await URL.find({});
    console.log(allURL); 
    console.log(Array.isArray(allURL));
    res.render("home", {allURL});
});

module.exports = {
    staticRouter : router
}