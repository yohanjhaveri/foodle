import { Flex } from "@chakra-ui/react";
import { useMemo } from "react";
import { useGame } from "../../hooks/useGame";
import { generateIndexArray, getHints } from "../../utils";
import { LetterBlock } from "./LetterBlock";

type Props = {
  turn: string;
};

export const FilledRow = ({ turn }: Props) => {
  const { size, word } = useGame();

  const hints = useMemo(() => getHints(size, word, turn), [size, word, turn])

  return (
    <Flex gap="8px">
      {generateIndexArray(size).map((i) => (
        <LetterBlock
          key={i}
          color={hints[i]}
          letter={turn.charAt(i)}
        />
      ))}
    </Flex>
  );
};
