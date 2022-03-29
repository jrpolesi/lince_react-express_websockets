export interface Player {
  id: string;
  name: string;
  image: string;
  isReady: boolean;
  points?: number;
}

export interface NewPlayer {
  name: string;
  image: string;
}

export interface GameType {
  currentImage: string;
  isGameReady: boolean;
  players: Player[];
}

export interface GameFromServer extends GameType {
  images: string[];
}

export interface CorrectAnswer {
  userId: string;
  image: string
}

export interface ServerToClientEvents {
  "start-game": (game: GameFromServer) => void;
  "update-game": (game: GameType) => void;
  "update-players": (game: GameType) => void;
  "finish-game": (game: GameType) => void;
}

export interface ClientToServerEvents {
  "is-ready": (user: Player) => void;
  "round-winner-user": (response: CorrectAnswer) => void;
  "restart-game": () => void;
}
