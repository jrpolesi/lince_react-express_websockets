import express from "express";
import { Server } from "socket.io";
const app = express();

import Room from "./models/game.js";

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
  const room = rooms[0];

  room.users.push({ id: socket.id, isReady: false, points: 0 });

  socket.on("disconnect", () => {

    room.users = room.users.filter(({id}) => id !== socket.id)
  })

  socket.on("is-ready", (updatedUser) => {
    const user = room.users.find(({ id }) => id === updatedUser.id);
    user.name = updatedUser.name;
    user.image = updatedUser.image;
    user.isReady = updatedUser.isReady;

    if (room.users.length > 1 && room.users.every(({ isReady }) => isReady)) {
      socket.emit("load-images", room.images);

      const updatedGame = {
        currentImage: room.currentImage,
        players: room.users,
      };

      socket.emit("update-game", updatedGame);
    }
  });

  socket.on("round-winner-user", (userId) => {

    room.currentImage = room.getRandomImage()

    const user = room.users.find(({ id }) => id === userId);
    user.points++;

    const sumPoints = room.users.reduce((acc, { points }) => acc + points, 0);

    if (sumPoints >= room.images.length) {
      const results = room.users.reduce(
        (acc, user) => {
          acc.pontuation[user.name] = user.points;

          if (user.points > acc.winnerPoints) {
            acc.winner = user.name;
            acc.winnerPoints = user.points;
          }

          return acc;
        },
        { winner: "", winnerPoints: 0, pontuation: {} }
      );

      socket.emit("finish-game", results);
    } else {
      const updatedGame = {
        currentImage: room.currentImage,
        players: room.users,
      };

      socket.emit("update-game", updatedGame);
    }
  });
});
