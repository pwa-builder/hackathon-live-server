import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { handleConnection } from "./controllers/socket";
import { handleNewImage } from "./controllers/api";
import { initStorage } from "./controllers/storage";

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(cors());

let http = require("http").Server(app);
let io = require("socket.io")(http);

initStorage();

// simple '/' endpoint sending a Hello World
// response
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("hello world");
});

app.post("/newImage", (req: express.Request, res: express.Response) => {
  handleNewImage(req, res);
});

// Handle connections
io.on("connection", (socket: SocketIO.Socket) => {
  console.log("a user connected");

  handleConnection(socket);
});

const server = http.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:3000");
})