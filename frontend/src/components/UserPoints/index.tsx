import { Avatar, Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Player } from "../../interfaces/events";

export const UserPoints = observer(({ user }: { user: Player }) => {
  return (
    <Box>
      {user.name}
      <Avatar src={user.image} />
      <Box>Points: {user.points}</Box>
    </Box>
  );
});
