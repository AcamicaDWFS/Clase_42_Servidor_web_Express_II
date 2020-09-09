let express = require("express");
let path = require("path");
let fs = require("fs");
let app = express();
let morgan = require("morgan");
let logger = morgan("combined");



app.use(logger);

/* app.use(function (req, res, next) {
    console.log("Request IP: " + req.url);
    console.log("Request date: " + new Date());
    next();
}); */

app.use(middlewareStackPrinter(true));

app.use(function (req, res, next) {
    let filePath = path.join(__dirname, "static", req.url);
    fs.stat(filePath, function (err, fileInfo) {
        if (err) {
            next();
            return;
        }
        if (fileInfo.isFile()) {
            res.sendFile(filePath);
        } else {
            next();
        }
    });
});

app.use(function (req, res) {
    res.status(404);
    res.send("File not found!");
});

app.listen(3000, function () {
    console.log("App started on port 3000");
});

