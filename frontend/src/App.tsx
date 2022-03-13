import { StartGameModal } from "./components/StartGameModal";
import { GameTable } from "./components/GameTable";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { gameStore } from "./store/game";
import { ImageCard } from "./components/ImageCard";
import { Center, ChakraProvider } from "@chakra-ui/react";
import customTheme from "./styles/custom-theme";

const App = observer(() => {
  const [isUserReady, setIsUserReady] = useState(false);

  function toggleIsUserReady() {
    setIsUserReady((prevIsReady) => !prevIsReady);
  }

  if (!isUserReady) {
    return <StartGameModal toggleIsUserReady={toggleIsUserReady} />;
  }

  return (
    <ChakraProvider theme={customTheme}>
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
    </ChakraProvider>
  );
});

export default App;
