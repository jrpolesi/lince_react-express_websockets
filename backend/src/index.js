import express from "express";
import { Server } from "socket.io";
const app = express();
const port = process.env.PORT || 3000

import Room from "./models/game.js";

const expressServer = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: "*",
  },
}); 

let rooms = [];
const images = [
  "https://i.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0",
  "https://i.picsum.photos/id/724/200/200.jpg?hmac=sUKRpiwXopeRQ36cEVnZgrG3Wd73G8iet9dfVSvmi8k",
  "https://i.picsum.photos/id/1051/200/200.jpg?hmac=s6d4ypEjpec8nvA2zqhWzx_6ogXYM2fJ_YJwaOM1CUA",
  "https://i.picsum.photos/id/498/200/200.jpg?hmac=qTtPQUlxKQaUfu86iZS07VWbb5NrV6vbPnPq8SM2WC8",
  "https://i.picsum.photos/id/566/200/200.jpg?hmac=b6_RMcsCCCu5ULi6A3V8vdRrnNhtsnbHdakcGNIQd8s",
  "https://i.picsum.photos/id/14/200/200.jpg?hmac=bwQwH7-0RPCqUVkFzd3hFhc6yDfC6_e7vgaKXZ7vFOA",
  "https://i.picsum.photos/id/610/200/200.jpg?hmac=6qOvp5zik0MBH2bc7jzgth7yzkY8IlZXay0WCNF20DM",
  "https://i.picsum.photos/id/79/200/200.jpg?hmac=jnCRb6UX5VWA4Kxl91zIBXPa2iJJsmVwzbxrzt6TahQ",
  "https://i.picsum.photos/id/743/200/200.jpg?hmac=p4EqNQGnGvZo65W4_FlXvjPQG8g1ogR7bgvnrQCUnEs",
  "https://i.picsum.photos/id/679/200/200.jpg?hmac=sPsw4YJPQkWFqo2k5UycejGhY4UXvaDXStGmvJEhFBA",
  "https://i.picsum.photos/id/146/200/200.jpg?hmac=BEfC1fMGgqn0zNUowEDrlnKsAisQSg9rYB7RxuXpTb4",
  "https://i.picsum.photos/id/1011/200/200.jpg?hmac=ISwJXaLKDOtBGE_n3myoHUev_P_OH3zpWqLx0yHp0pY",
  "https://i.picsum.photos/id/660/200/200.jpg?hmac=5UOdBCKDcPq_zS0RAVkvSD934EYVyCEdExCagJur-g8",
  "https://i.picsum.photos/id/336/200/200.jpg?hmac=VZ7MzNM30jINYNf5Oj_8zqPLTDAyKDk6eXWTGnNb4bU",
  "https://i.picsum.photos/id/911/200/200.jpg?hmac=0atndFqwalkRV7EdIfbZZ_7srC7u_3UtGX9T1vd-sfk",
  "https://i.picsum.photos/id/188/200/200.jpg?hmac=TipFoTVq-8WOmIswCmTNEcphuYngcdkCBi4YR7Hv6Cw",
  "https://i.picsum.photos/id/409/200/200.jpg?hmac=AY8BYOBixnRqVEMdEhYmw49e-6qu3M3zf_xXjkAuHHc",
  "https://i.picsum.photos/id/327/200/200.jpg?hmac=-qY8ApRJQJVHwDBxBmp-qnzM8xmqT5aJwHUXxZy3RAM",
  "https://i.picsum.photos/id/387/200/200.jpg?hmac=xAsfqp-sKuFi5HUw3VKwBRqzmG_uqFbmk3oiHTJXjq4",
  "https://i.picsum.photos/id/491/200/200.jpg?hmac=Zi1sOp0NH_d3eOa3qUg8-oDQJWvIkH8UkrAJZ7l-4wg",
  "https://i.picsum.photos/id/331/200/200.jpg?hmac=otNh1Xx2hk_Tng_SFa60ayddRGORvWnDKJ2wG1l0KIE",
  "https://i.picsum.photos/id/6/200/200.jpg?hmac=g4Q9Vcu5Ohm8Rwap3b6HSIxUfIALZ6BasESHhw7VjLE",
  "https://i.picsum.photos/id/556/200/200.jpg?hmac=5uOJ4fW7ElE2P5NfHlvz2zx4d99Ts2-lxy8tucygHLc",
  "https://i.picsum.photos/id/277/200/200.jpg?hmac=zlHjTbiytnfBWurpKXXSvMRzVSmkgW13o4K7Q-08r68",
  "https://i.picsum.photos/id/798/200/200.jpg?hmac=Y-GVgT90HQZA0AOyRx9gcdj-14IrW6-zz81X6pMlE0k",
  "https://i.picsum.photos/id/217/200/200.jpg?hmac=LoNAUhfCfURrqYjw6WECEWybn4B8y37k5G2odewlZ_Y",
  "https://i.picsum.photos/id/23/200/200.jpg?hmac=IMR2f77CBqpauCb5W6kGzhwbKatX_r9IvgWj6n7FQ7c",
  "https://i.picsum.photos/id/807/200/200.jpg?hmac=Y8gayvNItiQYxP_Pd-2un9GH09XuyJdIZOQPw6K9QsI",
  "https://i.picsum.photos/id/20/200/200.jpg?hmac=wHmtG3BEC6aOsGZU_Q2wnxVQq34B__t4x4LFw-sptM8",
  "https://i.picsum.photos/id/1054/200/200.jpg?hmac=7qtHUdgOyKxMVpcUELySqbknGm7xI76LbA9CE0uag_o",
  "https://i.picsum.photos/id/278/200/200.jpg?hmac=ttIZUII9b-qTWIpyIHChMPIA802dHskBJGR2EAa-Ywc",
  "https://i.picsum.photos/id/784/200/200.jpg?hmac=5EDfQlW8ug7LDGI9M8P-ywBxc0DWi9OzpGMATZiYPdQ",
  "https://i.picsum.photos/id/790/200/200.jpg?hmac=Y1d81XFNx8LJhlNsiwDoDgIn4mF3SK9nTdIVqkkHS9I",
  "https://i.picsum.photos/id/357/200/200.jpg?hmac=hHhE00vBpBPSjAiUhwzFKQi9PsCWu7sblLKC2rT6Fn8",
  "https://i.picsum.photos/id/936/200/200.jpg?hmac=IL7mo8CcTgJAO1CveVd2nT25CdqAuZ-htB7FYFW-4gQ",
  "https://i.picsum.photos/id/646/200/200.jpg?hmac=3jbia15y-hA5gmqVJjmk6BPJiisi4j-fNKPi3iXRiRo",
  "https://i.picsum.photos/id/547/200/200.jpg?hmac=04fFD0MMF_hIH8HFysMTH_z8R7CwblctCIrBpdzouJs",
  "https://i.picsum.photos/id/388/200/200.jpg?hmac=yc4V5jCOMR-l634JzXmANfvSGFGgYWHQN4aKA69RvZo",
  "https://i.picsum.photos/id/239/200/200.jpg?hmac=8JqlXUpZ9Xy0H6tMK8sCPQAYU9vUn9Qa8Kg-U9h3sCY",
  "https://i.picsum.photos/id/85/200/200.jpg?hmac=gQRdT-HPw1azaNf38WLW_QZv7aC0WjwOSM4Sf5kWm3U",
  "https://i.picsum.photos/id/940/200/200.jpg?hmac=bIX4juxj93bHJKYbdztQYmQByF-1mM6YI2ec9UrnrTo",
  "https://i.picsum.photos/id/77/200/200.jpg?hmac=RaFJkrixMn3dR7INSPWcmjC7HCxmggmF5mTlMpyEHsQ",
  "https://i.picsum.photos/id/335/200/200.jpg?hmac=CS4kiSEelfhSQQtW7j6SFUV2ZlTmUV1vaX2iZKnbx7c",
  "https://i.picsum.photos/id/281/200/200.jpg?hmac=5FvZ-Y5zbbpS3-mJ_mp6-eH61MkwhUJi9qnhscegqkY",
  "https://i.picsum.photos/id/215/200/200.jpg?hmac=3tSx9-cokJ9mRzxZ5jFOb7f6SKjA29i-Nh3-iW2O-MU",
  "https://i.picsum.photos/id/979/200/200.jpg?hmac=WcPMB8O2ujsPsQzJm14ISP-kXmQ59P6G82VPGNwql4I",
  "https://i.picsum.photos/id/1068/200/200.jpg?hmac=fZthgo1dc9rYSPL0GF4oEqYm2dpTII6Dz2J06qYNqGw",
  "https://i.picsum.photos/id/824/200/200.jpg?hmac=Uozb__ejlYDEziPN80UpSs6tvyqjiIyjnWYj9gaPP-Y",
  "https://i.picsum.photos/id/225/200/200.jpg?hmac=52EiCj00RHCtvmOTzd1OIWV0prXw1EISWtV8iI65NL4",
  "https://i.picsum.photos/id/265/200/200.jpg?hmac=P7yvEv5EqJI1dcUPqsVzIJNv895xWbefJGQnINGcdvM",
  "https://i.picsum.photos/id/703/200/200.jpg?hmac=6zWxIBRmIf2e0jZTqvKBIwrc7wm-dPkvGky4go6Yyvg",
  "https://i.picsum.photos/id/960/200/200.jpg?hmac=jBtZLcx2FwawGC7rwl0dNWTD3q1uuB7CjJmALIF9pIg",
  "https://i.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ",
  "https://i.picsum.photos/id/741/200/200.jpg?hmac=p1uKDNQ-F_iZNWuOa850lFxzcw_rXxy9gW_PbiMWriA",
  "https://i.picsum.photos/id/353/200/200.jpg?hmac=0pI-jYBxEC3AHp_0G8YowhiQRtQdv6u1Kfvuf0c9VNQ",
  "https://i.picsum.photos/id/203/200/200.jpg?hmac=fydyJjsULq7iMwTTIg_m6g_PQQ1paJrufNsEiqbJRsg",
  "https://i.picsum.photos/id/1080/200/200.jpg?hmac=0okKAdyiW9oTgR5PNZQrDYFtWu7HAt93nI93ZpfelUw",
  "https://i.picsum.photos/id/229/200/200.jpg?hmac=b3V9uXS2Q1EA1tLHxvWjTgBF4TphN4ibxTjDv2PO2jg",
  "https://i.picsum.photos/id/783/200/200.jpg?hmac=xd2H7xsUnYmNs2Tf6ne9m1bWpTcIsiiQ93D1SCdOvIY",
  "https://i.picsum.photos/id/373/200/200.jpg?hmac=WAwyn7yIFXuyUxxF4b3ijw7qJfIP7oBXicnozVoLj_o",
  "https://i.picsum.photos/id/91/200/200.jpg?hmac=y-8iGl9dOkbHqADPlWuS-rWBHNBWWXlzKcsTDu2WeQo",
  "https://i.picsum.photos/id/616/200/200.jpg?hmac=QEzyEzU6nVn4d_vdALhsT9UAtTUEVhwrT-kM5ogBqKM",
  "https://i.picsum.photos/id/896/200/200.jpg?hmac=GtnSTSOmlmBRvu2fpraj0-9azTBV0t32V07JLyAVPhM",
  "https://i.picsum.photos/id/419/200/200.jpg?hmac=yUYGIG3hJhzafcgOl8Drs4iTsia3HynizHXh8nTcvEQ",
  "https://i.picsum.photos/id/1013/200/200.jpg?hmac=mW7QsQSZWgWOm8DAQ2zj3vcwbLk6w_AkeUOvEx7zI24",
  "https://i.picsum.photos/id/171/200/200.jpg?hmac=Iac8JDq1zmWNTEFRE3gkPZthKsJwpOS76FjbzDkGSc8",
  "https://i.picsum.photos/id/529/200/200.jpg?hmac=LiB-rmOEJ-iPyye6kU2u9mmHGs_o7w5wrCHbzlNX5b0",
  "https://i.picsum.photos/id/471/200/200.jpg?hmac=LEJyaxVwJ-Df2QN6POR3mvD0nKLbC6GIntpAUjTR3gM",
  "https://i.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
  "https://i.picsum.photos/id/962/200/200.jpg?hmac=XehF7z9JYkgC-2ZfSP05h7eyumIq9wNKUDoCLklIhr4",
  "https://i.picsum.photos/id/722/200/200.jpg?hmac=wNug9Ox95uwU6niL7InSfuJXj6KQLckDilJExPwv75Q",
  "https://i.picsum.photos/id/228/200/200.jpg?hmac=o6k6dSrgAeHp1V6rxIjRR2cwEeu4DUs9Z1-sLxrQ878",
  "https://i.picsum.photos/id/830/200/200.jpg?hmac=3ce7zNUn5yg_XKy7dHgIHta7t_0vghPQnAGUSGJuBZE",
  "https://i.picsum.photos/id/839/200/200.jpg?hmac=IKyeqXa3iOwFkcM24B_X_Qjf9643wuDTCsTiM3T6AZg",
  "https://i.picsum.photos/id/522/200/200.jpg?hmac=-4K81k9CA5C9S2DWiH5kP8rMvaAPk2LByYZHP9ejTjA",
  "https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg",
  "https://i.picsum.photos/id/354/200/200.jpg?hmac=ykMwenrB5tcaT_UHlYwh2ZzAZ4Km48YOmwJTFCiodJ4",
];

