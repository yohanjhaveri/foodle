import { Grid } from "@chakra-ui/react";
import { useGame } from "../../hooks/useGame";
import { generateIndexArray } from "../../utils";
import { LetterBlock } from "./LetterBlock";

export const EmptyRow = () => {
  const { size } = useGame();

  return (
    <Grid gap="6px" templateColumns="repeat(5, 1fr)">
      {generateIndexArray(size).map((i) => (
        <LetterBlock key={i} />
      ))}
    </Grid>
  );
};
