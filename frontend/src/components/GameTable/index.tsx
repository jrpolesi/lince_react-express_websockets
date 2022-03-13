import { observer } from "mobx-react-lite";
import { gameStore } from "../../store/game";
import { ImageCard } from "../ImageCard";


export const GameTable = observer(() => {
  return (
    <section>
      {gameStore.images.map((image, index) => (
        <ImageCard key={index} image={image} />
      ))}
    </section>
  );
});
