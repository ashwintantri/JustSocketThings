const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = 3000;
const app = express();

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection",socket => {
    console.log("user connected");

    socket.on("disconnect",()=>{
        console.log("user disconnected");
    });
});

server.listen(port,()=>console.log(`Listening on port ${port}`));