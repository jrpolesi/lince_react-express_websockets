import { StartGameModal } from "./components/StartGameModal";
import { GameTable } from "./components/GameTable";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { gameStore } from "./store/game";
import { ImageCard } from "./components/ImageCard";
import { Box, Center, Heading, Spinner, Text } from "@chakra-ui/react";
import { WinnersScoreboard } from "./components/WinnersScoreboard";

const App = observer(() => {
  const [isUserReady, setIsUserReady] = useState(false);

  function toggleIsUserReady() {
    setIsUserReady((prevIsReady) => !prevIsReady);
  }

  if (!isUserReady) {
    return (
      <>
        <Heading
          as="h1"
          fontSize={["32px", "50px"]}
          m="30px"
          textAlign="center"
        >
          À Primeira Vista
        </Heading>
        <StartGameModal toggleIsUserReady={toggleIsUserReady} />
      </>
    );
  }

  return (
    <Box>
      {gameStore.isGameReady || gameStore.result ? (
        <>
          <Center marginTop="15px">
            <ImageCard
              width={150}
              image={gameStore.game.currentImage}
              isFlipped={gameStore.canPlay}
            />
          </Center>

          {gameStore.result && <WinnersScoreboard />}
          <GameTable />
        </>
      ) : (
        <Box textAlign="center" marginTop="20vh">
          <Text m="30px" fontSize={["2xl", "4xl"]}>
            Aguardando os outros jogadores
          </Text>
          <Spinner speed="2s" size="xl" thickness="4px" />
        </Box>
      )}
    </Box>
  );
});

export default App;