io.on("connection", (socket) => {
  if (rooms.length === 0) {
    rooms.push(new Room(images));
  }
  const room = rooms[0];

  room.users.push({ id: socket.id, isReady: false, points: 0 });

  socket.on("disconnect", () => {
    room.users = room.users.filter(({ id }) => id !== socket.id);

    const updatedGame = room.getUpdatedGame();

    io.emit("update-players", updatedGame);

    if (room.users.length === 0) {
      rooms = [];
    }
  });

  socket.on("is-ready", (updatedUser) => {
    const user = room.users.find(({ id }) => id === updatedUser.id);
    user.name = updatedUser.name;
    user.image = updatedUser.image;
    user.isReady = updatedUser.isReady;

    room.isGameReady = room.checkPlayersStatus();

    const updatedGame = room.getUpdatedGame();

    if (room.users.length > 1 && room.isGameReady) {
      io.emit("update-game", updatedGame);
      io.emit("start-game", { ...updatedGame, images: room.images });
    }
  });

  socket.on("round-winner-user", (userId) => {
    const user = room.users.find(({ id }) => id === userId);
    user.points++;

    if (room.availableImagesIndex.length <= 0) {
      room.users = room.users.map((user) => ({ ...user, isReady: false }));

      room.isGameReady = room.checkPlayersStatus();

      const updatedGame = room.getUpdatedGame();

      io.emit("finish-game", updatedGame);
    } else {
      room.currentImage = room.getRandomImage();

      const updatedGame = room.getUpdatedGame();

      io.emit("update-game", updatedGame);
    }
  });

  socket.on("restart-game", () => {
    const user = room.users.find(({ id }) => id === socket.id);
    user.points = 0;
    user.isReady = true;

    room.isGameReady = room.checkPlayersStatus();

    const updatedGame = room.getUpdatedGame();

    io.emit("update-players", updatedGame);

    if (room.users.length > 1 && room.isGameReady) {
      room.restart();

      io.emit("update-game", updatedGame);
      io.emit("start-game", { ...updatedGame, images: room.images });
    }
  });
});
