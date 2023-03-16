import { useMemo } from "react";
import { useGame } from "../../hooks/useGame";
import { generateIndexArray, getHints } from "../../utils";
import { LetterBlock } from "./LetterBlock";
import { RowWrapper } from "./RowWrapper";

type Props = {
  turn: string;
};

export const FilledRow = ({ turn }: Props) => {
  const { size, word } = useGame();

  const hints = useMemo(() => getHints(size, word, turn), [size, word, turn]);

  return (
    <RowWrapper>
      {generateIndexArray(size).map((i) => (
        <LetterBlock key={i} color={hints[i]} letter={turn.charAt(i)} />
      ))}
    </RowWrapper>
  );
};
