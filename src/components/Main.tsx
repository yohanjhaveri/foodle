import { Box, Grid } from "@chakra-ui/react";
import { Game } from "./Game/Game";
import { Header } from "./Header/Header";
import { Keyboard } from "./Keyboard/Keyboard";

export const Main = () => {
  return (
    <Box w="100%">
      <Header />
      <Grid
        justifyContent="stretch"
        alignItems="flex-end"
        maxHeight="calc(100vh - 61px)"
        templateRows={{ base: "1fr 202px", md: "none" }}
      >
        <Game />
        <Keyboard />
      </Grid>
    </Box>
  );
};
