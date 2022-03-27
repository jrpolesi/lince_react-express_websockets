import { Avatar, Box, Flex, Heading } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { gameStore } from "../../store/game";

export const PlayersList = observer(() => {
  return (
    <Flex
      flexShrink="0"
      bg="white"
      color="black"
      direction="column"
      gap="15px"
      p="10px"
      w="180px"
      borderRadius="md"
      display={["none", "none", "flex"]}
    >
      {gameStore.game.players.map((player) => (
        <Flex key={player.id} gap="8px">
          <Avatar src={player.image} />
          <Flex direction="column">
            <Heading as="h4" fontSize="16px">
              {player.name}
            </Heading>
            <Box as="span">Pontos: {player.points}</Box>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
});
