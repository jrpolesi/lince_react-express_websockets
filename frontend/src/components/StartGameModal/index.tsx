import { Box, Button, Image, Input } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FormEvent, FormEventHandler, useState } from "react";
import { gameStore } from "../../store/game";

export const StartGameModal = observer(
  ({ toggleIsUserReady }: { toggleIsUserReady: () => void }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<boolean | string>(false);

    const handleSubmit: FormEventHandler = (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      const name = inputValue.trim();

      if (!name.trim()) {
        return setError("Você deve escolher um nome");
      }

      const user = {
        name,
        image:
          "https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png",
      };

      gameStore.startGame(user);
      toggleIsUserReady();
    };

    return (
      <Box as="form" onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            name="name"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          {!!error && <label>{error}</label>}
        </div>
        <Image
          src="https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png"
          alt="user avatar"
        />
        <Button type="submit">Start</Button>
      </Box>
    );
  }
);
