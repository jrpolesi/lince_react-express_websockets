import { makeAutoObservable, runInAction } from "mobx";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  GameType,
  ServerToClientEvents,
  NewPlayer,
  GameFromServer,
  Player,
} from "../interfaces/events";

export class Game {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://lince-api-socket.herokuapp.com/"
  );
  game: GameType;
  images: string[];
  result?: Player[];
  isGameReady: boolean;
  canPlay: boolean;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    this.socket.on("connect", () => {
      this.socket.on("update-game", this.updateGame);
      this.socket.on("start-game", this.startGame);
      this.socket.on("finish-game", this.gameIsFinish);
      this.socket.on("update-players", this.updatePlayers);
    });

    this.game = {} as GameType;
    this.images = [];
    this.isGameReady = false;
    this.canPlay = false;
  }

  updateGame(game: GameType) {
    this.canPlay = false;
    this.game.players = game.players;

    setTimeout(() => {
      runInAction(() => {
        this.game.currentImage = game.currentImage;
        this.canPlay = true;
      });
    }, 3000);
  }

  updatePlayers(game: GameType) {
    this.game = game;
  }

  startGame(game: GameFromServer) {
    this.isGameReady = game.isGameReady;
    this.images = game.images;
  }

  gameIsFinish(game: GameType) {
    this.isGameReady = false;
    this.result = game.players;
  }

  iAmReady(newUser: NewPlayer) {
    const user = {
      ...newUser,
      isReady: true,
      id: this.socket.id,
    };

    this.socket.emit("is-ready", user);
  }

  sendCorrectAnswer(image: string) {
    this.canPlay = false;
    this.socket.emit("round-winner-user", {
      userId: this.socket.id,
      image: image,
    });
  }

  restartGame() {
    this.result = undefined;
    this.socket.emit("restart-game");
  }
}

export const gameStore = new Game();
