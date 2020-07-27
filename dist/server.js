"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const socket_1 = require("./controllers/socket");
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(cors());
let http = require("http").Server(app);
let io = require("socket.io")(http);
// simple '/' endpoint sending a Hello World
// response
app.get("/", (req, res) => {
    res.send("hello world");
});
// Handle connections
io.on("connection", (socket) => {
    console.log("a user connected");
    socket_1.handleConnection(socket);
});
const server = http.listen(process.env.PORT || 3000, () => {
    console.log("listening on *:3000");
});
//# sourceMappingURL=server.js.map