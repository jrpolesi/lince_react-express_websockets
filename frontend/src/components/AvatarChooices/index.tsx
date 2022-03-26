import { Avatar, Flex } from "@chakra-ui/react";

const avatarOptions = Array.from(
  { length: 14 },
  (_, index) => `./assets/icons/avatar-${index}.svg`
);

export const AvatarChooices = ({
  changeAvatar,
}: {
  changeAvatar: (_: string) => void;
}) => {
  return (
    <Flex maxW="100%" wrap="wrap" justifyContent="center" p="6" gap="4">
      {avatarOptions.map((avatarURL: string) => (
        <Avatar
          size="xl"
          key={avatarURL}
          src={avatarURL}
          cursor="pointer"
          onClick={(event) => changeAvatar(avatarURL)}
        />
      ))}
    </Flex>
  );
};
