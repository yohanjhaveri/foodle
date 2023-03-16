import { Flex, Grid } from "@chakra-ui/react";
import { useGame } from "../../hooks/useGame";
import { generateIndexArray } from "../../utils";
import { ALLOWED_ATTEMPTS } from "../../constants";
import { EmptyRow } from "./EmptyRow";
import { ActiveRow } from "./ActiveRow";
import { FilledRow } from "./FilledRow";

export const Game = () => {
  const { turns } = useGame();

  const numberOfEmptyRows = Math.max(ALLOWED_ATTEMPTS - 1 - turns.length, 0);
  const empty = generateIndexArray(numberOfEmptyRows);

  const FILLED_ROWS = turns.map((turn, i) => <FilledRow key={i} turn={turn} />);
  const EMPTY_ROWS = empty.map((i) => <EmptyRow key={i} />);
  const ACTIVE_ROW = <ActiveRow />;

  return (
    <Flex h="100%" justify="center" align="center">
      <Grid
        gap="6px"
        templateRows="repeat(6, 1fr)"
        px="20px"
        py="15px"
        justifyContent={{ base: "stretch", md: "center" }}
      >
        {FILLED_ROWS}
        {turns.length < ALLOWED_ATTEMPTS && ACTIVE_ROW}
        {EMPTY_ROWS}
      </Grid>
    </Flex>
  );
};
