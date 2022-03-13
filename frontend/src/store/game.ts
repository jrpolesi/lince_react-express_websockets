import { makeAutoObservable } from "mobx";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  GameType,
  GameResultType,
  ServerToClientEvents,
  NewPlayer,
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
    console.log(game)
    this.game = game;
  }

  loadImages(images: string[]) {
    console.log(images)
    this.images = images;
  }

  gameIsFinish(result: GameResultType) {
    this.result = result;
  }

  startGame(newUser: NewPlayer) {
    
    const user = {
      ...newUser,
      isReady: true,
      id: this.socket.id
    }

    this.socket.emit("is-ready", user);
  }

  sendUserResponse(userId: string) {
    this.socket.emit("round-winner-user", userId);
  }
}

export const gameStore = new Game();
