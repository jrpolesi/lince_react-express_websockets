import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { gameStore } from "../../store/game";
import { ImageCard } from "../ImageCard";
import { PlayersList } from "../PlayersList";
import { Timer } from "../Timer";

export const GameTable = observer(() => {
  return (
    <Flex m="25px auto" w="95%" gap="20px" justify="center" alignItems="flex-start">
      {!gameStore.canPlay && <Timer />}
      <PlayersList />
      <SimpleGrid
        flexGrow="0"
        flexBasis="1150px"
        minChildWidth="100px"
        spacing="5px"
        justifyItems="center"
      >
        {gameStore.images.map((image, index) => (
          <Box key={image}>
            <ImageCard image={image} clickable />
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
});
