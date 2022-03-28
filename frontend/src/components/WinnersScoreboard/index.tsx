import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { RiVipCrownFill } from "react-icons/ri";
import { observer } from "mobx-react-lite";
import { gameStore } from "../../store/game";
import { PlayerCard } from "../PlayerCard";

export const WinnersScoreboard = observer(() => {
  const winners =
    gameStore.result &&
    [...gameStore.result.players].sort((a, b) => {
      return Number(a.points) - Number(b.points);
    });

  return (
    <Modal isOpen={true} onClose={() => false}>
      <ModalOverlay />

      <ModalContent bg="white" color="black" w="90%" maxW="400px">
        <Flex direction="column" p="10px 25px" gap="30px">
          <Heading as="h2" textAlign="center">
            Placar
          </Heading>

          <Flex justify="center" gap="50px" textAlign="center">
            <Box marginTop="40px">
              <Icon as={RiVipCrownFill} color="silver" w="30px" h="30px" />
              <PlayerCard
                direction="column"
                centralized
                player={winners && winners[0]}
              />
            </Box>

            <Box>
              <Icon as={RiVipCrownFill} color="gold" w="30px" h="30px" />
              <PlayerCard
                direction="column"
                centralized
                player={winners && winners[1]}
              />
            </Box>

            <Box marginTop="40px">
              <Icon as={RiVipCrownFill} color="#ce956d" w="30px" h="30px" />
              <PlayerCard
                direction="column"
                centralized
                player={winners && winners[2]}
              />
            </Box>
          </Flex>

          <Button
            type="submit"
            variant="solid"
            color="white"
            bg="brand.500"
            w="90%"
            m="auto"
            _hover={{ bg: "brand.200" }}
          >
            Novo Jogo
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
});
