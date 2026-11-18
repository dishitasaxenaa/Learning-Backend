const fs = require("fs");

function handleHeader(){
    return (req, res, next) => {
        res.setHeader("X-Author", "Dishita Saxena"); 
        console.log("Middleware 1");   
        next();
    }
}

function handleLogs(){
    return (req, res, next) => {
        const url_parsed = url.parse(req.url, true);
        fs.appendFile("log.txt", `${Date.now()} ${req.method} ${url_parsed.pathname}\n`, (err, data) => {
            console.log("Middleware 1");   
            next();
        })
    }
}

module.exports = {
    handleHeader, 
    handleLogs
}