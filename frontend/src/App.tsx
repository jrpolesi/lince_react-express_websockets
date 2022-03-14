import { StartGameModal } from "./components/StartGameModal";
import { GameTable } from "./components/GameTable";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { gameStore } from "./store/game";
import { ImageCard } from "./components/ImageCard";
import { Box, Center } from "@chakra-ui/react";

const App = observer(() => {
  const [isUserReady, setIsUserReady] = useState(false);

  function toggleIsUserReady() {
    setIsUserReady((prevIsReady) => !prevIsReady);
  }

  if (!isUserReady) {
    return <StartGameModal toggleIsUserReady={toggleIsUserReady} />;
  }

  return (
    <Box>
      {gameStore.result && <h1>{gameStore.result.winner.name}</h1>}
      {gameStore.isGameReady ? (
        <>
          <Center >
            <ImageCard image={gameStore.game.currentImage} />
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
