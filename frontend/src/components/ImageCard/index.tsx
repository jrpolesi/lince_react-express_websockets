import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { gameStore } from "../../store/game";

export const ImageCard = observer(({ image }: { image: string }) => {
  const imageElement = useRef<HTMLImageElement>(null);

  function checkImage() {
    const imageClicked = imageElement.current?.src;

    if (imageClicked === gameStore.game.currentImage) {
      gameStore.sendCorrectAnswer();
    }
  }

  return (
    <div onClick={checkImage}>
      <img ref={imageElement} src={image} alt="card" />
    </div>
  );
})