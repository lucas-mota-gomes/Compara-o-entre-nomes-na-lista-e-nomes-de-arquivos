var express = require("express");
var http = require("http");
var socketIO = require("socket.io");
const fs = require('fs');
const open = require('open');

let dirCont;
let files;
let filesNames;

function getFiles(){
    dirCont = fs.readdirSync('./svg');
    files = dirCont.filter((elm) => elm.match(/.*\.(svg?)/ig));
    filesNames = [];
    justFileNames = [];
    
    files.forEach((file) => {
        file = file.replace('.svg', '');
        filesNames.push({
            name: file,
            path: `http://localhost:5000/svg/${file}.svg`
        });
        justFileNames.push(file);
    });
}

getFiles();

var app = express();
app.use('/', express.static('./assets'))
app.use('/svg', express.static('./svg'))
app.get("/app", function (req, res) {
    res.sendfile("./assets/index.html");
});

app.get("/io", function (req, res) {
    res.sendfile("./socket.io.js");
});
open('http://localhost:5000/app');

var server = http.createServer(app);
var io = socketIO(server, { log: false });
io.sockets.on("connection", function (socket) {
    socket.on("message", function (value) {
        if (value.length > 0) {
            getFiles();
            const nameList = value.split("\n");
            let nameList2 = [];
            nameList.forEach(element => {
                if (element.length != 0) {
                    nameList2.push(element);
                }
            });
            //filter array by name  
            const filtered = filesNames.filter((elm) => nameList2.includes(elm.name));
            const filtered2 = nameList2.filter((elm) => !justFileNames.includes(elm));
            socket.emit("NotFoundlist", filtered2);
            socket.emit("list", filtered);
        }
    });
});

server.listen(5000);