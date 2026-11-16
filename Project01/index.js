//This project is about making your own REST API

const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 5001;

app.use(express.urlencoded({ extended: false }));

app.route("/users")
    .get((req, res) => {
        // fs.appendFile("log.txt", `${Date.now()} ${req.url}\n`, (err, data) => {});
        res.json(users);
    }).post((req, res) => {
        const newUser = req.body;
        users.push({...newUser, id: users.length + 1});
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            if(err) console.log("Error: ", err);
            else return res.json({
                status: 200,
                id: users[users.length-1].id
            });
        });
    });

app.route("/users/:id")
    .get((req, res) => {
        // fs.appendFile("log.txt", `${Date.now()} ${req.url}\n`, (err, data) => {});
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