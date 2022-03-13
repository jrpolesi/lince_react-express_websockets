import { Box, Image } from "@chakra-ui/react";
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
    <Box onClick={checkImage} >
      <Image ref={imageElement} w="100px" borderRadius="20px" border={"3px solid rgba(0, 0, 0, .1)"} shadow="lg" src={image} alt="card" />
    </Box>
  );
})