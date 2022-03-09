import { Flex } from "@chakra-ui/react";
import { useGame } from "../../hooks/useGame";
import { Turn } from "../../types";
import { generateIndexArray } from "../../utils";
import { LetterBlock } from "./LetterBlock";

type Props = {
  turn: Turn;
};

export const FilledRow = ({ turn }: Props) => {
  const { size } = useGame();

  return (
    <Flex gap="8px">
      {generateIndexArray(size).map((i) => (
        <LetterBlock
          key={i}
          color={turn.hints[i]}
          letter={turn.guess.charAt(i)}
        />
      ))}
    </Flex>
  );
};
