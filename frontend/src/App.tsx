import { StartGameModal } from "./components/StartGameModal";
import { GameTable } from "./components/GameTable";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { gameStore } from "./store/game";
import { ImageCard } from "./components/ImageCard";
import { Box, Center, Heading } from "@chakra-ui/react";

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
      {gameStore.result && <h1>{gameStore.result.winner.name}</h1>}
      {gameStore.isGameReady ? (
        <>
          <Center>
            <ImageCard
              width={150}
              image={gameStore.game.currentImage}
              isFlipped={gameStore.canPlay}
            />
          </Center>
          <GameTable />
        </>
      ) : (
        <div>Aguardando os outros jogadores</div>
      )}
    </Box>
  );
});

export default App;
