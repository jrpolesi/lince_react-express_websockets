class Room {
  constructor(images) {
    this.images = images;
    this.users = [];
    this.availablesImagesIndex = Array.from({length: this.images.length}, (_, k) => k);
    this.currentImage = this.getRandomImage();
  };

  getRandomImage() {
    const randomIndex = Math.floor(Math.random() * (this.availablesImagesIndex.length));

    const imageIndex = this.availablesImagesIndex[randomIndex]

    this.availablesImagesIndex.splice(randomIndex, 1);

    return this.images[imageIndex];
  }
}

export default Room;
