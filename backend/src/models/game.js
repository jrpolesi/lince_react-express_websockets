class Room {
  constructor(images) {
    this.images = images;
    this.users = [];
    this.usedImagesIndex = [];
    this.currentImage = this.getRandomImage();
  };

  getRandomImage() {
    const imageIndex = Math.floor(Math.random() * (this.images.length + 1));
    this.usedImagesIndex.push(imageIndex);
    return this.images[imageIndex];
  }
}

export default Room;
