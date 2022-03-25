import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FormEvent, FormEventHandler, useState } from "react";
import { gameStore } from "../../store/game";
import { FaUserAlt } from "react-icons/fa";

export const StartGameModal = observer(
  ({ toggleIsUserReady }: { toggleIsUserReady: () => void }) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<boolean | string>(false);

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
        image:
          "https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png",
      };

      gameStore.startGame(user);
      toggleIsUserReady();
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
            <Image
              w={["100px", "130px"]}
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user avatar"
            />
          </Center>

          <InputGroup bgColor="#EEEEEE" borderRadius="md">
            <InputLeftElement children={<Icon as={FaUserAlt} />} />
            <Input
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
      </Center>
    );
  }
);
