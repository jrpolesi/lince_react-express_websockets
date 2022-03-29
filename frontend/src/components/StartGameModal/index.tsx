import {
  Alert,
  AlertIcon,
  Avatar,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FormEvent, FormEventHandler, useState } from "react";
import { gameStore } from "../../store/game";
import { FaUserAlt } from "react-icons/fa";
import { AvatarChooices } from "../AvatarChooices";

export const StartGameModal = observer(
  ({ toggleIsUserReady }: { toggleIsUserReady: () => void }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<boolean | string>(false);
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [avatarURL, setAvatarURL] = useState("./assets/icons/avatar-0.svg");
    const avatarSize = useBreakpointValue({ base: "xl", md: "2xl" });

    const handleSubmit: FormEventHandler = (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      const name = inputValue.trim();

      if (!name) {
        return setError("Você deve escolher um nome");
      }

      const user = {
        name,
        image: avatarURL,
      };

      gameStore.iAmReady(user);
      toggleIsUserReady();
    };

    const changeAvatar = (avatarURL: string) => {
      setAvatarURL(avatarURL);

      onClose();
    };

    return (
      <Center>
        <Flex
          direction="column"
          gap="20px"
          as="form"
          bg="white"
          w="95%"
          maxW="500px"
          onSubmit={handleSubmit}
          color="#666666"
          p="20px"
          borderRadius="lg"
        >
          <Heading as="h2" fontSize={["22px", "32px"]} textAlign="center">
            Escolha um nick e avatar
          </Heading>

          <Center>
            <Avatar
              src={avatarURL}
              onClick={onOpen}
              cursor="pointer"
              size={avatarSize}
            />
          </Center>

          <InputGroup bgColor="#EEEEEE" borderRadius="md">
            <InputLeftElement children={<Icon as={FaUserAlt} />} />
            <Input
              maxLength={12}
              placeholder="Nickname"
              type="text"
              name="name"
              variant="filled"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </InputGroup>

          {!!error && (
            <Center>
              <Alert status="error" fontSize="sm" h="30px">
                <AlertIcon w="15px" />
                {error}
              </Alert>
            </Center>
          )}

          <Button
            type="submit"
            variant="solid"
            colorScheme="brand"
            color="white"
            _hover={{ bg: "brand.500" }}
          >
            Start
          </Button>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="90%" w="600px">
            <AvatarChooices changeAvatar={changeAvatar} />
          </ModalContent>
        </Modal>
      </Center>
    );
  }
);
