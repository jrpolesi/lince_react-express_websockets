import { observer } from "mobx-react-lite";
import { FormEvent, useState } from "react";
import { gameStore } from "../../store/game";

export const StartGameModal = observer(({toggleIsUserReady}:{toggleIsUserReady: () => void}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<boolean | string>(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = inputValue.trim()

    if(!name){
      return setError("Você deve escolher um nome")
    }

    const user = {
      name,
      image:
        "https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png",
    };

    gameStore.startGame(user);
    toggleIsUserReady()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        {!!error && <label>{error}</label>}
      </div>
      <img
        src="https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png"
        alt="user avatar"
      />
      <button>Start</button>
    </form>
  );
});
