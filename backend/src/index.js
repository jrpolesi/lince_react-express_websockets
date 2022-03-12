import express from "express";
import { Server } from "socket.io";
const app = express();

import Room from './models/game';

const expressServer = app.listen(3000, () => {
  console.log("Running on port 3000");
});

const io = new Server(expressServer, {
  cors: {
    origin: "*",
  },
});

const rooms = [];
const images = [];

io.on("connection", (socket) => {
  if (rooms.length === 0) {
    rooms.push(new Room(images));
  }
  const room = rooms[0]

  room.users.push({ userId: socket.id, isReady: false });

  socket.on("is-ready", (updatedUser) => {
    const user = room.users.find(({ id }) => id === updatedUser.id);
    user.name = updatedUser.name;
    user.image = updatedUser.image;
    user.isReady = updatedUser.isReady;

    if (room.users.length > 1 && user.every(({ isReady }) => isReady)) {
      socket.emit("load-images", room.images)
    }
  })
});
