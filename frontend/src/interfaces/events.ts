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

export interface GameResultType {
  winner: {
    name: string;
    id: string;
    points: number;
  };
  players: Player[];
}

export interface GameType {
  currentImage: string;
  players: Player[];
}

export interface ServerToClientEvents {
  "load-images": (images: string[]) => void;
  "update-game": (game: GameType) => void;
  "finish-game": (result: GameResultType) => void;
}

export interface ClientToServerEvents {
  "is-ready": (user: Player) => void;
  "round-winner-user": (userId: string) => void;
}
