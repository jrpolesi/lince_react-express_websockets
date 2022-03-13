class Room {
  constructor(images) {
    this.images = images;
    this.users = [];
    this.availableImagesIndex = Array.from({length: this.images.length}, (_, k) => k);
    this.currentImage = this.getRandomImage();
  };

  getRandomImage() {
    const randomIndex = Math.floor(Math.random() * (this.availableImagesIndex.length));

    const imageIndex = this.availableImagesIndex[randomIndex]

    this.availableImagesIndex.splice(randomIndex, 1);

    return this.images[imageIndex];
  }
}

export default Room;
