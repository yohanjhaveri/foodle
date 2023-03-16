import { useGame } from "../../hooks/useGame";
import { generateIndexArray } from "../../utils";
import { LetterBlock } from "./LetterBlock";
import { RowWrapper } from "./RowWrapper";

export const EmptyRow = () => {
  const { size } = useGame();

  return (
    <RowWrapper>
      {generateIndexArray(size).map((i) => (
        <LetterBlock key={i} />
      ))}
    </RowWrapper>
  );
};
