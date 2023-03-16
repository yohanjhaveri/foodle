import { Box, Flex } from "@chakra-ui/react";
import { Board } from "./Board";
import { Header } from "./Header";
import { Keyboard } from "./Keyboard";

export const Main = () => (
  <Box h="100%">
    <Header />
    <Flex h="calc(100% - 60px)" direction="column">
      <Board />
      <Keyboard />
    </Flex>
  </Box>
);
