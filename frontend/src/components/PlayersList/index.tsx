import { Flex } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { gameStore } from "../../store/game";
import { PlayerCard } from "../PlayerCard";

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
        <PlayerCard key={player?.id} player={player} />
      ))}
    </Flex>
  );
});
