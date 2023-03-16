import { useEffect } from "react";
import { Box, Grid } from "@chakra-ui/react";
import { useGame } from "../hooks/useGame";
import { Game } from "./Game/Game";
import { Header } from "./Header/Header";
import { Keyboard } from "./Keyboard/Keyboard";

export const Main = () => {
  const { state } = useGame();

  return (
    <Box minHeight="100vh">
      <Header />
      <Grid
        gap="20px"
        justifyContent="center"
        alignItems="flex-end"
        paddingTop="80px"
        paddingBottom="20px"
        height="100vh"
      >
        <Game />
        <Keyboard />
      </Grid>
    </Box>
  );
};
