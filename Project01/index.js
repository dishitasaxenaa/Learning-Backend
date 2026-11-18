//This project is about making your own REST API
const express = require("express");
const {
    handleHeader, 
    handleLogs
} = require("./middleware");
//const url = require('url');
const { connectMongoDb } = require("./connection");

const {userRouter} = require("./routes/user")
const app = express();
const PORT = 5001;

//Middlewares
app.use(express.urlencoded({ extended: false }));
// app.use(handleHeader);
// app.use(handleLogs);

//Connection
connectMongoDb("mongodb://127.0.0.1:27017/Project1");

//Router
app.use("/", userRouter)

app.listen(PORT, () => {
    console.log("Server Started on Port", PORT);
});