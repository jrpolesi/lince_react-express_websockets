import { getRandomNumber } from "../utils/index.js";

class Room {
  constructor(images) {
    this.users = [];
    this.images = this.shuffleImages(images);
    this.availableImagesIndex = Array.from(
      { length: this.images.length },
      (_, k) => k
    );
    this.currentImage = this.getRandomImage();
    this.isGameReady = false;
  }

  checkPlayersStatus() {
    return this.users.every((user) => user.isReady);
  }

  getUpdatedGame() {
    return {
      currentImage: this.currentImage,
      isGameReady: this.isGameReady,
      players: this.users,
    };
  }

  shuffleImages(images) {
    for (let i = images.length - 1; i > 0; i--) {
      const randomIndex = getRandomNumber(0, i + 1);

      [images[randomIndex], images[i]] = [images[i], images[randomIndex]];
    }

    return images;
  }

  getRandomImage() {
    const randomIndex = getRandomNumber(
      0,
      this.availableImagesIndex.length - 1
    );

    const imageIndex = this.availableImagesIndex[randomIndex];

    this.availableImagesIndex.splice(randomIndex, 1);

    return this.images[imageIndex];
  }

  restart() {
    this.availableImagesIndex = Array.from(
      { length: this.images.length },
      (_, k) => k
    );
    this.images = this.shuffleImages(this.images);
    this.currentImage = this.getRandomImage();
  }
}

export default Room;
