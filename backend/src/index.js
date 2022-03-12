import express from "express";
import socketIO from "socket.io";
const app = express();

const server = app.listen(() => {
  console.log("Running on port 3000");
});

const io = socketIO(server);

io.on("connection", (socket) => {
  socket.emit("hello", { message: "Nice to meet you" });
});
