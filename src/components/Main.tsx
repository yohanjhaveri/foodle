import { Box, Flex } from "@chakra-ui/react";
import { Game } from "./Game";
import { Header } from "./Header";
import { Keyboard } from "./Keyboard";

export const Main = () => {
  return (
    <Box h="100%">
      <Header />
      <Flex height="calc(100% - 60px)" flexDirection="column">
        <Game />
        <Keyboard />
      </Flex>
    </Box>
  );
};
