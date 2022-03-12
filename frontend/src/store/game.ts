import { makeAutoObservable } from "mobx";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  GameType,
  GameResultType,
  ServerToClientEvents,
  Player,
} from "../interfaces/events";

export class Game {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:3000"
  );
  game: GameType;
  images: string[];
  result?: GameResultType;

  constructor() {
    makeAutoObservable(this);
    this.socket.on("connect", () => {
      this.socket.on("update-game", this.updateGame);
      this.socket.on("load-images", this.loadImages);
      this.socket.on("finish-game", this.gameIsFinish);
    });

    this.game = {} as GameType;
    this.images = [];
  }

  updateGame(game: GameType) {
    this.game = game;
  }

  loadImages(images: string[]) {
    this.images = images;
  }

  gameIsFinish(result: GameResultType) {
    this.result = result;
  }

  startGame(user: Player) {
    this.socket.emit("is-ready", user);
  }

  sendUserResponse(userId: string) {
    this.socket.emit("round-winner-user", userId);
  }
}

export const gameStore = new Game();
