import { Avatar, Box, Flex, FlexProps, Heading } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Player } from "../../interfaces/events";

interface Props extends FlexProps {
  player?: Player;
  centralized?: boolean;
}

export const PlayerCard = observer(
  ({ player, centralized, ...rest }: Props) => {
    return (
      <Flex gap="8px" {...rest}>
        <Avatar src={player?.image} m={centralized ? "auto" : "0"} />
        <Flex direction="column">
          <Heading as="h4" fontSize="16px">
            {player?.name || "-"}
          </Heading>
          <Box as="span">
            Pontos: {player?.points !== undefined ? player.points : "-"}
          </Box>
        </Flex>
      </Flex>
    );
  }
);
