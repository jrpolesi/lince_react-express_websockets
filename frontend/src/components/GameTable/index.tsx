import { Box, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { gameStore } from "../../store/game";
import { ImageCard } from "../ImageCard";

export const GameTable = observer(() => {
  return (
    <SimpleGrid
      maxW="1300px"
      w="95%"
      m="25px auto"
      minChildWidth="100px"
      spacing="5px"
      justifyItems="center"
    >
      {gameStore.images.map((image, index) => (
        <Box key={image}>
          <ImageCard image={image} />
        </Box>
      ))}
    </SimpleGrid>
  );
});
