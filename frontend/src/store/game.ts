import { makeAutoObservable } from "mobx";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  GameType,
  GameResultType,
  ServerToClientEvents,
  NewPlayer,
} from "../interfaces/events";

// const mockImages = [
//   "https://i.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0",
//   "https://i.picsum.photos/id/724/200/200.jpg?hmac=sUKRpiwXopeRQ36cEVnZgrG3Wd73G8iet9dfVSvmi8k",
//   "https://i.picsum.photos/id/1051/200/200.jpg?hmac=s6d4ypEjpec8nvA2zqhWzx_6ogXYM2fJ_YJwaOM1CUA",
//   "https://i.picsum.photos/id/498/200/200.jpg?hmac=qTtPQUlxKQaUfu86iZS07VWbb5NrV6vbPnPq8SM2WC8",
//   "https://i.picsum.photos/id/566/200/200.jpg?hmac=b6_RMcsCCCu5ULi6A3V8vdRrnNhtsnbHdakcGNIQd8s",
//   "https://i.picsum.photos/id/14/200/200.jpg?hmac=bwQwH7-0RPCqUVkFzd3hFhc6yDfC6_e7vgaKXZ7vFOA",
//   "https://i.picsum.photos/id/610/200/200.jpg?hmac=6qOvp5zik0MBH2bc7jzgth7yzkY8IlZXay0WCNF20DM",
//   "https://i.picsum.photos/id/79/200/200.jpg?hmac=jnCRb6UX5VWA4Kxl91zIBXPa2iJJsmVwzbxrzt6TahQ",
//   "https://i.picsum.photos/id/743/200/200.jpg?hmac=p4EqNQGnGvZo65W4_FlXvjPQG8g1ogR7bgvnrQCUnEs",
//   "https://i.picsum.photos/id/679/200/200.jpg?hmac=sPsw4YJPQkWFqo2k5UycejGhY4UXvaDXStGmvJEhFBA",
//   "https://i.picsum.photos/id/146/200/200.jpg?hmac=BEfC1fMGgqn0zNUowEDrlnKsAisQSg9rYB7RxuXpTb4",
//   "https://i.picsum.photos/id/1011/200/200.jpg?hmac=ISwJXaLKDOtBGE_n3myoHUev_P_OH3zpWqLx0yHp0pY",
//   "https://i.picsum.photos/id/660/200/200.jpg?hmac=5UOdBCKDcPq_zS0RAVkvSD934EYVyCEdExCagJur-g8",
//   "https://i.picsum.photos/id/336/200/200.jpg?hmac=VZ7MzNM30jINYNf5Oj_8zqPLTDAyKDk6eXWTGnNb4bU",
//   "https://i.picsum.photos/id/911/200/200.jpg?hmac=0atndFqwalkRV7EdIfbZZ_7srC7u_3UtGX9T1vd-sfk",
//   "https://i.picsum.photos/id/188/200/200.jpg?hmac=TipFoTVq-8WOmIswCmTNEcphuYngcdkCBi4YR7Hv6Cw",
//   "https://i.picsum.photos/id/409/200/200.jpg?hmac=AY8BYOBixnRqVEMdEhYmw49e-6qu3M3zf_xXjkAuHHc",
//   "https://i.picsum.photos/id/327/200/200.jpg?hmac=-qY8ApRJQJVHwDBxBmp-qnzM8xmqT5aJwHUXxZy3RAM",
//   "https://i.picsum.photos/id/387/200/200.jpg?hmac=xAsfqp-sKuFi5HUw3VKwBRqzmG_uqFbmk3oiHTJXjq4",
//   "https://i.picsum.photos/id/491/200/200.jpg?hmac=Zi1sOp0NH_d3eOa3qUg8-oDQJWvIkH8UkrAJZ7l-4wg",
//   "https://i.picsum.photos/id/331/200/200.jpg?hmac=otNh1Xx2hk_Tng_SFa60ayddRGORvWnDKJ2wG1l0KIE",
//   "https://i.picsum.photos/id/6/200/200.jpg?hmac=g4Q9Vcu5Ohm8Rwap3b6HSIxUfIALZ6BasESHhw7VjLE",
//   "https://i.picsum.photos/id/556/200/200.jpg?hmac=5uOJ4fW7ElE2P5NfHlvz2zx4d99Ts2-lxy8tucygHLc",
//   "https://i.picsum.photos/id/277/200/200.jpg?hmac=zlHjTbiytnfBWurpKXXSvMRzVSmkgW13o4K7Q-08r68",
//   "https://i.picsum.photos/id/798/200/200.jpg?hmac=Y-GVgT90HQZA0AOyRx9gcdj-14IrW6-zz81X6pMlE0k",
//   "https://i.picsum.photos/id/217/200/200.jpg?hmac=LoNAUhfCfURrqYjw6WECEWybn4B8y37k5G2odewlZ_Y",
//   "https://i.picsum.photos/id/23/200/200.jpg?hmac=IMR2f77CBqpauCb5W6kGzhwbKatX_r9IvgWj6n7FQ7c",
//   "https://i.picsum.photos/id/807/200/200.jpg?hmac=Y8gayvNItiQYxP_Pd-2un9GH09XuyJdIZOQPw6K9QsI",
//   "https://i.picsum.photos/id/20/200/200.jpg?hmac=wHmtG3BEC6aOsGZU_Q2wnxVQq34B__t4x4LFw-sptM8",
//   "https://i.picsum.photos/id/1054/200/200.jpg?hmac=7qtHUdgOyKxMVpcUELySqbknGm7xI76LbA9CE0uag_o",
// ];

export class Game {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:3000"
  );
  game: GameType;
  images: string[];
  result?: GameResultType;
  isGameReady: boolean;

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
  }

  updateGame(game: GameType) {
    this.game = game;
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
