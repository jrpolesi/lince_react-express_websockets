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
  isGameReady: boolean;
  canPlay: boolean;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    this.socket.on("connect", () => {
      this.socket.on("update-game", this.updateGame);
      this.socket.on("load-images", this.loadImages);
      this.socket.on("finish-game", this.gameIsFinish);
    });

    this.game = {} as GameType;
    this.images = [];
    this.isGameReady = false;
    this.canPlay = false;
  }

  updateGame(game: GameType) {
    this.canPlay = false;

    setTimeout(() => {
      this.game = game;
      this.canPlay = true;
    }, 3000);
  }

  loadImages(images: string[]) {
    this.isGameReady = true;
    this.images = images;
  }

  gameIsFinish(result: GameResultType) {
    this.result = result;
  }

  startGame(newUser: NewPlayer) {
    const user = {
      ...newUser,
      isReady: true,
      id: this.socket.id,
    };

    this.socket.emit("is-ready", user);
  }

  sendCorrectAnswer() {
    this.socket.emit("round-winner-user", this.socket.id);
  }
}

export const gameStore = new Game();
