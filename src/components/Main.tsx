import { Box, Flex } from "@chakra-ui/react";
import { Game } from "./Game/Game";
import { Header } from "./Header/Header";
import { Keyboard } from "./Keyboard/Keyboard";

export const Main = () => {
  return (
    <Box w="100%" h="100%">
      <Header />
      <Flex
        justify="stretch"
        align="stretch"
        height="calc(100% - 60px)"
        flexDirection="column"
      >
        <Game />
        <Keyboard />
      </Flex>
    </Box>
  );
};
