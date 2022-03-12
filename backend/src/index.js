import express from "express";
import { Server } from "socket.io";
const app = express();


const expressServer = app.listen(3000, () => {
  console.log("Running on port 3000");
});

const io = new Server(expressServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("hello", { message: "Nice to meet you" });
});
