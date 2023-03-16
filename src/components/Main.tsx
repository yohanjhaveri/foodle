import { Box, Flex } from "@chakra-ui/react";
import { Game } from "./Game/Game";
import { Header } from "./Header/Header";
import { Keyboard } from "./Keyboard/Keyboard";

export const Main = () => {
  return (
    <Box w="100%">
      <Header />
      <Flex
        justify="stretch"
        align="stretch"
        height={{ base: "calc(100vh - 320px)", md: "calc(100vh - 50px)" }}
        flexDirection="column"
      >
        <Game />
        <Keyboard />
      </Flex>
    </Box>
  );
};
