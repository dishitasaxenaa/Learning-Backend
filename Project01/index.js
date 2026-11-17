//This project is about making your own REST API

const express = require("express");
const fs = require("fs");
const url = require('url');
const mongoose = require("mongoose");

const app = express();
const PORT = 5001;

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("X-Author", "Dishita Saxena");    
    next();
})

app.use((req, res, next) => {
    const url_parsed = url.parse(req.url, true);
    //console.log(url_parsed);
    fs.appendFile("log.txt", `${Date.now()} ${req.method} ${url_parsed.pathname}\n`, (err, data) => {
        next();
    })
})

mongoose.connect("mongodb://127.0.0.1:27017/Project1")
.then(() => { console.log("MongoDB connected"); })
.catch((err) => { console.log("Error: ", err); });

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

const User = new mongoose.model("user", userSchema) ;

app.route("/users")
    .get(async (req, res) => {
        const users = await User.find({});
        res.status(200).json(users);
    }).post(async (req, res) => {
        const newUser = req.body;
        await User.create({
            firstName: newUser.first_name,
            lastName: newUser.last_name,
            email: newUser.email,
            gender: newUser.gender,
            ip_address: newUser.ip_address
        });
        return res.status(201).json({ msg: "success" });
    });

app.route("/users/:id")
    .get(async (req, res) => {
        const userSearched = await User.findById(req.params.id);
        return res.status(200).json(userSearched);
    }).patch(async (req, res) => {
        const body = req.body;
        await User.findByIdAndUpdate(req.params.id, {...body});
        return res.status(200).json({ msg: "Information updated successfully" });
    }).delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({ msg: "User deleted successfully" });
    });

app.listen(PORT, () => {
    console.log("Server Started on Port", PORT);
});