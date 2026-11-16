//This project is about making your own REST API

const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 5001;

app.get("/users", (req, res) => {
    fs.appendFile("log.txt", `${Date.now()} ${req.url}\n`, (err, data) => {});
    res.json(users);
})

app.get("/users/:id", (req, res) => {
    fs.appendFile("log.txt", `${Date.now()} ${req.url}\n`, (err, data) => {});
    const id = Number(req.params.id);
    users.map((user) => {
        if(user.id === id){
            res.json(user);
        }
    })
    
})

app.listen(PORT, () => {
    console.log("Server Started on Port", PORT);
});