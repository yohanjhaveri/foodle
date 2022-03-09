import { Flex } from "@chakra-ui/react";
import { useGame } from "../../hooks/useGame";
import { generateIndexArray } from "../../utils";
import { LetterBlock } from "./LetterBlock";

export const EmptyRow = () => {
  const { size } = useGame();

  return (
    <Flex gap="8px">
      {generateIndexArray(size).map((i) => (
        <LetterBlock key={i} />
      ))}
    </Flex>
  );
};
