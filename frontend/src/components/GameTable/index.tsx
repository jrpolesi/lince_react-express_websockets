import { Box, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { gameStore } from "../../store/game";
import { AvatarChooices } from "../AvatarChooices";
import { ImageCard } from "../ImageCard";
import { UserPoints } from "../UserPoints";


export const GameTable = observer(() => {
  console.log({...gameStore.game.players})
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
      
     {gameStore.game.players &&  <UserPoints user={gameStore.game.players[0]} />}
    </SimpleGrid>
  );
});
