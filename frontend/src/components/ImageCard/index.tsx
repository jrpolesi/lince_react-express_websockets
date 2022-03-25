import { Box, Image } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { gameStore } from "../../store/game";

const style: CSSProperties = {
  position: "absolute",
  borderRadius: "20px",
  backfaceVisibility: "hidden",
  border: "3px solid rgba(0, 0, 0, .1)",
  width: "100%",
  height: "100%",
};

export const ImageCard = observer(
  ({
    image,
    isFlipped = true,
    width = 100,
  }: {
    image: string;
    isFlipped?: boolean;
    width?: number;
  }) => {
    const imageElement = useRef<HTMLImageElement>(null);

    function checkImage() {
      const imageClicked = imageElement.current?.src;

      if (imageClicked === gameStore.game.currentImage) {
        gameStore.sendCorrectAnswer();
      }
    }

    return (
      <Box
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform .5s",
        }}
        w={width}
        h={width}
        onClick={checkImage}
        transform={`rotateY(${isFlipped ? "180deg" : "0"})`}
      >
        <Image
          ref={imageElement}
          alt="card"
          src={image}
          style={style}
          shadow="lg"
          transform={"rotateY(180deg)"}
        />
        <Box style={style} bg="gray.600" shadow="lg"></Box>
      </Box>
    );
  }
);
