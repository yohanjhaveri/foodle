import { Grid } from "@chakra-ui/react";
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
    <Grid
      gap="8px"
      templateRows="1fr 1fr 1fr 1fr 1fr 1fr"
      width="100%"
      justifyContent="center"
    >
      {FILLED_ROWS}
      {turns.length < ALLOWED_ATTEMPTS && ACTIVE_ROW}
      {EMPTY_ROWS}
    </Grid>
  );
};
