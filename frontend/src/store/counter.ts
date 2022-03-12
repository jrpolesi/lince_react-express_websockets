import { makeAutoObservable } from "mobx";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  "update-game": (game: GameTypes) => void;
  "get-images": (images: string[]) => void;
}

interface ClientToServerEvents {
  hello: string;
}

interface Player {
  name: string;
  points: number;
}

interface GameTypes {
  currentImage: string;
  isReady: boolean;
  players: Player[];
}

export class Game {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:3000"
  );
  game: GameTypes;

  images: string[];

  constructor() {
    makeAutoObservable(this);
    this.socket.on("connect", () => {
      this.socket.on("update-game", this.updateGame)
      this.socket.on("get-images", this.getImages)
    })

    this.game = {} as GameTypes
    this.images = [];
  }

  updateGame(game: GameTypes) {
    this.game = game
  }

  getImages(images: string[]) {
    this.images = images
  }
}

export const gameStore = new Game();
