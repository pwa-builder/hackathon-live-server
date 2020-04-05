import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(cors());

let http = require("http").Server(app);
let io = require("socket.io")(http);

// simple '/' endpoint sending a Hello World
// response
app.get("/", (req: any, res: any) => {
  res.send("hello world");
});

io.on("connection", (socket: any) => {
  console.log("a user connected");

  const room = socket.handshake['query']['r_var'];
  socket.join(room);

  socket.on('drawing', (data: any) => {
    socket.broadcast.to(room).emit('drawing', data)
  });

  // start our simple server up on localhost:3000
});

const server = http.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:3000");
})