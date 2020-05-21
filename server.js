const express = require("express");
const path = require("path");
const expressStaticGzip = require("express-static-gzip");
const port = 80;
const app = express();
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, "dist")));
app.get("/ping", function (req, res) {
    return res.send("pong");
});

const buildPath = path.join(__dirname, "dist");
app.use(express.static(buildPath), expressStaticGzip(buildPath,{
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    setHeaders: function (res, path) {
       res.setHeader("Cache-Control", "public, max-age=31536000");
    }
 }));
app.get("/*", function (req, res) {
    res.sendFile(path.join(buildPath, "index.html"));
});
app.listen(port);
