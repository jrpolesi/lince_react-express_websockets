class Room {
  constructor(images) {
    this.images = images;
    this.users = [];
    this.currentImage = this.getRandomImage();
    this.usedImagesIndex = [];
  };

  getRandomImage() {
    const imageIndex = Math.floor(Math.random() * (this.images.length + 1));
    this.usedImagesIndex.push(imageIndex);
    return this.images[imageIndex];
  }
}

export default Room;
