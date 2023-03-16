import { useGame } from "../../hooks/useGame";
import { generateIndexArray } from "../../utils";
import { LetterBlock } from "./LetterBlock";
import { RowWrapper } from "./RowWrapper";

export const ActiveRow = () => {
  const { size, guess, jiggle } = useGame();

  return (
    <RowWrapper jiggle={jiggle}>
      {generateIndexArray(size).map((i) => (
        <LetterBlock key={i} letter={guess.charAt(i)} />
      ))}
    </RowWrapper>
  );
};
