require('dotenv').config()

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var express = require('express');
const { response } = require('express');

var port = process.env.port || 3000;
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    try {
        var fileStream = fs.createReadStream("index.html");
        fileStream.pipe(res);
        fileStream.on('open', () => {
            response.writeHead(200);
        })
        fileStream.on('error', (e) => {
            response.writeHead(404); // assume the file does not exist;
        })
        res.writeHead(200);
    } catch (e) {
        res.writeHead(500);
        console.log(e.stack)
    }
})


app.listen(port, err => {
    if (err) {
        throw err;
    }
    console.log(`Listening on port:\t${port}`)
});

http.createServer(app)