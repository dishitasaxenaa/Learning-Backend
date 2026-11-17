//This project is about making your own REST API

const express = require("express");
const fs = require("fs");
const url = require('url');
const users = require("./MOCK_DATA.json");

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

app.route("/users")
    .get((req, res) => {
        res.json(users);
    }).post((req, res) => {
        const newUser = req.body;
        users.push({...newUser, id: users.length + 1});
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            if(err) res.status(500);
            else return res.status(200).json({ message: "User added successfully" });
        });
    });

app.route("/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        users.map((user) => { if(user.id == id) res.json(user); })
    }).patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;
        const idx = users.findIndex((user) => user.id === id );
        if (idx === -1) return res.status(404).json({ message: "User not found" });
        users[idx] = {...users[idx], ...body};
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            if(err){
                console.log("Error: ", err);
                return res.status(500);
            } else return res.status(200).json({ message: "Information updated successfully" });
        })
    }).delete((req, res) => {
        const id = Number(req.params.id);
        const idx = users.findIndex((user) => user.id === id );
        users.splice(idx, 1);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            if(err){
                console.log("Error: ", err);
                res.json({status: 500});
            } else return res.status(200).json({ message: "User deleted successfully" });
        })
    });

app.listen(PORT, () => {
    console.log("Server Started on Port", PORT);
});